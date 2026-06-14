/*
 * DESIGN: Court Noir — Gym Locations
 * Accurate practice sites from HTML source: St. Patrick's, Rippowam Cisqua, Westchester CC
 */
import { MapPin, Clock, Car, ExternalLink } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663756289268/nRxkftmdkigy3rgqBRonRk/hero-academy-DG7aSQqKVJZyWVBvxCVBbB.webp";

const practiceSites = [
  {
    name: "St. Patrick's",
    address: "29 Cox Ave, Armonk, NY",
    schedule: "Mondays · 7:35 – 8:35 PM · Skills Lab",
    access: "Enter St. Francis Hall. Arrive no earlier than 5 min before session.",
    color: "#4a8fd4",
    googleMap: "https://maps.google.com/maps?q=29+Cox+Ave,+Armonk,+NY",
    appleMap: "https://maps.apple.com/?daddr=29+Cox+Ave,+Armonk,+NY",
    waze: "https://www.waze.com/ul?ll=41.1256088,-73.7154212&navigate=yes",
  },
  {
    name: "Rippowam Cisqua",
    address: "439 Cantitoe St, Bedford, NY",
    schedule: "Tuesdays · 5:30 – 8:30 PM",
    access: "Enter via Clinton Road gate only. Arrive no earlier than 5 min before session.",
    color: "#a78bfa",
    googleMap: "https://maps.app.goo.gl/D7a98vDcd1devRy39",
    appleMap: "https://maps.apple.com/?daddr=439+Cantitoe+St,+Bedford,+NY",
    waze: "https://waze.com/ul/hdr7d7zkrp",
  },
  {
    name: "Westchester CC (PEB)",
    address: "75 Grasslands Rd, Valhalla, NY",
    schedule: "Wednesdays · 5:00 – 8:00 PM",
    access: "Navigate to Lots 8, 9 & 10 (adjacent to Viking Gym). Arrive no earlier than 5 min before session.",
    color: "#f59e0b",
    googleMap: "https://maps.app.goo.gl/VgNCv8PKLPZjw5mW7",
    appleMap: "https://maps.apple.com/?daddr=75+Grasslands+Rd,+Valhalla,+NY",
    waze: "https://waze.com/ul/hdr798gwpd",
  },
];

const awayVenues = [
  { name: "6th Boro Hoops", address: "1 Tompkins Ave, Ossining, NY" },
  { name: "Resurrection (New)", address: "340 Underhill Ave, Yorktown Heights, NY" },
  { name: "St. Anthony", address: "14 Nepperhan Ave, Yonkers, NY" },
  { name: "OLPH Pelham", address: "535 Fifth Ave, Pelham, NY" },
  { name: "Holy Family New Rochelle", address: "109 Clove Rd, New Rochelle, NY" },
  { name: "St. Joseph Bronxville", address: "15 Cedar St, Bronxville, NY" },
  { name: "St. Barnabas", address: "409 E 241st St, Bronx, NY" },
  { name: "St. Matthews", address: "616 Warburton Ave, Hastings-on-Hudson, NY" },
  { name: "Riverdale Wolves", address: "660 W 236th St, Bronx, NY" },
];

export default function Locations() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-arena/60 to-arena" />
        <span className="watermark top-1/2 -translate-y-1/2 right-[-3%] opacity-[0.04]">COURTS</span>
        <div className="container relative z-10">
          <span className="font-display font-700 text-xs uppercase tracking-[0.2em] text-cobalt mb-2 block">
            Practice & Game Venues
          </span>
          <h1 className="font-display font-800 text-5xl md:text-7xl uppercase text-white leading-[0.9]">
            Gym <span className="text-cobalt">Locations</span>
          </h1>
          <p className="text-white/60 text-base mt-4 max-w-md">
            Three dedicated practice facilities across Northern Westchester, plus away game venues throughout the region.
          </p>
        </div>
      </section>

      {/* Stat Bar */}
      <div className="bg-navy-light border-y border-cobalt/15">
        <div className="container">
          <div className="grid grid-cols-3">
            <div className="text-center py-5 border-r border-white/5">
              <span className="block font-display font-800 text-2xl md:text-3xl text-cobalt stat-glow">3</span>
              <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-white/50 mt-1">Practice Sites</span>
            </div>
            <div className="text-center py-5 border-r border-white/5">
              <span className="block font-display font-800 text-2xl md:text-3xl text-gold stat-glow">3</span>
              <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-white/50 mt-1">Days / Week</span>
            </div>
            <div className="text-center py-5">
              <span className="block font-display font-800 text-2xl md:text-3xl text-white stat-glow">Westchester</span>
              <span className="block font-display font-700 text-[10px] uppercase tracking-[0.12em] text-white/50 mt-1">Region</span>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Sites */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-cobalt/15 border border-cobalt/30 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-cobalt" />
            </div>
            <h2 className="font-display font-800 text-2xl uppercase text-white">Practice Sites</h2>
            <span className="text-white/40 text-sm font-600">3 Facilities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {practiceSites.map((site) => (
              <div
                key={site.name}
                className="bg-navy-light border border-white/5 rounded-xl p-6 card-hover"
                style={{ borderLeftWidth: "4px", borderLeftColor: site.color }}
              >
                <h3 className="font-display font-800 text-xl uppercase text-white mb-3">{site.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: site.color }} />
                    <span className="text-white/80 text-sm font-600">{site.schedule}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                    <span className="text-white/60 text-sm">{site.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                    <span className="text-white/50 text-xs">{site.access}</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                  <a
                    href={site.googleMap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs font-600 text-white/70 hover:bg-white/[0.08] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Google
                  </a>
                  <a
                    href={site.appleMap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs font-600 text-white/70 hover:bg-white/[0.08] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Apple
                  </a>
                  <a
                    href={site.waze}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs font-600 text-white/70 hover:bg-white/[0.08] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Waze
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Away Venues */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white/50" />
              </div>
              <h2 className="font-display font-800 text-xl uppercase text-white">Away Game Venues</h2>
              <span className="text-white/40 text-sm font-600">{awayVenues.length} Locations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {awayVenues.map((venue) => (
                <div key={venue.name} className="bg-navy-light border border-white/5 rounded-lg p-4 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/30 flex-shrink-0" />
                  <div>
                    <span className="text-white font-600 text-sm block">{venue.name}</span>
                    <span className="text-white/40 text-xs">{venue.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage Area */}
          <div className="mt-16 bg-gradient-to-br from-navy-light to-[#142f56] border border-cobalt/15 rounded-xl p-6 md:p-8">
            <h3 className="font-display font-800 text-lg uppercase text-white mb-4">Coverage Area</h3>
            <p className="text-white/60 text-sm mb-4">
              Legacy Hoopers serves families across Northern Westchester and surrounding communities.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Armonk", "Bedford", "Valhalla", "Mount Kisco", "Chappaqua", "Pleasantville", "Ossining", "Yorktown", "Katonah", "White Plains", "Scarsdale", "Briarcliff Manor"].map((town) => (
                <span key={town} className="px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-full text-white/60 text-xs font-600">
                  {town}
                </span>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 bg-white/[0.03] border border-cobalt/20 rounded-xl p-6 text-center">
            <p className="text-cobalt text-sm font-600">
              Practice schedules may shift seasonally. Always check the Aster Sports app for the most up-to-date times and locations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
