/*
 * Marketing + aspirational content for the Aster Sports AAU template.
 * All cosmetic — wired to live services later. Icons are lucide-react names.
 */
import {
  Users, Target, Dumbbell, Sparkles, GraduationCap, Calendar,
  Smartphone, CloudSun, MessageSquare, CreditCard, Video, MapPin,
  BarChart3, Bell, ShieldCheck, Stethoscope, Crown, type LucideIcon,
} from "lucide-react";

export type Service = {
  key: string;
  icon: LucideIcon;
  name: string;
  blurb: string;
  price: string;
  cadence: string;
  features: string[];
  accent: string; // hex tint for the card top-line
  popular?: boolean;
};

export const SERVICES: Service[] = [
  {
    key: "aau",
    icon: Users,
    name: "AAU Travel Teams",
    blurb: "Competitive travel basketball across Zero Gravity + league play, grades 2–11.",
    price: "Season",
    cadence: "Tryout required",
    accent: "#c9952e",
    popular: true,
    features: ["8–12 tournaments / season", "2 practices + film weekly", "Live stats & game film", "College-prep development plan"],
  },
  {
    key: "camps",
    icon: Sparkles,
    name: "Skills Camps",
    blurb: "High-energy multi-day camps that build a complete offensive + defensive base.",
    price: "From $149",
    cadence: "School breaks",
    accent: "#3b82f6",
    features: ["Full-day & half-day tracks", "Position-specific stations", "Daily competition + awards", "Player report card"],
  },
  {
    key: "clinics",
    icon: Target,
    name: "Skill Clinics",
    blurb: "Weekly themed clinics — shooting, ball-handling, finishing, defense.",
    price: "$40 / session",
    cadence: "Weekly",
    accent: "#16a34a",
    features: ["Small coach-to-player ratio", "Shot-tracking + reps log", "Themed weekly focus", "Drop-in or 8-week block"],
  },
  {
    key: "training",
    icon: Dumbbell,
    name: "1:1 Training",
    blurb: "Private, fully-individualized development with a master-trained coach.",
    price: "$90 / hour",
    cadence: "Book anytime",
    accent: "#7c3aed",
    features: ["Custom growth plan", "Video breakdown after each session", "Strength + mobility add-ons", "Progress tracked in-app"],
  },
  {
    key: "small-group",
    icon: GraduationCap,
    name: "Small Groups",
    blurb: "2–4 players, shared goals — the sweet spot of attention and competition.",
    price: "$45 / player",
    cadence: "Weekly",
    accent: "#e05c2a",
    features: ["Matched by age + skill", "Competitive drill blocks", "Shared film room", "Flexible scheduling"],
  },
  {
    key: "elite",
    icon: Crown,
    name: "Elite Academy",
    blurb: "Invite-only year-round development for the program's top prospects.",
    price: "Application",
    cadence: "Year-round",
    accent: "#151525",
    features: ["Year-round periodized plan", "Strength & conditioning", "Recruiting + mentorship", "Quarterly combine testing"],
  },
];

export type HubLink = {
  icon: LucideIcon;
  label: string;
  desc: string;
  cta: string;
  tone: "gold" | "navy" | "blue" | "green";
};

export const HUB_LINKS: HubLink[] = [
  { icon: Smartphone, label: "Aster App", desc: "Schedule, RSVPs, messaging & payments in your pocket.", cta: "Open app", tone: "navy" },
  { icon: CloudSun, label: "Game-Day Weather", desc: "Live forecast for every gym, court & field.", cta: "View forecast", tone: "blue" },
  { icon: MessageSquare, label: "Team Messaging", desc: "Coach announcements & family chat in one thread.", cta: "Open inbox", tone: "green" },
  { icon: CreditCard, label: "Payments & Plans", desc: "Flexible plans, autopay & instant receipts.", cta: "Manage billing", tone: "gold" },
  { icon: Video, label: "Live Stream & Film", desc: "Every game streamed and saved to your film room.", cta: "Watch live", tone: "navy" },
  { icon: MapPin, label: "Locations & Directions", desc: "Turn-by-turn to every gym with parking notes.", cta: "Find a gym", tone: "blue" },
  { icon: BarChart3, label: "Player Dashboard", desc: "Attendance, progress & milestones, tracked.", cta: "Open dashboard", tone: "green" },
  { icon: Bell, label: "Smart Reminders", desc: "3-day, 1-day & game-time nudges, never miss it.", cta: "Set alerts", tone: "gold" },
  { icon: ShieldCheck, label: "Safety & SafeSport", desc: "Background-checked, certified, accountable staff.", cta: "Our standards", tone: "navy" },
  { icon: Stethoscope, label: "Athlete Wellness", desc: "Load management, injury prevention & return-to-play.", cta: "Learn more", tone: "blue" },
];

