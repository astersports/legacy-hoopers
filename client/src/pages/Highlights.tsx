import { useState, useRef } from "react";
import { Play, Pause, Film, Zap, Clock, Users, ChevronRight } from "lucide-react";

interface PlayBreakdown {
  time: string;
  description: string;
  player?: string;
  type: "score" | "rebound" | "drive" | "assist" | "shot" | "defense";
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
    title: "11U Girls vs Castle — Offensive Showcase",
    description: "Player #24 dominates with drives and mid-range jumpers. Player #14 orchestrates the offense with precision passing and scoring.",
    videoUrl: "/manus-storage/highlight-reel-1_a4969791.mov",
    team: "Legacy 11U Girls",
    opponent: "Castle",
    duration: "2:22",
    aiSummary: "Legacy's 11U Girls showcase dominant offensive play against Castle. Player #24 is the focal point with aggressive drives and mid-range shooting. Player #14 runs the point, setting up plays and scoring on her own. The team excels in transition off defensive rebounds.",
    keyPlayers: ["#24", "#14"],
    tags: ["Scoring", "Transition", "Rebounding"],
    plays: [
      { time: "0:05", description: "#24 receives pass, drives aggressively for the layup", player: "#24", type: "score" },
      { time: "0:12", description: "#14 brings ball up, sets up the play, finds #24 cutting", player: "#14", type: "assist" },
      { time: "0:20", description: "#24 hits mid-range jumper from the elbow", player: "#24", type: "score" },
      { time: "0:35", description: "Defensive rebound secured, quick outlet pass to #14", player: "#14", type: "rebound" },
      { time: "0:48", description: "#24 drives baseline, finishes through contact", player: "#24", type: "score" },
      { time: "1:02", description: "#14 drives from the top, scores contested layup", player: "#14", type: "score" },
      { time: "1:15", description: "#24 catches in the post, turns and scores", player: "#24", type: "score" },
      { time: "1:30", description: "Fast break — #14 pushes tempo, dishes to #24 for the finish", player: "#24", type: "score" },
      { time: "1:45", description: "#24 pulls up from mid-range, nothing but net", player: "#24", type: "score" },
      { time: "2:00", description: "#14 weaves through defense, scores on the drive", player: "#14", type: "score" },
    ],
  },
  {
    id: "2",
    title: "11U Girls — Three-Point Barrage & Post Dominance",
    description: "Player #14 hits from deep while #15 dominates the paint. Player #1 adds drives to the basket in a complete offensive performance.",
    videoUrl: "/manus-storage/highlight-reel-2_4335b14b.mov",
    team: "Legacy 11U Girls",
    opponent: "Teal Team",
    duration: "1:45",
    aiSummary: "A dominant offensive display featuring three key contributors. #14 opens with a three-pointer and adds multiple mid-range shots. #15 controls the paint with post moves and finishes through contact. #1 provides slashing drives to complete the balanced attack.",
    keyPlayers: ["#14", "#15", "#1"],
    tags: ["Three-Pointers", "Post Play", "Driving"],
    plays: [
      { time: "0:05", description: "Teal misses free throw, #15 secures the rebound", player: "#15", type: "rebound" },
      { time: "0:10", description: "#14 sinks a three-pointer from the wing", player: "#14", type: "score" },
      { time: "0:17", description: "#15 receives pass in the paint, strong move for the layup", player: "#15", type: "score" },
      { time: "0:25", description: "#14 hits a mid-range jump shot after ball movement", player: "#14", type: "score" },
      { time: "0:35", description: "#15 catches near the basket, scores while drawing the foul", player: "#15", type: "score" },
      { time: "0:45", description: "#15 drives hard from the wing, finishes with a layup", player: "#15", type: "score" },
      { time: "0:55", description: "#1 drives through the defense, scores a layup", player: "#1", type: "score" },
      { time: "1:02", description: "#14 hits another jumper from just inside the arc", player: "#14", type: "score" },
      { time: "1:10", description: "#14 drives past defender, scores contested layup", player: "#14", type: "score" },
      { time: "1:20", description: "#15 scores off inbound pass under the basket", player: "#15", type: "score" },
      { time: "1:30", description: "#1 drives from the top of the key for the layup", player: "#1", type: "score" },
      { time: "1:40", description: "#1 drives baseline, finishes with another layup", player: "#1", type: "score" },
    ],
  },
  {
    id: "3",
    title: "11U Girls vs New Paltz — Defensive Battle",
    description: "A gritty defensive battle where Legacy generates numerous scoring opportunities. Both teams lock down on defense in this physical matchup.",
    videoUrl: "/manus-storage/highlight-reel-3_147bea1e.mov",
    team: "Legacy 11U Girls",
    opponent: "New Paltz",
    duration: "1:30",
    aiSummary: "An intense defensive battle between Legacy and New Paltz. Legacy dominates possession and generates multiple scoring opportunities through aggressive drives and ball movement. New Paltz responds with strong defensive rebounding. A physical, competitive game showcasing both teams' defensive intensity.",
    keyPlayers: ["Team Effort"],
    tags: ["Defense", "Rebounding", "Intensity"],
    plays: [
      { time: "0:05", description: "Legacy drives to the basket, contested by New Paltz defense", type: "drive" },
      { time: "0:15", description: "New Paltz secures defensive rebound, clears the ball", type: "rebound" },
      { time: "0:25", description: "Legacy generates open look off ball movement", type: "shot" },
      { time: "0:35", description: "Strong defensive rotation by Legacy forces turnover", type: "defense" },
      { time: "0:45", description: "Legacy drives baseline, draws multiple defenders", type: "drive" },
      { time: "0:55", description: "New Paltz attempts jump shot, Legacy contests", type: "defense" },
      { time: "1:05", description: "Legacy pushes in transition off the defensive stop", type: "drive" },
      { time: "1:15", description: "Physical battle on the boards, both teams competing", type: "rebound" },
      { time: "1:25", description: "Legacy generates another scoring opportunity off the drive", type: "drive" },
    ],
  },
  {
    id: "4",
    title: "11U Girls — #14 Scoring Machine",
    description: "Player #14 dominates with fast-break layups, putbacks, and free throws. #24 facilitates with elite court vision and transition passing.",
    videoUrl: "/manus-storage/girls-14-highlights_de1bbacc.mov",
    team: "Legacy 11U Girls",
    opponent: "Multiple Opponents",
    duration: "3:15",
    aiSummary: "A highlight reel centered on #14 as the primary scorer. She excels in transition, consistently running the floor for fast-break layups off outlet passes from #24. Notable hustle play at 1:15 where she misses a layup, grabs her own offensive rebound, and converts the putback. #24 acts as the primary facilitator pushing pace, while #5 provides secondary ball-handling and assists.",
    keyPlayers: ["#14", "#24", "#5", "#15"],
    tags: ["Scoring", "Transition", "Rebounding", "Driving"],
    plays: [
      { time: "0:05", description: "#14 receives outlet pass from #24, finishes fast-break layup", player: "#14", type: "score" },
      { time: "0:15", description: "#24 pushes tempo in transition, finds #14 sprinting ahead", player: "#24", type: "assist" },
      { time: "0:25", description: "#14 drives through traffic, scores contested layup", player: "#14", type: "score" },
      { time: "0:40", description: "#14 converts free throws confidently", player: "#14", type: "score" },
      { time: "0:55", description: "#5 initiates offense, feeds #14 cutting to the basket", player: "#5", type: "assist" },
      { time: "1:05", description: "#14 scores on fast break off defensive stop", player: "#14", type: "score" },
      { time: "1:15", description: "#14 misses layup, grabs own rebound, scores putback", player: "#14", type: "rebound" },
      { time: "1:30", description: "#24 delivers full-court outlet pass to #14 for the finish", player: "#14", type: "score" },
      { time: "1:45", description: "#14 drives baseline, finishes through contact", player: "#14", type: "score" },
      { time: "2:00", description: "#14 assists #15 for a score inside", player: "#14", type: "assist" },
      { time: "2:15", description: "#24 finds #14 on another fast break for the layup", player: "#14", type: "score" },
      { time: "2:30", description: "#14 hits free throws in second uniform set", player: "#14", type: "score" },
      { time: "2:45", description: "#14 assists #24 for a basket off the drive", player: "#14", type: "assist" },
      { time: "3:00", description: "#14 scores final fast-break layup to close the reel", player: "#14", type: "score" },
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
};

const typeIcons: Record<string, string> = {
  score: "🏀",
  rebound: "💪",
  drive: "⚡",
  assist: "🎯",
  shot: "🎯",
  defense: "🛡️",
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
              Watch highlight reels with AI-generated play-by-play breakdowns.
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
                  <div className="flex gap-2">
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
                  Every highlight reel is analyzed by AI to identify key plays, player contributions, and game patterns.
                </p>
                <ul className="space-y-1.5">
                  {["Play-by-play timestamps", "Player identification", "Shot type classification", "Game flow analysis"].map(feature => (
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
