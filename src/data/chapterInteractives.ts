// Flagship formula + variable tooltips + interactive calculator for each chapter.

export type VarTip = {
  /** KaTeX source for the symbol shown on the chip (e.g. "m", "b^2-4ac"). */
  symbol: string;
  /** Plain-English explanation shown on hover. */
  meaning: string;
};

export type CalcInput = {
  /** Variable key used by the compute function. */
  key: string;
  /** Display label (KaTeX inline source, no $ delimiters). */
  label: string;
  /** Optional placeholder hint. */
  placeholder?: string;
  /** Default value (string so empties work). */
  default?: string;
};

export type CalcSpec = {
  /** Heading shown above the calculator. */
  title: string;
  /** Short prose description. */
  description: string;
  /** KaTeX of the formula (the same flagship formula). */
  formula: string;
  /** The hoverable variables in the flagship formula. */
  tips: VarTip[];
  /** Inputs the user fills in. */
  inputs: CalcInput[];
  /**
   * Build a KaTeX string of the formula with the user's numbers substituted in.
   * Receives a record of the current input strings.
   */
  substitute: (vals: Record<string, string>) => string;
  /**
   * Compute the result. Return a KaTeX string to render, or null when inputs
   * are missing/invalid (the UI then shows a hint instead).
   */
  compute: (vals: Record<string, number>) => string | null;
  /** Names of inputs that must be valid numbers before compute runs. */
  required: string[];
};

const num = (s: string | undefined) => {
  if (s === undefined || s.trim() === "") return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
};

const fmt = (n: number, d = 4) => {
  if (!Number.isFinite(n)) return "\\text{undefined}";
  if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
  return Number(n.toFixed(d)).toString();
};

const sub = (vals: Record<string, string>, key: string, fallback = "?") =>
  vals[key]?.trim() ? vals[key] : fallback;

