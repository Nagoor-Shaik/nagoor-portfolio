import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { hash: "work", label: "Work" },
  { hash: "motion", label: "Motion" },
  { hash: "skills", label: "Skills" },
  { hash: "about", label: "About" },
  { hash: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const location = useLocation();

  // Translucent styling adjustment on vertical page scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver + Scroll tracking configuration
  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
      return;
    }

    // Force unhighlight active states when user scrolls back up to the top/hero zone
    const handleScrollClear = () => {
      if (window.scrollY < 180) {
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScrollClear, { passive: true });

    const ids = links.map((l) => l.hash);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => !!x);
      
    if (sections.length === 0) {
      window.removeEventListener("scroll", handleScrollClear);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        // Prevent elements entering viewport from forcing a highlight if near top of screen
        if (window.scrollY < 180) {
          setActive("");
          return;
        }

        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive("#" + e.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -45% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    handleScrollClear(); // Run clear check on initial load coordinate

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScrollClear);
    };
  }, [location.pathname]);

  // Smooth same-page behavior if already on index route, falls back to native router links if on case study routes
  const handleNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${hash}`);
      }
      setOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[rgba(5,5,16,0.55)] border-b border-[rgba(123,47,255,0.2)]"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
            }
          }}
          className="font-display font-bold text-2xl tracking-wider neon-text-violet"
          aria-label="NS — Home"
        >
          NS
        </Link>
        
        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em]">
          {links.map((l) => {
            const currentHash = `#${l.hash}`;
            const isActive = active === currentHash;
            return (
              <li key={l.hash}>
                <Link
                  to="/"
                  hash={l.hash}
                  onClick={(e) => handleNavigationClick(e, l.hash)}
                  className={cn(
                    "transition-colors hover:text-neon-cyan",
                    isActive ? "text-neon-cyan" : "text-text-dim",
                  )}
                  style={
                    isActive
                      ? { textShadow: "0 0 10px var(--neon-cyan)" }
                      : undefined
                  }
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="border-l border-white/10 pl-6 ml-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-neon-cyan transition-colors"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu panel overlay setup */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-300 backdrop-blur-xl bg-[rgba(5,5,16,0.92)] border-b border-[rgba(123,47,255,0.2)]",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <ul className="px-6 py-6 flex flex-col gap-5 font-mono text-sm uppercase tracking-[0.25em]">
          {links.map((l) => (
            <li key={l.hash}>
              <Link
                to="/"
                hash={l.hash}
                onClick={(e) => handleNavigationClick(e, l.hash)}
                className="text-text-dim hover:text-neon-cyan transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="border-t border-white/10 pt-4 mt-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-neon-cyan transition-colors"
              onClick={() => setOpen(false)}
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}