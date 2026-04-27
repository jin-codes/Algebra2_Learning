import { useMemo, useState } from "react";
import { MB, M } from "./Math";
import {
  type CalcSpec,
  ch2HornerCompute,
  num,
} from "@/data/chapterInteractives";
import { Calculator as CalcIcon, Sparkles } from "lucide-react";

const accentText: Record<string, string> = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  green: "text-neon-green",
  pink: "text-neon-pink",
};
const accentRing: Record<string, string> = {
  cyan: "focus:border-neon-cyan/70 focus:ring-neon-cyan/20",
  purple: "focus:border-neon-purple/70 focus:ring-neon-purple/20",
  green: "focus:border-neon-green/70 focus:ring-neon-green/20",
  pink: "focus:border-neon-pink/70 focus:ring-neon-pink/20",
};

interface Props {
  chapterId: string;
  color: string;
  spec: CalcSpec;
}

export const Calculator = ({ chapterId, color, spec }: Props) => {
  const [vals, setVals] = useState<Record<string, string>>(() =>
    Object.fromEntries(spec.inputs.map((i) => [i.key, i.default ?? ""]))
  );

  const result = useMemo(() => {
    // Ch 2 has a non-numeric "coeffs" field; route it through its custom evaluator.
    if (chapterId === "ch2") return ch2HornerCompute(vals);

    const nums: Record<string, number> = {};
    for (const k of spec.required) {
      const n = num(vals[k]);
      if (!Number.isFinite(n)) return null;
      nums[k] = n;
    }
    return spec.compute(nums);
  }, [vals, spec, chapterId]);

  return (
    <div className="rounded-xl border border-border bg-muted/20 p-5">
      <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
        <CalcIcon className="h-3.5 w-3.5" />
        Try it — plug in numbers
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
        {spec.inputs.map((inp) => (
          <label key={inp.key} className="block">
            <span className="block mb-1 text-xs text-muted-foreground">
              <M>{inp.label}</M>
            </span>
            <input
              type="text"
              inputMode={chapterId === "ch2" && inp.key === "coeffs" ? "text" : "decimal"}
              value={vals[inp.key] ?? ""}
              onChange={(e) =>
                setVals((v) => ({ ...v, [inp.key]: e.target.value }))
              }
              placeholder={inp.placeholder}
              className={`w-full rounded-md border border-border bg-background/70 px-3 py-2 text-sm font-mono outline-none transition focus:ring-2 ${accentRing[color]}`}
            />
          </label>
        ))}
      </div>

      <div className="space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Substituted
        </div>
        <MB>{spec.substitute(vals)}</MB>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <Sparkles className={`h-3 w-3 ${accentText[color]}`} />
          Result
        </div>
        {result ? (
          <MB>{result}</MB>
        ) : (
          <div className="text-sm text-muted-foreground italic px-3 py-2">
            Fill in every field with a valid number to see the result.
          </div>
        )}
      </div>
    </div>
  );
};
