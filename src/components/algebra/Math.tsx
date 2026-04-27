import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export const M = ({ children }: { children: string }) => (
  <InlineMath math={children} />
);

export const MB = ({ children }: { children: string }) => (
  <BlockMath math={children} />
);