import { Link, useLocation } from "wouter";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Smartphone } from "lucide-react";
import { BRAND, REGISTER_URL, NAV } from "@/lib/brand";
import { Logo } from "@/components/Logo";

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Logo className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-foreground">Aster Sports AAU</span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          AAU Basketball
        </span>
      </span>
    </Link>
  );
}

const FOOTER_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Programs",
    links: [
      { label: "AAU Teams", href: "/programs" },
      { label: "Camps & Clinics", href: "/programs" },
      { label: "1:1 Training", href: "/programs" },
      { label: "Elite Academy", href: "/programs" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Schedule", href: "/schedule" },
      { label: "Records", href: "/records" },
      { label: "Highlights", href: "/highlights" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Program",
    links: [
      { label: "Our mission", href: "/mission" },
      { label: "Coach Kenny", href: "/coach-kenny" },
      { label: "Locations", href: "/schedule" },
      { label: "Contact", href: "/mission" },
    ],
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [path]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Brand />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active = path === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold" />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              <Smartphone className="h-4 w-4" /> Open app
            </button>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              Register
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-md text-foreground hover:bg-secondary lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="container flex flex-col py-2">
              {NAV.map((item) => {
                const active = path === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium ${
                      active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />} {item.label}
                  </Link>
                );
              })}
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-md bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground"
              >
                Register
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-border bg-secondary/40">
        <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted-foreground sm:flex-row">
          <span className="font-semibold text-foreground">Aster Sports AAU</span>
          <a href="mailto:frank@astersports.co" className="hover:text-foreground transition-colors">frank@astersports.co</a>
          <span>© {new Date().getFullYear()} Aster Sports</span>
        </div>
      </footer>
    </div>
  );
}
