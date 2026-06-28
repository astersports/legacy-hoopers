import { Link, useLocation } from "wouter";
import { useEffect, type ReactNode } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/records", label: "Records" },
  { href: "/mission", label: "Mission" },
  { href: "/coach-kenny", label: "Coach Kenny" },
];

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <img src="/aster-mark.png" alt="" className="h-10 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-foreground">Aster AAU</span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          AAU Basketball
        </span>
      </span>
    </Link>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container flex h-16 items-center justify-between">
          <Brand />
          <nav className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = path === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-border bg-secondary/40">
        <div className="container flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted-foreground sm:flex-row">
          <span className="font-semibold text-foreground">Aster AAU</span>
          <a href="mailto:frank@astersports.co" className="hover:text-foreground transition-colors">frank@astersports.co</a>
          <span>© {new Date().getFullYear()} Aster Sports</span>
        </div>
      </footer>
    </div>
  );
}
