import { useEffect, useRef, useState, useCallback } from "react";
import { getProgramSchedule, isLive, type ScheduleEvent } from "@/lib/schedule";
import type { Team } from "@/lib/aster";

interface State {
  teams: Team[];
  events: ScheduleEvent[];
  loading: boolean;
  error: string | null;
  now: number;
  updatedAt: number;
}

const LIVE_MS = 60_000;
const IDLE_MS = 120_000;
const IMMINENT_MS = 2 * 60 * 60 * 1000;

/**
 * Loads the program schedule + keeps it current per the locked spec (D-S4):
 * a 60s tick drives countdowns/state flips, and an ADAPTIVE poll refetches the
 * RPC — 60s when a game is live or starts within ~2h, 120s when idle — paused
 * while the tab is hidden, refetching on focus.
 */
export function useSchedule(): State & { refresh: () => void } {
  const [state, setState] = useState<State>({
    teams: [], events: [], loading: true, error: null, now: Date.now(), updatedAt: 0,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    try {
      const { teams, events } = await getProgramSchedule();
      setState((s) => ({ ...s, teams, events, loading: false, error: null, updatedAt: Date.now() }));
    } catch (e) {
      setState((s) => ({ ...s, loading: false, error: (e as Error).message ?? "Failed to load" }));
    }
  }, []);

  // adaptive poll
  useEffect(() => {
    let alive = true;
    const schedule = () => {
      if (!alive) return;
      const now = Date.now();
      const hot = state.events.some(
        (e) => isLive(e, now) || (Date.parse(e.start_at) - now > 0 && Date.parse(e.start_at) - now < IMMINENT_MS),
      );
      const delay = hot ? LIVE_MS : IDLE_MS;
      timer.current = setTimeout(async () => {
        if (document.visibilityState === "visible") await load();
        schedule();
      }, delay);
    };
    schedule();
    return () => { alive = false; if (timer.current) clearTimeout(timer.current); };
  }, [state.events, load]);

  // initial load + refetch on tab focus
  useEffect(() => {
    load();
    const onVis = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [load]);

  // 60s now-tick (countdowns + state flips)
  useEffect(() => {
    const id = setInterval(() => setState((s) => ({ ...s, now: Date.now() })), 60_000);
    return () => clearInterval(id);
  }, []);

  return { ...state, refresh: load };
}
