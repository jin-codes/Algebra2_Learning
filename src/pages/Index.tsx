import { useEffect, useMemo, useRef, useState } from "react";
import { curriculum } from "@/data/curriculum";
import { ChapterSidebar } from "@/components/algebra/Sidebar";
import { ConceptCard } from "@/components/algebra/ConceptCard";
import { Search, Menu, Sigma } from "lucide-react";

const colorTitle: Record<string, string> = {
  cyan: "text-neon-cyan glow-cyan",
  purple: "text-neon-purple glow-purple",
  green: "text-neon-green glow-green",
  pink: "text-neon-pink glow-pink",
};

const Index = () => {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(curriculum[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Filter chapters/concepts by query (title, explanation, keywords)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return curriculum;
    return curriculum
      .map((ch) => {
        const concepts = ch.concepts.filter((c) => {
          const hay = [
            c.title,
            c.explanation,
            ...(c.keywords || []),
            ...(c.formulas || []),
          ]
            .join(" ")
            .toLowerCase();
          return hay.includes(q);
        });
        const chapterMatches = ch.title.toLowerCase().includes(q);
        if (chapterMatches && concepts.length === 0) {
          return { ...ch, concepts: ch.concepts };
        }
        return { ...ch, concepts };
      })
      .filter((ch) => ch.concepts.length > 0);
  }, [query]);

  // Scroll-spy for active sidebar item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

  const handleNavigate = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex">
      <ChapterSidebar
        activeId={activeId}
        onNavigate={handleNavigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 md:px-8 py-4">
            <button
              className="md:hidden text-foreground"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="md:hidden flex items-center gap-2">
              <Sigma className="h-5 w-5 text-neon-cyan" />
              <span className="font-bold text-sm">
                Algebra <span className="text-neon-cyan">2</span>
              </span>
            </div>

            <h1 className="hidden md:block text-base font-medium text-muted-foreground tracking-tight">
              Algebra 2 <span className="text-foreground">Reference</span>
            </h1>

            <div className="flex-1" />

            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics, formulas, keywords…"
                className="w-full bg-input/60 border border-border focus:border-neon-cyan/60 focus:ring-2 focus:ring-neon-cyan/20 rounded-lg pl-10 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
              />
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="px-4 md:px-12 pt-10 pb-6 max-w-5xl">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-neon-purple mb-3 glow-purple">
            // study reference
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            The full <span className="text-neon-cyan glow-cyan">Algebra 2</span>
            <br />
            curriculum, distilled.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl text-lg leading-relaxed">
            Ten chapters, every core concept, rendered with KaTeX. Built as a clean,
            dark-mode reference for studying or revisiting any topic on demand.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
            {curriculum.map((c) => (
              <button
                key={c.id}
                onClick={() => handleNavigate(c.id)}
                className="px-3 py-1.5 rounded-full border border-border bg-card hover:border-neon-cyan/50 hover:text-neon-cyan transition text-muted-foreground"
              >
                {String(c.number).padStart(2, "0")} · {c.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </section>

        {/* Chapters */}
        <main className="px-4 md:px-12 pb-32 max-w-5xl">
          {filtered.length === 0 ? (
            <div className="mt-20 text-center text-muted-foreground">
              No results for{" "}
              <span className="text-neon-pink">&ldquo;{query}&rdquo;</span>.
            </div>
          ) : (
            filtered.map((ch) => (
              <section
                key={ch.id}
                id={ch.id}
                ref={(el) => (sectionRefs.current[ch.id] = el)}
                className="pt-16 scroll-mt-24"
              >
                <div className="flex items-baseline gap-4 mb-6 pb-3 border-b border-border">
                  <span className="font-mono text-sm text-muted-foreground tabular-nums">
                    {String(ch.number).padStart(2, "0")}
                  </span>
                  <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${colorTitle[ch.color]}`}>
                    {ch.title}
                  </h2>
                </div>
                <div className="grid gap-5">
                  {ch.concepts.map((c) => (
                    <ConceptCard key={c.id} concept={c} color={ch.color} query={query} />
                  ))}
                </div>
              </section>
            ))
          )}

          <footer className="mt-24 pt-8 border-t border-border text-xs text-muted-foreground font-mono">
            <span className="text-neon-cyan">$</span> Algebra 2 Reference · math
            rendered with KaTeX
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
