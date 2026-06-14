import { useState, useRef } from "react";
import { Play, Pause, Film, Zap, Clock, Users, ChevronRight } from "lucide-react";

interface PlayBreakdown {
  time: string;
  description: string;
  player?: string;
  type: "score" | "rebound" | "drive" | "assist" | "shot" | "defense" | "steal" | "free-throw";
}

interface HighlightVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  team: string;
  opponent: string;
  duration: string;
  plays: PlayBreakdown[];
  aiSummary: string;
  keyPlayers: string[];
  tags: string[];
}

const highlights: HighlightVideo[] = [
  {
    id: "1",
    title: "#5 & #24 — Scoring Clinic",
    description: "#5 dominates with three-pointers, steals, and free throws while #24 adds drives and pull-up jumpers in a complete offensive showcase.",
    videoUrl: "/manus-storage/highlight-reel-1_a4969791.mov",
    team: "Legacy 11U Girls",
    opponent: "Castle",
    duration: "2:22",
    aiSummary: "#5 is the star of this reel with 9 plays — three-pointers from the wing, aggressive on-ball defense leading to a steal-and-score, multiple free throws, and key defensive rebounds. #24 contributes a pull-up jumper and a baseline drive layup. Legacy's dark blue jerseys with light blue trim are on full display.",
    keyPlayers: ["#5", "#24"],
    tags: ["Scoring", "Three-Pointers", "Defense"],
    plays: [
      { time: "0:12", description: "#5 receives pass on right wing, sets feet, sinks a three-pointer", player: "#5", type: "score" },
      { time: "0:22", description: "#24 catches pass on right wing, takes a dribble baseline, hits pull-up jumper", player: "#24", type: "score" },
      { time: "0:28", description: "#24 brings ball up court, drives past defenders down right side, finishes layup", player: "#24", type: "score" },
      { time: "0:35", description: "#5 secures defensive rebound after opponent's miss, pushes ball up court", player: "#5", type: "rebound" },
      { time: "0:41", description: "#5 dribbles up left side, drives aggressively to basket, scores layup", player: "#5", type: "score" },
      { time: "0:49", description: "#5 shoots and makes a free throw", player: "#5", type: "free-throw" },
      { time: "0:58", description: "#5 shoots and makes another free throw", player: "#5", type: "free-throw" },
      { time: "1:04", description: "#5 plays aggressive on-ball defense, pokes ball loose for steal, takes it coast-to-coast for fast-break layup", player: "#5", type: "steal" },
      { time: "1:18", description: "#5 shoots and makes a three-pointer from the right wing", player: "#5", type: "score" },
      { time: "1:25", description: "#5 receives ball, dribbles left, hits jump shot from just inside the arc", player: "#5", type: "score" },
      { time: "1:44", description: "#5 grabs another defensive rebound in the paint", player: "#5", type: "rebound" },
      { time: "1:56", description: "#5 shoots and makes a free throw", player: "#5", type: "free-throw" },
      { time: "2:13", description: "#5 shoots and makes a free throw", player: "#5", type: "free-throw" },
    ],
  },
  {
    id: "2",
    title: "#5 Fast-Break Masterclass",
    description: "#5 dominates in transition with coast-to-coast layups, steals, and elite passing to #24. A two-player connection on full display.",
    videoUrl: "/manus-storage/highlight-reel-2_4335b14b.mov",
    team: "Legacy 11U Girls",
    opponent: "Teal Team",
    duration: "1:45",
    aiSummary: "#5 is the engine of this highlight reel — leading fast breaks, scoring in transition, and creating for #24 with two assists. The #5-to-#24 connection is lethal: #5 pushes pace and finds #24 cutting for layups. #24 also contributes a key defensive rebound. #5 records a steal in the opponent's paint and finishes multiple coast-to-coast drives.",
    keyPlayers: ["#5", "#24"],
    tags: ["Scoring", "Transition", "Driving"],
    plays: [
      { time: "0:12", description: "#5 drives from left wing into the paint, scores right-handed layup", player: "#5", type: "score" },
      { time: "0:22", description: "#5 receives pass on right wing, takes a dribble, sinks jump shot", player: "#5", type: "score" },
      { time: "0:30", description: "#5 leads fast break up center, dishes assist to #24 who finishes layup on right side", player: "#5", type: "assist" },
      { time: "0:41", description: "#5 takes ball coast-to-coast on fast break down left side, scores left-handed layup", player: "#5", type: "score" },
      { time: "0:50", description: "#5 pushes ball up right side on fast break, scores right-handed layup", player: "#5", type: "score" },
      { time: "0:59", description: "#24 secures defensive rebound following opponent's missed shot", player: "#24", type: "rebound" },
      { time: "1:04", description: "#5 leads another fast break down left side, passes to #24 cutting down middle — #24 scores layup", player: "#5", type: "assist" },
      { time: "1:14", description: "#5 intercepts pass in opponent's paint for the steal, passes out to teammate", player: "#5", type: "steal" },
      { time: "1:20", description: "#5 drives down right side on fast break, scores right-handed layup", player: "#5", type: "score" },
      { time: "1:30", description: "#5 dribbles down middle of court on fast break, scores right-handed layup", player: "#5", type: "score" },
      { time: "1:37", description: "#5 drives down right side on fast break, scores right-handed layup", player: "#5", type: "score" },
    ],
  },
  {
    id: "3",
    title: "#5 Three-Point Shooting & #24 Drives",
    description: "#5 hits multiple three-pointers including off offensive rebounds. #24 drives through traffic and converts a steal into a fast-break layup.",
    videoUrl: "/manus-storage/highlight-reel-3_147bea1e.mov",
    team: "Legacy 11U Girls",
    opponent: "New Paltz",
    duration: "1:38",
    aiSummary: "#5 showcases elite shooting — hitting three-pointers off offensive rebounds and kick-out passes. She also grabs an offensive rebound and converts a putback. #24 contributes a strong drive through the lane for a layup and a steal-to-fast-break score. Multiple additional three-pointers from Legacy teammates round out a dominant shooting performance.",
    keyPlayers: ["#5", "#24"],
    tags: ["Three-Pointers", "Scoring", "Rebounding"],
    plays: [
      { time: "0:05", description: "#5 brings ball up, teammate misses — another teammate gets offensive rebound, kicks to #5 who drains a three-pointer", player: "#5", type: "score" },
      { time: "0:18", description: "#5 grabs offensive rebound in the paint and scores on a putback layup", player: "#5", type: "rebound" },
      { time: "0:26", description: "Teammate misses three, another Legacy player gets offensive rebound, kicks to #5 who sinks another three from the wing", player: "#5", type: "score" },
      { time: "0:34", description: "#24 drives through the defense down center of the lane, scores a layup", player: "#24", type: "score" },
      { time: "0:49", description: "Legacy player hits a three-pointer from the wing", type: "score" },
      { time: "0:56", description: "Legacy player hits a three-pointer from the wing", type: "score" },
      { time: "1:01", description: "Legacy player hits a three-pointer from the wing", type: "score" },
      { time: "1:13", description: "#24 steals ball near mid-court, dribbles length of the floor for uncontested fast-break layup", player: "#24", type: "steal" },
      { time: "1:26", description: "Legacy player hits a three-pointer from the wing", type: "score" },
      { time: "1:33", description: "Legacy player hits a three-pointer from the wing", type: "score" },
    ],
  },
  {
    id: "4",
    title: "#14 Scoring Reel (ft. #5 & #24 Assists)",
    description: "#14 dominates with 23 plays — fast-break layups, three-pointers, putbacks, and free throws. #5 and #24 facilitate with passes and court vision.",
    videoUrl: "/manus-storage/girls-14-highlights_de1bbacc.mov",
    team: "Legacy 11U Girls",
    opponent: "Multiple Opponents",
    duration: "2:45",
    aiSummary: "A scoring showcase for #14 who converts from everywhere — fast-break layups, three-pointers from both wings and the top of the key, mid-range jumpers, putbacks off offensive rebounds, and free throws. #5 and #24 appear as facilitators: #5 feeds #14 at the free-throw line early, and #24 delivers a pass leading to a drive-and-score. #14's ability to steal and score in transition is also highlighted.",
    keyPlayers: ["#14", "#5", "#24"],
    tags: ["Scoring", "Three-Pointers", "Transition", "Driving"],
    plays: [
      { time: "0:03", description: "#14 grabs offensive rebound, scores putback layup", player: "#14", type: "rebound" },
      { time: "0:12", description: "#5 passes to #14, who hits jump shot from the free-throw line", player: "#14", type: "score" },
      { time: "0:22", description: "#24 passes to #14, who drives to the basket for a layup", player: "#14", type: "score" },
      { time: "0:30", description: "#14 drives the length of the court for a fast-break layup", player: "#14", type: "score" },
      { time: "0:35", description: "#14 shoots and makes a free throw", player: "#14", type: "free-throw" },
      { time: "0:40", description: "#14 steals ball from opponent, scores fast-break layup", player: "#14", type: "steal" },
      { time: "0:49", description: "#14 hits a three-pointer from the left wing", player: "#14", type: "score" },
      { time: "0:58", description: "#14 hits a three-pointer from the top of the key", player: "#14", type: "score" },
      { time: "1:04", description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "1:10", description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "1:19", description: "#14 drives from the left side, scores a layup", player: "#14", type: "score" },
      { time: "1:28", description: "#14 hits a three-pointer from the top of the key", player: "#14", type: "score" },
      { time: "1:34", description: "#14 hits a three-pointer from the left wing", player: "#14", type: "score" },
      { time: "1:39", description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "1:44", description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "1:49", description: "#14 hits a jump shot from the left wing", player: "#14", type: "score" },
      { time: "1:57", description: "#14 hits a jump shot from the top of the key", player: "#14", type: "score" },
      { time: "2:01", description: "#14 hits a jump shot from the left wing", player: "#14", type: "score" },
      { time: "2:11", description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "2:16", description: "#14 shoots and makes a free throw", player: "#14", type: "free-throw" },
      { time: "2:20", description: "#14 hits a jump shot from the left wing", player: "#14", type: "score" },
      { time: "2:26", description: "#14 hits a jump shot from the right wing", player: "#14", type: "score" },
      { time: "2:36", description: "#14 hits a jump shot from the left wing", player: "#14", type: "score" },
    ],
  },
];

