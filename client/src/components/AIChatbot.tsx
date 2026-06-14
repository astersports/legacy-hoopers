/*
 * AI Chatbot Widget — Legacy Hoopers Assistant
 * Connected to real LLM via tRPC backend for intelligent conversational responses.
 */
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey! I'm the Legacy Hoopers AI assistant. Ask me anything about our program — teams, schedules, registration, coaching philosophy, or locations. I'm powered by AI so I can have a real conversation with you.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.chat.ask.useMutation({
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply as string,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    },
    onError: () => {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting right now. For immediate help, please visit our registration page or contact Coach Kenny directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Build conversation history for context (last 6 messages)
    const history = messages
      .filter(m => m.id !== "welcome")
      .slice(-6)
      .map(m => ({ role: m.role, content: m.content }));

    chatMutation.mutate({
      message: userMessage.content,
      history,
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-white/10 backdrop-blur-xl border border-white/20 text-white rotate-0"
            : "bg-cobalt text-white shadow-cobalt/40 hover:bg-cobalt-light hover:-translate-y-1"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-navy-light/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 bg-cobalt/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cobalt/20 border border-cobalt/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-cobalt" />
              </div>
              <div>
                <h3 className="font-display font-800 text-sm uppercase text-white">Legacy Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-2.5 h-2.5 text-cobalt" />
                  <p className="text-cobalt text-[10px] font-600">AI-Powered · Real Conversations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-cobalt/20 border border-cobalt/30"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-3.5 h-3.5 text-cobalt" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-white/70" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-white/[0.06] border border-white/10 text-white/80"
                      : "bg-cobalt/20 border border-cobalt/30 text-white/90"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-cobalt/20 border border-cobalt/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-cobalt" />
                </div>
                <div className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cobalt/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-cobalt/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-cobalt/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 bg-navy/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about teams, schedules, registration..."
                className="flex-1 bg-white/[0.06] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cobalt/50 focus:ring-1 focus:ring-cobalt/30 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-cobalt rounded-lg text-white hover:bg-cobalt-light disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/20 text-[10px] mt-2 text-center">
              Powered by AI · Trained on Legacy Hoopers program info
            </p>
          </div>
        </div>
      )}
    </>
  );
}
