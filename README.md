# Algebra 2 Reference

영어권 대수 2(Algebra 2) 학습용 레퍼런스 사이트입니다. 10개 챕터의 공식과 예제를 KaTeX로 렌더링하고, 실시간 검색과 챕터별 인터랙티브 계산기를 제공합니다.

An Algebra 2 study reference covering all 10 chapters, with KaTeX-rendered formulas, worked examples, live search, and interactive calculators.

## 기술 스택

Vite · React · TypeScript · Tailwind CSS · shadcn/ui · KaTeX

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:8080
```

## 스크립트

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (`dist/`) |
| `npm run lint` | ESLint |
| `npm test` | Vitest |

## 배포

Vercel에 GitHub 저장소를 연결해 배포합니다 (Framework: Vite, Build: `npm run build`, Output: `dist`). `main`에 push하면 자동으로 재배포됩니다.
