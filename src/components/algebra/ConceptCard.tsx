import type { Concept } from "@/data/curriculum";
import { MB, M } from "./Math";
import { Lightbulb, FunctionSquare } from "lucide-react";

const accent: Record<string, string> = {
  cyan: "text-neon-cyan border-neon-cyan/30",
  purple: "text-neon-purple border-neon-purple/30",
  green: "text-neon-green border-neon-green/30",
  pink: "text-neon-pink border-neon-pink/30",
};

const glow: Record<string, string> = {
  cyan: "glow-cyan",
  purple: "glow-purple",
  green: "glow-green",
  pink: "glow-pink",
};

function highlight(text: string, query: string) {
  if (!query) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safe})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="search-hl">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

// Render a string that may contain inline math delimited by $...$ or \(...\).
function renderInline(text: string, query: string) {
  const tokens = text.split(/(\$[^$]+\$|\\\([^)]+\\\))/g);
  return tokens.map((tok, i) => {
    if (!tok) return null;
    if (tok.startsWith("$") && tok.endsWith("$") && tok.length > 1) {
      return <M key={i}>{tok.slice(1, -1)}</M>;
    }
    if (tok.startsWith("\\(") && tok.endsWith("\\)")) {
      return <M key={i}>{tok.slice(2, -2)}</M>;
    }
    return <span key={i}>{highlight(tok, query)}</span>;
  });
}

interface Props {
  concept: Concept;
  color: string;
  query: string;
}

export const ConceptCard = ({ concept, color, query }: Props) => {
  return (
    <article className="card-glow rounded-xl border border-border bg-card p-6 transition-all">
      <h3 className={`text-lg font-semibold mb-3 ${accent[color].split(" ")[0]} ${glow[color]}`}>
        {highlight(concept.title, query)}
      </h3>

      <p className="text-foreground/85 leading-relaxed text-[15px]">
        {renderInline(concept.explanation, query)}
      </p>

      {concept.formulas && concept.formulas.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <FunctionSquare className="h-3.5 w-3.5" />
            Key Formulas
          </div>
          <div className="space-y-1">
            {concept.formulas.map((f, i) => (
              <MB key={i}>{f}</MB>
            ))}
          </div>
        </div>
      )}

      {concept.examples && concept.examples.length > 0 && (
        <div className="mt-5 space-y-4">
          {concept.examples.map((ex, i) => (
            <div
              key={i}
              className={`rounded-lg border ${accent[color].split(" ")[1]} bg-muted/30 p-4`}
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <Lightbulb className="h-3.5 w-3.5" />
                Example {i + 1}
              </div>
              <div className="text-foreground/90 mb-3">
                <span className="text-muted-foreground mr-2">Problem:</span>
                {renderInline(ex.problem, "")}
              </div>
              <ol className="space-y-1.5 list-decimal list-inside marker:text-muted-foreground text-foreground/80 text-sm">
                {ex.steps.map((s, j) => (
                  <li key={j}>{renderInline(s, "")}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};