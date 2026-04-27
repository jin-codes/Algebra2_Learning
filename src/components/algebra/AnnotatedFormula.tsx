import { MB, M } from "./Math";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { VarTip } from "@/data/chapterInteractives";

const accentBorder: Record<string, string> = {
  cyan: "border-neon-cyan/40 hover:border-neon-cyan",
  purple: "border-neon-purple/40 hover:border-neon-purple",
  green: "border-neon-green/40 hover:border-neon-green",
  pink: "border-neon-pink/40 hover:border-neon-pink",
};

interface Props {
  formula: string;
  tips: VarTip[];
  color: string;
}

/**
 * Renders the flagship formula in full KaTeX, plus a row of hoverable
 * variable chips below it. Hovering a chip reveals the plain-English meaning.
 * Annotating individual glyphs inside KaTeX's DOM is fragile, so a chip-legend
 * is the cleanest and most reliable way to provide tooltips.
 */
export const AnnotatedFormula = ({ formula, tips, color }: Props) => {
  return (
    <TooltipProvider delayDuration={120}>
      <div className="space-y-3">
        <MB>{formula}</MB>
        <div className="flex flex-wrap gap-2">
          {tips.map((t, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={`group inline-flex items-center gap-1 rounded-md border bg-card/60 px-2.5 py-1.5 text-xs transition-colors ${accentBorder[color]}`}
                  aria-label={`Explain ${t.symbol}`}
                >
                  <span className="font-mono text-muted-foreground/70">hover</span>
                  <span className="px-1">
                    <M>{t.symbol}</M>
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs text-sm leading-snug"
              >
                <div className="mb-1">
                  <M>{t.symbol}</M>
                </div>
                <div className="text-muted-foreground">{t.meaning}</div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
