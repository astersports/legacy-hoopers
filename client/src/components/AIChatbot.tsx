/*
 * AI Chatbot Widget — Legacy Hoopers Assistant
 * Provides instant answers about the program, schedules, registration, etc.
 * Uses a knowledge base of program info to respond intelligently.
 */
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Knowledge base for the AI assistant
const KNOWLEDGE_BASE = {
  registration: "Spring 2026 season is currently underway with 5 teams competing. For registration inquiries for upcoming seasons, visit the Aster Sports app or email info@legacyhoopers.org. Roster spots are limited to 10 players per team.",
  teams: "Legacy Hoopers has 5 teams: 8U, 9U, 10U Black (elite), 10U Blue, and 11U Girls. Each team competes in AAU circuits and local leagues.",
  schedule: "Practices are held 3 days per week across our facilities. Mondays at St. Patrick's in Armonk (7:35–8:35 PM Skills Lab). Tuesdays at Rippowam Cisqua in Bedford (5:30–8:30 PM). Wednesdays at Westchester CC (PEB) in Valhalla (5:00–8:00 PM).",
  cost: "For current pricing and payment plans, please visit our registration page on the Aster Sports app or email info@legacyhoopers.org for details.",
  coaching: "Coach Kenny, our founder, holds a Master's degree in Education. He applies differentiated instruction and educational best practices to basketball development. Every session is structured with intentional pedagogy.",
  philosophy: "Legacy Hoopers operates as an academy, not a rec league. We emphasize teaching-first coaching, competitive excellence, small rosters (max 10), and 90-minute structured development labs.",
  locations: "We train at 3 facilities in Northern Westchester: St. Patrick's (29 Cox Ave, Armonk), Rippowam Cisqua (439 Cantitoe St, Bedford), and Westchester Community College PEB (75 Grasslands Rd, Valhalla). Visit the Locations page for access instructions and navigation links.",
  age: "We serve players ages 7-11 across our 5 teams. Teams are organized by age group: 8U, 9U, 10U, and 11U.",
  tryouts: "Tryouts are held before each season. We evaluate skill level, coachability, and competitive drive. Contact us for upcoming tryout dates.",
  commitment: "We expect full commitment: 2+ unexcused absences per month triggers roster review. Players must arrive 10 minutes early, dressed and ready. Zero tolerance for disrespect.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("register") || lower.includes("sign up") || lower.includes("join")) {
    return KNOWLEDGE_BASE.registration;
  }
  if (lower.includes("team") || lower.includes("roster") || lower.includes("how many")) {
    return KNOWLEDGE_BASE.teams;
  }
  if (lower.includes("schedule") || lower.includes("practice") || lower.includes("when") || lower.includes("time")) {
    return KNOWLEDGE_BASE.schedule;
  }
  if (lower.includes("cost") || lower.includes("price") || lower.includes("fee") || lower.includes("pay") || lower.includes("how much")) {
    return KNOWLEDGE_BASE.cost;
  }
  if (lower.includes("coach") || lower.includes("kenny") || lower.includes("who")) {
    return KNOWLEDGE_BASE.coaching;
  }
  if (lower.includes("philosophy") || lower.includes("approach") || lower.includes("different") || lower.includes("why")) {
    return KNOWLEDGE_BASE.philosophy;
  }
  if (lower.includes("location") || lower.includes("where") || lower.includes("gym") || lower.includes("facility")) {
    return KNOWLEDGE_BASE.locations;
  }
  if (lower.includes("age") || lower.includes("old") || lower.includes("young")) {
    return KNOWLEDGE_BASE.age;
  }
  if (lower.includes("tryout") || lower.includes("try out") || lower.includes("evaluation")) {
    return KNOWLEDGE_BASE.tryouts;
  }
  if (lower.includes("commit") || lower.includes("expect") || lower.includes("rule") || lower.includes("policy")) {
    return KNOWLEDGE_BASE.commitment;
  }

  return "I can help with questions about registration, schedules, team info, locations, coaching philosophy, costs, and tryouts. What would you like to know about Legacy Hoopers?";
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey! I'm the Legacy Hoopers assistant. Ask me anything about our program — teams, schedules, registration, coaching philosophy, or locations.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAIResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
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
                <p className="text-cobalt text-[10px] font-600">AI-Powered · Always Available</p>
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
                disabled={!input.trim()}
                className="p-2.5 bg-cobalt rounded-lg text-white hover:bg-cobalt-light disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/20 text-[10px] mt-2 text-center">
              AI assistant · Responses based on program information
            </p>
          </div>
        </div>
      )}
    </>
  );
}