export const chapterInteractives: Record<string, CalcSpec> = {
  // ───────────────────────── Ch 1 — Slope-Intercept ─────────────────────────
  ch1: {
    title: "Slope-Intercept Line",
    description:
      "Plug in a slope, y-intercept, and an x value to evaluate the line y = mx + b.",
    formula: "y = mx + b",
    tips: [
      { symbol: "y", meaning: "Output value of the line for a chosen x." },
      { symbol: "m", meaning: "Slope — rise over run; how steep the line is." },
      { symbol: "x", meaning: "Input value you plug into the line." },
      { symbol: "b", meaning: "y-intercept — where the line crosses the y-axis (x = 0)." },
    ],
    inputs: [
      { key: "m", label: "m", default: "2", placeholder: "slope" },
      { key: "b", label: "b", default: "3", placeholder: "y-intercept" },
      { key: "x", label: "x", default: "5", placeholder: "input x" },
    ],
    required: ["m", "b", "x"],
    substitute: (v) => `y = (${sub(v, "m")})(${sub(v, "x")}) + (${sub(v, "b")})`,
    compute: (v) => `y = ${fmt(v.m * v.x + v.b)}`,
  },

  // ───────────────────────── Ch 2 — Remainder Theorem ─────────────────────────
  ch2: {
    title: "Remainder Theorem Evaluator",
    description:
      "Enter coefficients of a polynomial and a value c. The result is P(c), which equals the remainder when dividing by (x − c).",
    formula: "P(c) = \\text{remainder when dividing } P(x) \\text{ by } (x-c)",
    tips: [
      { symbol: "P(c)", meaning: "Plug c into the polynomial — that value is the remainder." },
      { symbol: "x-c", meaning: "Linear divisor; if P(c)=0 then (x−c) is a factor." },
    ],
    inputs: [
      {
        key: "coeffs",
        label: "\\text{coefficients}",
        default: "1, -6, 11, -6",
        placeholder: "e.g. 1, -6, 11, -6",
      },
      { key: "c", label: "c", default: "1", placeholder: "value of c" },
    ],
    required: ["c"],
    substitute: (v) => {
      const c = sub(v, "c");
      const cs = (v.coeffs || "").split(",").map((s) => s.trim()).filter(Boolean);
      if (!cs.length) return `P(${c}) = ?`;
      const n = cs.length - 1;
      const terms = cs.map((co, i) => {
        const p = n - i;
        if (p === 0) return co;
        if (p === 1) return `${co}\\cdot ${c}`;
        return `${co}\\cdot ${c}^{${p}}`;
      });
      return `P(${c}) = ${terms.join(" + ")}`;
    },
    compute: (v) => {
      // coeffs is a comma-separated list parsed outside numeric pipeline
      return null; // handled by override below via `extra`
    },
  },

  // ───────────────────────── Ch 3 — Quadratic Formula ─────────────────────────
  ch3: {
    title: "Quadratic Formula Solver",
    description:
      "Enter a, b, c for ax² + bx + c = 0. Returns both roots (real or complex) using the discriminant.",
    formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    tips: [
      { symbol: "a", meaning: "Coefficient of x² (must not be 0)." },
      { symbol: "b", meaning: "Coefficient of x." },
      { symbol: "c", meaning: "Constant term." },
      { symbol: "b^2-4ac", meaning: "Discriminant Δ — sign tells you how many real roots exist." },
      { symbol: "\\pm", meaning: "Yields two solutions: one with +, one with −." },
    ],
    inputs: [
      { key: "a", label: "a", default: "1" },
      { key: "b", label: "b", default: "-3" },
      { key: "c", label: "c", default: "2" },
    ],
    required: ["a", "b", "c"],
    substitute: (v) =>
      `x = \\dfrac{-(${sub(v, "b")}) \\pm \\sqrt{(${sub(v, "b")})^2 - 4(${sub(
        v,
        "a"
      )})(${sub(v, "c")})}}{2(${sub(v, "a")})}`,
    compute: (v) => {
      if (v.a === 0) return "\\text{a cannot be 0}";
      const disc = v.b * v.b - 4 * v.a * v.c;
      if (disc >= 0) {
        const r = Math.sqrt(disc);
        return `x = ${fmt((-v.b + r) / (2 * v.a))} \\ \\text{or}\\ ${fmt(
          (-v.b - r) / (2 * v.a)
        )}`;
      }
      const re = -v.b / (2 * v.a);
      const im = Math.sqrt(-disc) / (2 * v.a);
      return `x = ${fmt(re)} \\pm ${fmt(Math.abs(im))}\\,i`;
    },
  },

  // ───────────────────────── Ch 4 — Rational Evaluation ─────────────────────────
  ch4: {
    title: "Rational Function Evaluator",
    description:
      "Evaluate (ax + b)/(cx + d) at a chosen x. Flags excluded values where the denominator is zero.",
    formula: "f(x) = \\dfrac{ax + b}{cx + d}",
    tips: [
      { symbol: "a", meaning: "Coefficient of x in the numerator." },
      { symbol: "b", meaning: "Constant in the numerator." },
      { symbol: "c", meaning: "Coefficient of x in the denominator." },
      { symbol: "d", meaning: "Constant in the denominator." },
      { symbol: "cx+d", meaning: "Denominator — must not equal zero (excluded values)." },
    ],
    inputs: [
      { key: "a", label: "a", default: "1" },
      { key: "b", label: "b", default: "2" },
      { key: "c", label: "c", default: "1" },
      { key: "d", label: "d", default: "-3" },
      { key: "x", label: "x", default: "5" },
    ],
    required: ["a", "b", "c", "d", "x"],
    substitute: (v) =>
      `f(${sub(v, "x")}) = \\dfrac{(${sub(v, "a")})(${sub(v, "x")}) + (${sub(
        v,
        "b"
      )})}{(${sub(v, "c")})(${sub(v, "x")}) + (${sub(v, "d")})}`,
    compute: (v) => {
      const denom = v.c * v.x + v.d;
      if (denom === 0) return "\\text{undefined — denominator is 0}";
      return `f(x) = ${fmt((v.a * v.x + v.b) / denom)}`;
    },
  },

  // ───────────────────────── Ch 5 — Rational Exponent ─────────────────────────
  ch5: {
    title: "Rational Exponent Calculator",
    description:
      "Compute aᵐ⁄ⁿ — the n-th root of a, raised to the m-th power.",
    formula: "a^{m/n} = \\sqrt[n]{a^m}",
    tips: [
      { symbol: "a", meaning: "Base — the number being raised to a fractional power." },
      { symbol: "m", meaning: "Numerator — the power applied to a." },
      { symbol: "n", meaning: "Denominator — the index of the root." },
      { symbol: "\\sqrt[n]{a^m}", meaning: "Take a to the m, then take the n-th root." },
    ],
    inputs: [
      { key: "a", label: "a", default: "27" },
      { key: "m", label: "m", default: "2" },
      { key: "n", label: "n", default: "3" },
    ],
    required: ["a", "m", "n"],
    substitute: (v) =>
      `(${sub(v, "a")})^{${sub(v, "m")}/${sub(v, "n")}} = \\sqrt[${sub(
        v,
        "n"
      )}]{(${sub(v, "a")})^{${sub(v, "m")}}}`,
    compute: (v) => {
      if (v.n === 0) return "\\text{n cannot be 0}";
      if (v.a < 0 && v.n % 2 === 0)
        return "\\text{undefined — even root of a negative}";
      const result = Math.sign(v.a) * Math.pow(Math.abs(v.a), v.m / v.n);
      return `\\text{result} = ${fmt(result)}`;
    },
  },

  // ───────────────────────── Ch 6 — Compound Interest (continuous) ─────────────────────────
  ch6: {
    title: "Continuous Growth Calculator",
    description:
      "Use A = A₀ · eʳᵗ to project a continuously growing (or decaying) quantity.",
    formula: "A = A_0\\,e^{rt}",
    tips: [
      { symbol: "A", meaning: "Amount after time t." },
      { symbol: "A_0", meaning: "Initial amount at time 0." },
      { symbol: "e", meaning: "Euler's number ≈ 2.71828, base of natural growth." },
      { symbol: "r", meaning: "Continuous growth rate (decimal). Negative means decay." },
      { symbol: "t", meaning: "Elapsed time, in the same units as the rate." },
    ],
    inputs: [
      { key: "A0", label: "A_0", default: "1000", placeholder: "initial" },
      { key: "r", label: "r", default: "0.05", placeholder: "rate (e.g. 0.05)" },
      { key: "t", label: "t", default: "10", placeholder: "time" },
    ],
    required: ["A0", "r", "t"],
    substitute: (v) =>
      `A = (${sub(v, "A0")})\\,e^{(${sub(v, "r")})(${sub(v, "t")})}`,
    compute: (v) => `A = ${fmt(v.A0 * Math.exp(v.r * v.t))}`,
  },

  // ───────────────────────── Ch 7 — Arithmetic Sum ─────────────────────────
  ch7: {
    title: "Arithmetic Series Sum",
    description:
      "Sum of the first n terms of an arithmetic sequence with first term a₁ and common difference d.",
    formula: "S_n = \\dfrac{n}{2}\\bigl(2a_1 + (n-1)d\\bigr)",
    tips: [
      { symbol: "S_n", meaning: "Sum of the first n terms." },
      { symbol: "n", meaning: "How many terms you are adding." },
      { symbol: "a_1", meaning: "The first term of the sequence." },
      { symbol: "d", meaning: "Common difference between consecutive terms." },
      { symbol: "(n-1)d", meaning: "Total amount added between the 1st and n-th term." },
    ],
    inputs: [
      { key: "a1", label: "a_1", default: "3" },
      { key: "d", label: "d", default: "4" },
      { key: "n", label: "n", default: "20" },
    ],
    required: ["a1", "d", "n"],
    substitute: (v) =>
      `S_{${sub(v, "n")}} = \\dfrac{${sub(v, "n")}}{2}\\bigl(2(${sub(
        v,
        "a1"
      )}) + (${sub(v, "n")}-1)(${sub(v, "d")})\\bigr)`,
    compute: (v) => {
      if (v.n <= 0 || !Number.isInteger(v.n))
        return "\\text{n must be a positive integer}";
      return `S_n = ${fmt((v.n / 2) * (2 * v.a1 + (v.n - 1) * v.d))}`;
    },
  },

  // ───────────────────────── Ch 8 — Circle ─────────────────────────
  ch8: {
    title: "Point-on-Circle Checker",
    description:
      "Given a circle with center (h, k) and radius r, check whether a point (x, y) is inside, on, or outside it.",
    formula: "(x - h)^2 + (y - k)^2 = r^2",
    tips: [
      { symbol: "h", meaning: "x-coordinate of the center." },
      { symbol: "k", meaning: "y-coordinate of the center." },
      { symbol: "r", meaning: "Radius — distance from center to any point on the circle." },
      { symbol: "(x-h)^2+(y-k)^2", meaning: "Squared distance from (x, y) to the center." },
    ],
    inputs: [
      { key: "h", label: "h", default: "0" },
      { key: "k", label: "k", default: "0" },
      { key: "r", label: "r", default: "5" },
      { key: "x", label: "x", default: "3" },
      { key: "y", label: "y", default: "4" },
    ],
    required: ["h", "k", "r", "x", "y"],
    substitute: (v) =>
      `((${sub(v, "x")})-(${sub(v, "h")}))^2 + ((${sub(v, "y")})-(${sub(
        v,
        "k"
      )}))^2 \\;?\\; (${sub(v, "r")})^2`,
    compute: (v) => {
      const lhs = (v.x - v.h) ** 2 + (v.y - v.k) ** 2;
      const rhs = v.r * v.r;
      const dist = Math.sqrt(lhs);
      const where =
        Math.abs(lhs - rhs) < 1e-9
          ? "\\text{on the circle}"
          : lhs < rhs
          ? "\\text{inside}"
          : "\\text{outside}";
      return `\\text{distance} = ${fmt(dist)},\\ ${where}`;
    },
  },

  // ───────────────────────── Ch 9 — 2×2 Determinant ─────────────────────────
  ch9: {
    title: "2×2 Determinant Calculator",
    description:
      "Compute det(A) = ad − bc for a 2×2 matrix. A non-zero determinant means A is invertible.",
    formula:
      "\\det\\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix} = ad - bc",
    tips: [
      { symbol: "a", meaning: "Top-left entry of the matrix." },
      { symbol: "b", meaning: "Top-right entry of the matrix." },
      { symbol: "c", meaning: "Bottom-left entry of the matrix." },
      { symbol: "d", meaning: "Bottom-right entry of the matrix." },
      { symbol: "ad-bc", meaning: "If this is 0, the matrix is singular (no inverse)." },
    ],
    inputs: [
      { key: "a", label: "a", default: "3" },
      { key: "b", label: "b", default: "4" },
      { key: "c", label: "c", default: "1" },
      { key: "d", label: "d", default: "2" },
    ],
    required: ["a", "b", "c", "d"],
    substitute: (v) =>
      `\\det = (${sub(v, "a")})(${sub(v, "d")}) - (${sub(v, "b")})(${sub(
        v,
        "c"
      )})`,
    compute: (v) => {
      const det = v.a * v.d - v.b * v.c;
      const tag =
        det === 0 ? "\\ \\text{(singular)}" : "\\ \\text{(invertible)}";
      return `\\det = ${fmt(det)}${tag}`;
    },
  },

  // ───────────────────────── Ch 10 — Combinations ─────────────────────────
  ch10: {
    title: "Combinations C(n, r)",
    description:
      "Count how many ways you can choose r items from n when order doesn't matter.",
    formula: "C(n,r) = \\binom{n}{r} = \\dfrac{n!}{r!\\,(n-r)!}",
    tips: [
      { symbol: "n", meaning: "Total number of items to choose from." },
      { symbol: "r", meaning: "How many items you select." },
      { symbol: "n!", meaning: "n factorial — the product n·(n−1)·…·1." },
      { symbol: "(n-r)!", meaning: "Cancels out the orderings you don't want to count." },
    ],
    inputs: [
      { key: "n", label: "n", default: "10" },
      { key: "r", label: "r", default: "3" },
    ],
    required: ["n", "r"],
    substitute: (v) =>
      `C(${sub(v, "n")},${sub(v, "r")}) = \\dfrac{${sub(v, "n")}!}{${sub(
        v,
        "r"
      )}!\\,(${sub(v, "n")}-${sub(v, "r")})!}`,
    compute: (v) => {
      if (
        v.n < 0 ||
        v.r < 0 ||
        !Number.isInteger(v.n) ||
        !Number.isInteger(v.r)
      )
        return "\\text{n and r must be non-negative integers}";
      if (v.r > v.n) return "C(n,r) = 0";
      const r = Math.min(v.r, v.n - v.r);
      let result = 1;
      for (let i = 0; i < r; i++) result = (result * (v.n - i)) / (i + 1);
      return `C(n,r) = ${fmt(result)}`;
    },
  },
};

// Special compute override for Ch 2 (coefficients string → P(c) via Horner).
export const ch2HornerCompute = (vals: Record<string, string>): string | null => {
  const c = num(vals.c);
  if (!Number.isFinite(c)) return null;
  const cs = (vals.coeffs || "")
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n));
  if (!cs.length) return null;
  let acc = 0;
  for (const co of cs) acc = acc * c + co;
  return `P(${fmt(c)}) = ${fmt(acc)}`;
};

export { num, fmt };
