/*
 * DESIGN: Court Noir — Gym Locations
 * Dark canvas, location cards with map, cobalt accents
 */
import { MapPin, Clock, Users, Navigation } from "lucide-react";

const locations = [
  {
    name: "Westchester Community Center",
    address: "3 S. Broadway, White Plains, NY 10601",
    teams: ["10U Black", "11U Girls"],
    schedule: "Tuesdays & Thursdays, 6:00–7:30 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Westchester+Community+Center+White+Plains+NY",
    features: ["Full-size court", "Scoreboard", "Bleacher seating"],
  },
  {
    name: "New Rochelle YMCA",
    address: "50 Weyman Ave, New Rochelle, NY 10805",
    teams: ["9U", "8U"],
    schedule: "Mondays & Wednesdays, 5:30–7:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=YMCA+New+Rochelle+NY",
    features: ["Full-size court", "Practice gym", "Meeting room"],
  },
  {
    name: "Ardsley Middle School",
    address: "500 Farm Rd, Ardsley, NY 10502",
    teams: ["10U Blue"],
    schedule: "Tuesdays & Thursdays, 5:00–6:30 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ardsley+Middle+School+NY",
    features: ["Full-size court", "Film room access"],
  },
];

export default function Locations() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-arena to-arena" />
        <span className="watermark top-1/2 -translate-y-1/2 right-[-3%] opacity-[0.04]">COURTS</span>
        <div className="container relative z-10">
          <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-2 block">
            Training Facilities
          </span>
          <h1 className="font-display font-800 text-5xl md:text-7xl uppercase text-white leading-[0.9]">
            Gym<br /><span className="text-cobalt">Locations</span>
          </h1>
          <p className="text-white/60 text-base mt-4 max-w-lg">
            Three home courts across Westchester County. Each facility selected for quality, accessibility, and competitive environment.
          </p>
        </div>
      </section>

      {/* Stat Bar */}
      <div className="bg-navy-light border-y border-cobalt/15">
        <div className="container">
          <div className="grid grid-cols-3">
            {[
              { value: "3", label: "Facilities" },
              { value: "5", label: "Teams" },
              { value: "6", label: "Sessions/Week" },
            ].map((stat, i) => (
              <div key={i} className="text-center py-5 border-r border-white/5 last:border-r-0">
                <span className="block font-display font-800 text-3xl text-white stat-glow">{stat.value}</span>
                <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-cobalt-light mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Cards */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="space-y-6">
            {locations.map((loc, i) => (
              <div key={i} className="bg-navy-light border border-white/5 border-l-4 border-l-cobalt rounded-2xl p-6 md:p-8 card-hover">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-cobalt/10 rounded-lg text-cobalt flex-shrink-0">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-display font-800 text-xl md:text-2xl uppercase text-white">
                          {loc.name}
                        </h2>
                        <p className="text-white/50 text-sm mt-1">{loc.address}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-cobalt" />
                        <span className="text-white/70 text-sm">{loc.schedule}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gold" />
                        <span className="text-white/70 text-sm">{loc.teams.join(" · ")}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {loc.features.map((f, j) => (
                        <span key={j} className="px-3 py-1 bg-white/[0.05] border border-white/10 rounded-full text-white/60 text-xs font-600">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Map Link */}
                  <div className="flex items-center justify-center lg:justify-end">
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-cobalt/10 border border-cobalt/30 text-cobalt font-display font-700 text-sm uppercase tracking-wider rounded-lg hover:bg-cobalt/20 transition-all duration-200"
                    >
                      <Navigation className="w-4 h-4" /> Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-10 bg-white/[0.03] border border-cobalt/20 rounded-xl p-6 text-center">
            <p className="text-cobalt text-sm font-600">
              Practice schedules may shift seasonally. Always check the Aster Sports app for the most up-to-date times and locations.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-20 md:py-28 bg-navy border-y border-cobalt/10">
        <div className="container">
          <div className="text-center mb-12">
            <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-3 block">Coverage</span>
            <h2 className="font-display font-800 text-4xl md:text-5xl uppercase text-white">
              Serving <span className="text-cobalt">Westchester</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {["White Plains", "New Rochelle", "Ardsley", "Scarsdale", "Yonkers", "Eastchester", "Bronxville", "Dobbs Ferry"].map((town, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 rounded-lg p-3 text-center">
                <span className="text-white/70 text-sm font-600">{town}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
