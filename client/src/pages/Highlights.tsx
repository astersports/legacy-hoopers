import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Play, Film, Zap, Clock, Users, ChevronDown, ChevronUp, Share2, Link2, Check, Filter } from "lucide-react";
import { useLocation } from "wouter";

interface PlayBreakdown {
  time: string;
  seconds: number;
  description: string;
  player?: string;
  type: "score" | "rebound" | "drive" | "assist" | "shot" | "defense" | "steal" | "free-throw";
}

interface HighlightVideo {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  posterUrl: string;
  team: string;
  opponent: string;
  duration: string;
  plays: PlayBreakdown[];
  aiSummary: string;
  keyPlayers: string[];
  featuredPlayer: string;
  statLine: string;
}

const highlights: HighlightVideo[] = [
  {
    id: "1",
    title: "#5 & #24 — Scoring Clinic",
    subtitle: "vs Castle",
    videoUrl: "/manus-storage/highlight-reel-1_a4969791.mov",
    posterUrl: "/manus-storage/poster-reel-1_7c93f5d1.jpg",
    team: "Legacy 11U Girls",
    opponent: "Castle",
    duration: "2:22",
    featuredPlayer: "#5",
    statLine: "9 pts | 2 reb | 1 stl | 4 FT",
    aiSummary: "#5 is the star with 9 plays — three-pointers from the wing, aggressive on-ball defense leading to a steal-and-score, multiple free throws, and key defensive rebounds. #24 contributes a pull-up jumper and a baseline drive layup.",
    keyPlayers: ["#5", "#24"],
    plays: [
      { time: "0:12", seconds: 12, description: "#5 receives pass on right wing, sets feet, sinks a three-pointer", player: "#5", type: "score" },
      { time: "0:22", seconds: 22, description: "#24 catches pass on right wing, takes a dribble baseline, hits pull-up jumper", player: "#24", type: "score" },
      { time: "0:28", seconds: 28, description: "#24 brings ball up court, drives past defenders down right side, finishes layup", player: "#24", type: "score" },
      { time: "0:35", seconds: 35, description: "#5 secures defensive rebound after opponent's miss, pushes ball up court", player: "#5", type: "rebound" },
      { time: "0:41", seconds: 41, description: "#5 dribbles up left side, drives aggressively to basket, scores layup", player: "#5", type: "score" },
      { time: "0:49", seconds: 49, description: "#5 shoots and makes a free throw", player: "#5", type: "free-throw" },
      { time: "0:58", seconds: 58, description: "#5 shoots and makes another free throw", player: "#5", type: "free-throw" },
      { time: "1:04", seconds: 64, description: "#5 plays aggressive on-ball defense, pokes ball loose for steal, takes it coast-to-coast for fast-break layup", player: "#5", type: "steal" },
      { time: "1:18", seconds: 78, description: "#5 shoots and makes a three-pointer from the right wing", player: "#5", type: "score" },
      { time: "1:25", seconds: 85, description: "#5 receives ball, dribbles left, hits jump shot from just inside the arc", player: "#5", type: "score" },
      { time: "1:44", seconds: 104, description: "#5 grabs another defensive rebound in the paint", player: "#5", type: "rebound" },
      { time: "1:56", seconds: 116, description: "#5 shoots and makes a free throw", player: "#5", type: "free-throw" },
      { time: "2:13", seconds: 133, description: "#5 shoots and makes a free throw", player: "#5", type: "free-throw" },
    ],
  },
  {
    id: "2",
    title: "#5 Fast-Break Masterclass",
    subtitle: "vs Teal Team",
    videoUrl: "/manus-storage/highlight-reel-2_4335b14b.mov",
    posterUrl: "/manus-storage/poster-reel-2_9859f27e.jpg",
    team: "Legacy 11U Girls",
    opponent: "Teal Team",
    duration: "1:45",
    featuredPlayer: "#5",
    statLine: "8 pts | 2 ast | 1 stl",
    aiSummary: "#5 is the engine — leading fast breaks, scoring in transition, and creating for #24 with two assists. The #5-to-#24 connection is lethal: #5 pushes pace and finds #24 cutting for layups. #5 records a steal and finishes multiple coast-to-coast drives.",
    keyPlayers: ["#5", "#24"],
    plays: [
      { time: "0:12", seconds: 12, description: "#5 drives from left wing into the paint, scores right-handed layup", player: "#5", type: "score" },
      { time: "0:22", seconds: 22, description: "#5 receives pass on right wing, takes a dribble, sinks jump shot", player: "#5", type: "score" },
      { time: "0:30", seconds: 30, description: "#5 leads fast break up center, dishes assist to #24 who finishes layup on right side", player: "#5", type: "assist" },
      { time: "0:41", seconds: 41, description: "#5 takes ball coast-to-coast on fast break down left side, scores left-handed layup", player: "#5", type: "score" },
      { time: "0:50", seconds: 50, description: "#5 pushes ball up right side on fast break, scores right-handed layup", player: "#5", type: "score" },
      { time: "0:59", seconds: 59, description: "#24 secures defensive rebound following opponent's missed shot", player: "#24", type: "rebound" },
      { time: "1:04", seconds: 64, description: "#5 leads another fast break down left side, passes to #24 cutting down middle — #24 scores layup", player: "#5", type: "assist" },
      { time: "1:14", seconds: 74, description: "#5 intercepts pass in opponent's paint for the steal, passes out to teammate", player: "#5", type: "steal" },
      { time: "1:20", seconds: 80, description: "#5 drives down right side on fast break, scores right-handed layup", player: "#5", type: "score" },
      { time: "1:30", seconds: 90, description: "#5 dribbles down middle of court on fast break, scores right-handed layup", player: "#5", type: "score" },
      { time: "1:37", seconds: 97, description: "#5 drives down right side on fast break, scores right-handed layup", player: "#5", type: "score" },
    ],
  },
  {
    id: "3",
    title: "#5 Three-Point Shooting & #24 Drives",
    subtitle: "vs New Paltz",
    videoUrl: "/manus-storage/highlight-reel-3_147bea1e.mov",
    posterUrl: "/manus-storage/poster-reel-3_061a0919.jpg",
    team: "Legacy 11U Girls",
    opponent: "New Paltz",
    duration: "1:38",
    featuredPlayer: "#5",
    statLine: "3 threes | 1 putback | #24: 1 stl + layup",
    aiSummary: "#5 showcases elite shooting — hitting three-pointers off offensive rebounds and kick-out passes. She also grabs an offensive rebound and converts a putback. #24 contributes a strong drive through the lane and a steal-to-fast-break score.",
    keyPlayers: ["#5", "#24"],
    plays: [
      { time: "0:05", seconds: 5, description: "#5 brings ball up, teammate misses — another teammate gets offensive rebound, kicks to #5 who drains a three-pointer", player: "#5", type: "score" },
      { time: "0:18", seconds: 18, description: "#5 grabs offensive rebound in the paint and scores on a putback layup", player: "#5", type: "rebound" },
      { time: "0:26", seconds: 26, description: "Teammate misses three, another Legacy player gets offensive rebound, kicks to #5 who sinks another three from the wing", player: "#5", type: "score" },
      { time: "0:34", seconds: 34, description: "#24 drives through the defense down center of the lane, scores a layup", player: "#24", type: "score" },
      { time: "0:49", seconds: 49, description: "Legacy player hits a three-pointer from the wing", type: "score" },
      { time: "0:56", seconds: 56, description: "Legacy player hits a three-pointer from the wing", type: "score" },
      { time: "1:01", seconds: 61, description: "Legacy player hits a three-pointer from the wing", type: "score" },
      { time: "1:13", seconds: 73, description: "#24 steals ball near mid-court, dribbles length of the floor for uncontested fast-break layup", player: "#24", type: "steal" },
      { time: "1:26", seconds: 86, description: "Legacy player hits a three-pointer from the wing", type: "score" },
      { time: "1:33", seconds: 93, description: "Legacy player hits a three-pointer from the wing", type: "score" },
    ],
  },
  {
    id: "4",
    title: "#14 Scoring Reel (ft. #5 & #24 Assists)",
    subtitle: "vs Multiple Opponents",
    videoUrl: "/manus-storage/girls-14-highlights_de1bbacc.mov",
    posterUrl: "/manus-storage/poster-reel-4_9e3d6cf3.jpg",
    team: "Legacy 11U Girls",
    opponent: "Multiple Opponents",
    duration: "2:45",
    featuredPlayer: "#14",
    statLine: "23 plays | 4 threes | 2 FT | 1 stl",
    aiSummary: "A scoring showcase for #14 — fast-break layups, three-pointers from both wings and the top of the key, mid-range jumpers, putbacks, and free throws. #5 feeds #14 at the free-throw line early, and #24 delivers a pass leading to a drive-and-score.",
    keyPlayers: ["#14", "#5", "#24"],
    plays: [
      { time: "0:03", seconds: 3, description: "#14 grabs offensive rebound, scores putback layup", player: "#14", type: "rebound" },
      { time: "0:12", seconds: 12, description: "#5 passes to #14, who hits jump shot from the free-throw line", player: "#14", type: "score" },
      { time: "0:22", seconds: 22, description: "#24 passes to #14, who drives to the basket for a layup", player: "#14", type: "score" },
      { time: "0:30", seconds: 30, description: "#14 drives the length of the court for a fast-break layup", player: "#14", type: "score" },
      { time: "0:35", seconds: 35, description: "#14 shoots and makes a free throw", player: "#14", type: "free-throw" },
      { time: "0:40", seconds: 40, description: "#14 steals ball from opponent, scores fast-break layup", player: "#14", type: "steal" },
      { time: "0:49", seconds: 49, description: "#14 hits a three-pointer from the left wing", player: "#14", type: "score" },
      { time: "0:58", seconds: 58, description: "#14 hits a three-pointer from the top of the key", player: "#14", type: "score" },
      { time: "1:04", seconds: 64, description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "1:10", seconds: 70, description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "1:19", seconds: 79, description: "#14 drives from the left side, scores a layup", player: "#14", type: "score" },
      { time: "1:28", seconds: 88, description: "#14 hits a three-pointer from the top of the key", player: "#14", type: "score" },
      { time: "1:34", seconds: 94, description: "#14 hits a three-pointer from the left wing", player: "#14", type: "score" },
      { time: "1:39", seconds: 99, description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "1:44", seconds: 104, description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "1:49", seconds: 109, description: "#14 hits a jump shot from the left wing", player: "#14", type: "score" },
      { time: "1:57", seconds: 117, description: "#14 hits a jump shot from the top of the key", player: "#14", type: "score" },
      { time: "2:01", seconds: 121, description: "#14 hits a jump shot from the left wing", player: "#14", type: "score" },
      { time: "2:11", seconds: 131, description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "2:16", seconds: 136, description: "#14 shoots and makes a free throw", player: "#14", type: "free-throw" },
      { time: "2:20", seconds: 140, description: "#14 hits a jump shot from the left wing", player: "#14", type: "score" },
      { time: "2:26", seconds: 146, description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "2:36", seconds: 156, description: "#14 hits a jump shot from the left wing", player: "#14", type: "score" },
    ],
  },
];

