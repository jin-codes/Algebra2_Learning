# Algebra 2 Reference

> 영어권 교과과정(Algebra 2)을 위한 깔끔한 다크 테마 학습 레퍼런스
> A clean, dark-themed study reference for English-language Algebra 2.

**🔗 Live site: [algebra2learning.vercel.app](https://algebra2learning.vercel.app)**

---

## 소개 · About

Algebra 2를 공부하다 보면 "그 공식이 뭐였더라?"를 찾느라 교과서와 검색창을 오가게 됩니다. 이 프로젝트는 그 시간을 줄이기 위해 만들었습니다. 10개 챕터, 42개 개념을 **개념 설명 → 핵심 공식 → 풀이 예제**의 일관된 구조로 정리하고, 챕터마다 직접 값을 넣어 확인할 수 있는 계산기를 붙였습니다.

Studying Algebra 2 often means flipping between a textbook and a search bar just to recall one formula. This project puts everything in one place: **10 chapters, 42 concepts**, each with a plain explanation, the key formulas, and step-by-step worked examples, plus a small interactive calculator per chapter.

## 주요 기능 · Features

- **KaTeX 수식 렌더링**: 모든 공식이 교과서처럼 선명하게 표시됩니다.
- **실시간 검색**: 주제, 공식, 키워드로 즉시 필터링합니다.
- **풀이 예제**: 문제와 단계별 풀이를 함께 제공합니다.
- **챕터별 인터랙티브 계산기**: 값을 바꿔 가며 결과를 바로 확인합니다.
- **다크 테마 & 반응형 UI**: 데스크톱과 모바일 모두에서 읽기 편합니다.
- **정적 사이트**: 서버와 계정이 없고, 어디에나 배포할 수 있습니다.

## 커리큘럼 · Curriculum

| # | Chapter | 인터랙티브 |
|---|---|---|
| 1 | Review of Algebra 1 Fundamentals | Slope-Intercept Line |
| 2 | Polynomials & Polynomial Functions | Remainder Theorem Evaluator |
| 3 | Quadratics & Complex Numbers | Quadratic Formula Solver |
| 4 | Rational Expressions & Equations | Rational Function Evaluator |
| 5 | Radical Expressions & Equations | Rational Exponent Calculator |
| 6 | Exponential & Logarithmic Functions | Continuous Growth Calculator |
| 7 | Sequences & Series | Arithmetic Series Sum |
| 8 | Conic Sections | Point-on-Circle Checker |
| 9 | Matrices | 2×2 Determinant Calculator |
| 10 | Probability & Statistics | Combinations C(n, r) |

## 기술 스택 · Tech Stack

[Vite](https://vitejs.dev) · [React](https://react.dev) · TypeScript · [Tailwind CSS](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com) · [KaTeX](https://katex.org) · Vitest

## 시작하기 · Getting Started

Node.js 18 이상이 필요합니다.

```bash
git clone https://github.com/jin-codes/Algebra2_Learning.git
cd Algebra2_Learning
npm install
npm run dev
```

브라우저에서 http://localhost:8080 을 열면 됩니다.

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (`dist/`) |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |
| `npm test` | Vitest 실행 |

## 프로젝트 구조 · Project Structure

```
src/
├── data/
│   ├── curriculum.ts          # 챕터·개념·공식·예제 (콘텐츠는 여기에!)
│   └── chapterInteractives.ts # 챕터별 계산기 정의
├── pages/Index.tsx            # 메인 페이지 (검색, 사이드바, 챕터 뷰)
└── components/ui/             # shadcn/ui 컴포넌트
```

콘텐츠가 **데이터 파일에 분리**되어 있어서, 화면 코드를 건드리지 않고 내용만 추가·수정할 수 있습니다.

## 기여하기 · Contributing

오타 수정, 풀이 오류 제보, 새 개념·예제 추가 모두 환영합니다.

1. 이 저장소를 Fork 합니다.
2. 브랜치를 만듭니다. `git checkout -b fix/quadratic-example`
3. `src/data/curriculum.ts`에 개념을 추가하려면 아래 형식을 따릅니다.

   ```ts
   {
     id: "my-concept",
     title: "Concept Title",
     explanation: "Short, plain-language explanation.",
     formulas: ["ax^2 + bx + c = 0"],            // KaTeX 문법
     examples: [{ problem: "…", steps: ["…", "…"] }],
     keywords: ["search", "terms"],               // 검색에 쓰임
   }
   ```

4. `npm run lint && npm run build`가 통과하는지 확인합니다.
5. Pull Request를 보냅니다.

수학 내용의 오류를 발견했다면 [Issue](https://github.com/jin-codes/Algebra2_Learning/issues)로 알려주세요. 어떤 챕터의 어떤 부분인지 적어주시면 큰 도움이 됩니다.

## 배포 · Deployment

Vercel에 GitHub 저장소를 연결해 배포합니다 (Framework: Vite, Build: `npm run build`, Output: `dist`). `main`에 push하면 자동으로 재배포됩니다.
