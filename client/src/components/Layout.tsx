import { Link, useLocation } from "wouter";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { BRAND, REGISTER_URL } from "@/lib/brand";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/records", label: "Records" },
  { href: "/mission", label: "Mission" },
  { href: "/coach-kenny", label: "Coach Kenny" },
];

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5">
      <Logo className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-tight text-foreground">{BRAND.name}</span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {BRAND.region}
        </span>
      </span>
    </Link>
  );
}

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
        <div className="container flex h-16 items-center justify-between">
          <Brand />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = path === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              Register
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-md text-foreground hover:bg-secondary md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <nav className="border-t border-border bg-background md:hidden">
            <div className="container flex flex-col py-2">
              {NAV.map((item) => {
                const active = path === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-md px-3 py-3 text-base font-medium ${
                      active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.label}
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
          <span className="flex items-center gap-2 font-semibold text-foreground">
            <Logo className="h-6 w-6" /> {BRAND.name}
          </span>
          <span>Live scores &amp; records · powered by Aster Sports</span>
          <span>© {new Date().getFullYear()} {BRAND.name}</span>
        </div>
      </footer>
    </div>
  );
}