const typeConfig: Record<string, { color: string; label: string }> = {
  score: { color: "bg-green-500/20 text-green-400 border-green-500/30", label: "PTS" },
  rebound: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", label: "REB" },
  drive: { color: "bg-cobalt/20 text-cobalt-light border-cobalt/30", label: "DRV" },
  assist: { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", label: "AST" },
  shot: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", label: "SHT" },
  defense: { color: "bg-red-500/20 text-red-400 border-red-500/30", label: "DEF" },
  steal: { color: "bg-red-500/20 text-red-400 border-red-500/30", label: "STL" },
  "free-throw": { color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", label: "FT" },
};

// All unique players across all videos
const ALL_PLAYERS = ["#5", "#24", "#14"];

export default function Highlights() {
  const [location] = useLocation();
  const [activeVideo, setActiveVideo] = useState<HighlightVideo>(highlights[0]);
  const [expandedBreakdown, setExpandedBreakdown] = useState(true);
  const [playerFilter, setPlayerFilter] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parse URL params for deep-linking: ?reel=2&t=30
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reelId = params.get("reel");
    const time = params.get("t");
    
    if (reelId) {
      const video = highlights.find(h => h.id === reelId);
      if (video) {
        setActiveVideo(video);
        if (time && videoRef.current) {
          const seconds = parseInt(time);
          if (!isNaN(seconds)) {
            // Wait for video to load then seek
            const handleLoaded = () => {
              videoRef.current!.currentTime = seconds;
              videoRef.current!.play();
              videoRef.current!.removeEventListener("loadedmetadata", handleLoaded);
            };
            videoRef.current.addEventListener("loadedmetadata", handleLoaded);
          }
        }
      }
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  }, []);

  const selectVideo = useCallback((video: HighlightVideo) => {
    setActiveVideo(video);
    setExpandedBreakdown(true);
    setPlayerFilter(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    document.getElementById("film-player")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const sharePlay = useCallback((video: HighlightVideo, play: PlayBreakdown) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?reel=${video.id}&t=${play.seconds}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(`${video.id}-${play.time}`);
      setTimeout(() => setCopiedLink(null), 2000);
    }).catch(() => {
      // Fallback: select text in a temporary input
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopiedLink(`${video.id}-${play.time}`);
      setTimeout(() => setCopiedLink(null), 2000);
    });
  }, []);

  const shareReel = useCallback((video: HighlightVideo) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?reel=${video.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(`reel-${video.id}`);
      setTimeout(() => setCopiedLink(null), 2000);
    }).catch(() => {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopiedLink(`reel-${video.id}`);
      setTimeout(() => setCopiedLink(null), 2000);
    });
  }, []);

  // Filter plays by selected player
  const filteredPlays = useMemo(() => {
    if (!playerFilter) return activeVideo.plays;
    return activeVideo.plays.filter(p => p.player === playerFilter);
  }, [activeVideo, playerFilter]);

  // Available players for current video
  const videoPlayers = useMemo(() => {
    const players = new Set(activeVideo.plays.map(p => p.player).filter(Boolean));
    return ALL_PLAYERS.filter(p => players.has(p));
  }, [activeVideo]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <span className="watermark top-10 right-[-5%]">FILM</span>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cobalt/20 border border-cobalt/40 rounded-full mb-5">
                <Zap className="w-3.5 h-3.5 text-cobalt" />
                <span className="font-display font-700 text-xs uppercase tracking-widest text-cobalt">
                  AI-Analyzed Highlights
                </span>
              </div>
              <h1 className="font-display font-800 text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] text-white mb-3">
                Game <span className="text-cobalt">Film</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg max-w-lg leading-relaxed">
                4 highlight reels. AI play-by-play. Click any timestamp to jump directly to the action.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="block font-display font-800 text-3xl text-cobalt">4</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-display font-700">Reels</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-right">
                <span className="block font-display font-800 text-3xl text-white">57</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-display font-700">Plays</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-right">
                <span className="block font-display font-800 text-3xl text-gold">8:30</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-display font-700">Total</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid — All 4 Videos with Poster Thumbnails */}
      <section className="border-y border-white/5 bg-navy/50">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {highlights.map((video) => (
              <button
                key={video.id}
                onClick={() => selectVideo(video)}
                className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 group ${
                  activeVideo.id === video.id
                    ? "border-cobalt shadow-lg shadow-cobalt/20 scale-[1.02]"
                    : "border-white/5 hover:border-white/20 hover:scale-[1.01]"
                }`}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  {/* Poster thumbnail */}
                  <img
                    src={video.posterUrl}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Active indicator */}
                  {activeVideo.id === video.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cobalt flex items-center justify-center animate-pulse">
                      <Play className="w-3 h-3 text-white ml-0.5" />
                    </div>
                  )}

                  {/* Duration badge */}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/70 rounded text-[9px] font-mono text-white/80">
                    {video.duration}
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-1.5 py-0.5 bg-cobalt/80 rounded text-[9px] font-display font-800 text-white uppercase">
                        {video.featuredPlayer}
                      </span>
                      <span className="text-[9px] text-white/60">{video.plays.length} plays</span>
                    </div>
                    <h4 className="font-display font-700 text-[11px] text-white leading-tight line-clamp-1">
                      {video.title}
                    </h4>
                    <p className="text-[9px] text-white/40 mt-0.5">{video.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Player + Analysis */}
      <section id="film-player" className="py-8 md:py-12 scroll-mt-20">
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Video Player — Takes 3/5 */}
            <div className="xl:col-span-3 space-y-4">
              {/* Player */}
              <div className="relative rounded-xl overflow-hidden bg-black border border-white/5 shadow-2xl">
                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.posterUrl}
                  className="w-full aspect-video"
                  controls
                  playsInline
                />
              </div>

              {/* Video Meta Bar */}
              <div className="flex flex-wrap items-center gap-3 px-1">
                <h2 className="font-display font-800 text-lg md:text-xl uppercase text-white flex-1 min-w-0">
                  {activeVideo.title}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {activeVideo.opponent}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activeVideo.duration}
                    </span>
                  </div>
                  {/* Share Reel Button */}
                  <button
                    onClick={() => shareReel(activeVideo)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cobalt/10 border border-cobalt/20 rounded-lg text-cobalt text-xs font-display font-700 uppercase tracking-wider hover:bg-cobalt/20 transition-colors"
                    title="Copy link to this reel"
                  >
                    {copiedLink === `reel-${activeVideo.id}` ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3" />
                        Share
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* AI Summary Card */}
              <div className="bg-navy-light/80 border border-cobalt/15 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-cobalt/15 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-cobalt" />
                  </div>
                  <span className="font-display font-700 text-xs uppercase tracking-wider text-cobalt">
                    AI Analysis
                  </span>
                  <div className="ml-auto flex gap-1.5">
                    {activeVideo.keyPlayers.map(p => (
                      <span key={p} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/80 text-[10px] font-mono font-bold">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  {activeVideo.aiSummary}
                </p>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <span className="font-mono text-xs text-cobalt-light">{activeVideo.statLine}</span>
                </div>
              </div>
            </div>

            {/* Play-by-Play — Takes 2/5 */}
            <div className="xl:col-span-2">
              <div className="bg-navy-light border border-white/5 rounded-xl overflow-hidden sticky top-20">
                {/* Header */}
                <div className="flex items-center gap-2 p-4 border-b border-white/5">
                  <Film className="w-4 h-4 text-cobalt" />
                  <span className="font-display font-800 text-sm uppercase text-white">
                    Play-by-Play
                  </span>
                  <span className="text-[10px] text-white/40 font-mono ml-1">
                    {filteredPlays.length}/{activeVideo.plays.length}
                  </span>
                  <button
                    onClick={() => setExpandedBreakdown(!expandedBreakdown)}
                    className="ml-auto p-1 hover:bg-white/5 rounded transition-colors"
                  >
                    {expandedBreakdown ? (
                      <ChevronUp className="w-4 h-4 text-white/30" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/30" />
                    )}
                  </button>
                </div>

                {/* Player Filter Bar */}
                {expandedBreakdown && (
                  <div className="px-3 py-2.5 border-b border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-2">
                      <Filter className="w-3 h-3 text-white/30" />
                      <span className="text-[10px] text-white/40 uppercase tracking-wider font-display font-700">
                        Filter:
                      </span>
                      <button
                        onClick={() => setPlayerFilter(null)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-display font-700 uppercase tracking-wider transition-all ${
                          playerFilter === null
                            ? "bg-cobalt text-white"
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        All
                      </button>
                      {videoPlayers.map(player => (
                        <button
                          key={player}
                          onClick={() => setPlayerFilter(playerFilter === player ? null : player)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-display font-700 uppercase tracking-wider transition-all ${
                            playerFilter === player
                              ? "bg-cobalt text-white"
                              : "bg-white/5 text-white/50 hover:bg-white/10"
                          }`}
                        >
                          {player}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Play List */}
                {expandedBreakdown && (
                  <div className="max-h-[55vh] overflow-y-auto scrollbar-hide">
                    {filteredPlays.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-white/30 text-xs">No plays found for this filter.</p>
                      </div>
                    ) : (
                      <div className="p-2 space-y-1">
                        {filteredPlays.map((play, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-cobalt/5 border border-transparent hover:border-cobalt/15 transition-all group/play"
                          >
                            {/* Timestamp — clickable to seek */}
                            <button
                              onClick={() => seekTo(play.seconds)}
                              className="font-mono text-[11px] text-cobalt bg-cobalt/10 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 hover:bg-cobalt/25 transition-colors cursor-pointer"
                              title={`Jump to ${play.time}`}
                            >
                              {play.time}
                            </button>

                            {/* Description */}
                            <div className="flex-1 min-w-0">
                              <p className="text-white/75 text-xs leading-relaxed group-hover/play:text-white/90 transition-colors">
                                {play.description}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {/* Type Badge */}
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-display font-800 uppercase tracking-wider border ${typeConfig[play.type]?.color || ""}`}>
                                {typeConfig[play.type]?.label || play.type}
                              </span>
                              {/* Share button */}
                              <button
                                onClick={() => sharePlay(activeVideo, play)}
                                className="p-1 rounded hover:bg-white/10 transition-colors opacity-60 md:opacity-0 md:group-hover/play:opacity-100"
                                title="Copy link to this play"
                              >
                                {copiedLink === `${activeVideo.id}-${play.time}` ? (
                                  <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Link2 className="w-3 h-3 text-white/30" />
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="p-3 border-t border-white/5 bg-white/[0.01]">
                  <p className="text-[10px] text-white/30 text-center font-display tracking-wider uppercase">
                    Click timestamp to seek &middot; Hover play to share link
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