const typeColors: Record<string, string> = {
  score: "bg-green-500/20 text-green-400 border-green-500/30",
  rebound: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  drive: "bg-cobalt/20 text-cobalt-light border-cobalt/30",
  assist: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  shot: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  defense: "bg-red-500/20 text-red-400 border-red-500/30",
  steal: "bg-red-500/20 text-red-400 border-red-500/30",
  "free-throw": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const typeIcons: Record<string, string> = {
  score: "\u{1F3C0}",
  rebound: "\u{1F4AA}",
  drive: "\u{26A1}",
  assist: "\u{1F3AF}",
  shot: "\u{1F3AF}",
  defense: "\u{1F6E1}\u{FE0F}",
  steal: "\u{1F6E1}\u{FE0F}",
  "free-throw": "\u{2705}",
};

export default function Highlights() {
  const [selectedVideo, setSelectedVideo] = useState<HighlightVideo>(highlights[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const filteredHighlights = activeFilter === "all"
    ? highlights
    : highlights.filter(h => h.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase()));

  const allTags = Array.from(new Set(highlights.flatMap(h => h.tags)));

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <span className="watermark top-10 right-[-5%]">FILM</span>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cobalt/20 border border-cobalt/40 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5 text-cobalt" />
              <span className="font-display font-700 text-xs uppercase tracking-widest text-cobalt">
                AI-Powered Analysis
              </span>
            </div>
            <h1 className="font-display font-800 text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] text-white mb-4">
              Game <span className="text-cobalt">Film</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              Watch highlight reels with AI-generated play-by-play breakdowns focused on #5 and #24.
              Every drive, every shot, every defensive stop — analyzed and timestamped.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="border-b border-white/5 sticky top-16 z-30 bg-arena/95 backdrop-blur-md">
        <div className="container py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full font-display font-700 text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                activeFilter === "all"
                  ? "bg-cobalt text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              All Films
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-1.5 rounded-full font-display font-700 text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeFilter === tag
                    ? "bg-cobalt text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player + AI Analysis */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <div className="relative rounded-xl overflow-hidden bg-navy border border-white/5 group">
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  className="w-full aspect-video object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  controls
                  playsInline
                />
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity group-hover:bg-black/20"
                    onClick={togglePlay}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cobalt/90 flex items-center justify-center shadow-2xl shadow-cobalt/40 transition-transform hover:scale-110">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="bg-navy-light border border-white/5 rounded-xl p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-display font-800 text-xl md:text-2xl uppercase text-white mb-2">
                      {selectedVideo.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {selectedVideo.team} vs {selectedVideo.opponent}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {selectedVideo.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-cobalt/10 border border-cobalt/20 rounded-full text-cobalt text-[10px] font-display font-700 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Summary */}
                <div className="bg-arena/50 border border-cobalt/10 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-cobalt" />
                    <span className="font-display font-700 text-xs uppercase tracking-wider text-cobalt">
                      AI Analysis
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {selectedVideo.aiSummary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs text-white/40">Key Players:</span>
                    {selectedVideo.keyPlayers.map(p => (
                      <span key={p} className="px-2 py-0.5 bg-white/5 rounded text-white/80 text-xs font-mono">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Play-by-Play Breakdown */}
              <div className="bg-navy-light border border-white/5 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Film className="w-5 h-5 text-cobalt" />
                  <h3 className="font-display font-800 text-lg uppercase text-white">
                    Play-by-Play Breakdown
                  </h3>
                  <span className="ml-auto text-xs text-white/40 font-mono">
                    {selectedVideo.plays.length} plays
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedVideo.plays.map((play, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group/play"
                    >
                      <span className="font-mono text-xs text-cobalt-light bg-cobalt/10 px-2 py-1 rounded flex-shrink-0 mt-0.5">
                        {play.time}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-sm leading-relaxed">
                          {play.description}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-display font-700 uppercase tracking-wider border flex-shrink-0 ${typeColors[play.type]}`}>
                        {typeIcons[play.type]} {play.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video List Sidebar */}
            <div className="space-y-3">
              <h3 className="font-display font-800 text-sm uppercase tracking-wider text-white/50 mb-4">
                All Highlights ({filteredHighlights.length})
              </h3>
              {filteredHighlights.map(video => (
                <button
                  key={video.id}
                  onClick={() => {
                    setSelectedVideo(video);
                    setIsPlaying(false);
                    if (videoRef.current) {
                      videoRef.current.pause();
                      videoRef.current.currentTime = 0;
                    }
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedVideo.id === video.id
                      ? "bg-cobalt/10 border-cobalt/30"
                      : "bg-navy-light border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cobalt/10 flex items-center justify-center flex-shrink-0">
                      <Film className="w-5 h-5 text-cobalt" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-700 text-sm text-white truncate">
                        {video.title}
                      </h4>
                      <p className="text-white/40 text-xs mt-1 line-clamp-2">
                        {video.team} vs {video.opponent}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-white/30 font-mono">{video.duration}</span>
                        <span className="text-[10px] text-cobalt">{video.plays.length} plays analyzed</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      selectedVideo.id === video.id ? "text-cobalt" : "text-white/20"
                    }`} />
                  </div>
                </button>
              ))}

              {/* AI Features Card */}
              <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-cobalt/10 to-cobalt/5 border border-cobalt/20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-cobalt" />
                  <span className="font-display font-700 text-xs uppercase tracking-wider text-cobalt">
                    AI-Powered
                  </span>
                </div>
                <p className="text-white/60 text-xs leading-relaxed mb-3">
                  Every highlight reel is analyzed by AI to identify key plays by #5, #24, and #14 — with timestamps and play classification.
                </p>
                <ul className="space-y-1.5">
                  {["Play-by-play timestamps", "Player #5 & #24 focus", "Shot type classification", "Steal & rebound tracking"].map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-white/50">
                      <div className="w-1 h-1 rounded-full bg-cobalt" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
