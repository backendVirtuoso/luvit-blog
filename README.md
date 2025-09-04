# luvit-blog 프로젝트 구조

## 루트 디렉터리
- `luvit-nestjs/` : 백엔드 NestJS 서버 프로젝트
- `luvit-react/` : 프론트엔드 React(Vite 기반) 프로젝트

---

## luvit-nestjs (백엔드)

NestJS 기반의 서버 애플리케이션. Prisma를 사용하여 데이터베이스와 연동합니다.

### 주요 파일 및 폴더
- `src/` : 소스 코드
  - `app.controller.ts` : 메인 컨트롤러
  - `app.service.ts` : 비즈니스 로직 서비스
  - `app.module.ts` : 루트 모듈
  - `main.ts` : 애플리케이션 진입점
  - `prisma/` : Prisma 관련 모듈 및 서비스
    - `prisma.module.ts` : Prisma 모듈
    - `prisma.service.ts` : Prisma 서비스
- `prisma/`
  - `schema.prisma` : Prisma 스키마 파일
- `images/` : 이미지 리소스 폴더
- `test/` : 테스트 코드
  - `app.e2e-spec.ts` : E2E 테스트
- 환경설정 및 빌드 관련 파일
  - `package.json` : 의존성 및 스크립트
  - `tsconfig.json`, `tsconfig.build.json` : TypeScript 설정
  - `eslint.config.mjs`, `.prettierrc` : 코드 스타일 설정
  - `nest-cli.json` : NestJS CLI 설정

---

## luvit-react (프론트엔드)

React와 Vite를 기반으로 한 프론트엔드 애플리케이션. TailwindCSS를 사용합니다.

### 주요 파일 및 폴더
- `src/` : 소스 코드
  - `App.tsx` : 루트 컴포넌트
  - `main.tsx` : 진입점
  - `layout.tsx` : 레이아웃 컴포넌트
  - `components/` : UI 컴포넌트
    - `postcard.component.tsx` : 게시글 카드 컴포넌트
  - `context/` : React Context API 관련 파일
    - `login.context.tsx` : 로그인 상태 관리
    - `post.context.tsx` : 게시글 상태 관리
  - `pages/` : 페이지 컴포넌트
    - `main.page.tsx` : 메인 페이지
    - `login.page.tsx` : 로그인 페이지
    - `publish.page.tsx` : 게시글 작성 페이지
    - `detail.page.tsx` : 게시글 상세 페이지
    - `index.tsx` : 페이지 인덱스
  - `assets/` : 이미지 및 기타 에셋
- 환경설정 및 빌드 관련 파일
  - `package.json` : 의존성 및 스크립트
  - `vite.config.ts` : Vite 설정
  - `tailwind.config.js`, `postcss.config.js` : 스타일 설정
  - `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` : TypeScript 설정
  - `eslint.config.js` : 코드 스타일 설정

---

## 요약

- `luvit-nestjs` : NestJS + Prisma 기반의 백엔드 서버
- `luvit-react` : React + Vite + TailwindCSS 기반의 프론트엔드
- 각 프로젝트는 독립적으로 환경설정 및 소스코드를 관리하며, REST API 등으로 연동될 수 있습니다.