export type Metric = { label: string; value: number; suffix?: string; prefix?: string; decimals?: number };

export const PROGRAM_METRICS: Metric[] = [
  { label: "Athletes developed", value: 480, suffix: "+" },
  { label: "Tournaments played", value: 96 },
  { label: "Win rate", value: 71, suffix: "%" },
  { label: "Coach rating", value: 4.9, decimals: 1, suffix: "/5" },
];

export type Highlight = { title: string; meta: string; tag: string; duration: string };

export const HIGHLIGHTS: Highlight[] = [
  { title: "11U Girls clinch the Zero Gravity bracket", meta: "Championship · Mar 2026", tag: "Game winner", duration: "0:42" },
  { title: "Buzzer-beater vs. Rivertown Elite", meta: "League Play · Feb 2026", tag: "Top play", duration: "0:18" },
  { title: "Skills camp — finishing package", meta: "Winter Camp · Jan 2026", tag: "Training", duration: "1:05" },
  { title: "10U Black full-court press masterclass", meta: "Tournament · Feb 2026", tag: "Defense", duration: "0:51" },
  { title: "1:1 session — counter moves off the catch", meta: "Player Lab · 2026", tag: "Skills", duration: "0:37" },
  { title: "Season hype reel", meta: "Spring 2026", tag: "Feature", duration: "2:14" },
];

export type Coach = { name: string; role: string; cred: string };

export const COACHES: Coach[] = [
  { name: "Coach Kenny", role: "Founder · Coaching Director", cred: "M.Ed. · AAU" },
  { name: "Coach Darien", role: "Skills & Development", cred: "Player Dev" },
  { name: "Program Staff", role: "Camp & Clinic Leads", cred: "SafeSport ✓" },
];

export type Testimonial = { quote: string; name: string; role: string };

export const TESTIMONIALS: Testimonial[] = [
  { quote: "My daughter went from bench to starter in one season. The development plan is the real deal.", name: "Maria R.", role: "Parent · 11U Girls" },
  { quote: "The app keeps our whole family on schedule — weather, rides, payments, all in one place.", name: "James T.", role: "Parent · 10U Black" },
  { quote: "Coaching that actually teaches. Every practice has a purpose.", name: "Coach D.", role: "League Partner" },
];

export type WeatherDay = { day: string; icon: "sun" | "cloud" | "rain" | "partly"; hi: number; lo: number };

export const GAMEDAY_WEATHER = {
  venue: "Westchester County Center",
  city: "White Plains, NY",
  status: "Game on",
  now: { icon: "partly" as const, temp: 58, feels: 55, label: "Partly cloudy" },
  forecast: [
    { day: "Sat", icon: "sun" as const, hi: 61, lo: 44 },
    { day: "Sun", icon: "partly" as const, hi: 57, lo: 42 },
    { day: "Mon", icon: "cloud" as const, hi: 53, lo: 40 },
    { day: "Tue", icon: "rain" as const, hi: 49, lo: 38 },
  ] as WeatherDay[],
};

export type Step = { n: string; title: string; desc: string };

export const JOURNEY: Step[] = [
  { n: "01", title: "Discover your fit", desc: "Camp, clinic, 1:1, small group, or a travel team — find the right entry point." },
  { n: "02", title: "Register in minutes", desc: "One profile, instant checkout, flexible plans — all in the Aster app." },
  { n: "03", title: "Train with a plan", desc: "Every session is designed, tracked, and reviewed on film." },
  { n: "04", title: "See the progress", desc: "Live metrics, milestones, and highlights your whole family can follow." },
];
