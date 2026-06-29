import { useCallback, useRef, useState } from "react";
import { parseSseBuffer, type ScoutEvent } from "@/lib/scoutSse";

/**
 * "Aster Scout" chat hook for the AAU site. Ported from astersports-web and
 * adapted to call the scout cross-origin: it POSTs the transcript to the
 * absolute endpoint in VITE_SCOUT_ENDPOINT (e.g.
 * https://astersports.io/api/landing/scout-stream) and consumes the SSE
 * contract — streams assistant text from `delta`, surfaces a registry CTA from
 * `cta`, a lead acknowledgement from `lead_ack`, and a kind notice from any
 * denial/error.
 *
 * Dark-until-configured: when VITE_SCOUT_ENDPOINT is unset, `configured` is
 * false and the chat surface does not mount. A non-OK / unreachable response
 * (endpoint dark, CORS not yet allowed, agent flag off) degrades to a
 * contact-form notice — it never shows broken.
 */
const SCOUT_ENDPOINT = import.meta.env.VITE_SCOUT_ENDPOINT as string | undefined;

export interface ChatBubble {
  role: "user" | "assistant";
  text: string;
}

function newSessionId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `s-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

const OFFLINE_NOTICE =
  "The scout is offline right now — leave a note on the contact form and we'll reply by email.";

export function useScoutChat() {
  const configured = typeof SCOUT_ENDPOINT === "string" && SCOUT_ENDPOINT.length > 0;
  const sessionId = useRef<string>(newSessionId());
  const [bubbles, setBubbles] = useState<ChatBubble[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [cta, setCta] = useState<string | null>(null);
  const [leadAck, setLeadAck] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const send = useCallback(
    async (raw: string, turnstileToken?: string) => {
      const text = raw.trim();
      if (!text || streaming || !configured) return;

      const base: ChatBubble[] = [...bubbles, { role: "user", text }];
      setBubbles([...base, { role: "assistant", text: "" }]);
      setStreaming(true);
      setCta(null);
      setLeadAck(null);
      setNotice(null);

      let assistant = "";
      const renderAssistant = () => setBubbles([...base, { role: "assistant", text: assistant }]);

      const handle = (ev: ScoutEvent) => {
        switch (ev.type) {
          case "delta":
            assistant += ev.text;
            renderAssistant();
            break;
          case "cta":
            setCta(ev.serviceId);
            break;
          case "lead_ack":
            setLeadAck(ev.name);
            break;
          case "lead_denied":
          case "lead_error":
          case "denied":
          case "error":
            setNotice(ev.message);
            break;
          default:
            break;
        }
      };

      try {
        const res = await fetch(SCOUT_ENDPOINT as string, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionId.current,
            messages: base.map((b) => ({ role: b.role, content: b.text })),
            ...(turnstileToken ? { turnstileToken } : {}),
          }),
        });

        if (!res.ok || !res.body) {
          setNotice(OFFLINE_NOTICE);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const { events, rest } = parseSseBuffer(buf);
          buf = rest;
          for (const ev of events) handle(ev);
        }
        // Flush any final frame that arrived without a trailing blank line.
        if (buf.trim()) {
          for (const ev of parseSseBuffer(buf + "\n\n").events) handle(ev);
        }
      } catch {
        setNotice("Something hiccuped on our end — the contact form will reach us directly.");
      } finally {
        // Drop the pre-allocated assistant bubble if the turn produced no text
        // (offline, error, or a tool-only reply) so the transcript never shows a
        // blank bubble — the CTA / notice carries the response instead.
        if (!assistant) setBubbles(base);
        setStreaming(false);
      }
    },
    [bubbles, streaming, configured],
  );

  return { configured, bubbles, streaming, cta, leadAck, notice, send };
}
