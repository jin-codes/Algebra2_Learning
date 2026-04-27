import { curriculum } from "@/data/curriculum";
import { cn } from "@/lib/utils";
import { Sigma, X } from "lucide-react";

const colorMap = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  green: "text-neon-green",
  pink: "text-neon-pink",
} as const;

interface Props {
  activeId: string;
  onNavigate: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

export const ChapterSidebar = ({ activeId, onNavigate, open, onClose }: Props) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed md:sticky top-0 z-40 h-screen w-72 shrink-0 border-r border-border bg-sidebar transition-transform md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Sigma className="h-6 w-6 text-neon-cyan glow-cyan" strokeWidth={2.5} />
            <div>
              <div className="font-bold text-foreground tracking-tight leading-none">
                Algebra <span className="text-neon-cyan glow-cyan">2</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                Reference
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100vh-5rem)] px-3 py-4 space-y-1">
          {curriculum.map((ch) => {
            const active = activeId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  onNavigate(ch.id);
                  onClose();
                }}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all group flex items-start gap-3",
                  active
                    ? "bg-sidebar-accent border border-neon-cyan/40"
                    : "border border-transparent hover:bg-sidebar-accent/50"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs mt-0.5 tabular-nums",
                    colorMap[ch.color],
                    active && "glow-cyan"
                  )}
                >
                  {String(ch.number).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "leading-snug",
                    active ? "text-foreground font-medium" : "text-sidebar-foreground"
                  )}
                >
                  {ch.title}
                </span>
              </button>
            );
          })}
          <div className="pt-6 px-3 text-[10px] text-muted-foreground/70 leading-relaxed">
            Built with KaTeX · Dark neon study reference
          </div>
        </nav>
      </aside>
    </>
  );
};