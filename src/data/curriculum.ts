export type Example = { problem: string; steps: string[] };
export type Concept = {
  id: string;
  title: string;
  explanation: string;
  formulas?: string[];
  examples?: Example[];
  keywords?: string[];
};
export type Chapter = {
  id: string;
  number: number;
  title: string;
  color: "cyan" | "purple" | "green" | "pink";
  concepts: Concept[];
};

export const curriculum: Chapter[] = [
  {
    id: "ch1",
    number: 1,
    title: "Review of Algebra 1 Fundamentals",
    color: "cyan",
    concepts: [
      {
        id: "linear-eq",
        title: "Linear Equations & Inequalities",
        explanation:
          "A linear equation in one variable can be written as ax + b = 0 with a ≠ 0. Solve by isolating the variable using inverse operations. Linear inequalities behave the same way, except multiplying or dividing both sides by a negative number flips the inequality sign.",
        formulas: ["ax + b = 0 \\implies x = -\\dfrac{b}{a}", "y = mx + b", "m = \\dfrac{y_2 - y_1}{x_2 - x_1}"],
        examples: [
          {
            problem: "Solve: 3x - 7 = 2x + 5",
            steps: [
              "Subtract 2x from both sides: x - 7 = 5",
              "Add 7: x = 12",
            ],
          },
          {
            problem: "Solve: -2x + 4 > 10",
            steps: [
              "Subtract 4: -2x > 6",
              "Divide by -2 and FLIP the sign: x < -3",
            ],
          },
        ],
        keywords: ["slope", "intercept", "inequality", "linear"],
      },
      {
        id: "systems",
        title: "Systems of Equations",
        explanation:
          "A system of equations is a set of two or more equations with the same variables. Solutions are points that satisfy every equation. The three main solution methods are graphing, substitution, and elimination.",
        formulas: [
          "\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}",
        ],
        examples: [
          {
            problem: "Solve: 2x + y = 7,  x - y = 2",
            steps: [
              "Add the equations to eliminate y: 3x = 9",
              "x = 3",
              "Substitute into x - y = 2: 3 - y = 2, so y = 1",
              "Solution: (3, 1)",
            ],
          },
        ],
        keywords: ["substitution", "elimination", "system"],
      },
      {
        id: "exponent-rules",
        title: "Exponent Rules",
        explanation:
          "Exponent rules let you simplify expressions involving powers. Bases must match for product and quotient rules.",
        formulas: [
          "a^m \\cdot a^n = a^{m+n}",
          "\\dfrac{a^m}{a^n} = a^{m-n}",
          "(a^m)^n = a^{mn}",
          "a^{-n} = \\dfrac{1}{a^n}",
          "a^0 = 1 \\quad (a \\ne 0)",
        ],
        examples: [
          {
            problem: "Simplify: \\dfrac{x^5 \\cdot x^{-2}}{x^{-3}}",
            steps: [
              "Combine top: x^{5+(-2)} = x^3",
              "Divide: x^{3 - (-3)} = x^6",
            ],
          },
        ],
        keywords: ["exponent", "power", "base"],
      },
    ],
  },
  {
    id: "ch2",
    number: 2,
    title: "Polynomials & Polynomial Functions",
    color: "purple",
    concepts: [
      {
        id: "poly-ops",
        title: "Operations on Polynomials",
        explanation:
          "Polynomials can be added, subtracted, and multiplied. Add or subtract by combining like terms. Multiply by distributing every term in the first polynomial across every term in the second.",
        formulas: ["(a+b)(c+d) = ac + ad + bc + bd"],
        examples: [
          {
            problem: "Multiply: (2x + 3)(x - 4)",
            steps: [
              "Distribute: 2x \\cdot x + 2x \\cdot (-4) + 3 \\cdot x + 3 \\cdot (-4)",
              "= 2x^2 - 8x + 3x - 12",
              "= 2x^2 - 5x - 12",
            ],
          },
        ],
        keywords: ["polynomial", "FOIL", "distribute"],
      },
      {
        id: "factoring",
        title: "Factoring Techniques",
        explanation:
          "Factoring rewrites a polynomial as a product. Always start by pulling out the greatest common factor (GCF). Then look for special patterns: difference of squares, perfect-square trinomials, sum/difference of cubes, or factor by grouping.",
        formulas: [
          "a^2 - b^2 = (a-b)(a+b)",
          "a^3 - b^3 = (a-b)(a^2+ab+b^2)",
          "a^3 + b^3 = (a+b)(a^2-ab+b^2)",
        ],
        examples: [
          {
            problem: "Factor: x^3 - 8",
            steps: [
              "Recognize difference of cubes with a = x, b = 2",
              "Apply formula: (x - 2)(x^2 + 2x + 4)",
            ],
          },
          {
            problem: "Factor by grouping: x^3 + 2x^2 - 3x - 6",
            steps: [
              "Group: (x^3 + 2x^2) + (-3x - 6)",
              "Factor each: x^2(x + 2) - 3(x + 2)",
              "Pull common (x + 2): (x + 2)(x^2 - 3)",
            ],
          },
        ],
        keywords: ["factor", "GCF", "grouping", "cubes", "difference of squares"],
      },
      {
        id: "long-synthetic-div",
        title: "Polynomial Long & Synthetic Division",
        explanation:
          "Polynomial long division mirrors numerical long division. Synthetic division is a shortcut when dividing by a linear factor of the form (x - c).",
        formulas: ["\\dfrac{P(x)}{x-c} = Q(x) + \\dfrac{R}{x-c}"],
        examples: [
          {
            problem: "Divide using synthetic division: (2x^3 - 3x^2 + 4x - 5) \\div (x - 2)",
            steps: [
              "Use c = 2, coefficients [2, -3, 4, -5]",
              "Bring down 2. Multiply 2·2=4, add: -3+4=1.",
              "Multiply 1·2=2, add: 4+2=6. Multiply 6·2=12, add: -5+12=7.",
              "Quotient: 2x^2 + x + 6, remainder 7",
            ],
          },
        ],
        keywords: ["division", "synthetic", "long division"],
      },
      {
        id: "remainder-factor-theorem",
        title: "Remainder & Factor Theorems",
        explanation:
          "The Remainder Theorem says that if a polynomial P(x) is divided by (x - c), the remainder equals P(c). The Factor Theorem follows: (x - c) is a factor of P(x) exactly when P(c) = 0.",
        formulas: ["P(c) = \\text{remainder when dividing by } (x-c)", "(x-c) \\text{ is a factor} \\iff P(c)=0"],
        examples: [
          {
            problem: "Is (x - 1) a factor of P(x) = x^3 - 6x^2 + 11x - 6?",
            steps: [
              "Compute P(1) = 1 - 6 + 11 - 6 = 0",
              "Since P(1) = 0, yes, (x - 1) is a factor.",
            ],
          },
        ],
        keywords: ["remainder theorem", "factor theorem", "root"],
      },
      {
        id: "graph-poly",
        title: "Graphing Polynomial Functions",
        explanation:
          "Key features: degree determines end behavior, leading coefficient sign determines direction, real zeros are x-intercepts, and the multiplicity of a zero tells whether the graph crosses (odd multiplicity) or touches (even multiplicity) the x-axis at that point.",
        formulas: [
          "\\text{Degree } n,\\ \\text{leading coeff } a:\\ \\lim_{x\\to\\pm\\infty} P(x) = \\pm\\infty",
        ],
        examples: [
          {
            problem: "Describe end behavior of P(x) = -2x^4 + x - 1",
            steps: [
              "Degree 4 (even), leading coefficient negative.",
              "Both ends go down: P(x) → -∞ as x → ±∞",
            ],
          },
        ],
        keywords: ["end behavior", "zero", "multiplicity", "graph"],
      },
    ],
  },
  {
    id: "ch3",
    number: 3,
    title: "Quadratics & Complex Numbers",
    color: "green",
    concepts: [
      {
        id: "complete-square",
        title: "Completing the Square",
        explanation:
          "Completing the square rewrites ax² + bx + c in vertex form a(x - h)² + k. Useful for graphing parabolas and deriving the quadratic formula.",
        formulas: ["x^2 + bx = \\left(x + \\tfrac{b}{2}\\right)^2 - \\left(\\tfrac{b}{2}\\right)^2"],
        examples: [
          {
            problem: "Rewrite x^2 + 6x + 5 by completing the square.",
            steps: [
              "Half of 6 is 3; square it: 9.",
              "x^2 + 6x + 9 - 9 + 5 = (x+3)^2 - 4",
            ],
          },
        ],
        keywords: ["completing the square", "vertex form"],
      },
      {
        id: "quadratic-formula",
        title: "Quadratic Formula & Discriminant",
        explanation:
          "Any quadratic ax² + bx + c = 0 with a ≠ 0 can be solved by the quadratic formula. The discriminant Δ = b² - 4ac tells how many real solutions exist: Δ > 0 → two real, Δ = 0 → one repeated real, Δ < 0 → two complex conjugates.",
        formulas: [
          "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          "\\Delta = b^2 - 4ac",
        ],
        examples: [
          {
            problem: "Solve: 2x^2 + 3x - 2 = 0",
            steps: [
              "a=2, b=3, c=-2; Δ = 9 - 4(2)(-2) = 25",
              "x = (-3 ± 5)/4",
              "x = 1/2 or x = -2",
            ],
          },
        ],
        keywords: ["quadratic", "discriminant", "roots"],
      },
      {
        id: "complex-numbers",
        title: "Complex Numbers",
        explanation:
          "A complex number has the form a + bi where i² = -1. Add and subtract by combining real and imaginary parts. Multiply using FOIL plus i² = -1. The conjugate of a + bi is a - bi; multiplying a complex number by its conjugate gives a² + b² (a real number).",
        formulas: [
          "i^2 = -1",
          "(a+bi)(a-bi) = a^2 + b^2",
          "\\dfrac{1}{a+bi} = \\dfrac{a-bi}{a^2+b^2}",
        ],
        examples: [
          {
            problem: "Simplify: (3 + 2i)(1 - 4i)",
            steps: [
              "FOIL: 3 - 12i + 2i - 8i^2",
              "Replace i^2 = -1: 3 - 10i + 8 = 11 - 10i",
            ],
          },
        ],
        keywords: ["imaginary", "complex", "conjugate"],
      },
      {
        id: "complex-quadratics",
        title: "Quadratics with Complex Solutions",
        explanation:
          "When the discriminant is negative, the quadratic formula produces complex conjugate solutions. Write \\sqrt{-k} = i\\sqrt{k}.",
        formulas: ["\\sqrt{-k} = i\\sqrt{k},\\ k>0"],
        examples: [
          {
            problem: "Solve: x^2 + 2x + 5 = 0",
            steps: [
              "Δ = 4 - 20 = -16",
              "x = (-2 ± \\sqrt{-16})/2 = (-2 ± 4i)/2",
              "x = -1 ± 2i",
            ],
          },
        ],
        keywords: ["complex solution", "imaginary roots"],
      },
    ],
  },
  {
    id: "ch4",
    number: 4,
    title: "Rational Expressions & Equations",
    color: "pink",
    concepts: [
      {
        id: "simplify-rational",
        title: "Simplifying Rational Expressions",
        explanation:
          "A rational expression is a ratio of two polynomials. Simplify by factoring numerator and denominator and canceling common factors. Always state values that make the original denominator zero (excluded values).",
        formulas: ["\\dfrac{P(x)}{Q(x)},\\ Q(x)\\ne 0"],
        examples: [
          {
            problem: "Simplify: \\dfrac{x^2 - 9}{x^2 - x - 6}",
            steps: [
              "Factor: \\dfrac{(x-3)(x+3)}{(x-3)(x+2)}",
              "Cancel (x - 3): \\dfrac{x+3}{x+2},\\ x \\ne 3, -2",
            ],
          },
        ],
        keywords: ["rational", "simplify", "cancel"],
      },
      {
        id: "rational-ops",
        title: "Multiply, Divide, Add, Subtract",
        explanation:
          "Multiply numerators and denominators, then simplify. Divide by multiplying by the reciprocal. To add or subtract, find a common denominator (the LCD of the factored denominators).",
        formulas: [
          "\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{ac}{bd}",
          "\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\cdot \\dfrac{d}{c}",
        ],
        examples: [
          {
            problem: "Add: \\dfrac{1}{x} + \\dfrac{2}{x+1}",
            steps: [
              "LCD = x(x+1)",
              "= \\dfrac{x+1}{x(x+1)} + \\dfrac{2x}{x(x+1)} = \\dfrac{3x+1}{x(x+1)}",
            ],
          },
        ],
        keywords: ["LCD", "common denominator", "rational"],
      },
      {
        id: "solve-rational",
        title: "Solving Rational Equations",
        explanation:
          "Multiply both sides by the LCD to clear denominators, then solve the resulting polynomial equation. Always check for extraneous solutions—values that make any original denominator zero.",
        examples: [
          {
            problem: "Solve: \\dfrac{1}{x} + \\dfrac{1}{x+2} = \\dfrac{3}{4}",
            steps: [
              "Multiply by 4x(x+2): 4(x+2) + 4x = 3x(x+2)",
              "8x + 8 = 3x^2 + 6x",
              "3x^2 - 2x - 8 = 0; factor (3x+4)(x-2)=0",
              "x = 2 or x = -4/3 (both valid)",
            ],
          },
        ],
        keywords: ["rational equation", "extraneous", "LCD"],
      },
      {
        id: "holes-asymptotes",
        title: "Holes & Vertical Asymptotes",
        explanation:
          "After factoring, a factor that cancels with the numerator produces a hole at that x-value. A factor that remains in the denominator produces a vertical asymptote.",
        examples: [
          {
            problem: "Identify holes/asymptotes of f(x) = \\dfrac{(x-1)(x+2)}{(x-1)(x-3)}",
            steps: [
              "(x - 1) cancels → hole at x = 1",
              "(x - 3) remains → vertical asymptote x = 3",
            ],
          },
        ],
        keywords: ["hole", "vertical asymptote", "rational function"],
      },
    ],
  },
  {
    id: "ch5",
    number: 5,
    title: "Radical Expressions & Equations",
    color: "cyan",
    concepts: [
      {
        id: "simplify-radicals",
        title: "Simplifying Radicals",
        explanation:
          "Factor the radicand and pull out perfect nth powers. For square roots, look for perfect-square factors. Rationalize denominators by multiplying by an appropriate conjugate or radical.",
        formulas: [
          "\\sqrt[n]{ab} = \\sqrt[n]{a}\\sqrt[n]{b}",
          "\\sqrt[n]{\\dfrac{a}{b}} = \\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}}",
        ],
        examples: [
          {
            problem: "Simplify: \\sqrt{72}",
            steps: [
              "72 = 36 · 2",
              "\\sqrt{72} = \\sqrt{36}\\sqrt{2} = 6\\sqrt{2}",
            ],
          },
        ],
        keywords: ["radical", "simplify", "rationalize"],
      },
      {
        id: "rational-exponents",
        title: "Rational Exponents",
        explanation:
          "Rational exponents convert between root and power notation. The denominator is the index of the root; the numerator is the power.",
        formulas: ["a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m"],
        examples: [
          {
            problem: "Evaluate: 27^{2/3}",
            steps: [
              "27^{1/3} = 3",
              "3^2 = 9",
            ],
          },
        ],
        keywords: ["rational exponent", "fractional power", "root"],
      },
      {
        id: "solve-radicals",
        title: "Solving Radical Equations",
        explanation:
          "Isolate the radical, then raise both sides to the matching power. Repeat if more than one radical remains. Always check answers in the original equation, since squaring can introduce extraneous solutions.",
        examples: [
          {
            problem: "Solve: \\sqrt{x + 3} = x - 3",
            steps: [
              "Square both sides: x + 3 = x^2 - 6x + 9",
              "0 = x^2 - 7x + 6 = (x-1)(x-6)",
              "x = 1 or x = 6. Check: x=1 gives 2 = -2 (reject). x=6 gives 3 = 3 ✓",
              "Solution: x = 6",
            ],
          },
        ],
        keywords: ["radical equation", "extraneous"],
      },
      {
        id: "extraneous",
        title: "Extraneous Solutions",
        explanation:
          "An extraneous solution satisfies the transformed equation but not the original. They commonly appear after squaring both sides or clearing denominators. Always substitute back to verify.",
        keywords: ["extraneous", "check solutions"],
      },
    ],
  },
  {
    id: "ch6",
    number: 6,
    title: "Exponential & Logarithmic Functions",
    color: "purple",
    concepts: [
      {
        id: "exp-growth-decay",
        title: "Exponential Growth & Decay",
        explanation:
          "Exponential functions have the form f(x) = a·b^x. Growth occurs when b > 1, decay when 0 < b < 1. Continuous growth uses the natural base e: A(t) = A₀ e^{rt}.",
        formulas: [
          "A = A_0(1+r)^t",
          "A = A_0 e^{rt}",
        ],
        examples: [
          {
            problem: "A bacteria population doubles every 3 hours starting at 500. Population after 12 hours?",
            steps: [
              "P(t) = 500 · 2^{t/3}",
              "P(12) = 500 · 2^4 = 8000",
            ],
          },
        ],
        keywords: ["exponential", "growth", "decay", "compound"],
      },
      {
        id: "log-properties",
        title: "Properties of Logarithms",
        explanation:
          "Logarithms invert exponentials: log_b(x) = y means b^y = x. The product, quotient, and power rules let you expand or condense log expressions.",
        formulas: [
          "\\log_b(MN) = \\log_b M + \\log_b N",
          "\\log_b\\left(\\tfrac{M}{N}\\right) = \\log_b M - \\log_b N",
          "\\log_b(M^p) = p \\log_b M",
        ],
        examples: [
          {
            problem: "Expand: \\log_2\\!\\left(\\dfrac{x^3 y}{z}\\right)",
            steps: [
              "= \\log_2(x^3 y) - \\log_2 z",
              "= 3\\log_2 x + \\log_2 y - \\log_2 z",
            ],
          },
        ],
        keywords: ["logarithm", "log rules", "product", "quotient", "power"],
      },
      {
        id: "change-of-base",
        title: "Change of Base Formula",
        explanation:
          "Most calculators only compute log base 10 (log) or base e (ln). Use the change-of-base formula to evaluate logs of any base.",
        formulas: ["\\log_b a = \\dfrac{\\ln a}{\\ln b} = \\dfrac{\\log a}{\\log b}"],
        examples: [
          {
            problem: "Evaluate: \\log_5 17",
            steps: [
              "= \\dfrac{\\ln 17}{\\ln 5} \\approx \\dfrac{2.833}{1.609} \\approx 1.760",
            ],
          },
        ],
        keywords: ["change of base", "logarithm"],
      },
      {
        id: "solve-exp-log",
        title: "Solving Exponential & Log Equations",
        explanation:
          "For exponential equations, take a log of both sides. For log equations, condense both sides to single logs and exponentiate, then check for extraneous solutions (logs require positive arguments).",
        examples: [
          {
            problem: "Solve: 3^{x+1} = 20",
            steps: [
              "Take ln: (x+1)\\ln 3 = \\ln 20",
              "x + 1 = \\dfrac{\\ln 20}{\\ln 3} \\approx 2.727",
              "x \\approx 1.727",
            ],
          },
          {
            problem: "Solve: \\log_2(x) + \\log_2(x-2) = 3",
            steps: [
              "Combine: \\log_2(x(x-2)) = 3",
              "x(x-2) = 8 → x^2 - 2x - 8 = 0",
              "(x-4)(x+2) = 0; reject x = -2 (log undefined)",
              "x = 4",
            ],
          },
        ],
        keywords: ["solve", "exponential equation", "log equation"],
      },
      {
        id: "natural-log-e",
        title: "Natural Log (ln) & Euler's Number e",
        explanation:
          "The number e ≈ 2.71828 is the base of natural exponential growth. ln(x) = log_e(x). Natural logs and exponentials are inverses: ln(e^x) = x and e^{ln x} = x.",
        formulas: ["e \\approx 2.71828", "\\ln(e^x) = x", "e^{\\ln x} = x"],
        examples: [
          {
            problem: "Solve: e^{2x} = 7",
            steps: [
              "Take ln: 2x = \\ln 7",
              "x = \\dfrac{\\ln 7}{2} \\approx 0.973",
            ],
          },
        ],
        keywords: ["e", "natural log", "ln", "Euler"],
      },
    ],
  },
  {
    id: "ch7",
    number: 7,
    title: "Sequences & Series",
    color: "green",
    concepts: [
      {
        id: "arithmetic",
        title: "Arithmetic Sequences & Series",
        explanation:
          "An arithmetic sequence has a constant difference d between consecutive terms. The sum of the first n terms is the average of the first and last term, times n.",
        formulas: [
          "a_n = a_1 + (n-1)d",
          "S_n = \\dfrac{n}{2}(a_1 + a_n) = \\dfrac{n}{2}\\bigl(2a_1+(n-1)d\\bigr)",
        ],
        examples: [
          {
            problem: "Find S_{20} for 3, 7, 11, 15, ...",
            steps: [
              "a_1 = 3, d = 4",
              "a_{20} = 3 + 19·4 = 79",
              "S_{20} = (20/2)(3 + 79) = 10 · 82 = 820",
            ],
          },
        ],
        keywords: ["arithmetic", "common difference", "sum"],
      },
      {
        id: "geometric",
        title: "Geometric Sequences & Series",
        explanation:
          "A geometric sequence multiplies by a constant ratio r. The finite sum formula uses (1 - r^n)/(1 - r).",
        formulas: [
          "a_n = a_1 r^{n-1}",
          "S_n = a_1 \\dfrac{1 - r^n}{1 - r},\\ r \\ne 1",
        ],
        examples: [
          {
            problem: "Sum of first 6 terms of 2, 6, 18, 54, ...",
            steps: [
              "a_1 = 2, r = 3",
              "S_6 = 2 · (1 - 3^6)/(1 - 3) = 2 · (1 - 729)/(-2) = 728",
            ],
          },
        ],
        keywords: ["geometric", "ratio", "sum"],
      },
      {
        id: "sigma",
        title: "Summation (Sigma) Notation",
        explanation:
          "Sigma notation compactly writes sums. The variable below Σ is the index; the value above is the upper limit. Useful identities include sums of constants, integers, and squares.",
        formulas: [
          "\\sum_{i=1}^{n} c = cn",
          "\\sum_{i=1}^{n} i = \\dfrac{n(n+1)}{2}",
          "\\sum_{i=1}^{n} i^2 = \\dfrac{n(n+1)(2n+1)}{6}",
        ],
        examples: [
          {
            problem: "Evaluate: \\sum_{i=1}^{4}(2i + 1)",
            steps: [
              "= (3) + (5) + (7) + (9) = 24",
            ],
          },
        ],
        keywords: ["sigma", "summation", "series"],
      },
      {
        id: "infinite-geom",
        title: "Infinite Geometric Series",
        explanation:
          "An infinite geometric series converges only when |r| < 1. The sum then approaches a finite value.",
        formulas: ["S_\\infty = \\dfrac{a_1}{1 - r},\\ |r|<1"],
        examples: [
          {
            problem: "Sum 4 + 2 + 1 + 1/2 + ...",
            steps: [
              "a_1 = 4, r = 1/2",
              "S_\\infty = 4/(1 - 1/2) = 8",
            ],
          },
        ],
        keywords: ["infinite series", "convergence", "geometric"],
      },
    ],
  },
  {
    id: "ch8",
    number: 8,
    title: "Conic Sections",
    color: "pink",
    concepts: [
      {
        id: "parabola",
        title: "Parabolas",
        explanation:
          "A parabola is the set of points equidistant from a focus and a directrix. Standard forms with vertex (h, k) point either vertically or horizontally depending on which variable is squared.",
        formulas: [
          "(x - h)^2 = 4p(y - k) \\quad \\text{(opens vertically)}",
          "(y - k)^2 = 4p(x - h) \\quad \\text{(opens horizontally)}",
        ],
        examples: [
          {
            problem: "Vertex and direction of (x-2)^2 = 8(y+1)",
            steps: [
              "Vertex: (2, -1)",
              "4p = 8 → p = 2 > 0, opens upward",
            ],
          },
        ],
        keywords: ["parabola", "focus", "directrix", "vertex"],
      },
      {
        id: "circle",
        title: "Circles",
        explanation:
          "All points equidistant (radius r) from a center (h, k). Standard form makes graphing immediate.",
        formulas: ["(x - h)^2 + (y - k)^2 = r^2"],
        examples: [
          {
            problem: "Center & radius of x^2 + y^2 - 6x + 4y = 12",
            steps: [
              "Group & complete the square: (x-3)^2 - 9 + (y+2)^2 - 4 = 12",
              "(x-3)^2 + (y+2)^2 = 25",
              "Center (3, -2), radius 5",
            ],
          },
        ],
        keywords: ["circle", "radius", "center"],
      },
      {
        id: "ellipse",
        title: "Ellipses",
        explanation:
          "An ellipse is stretched in two directions. The larger denominator denotes the major axis. With center (h, k), a is the semi-major axis and b is the semi-minor axis.",
        formulas: ["\\dfrac{(x-h)^2}{a^2} + \\dfrac{(y-k)^2}{b^2} = 1"],
        examples: [
          {
            problem: "Identify axes of \\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1",
            steps: [
              "a = 5 (along x), b = 3 (along y)",
              "Major axis horizontal, length 10; minor axis vertical, length 6",
            ],
          },
        ],
        keywords: ["ellipse", "major axis", "minor axis", "foci"],
      },
      {
        id: "hyperbola",
        title: "Hyperbolas",
        explanation:
          "A hyperbola has two opening branches. The variable with the positive coefficient indicates the opening direction. Asymptotes guide the branches.",
        formulas: [
          "\\dfrac{(x-h)^2}{a^2} - \\dfrac{(y-k)^2}{b^2} = 1 \\ (\\text{opens horizontally})",
          "\\dfrac{(y-k)^2}{a^2} - \\dfrac{(x-h)^2}{b^2} = 1 \\ (\\text{opens vertically})",
        ],
        examples: [
          {
            problem: "Asymptotes of \\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1",
            steps: [
              "a = 4, b = 3, center (0,0)",
              "y = ± (b/a)x = ± (3/4)x",
            ],
          },
        ],
        keywords: ["hyperbola", "asymptote", "branch"],
      },
    ],
  },
  {
    id: "ch9",
    number: 9,
    title: "Matrices",
    color: "cyan",
    concepts: [
      {
        id: "matrix-ops",
        title: "Matrix Operations",
        explanation:
          "Matrices of the same dimensions can be added or subtracted entry-by-entry. Scalar multiplication multiplies every entry by the scalar.",
        formulas: ["(A + B)_{ij} = A_{ij} + B_{ij}", "(cA)_{ij} = c \\cdot A_{ij}"],
        examples: [
          {
            problem: "Compute 2A - B for A = [[1,2],[3,4]], B = [[0,5],[1,2]]",
            steps: [
              "2A = [[2,4],[6,8]]",
              "2A - B = [[2,-1],[5,6]]",
            ],
          },
        ],
        keywords: ["matrix", "scalar", "add", "subtract"],
      },
      {
        id: "matrix-mult",
        title: "Matrix Multiplication",
        explanation:
          "An m×n matrix multiplied by an n×p matrix yields an m×p matrix. Each entry is the dot product of a row of A with a column of B. Matrix multiplication is NOT commutative.",
        formulas: ["(AB)_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}"],
        examples: [
          {
            problem: "[[1,2],[3,4]] · [[5,6],[7,8]]",
            steps: [
              "Row 1: (1·5+2·7, 1·6+2·8) = (19, 22)",
              "Row 2: (3·5+4·7, 3·6+4·8) = (43, 50)",
              "Result: [[19,22],[43,50]]",
            ],
          },
        ],
        keywords: ["matrix multiplication", "dot product"],
      },
      {
        id: "determinant",
        title: "Determinants",
        explanation:
          "The determinant of a square matrix is a scalar that indicates invertibility. det = 0 means the matrix is singular (no inverse). For 2×2 use ad − bc; for 3×3 use cofactor expansion.",
        formulas: [
          "\\det\\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix} = ad - bc",
        ],
        examples: [
          {
            problem: "det of [[3,4],[1,2]]",
            steps: ["= 3·2 - 4·1 = 2"],
          },
        ],
        keywords: ["determinant", "singular", "det"],
      },
      {
        id: "inverse",
        title: "Inverse Matrices",
        explanation:
          "A square matrix A is invertible iff det(A) ≠ 0. The inverse satisfies A·A⁻¹ = I. For 2×2 there is a quick formula.",
        formulas: [
          "A^{-1} = \\dfrac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
        ],
        examples: [
          {
            problem: "Inverse of [[2,5],[1,3]]",
            steps: [
              "det = 2·3 - 5·1 = 1",
              "A^{-1} = [[3,-5],[-1,2]]",
            ],
          },
        ],
        keywords: ["inverse matrix", "identity"],
      },
      {
        id: "systems-matrix",
        title: "Solving Systems with Matrices",
        explanation:
          "Write a system as AX = B. Solve by X = A⁻¹B (when A is invertible), Gaussian elimination on the augmented matrix [A|B], or Cramer's Rule using determinants.",
        formulas: [
          "x_i = \\dfrac{\\det(A_i)}{\\det(A)} \\quad \\text{(Cramer's Rule)}",
        ],
        examples: [
          {
            problem: "Solve via Cramer: 2x + y = 5, x - y = 1",
            steps: [
              "det A = 2(-1) - 1(1) = -3",
              "det A_x = 5(-1) - 1(1) = -6 → x = 2",
              "det A_y = 2(1) - 5(1) = -3 → y = 1",
            ],
          },
        ],
        keywords: ["Gaussian elimination", "Cramer's rule", "augmented matrix"],
      },
    ],
  },
  {
    id: "ch10",
    number: 10,
    title: "Probability & Statistics",
    color: "purple",
    concepts: [
      {
        id: "perm-comb",
        title: "Permutations & Combinations",
        explanation:
          "Permutations count arrangements where order matters. Combinations count selections where order does not matter.",
        formulas: [
          "P(n,r) = \\dfrac{n!}{(n-r)!}",
          "C(n,r) = \\binom{n}{r} = \\dfrac{n!}{r!(n-r)!}",
        ],
        examples: [
          {
            problem: "From 10 students, choose a 3-person committee.",
            steps: [
              "Order doesn't matter → combination",
              "C(10,3) = 10!/(3!·7!) = 120",
            ],
          },
        ],
        keywords: ["permutation", "combination", "factorial"],
      },
      {
        id: "binomial-theorem",
        title: "Binomial Theorem",
        explanation:
          "The Binomial Theorem expands (a + b)^n as a sum of terms involving binomial coefficients. The (k+1)-th term has coefficient C(n, k).",
        formulas: [
          "(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^{k}",
        ],
        examples: [
          {
            problem: "Expand (x + 2)^4",
            steps: [
              "Coefficients C(4,k) = 1,4,6,4,1",
              "= x^4 + 4x^3(2) + 6x^2(4) + 4x(8) + 16",
              "= x^4 + 8x^3 + 24x^2 + 32x + 16",
            ],
          },
        ],
        keywords: ["binomial theorem", "Pascal", "expansion"],
      },
      {
        id: "probability-rules",
        title: "Basic Probability Rules",
        explanation:
          "Probability of an event is favorable outcomes divided by total outcomes. Use addition for unions and multiplication for independent events.",
        formulas: [
          "P(A) = \\dfrac{\\#\\text{favorable}}{\\#\\text{total}}",
          "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
          "P(A \\cap B) = P(A)\\,P(B) \\quad \\text{(independent)}",
        ],
        examples: [
          {
            problem: "Roll two dice. P(sum = 7)?",
            steps: [
              "Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6",
              "Total = 36; P = 6/36 = 1/6",
            ],
          },
        ],
        keywords: ["probability", "independent", "union", "intersection"],
      },
      {
        id: "normal-dist",
        title: "Normal Distribution (Intro)",
        explanation:
          "The normal distribution is a symmetric bell-shaped curve characterized by its mean μ and standard deviation σ. The Empirical Rule states that about 68% of values fall within 1σ of the mean, 95% within 2σ, and 99.7% within 3σ.",
        formulas: [
          "z = \\dfrac{x - \\mu}{\\sigma}",
        ],
        examples: [
          {
            problem: "Test scores have μ = 70, σ = 10. % of scores between 60 and 80?",
            steps: [
              "60 and 80 are exactly 1σ away from the mean.",
              "By the Empirical Rule, ≈ 68% of scores lie in this range.",
            ],
          },
        ],
        keywords: ["normal distribution", "z-score", "empirical rule", "standard deviation"],
      },
    ],
  },
];