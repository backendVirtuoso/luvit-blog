# Luvit Blog 프로젝트 소개

본 레포지토리는 NestJS 기반 백엔드(`luvit-nestjs`)와 React + Vite 기반 프론트엔드(`luvit-react`)로 구성된 모던 블로그/커뮤니티 서비스입니다. Prisma, PostgreSQL, TailwindCSS 등 최신 스택을 활용하여 확장성과 유지보수성을 고려한 구조로 설계되었습니다.

## 주요 기능

### luvit-nestjs (백엔드)

- NestJS 기반 RESTful API 서버
- Prisma ORM을 통한 PostgreSQL 연동
- 사용자 인증 및 권한 관리
- 게시글, 댓글, 좋아요 등 커뮤니티 기능
- 테스트 코드 및 E2E 테스트 환경 제공
- 모듈 기반 구조 (확장성 용이)
- 환경 변수 및 설정 파일 분리 관리

### luvit-react (프론트엔드)

- React 19, Vite 기반 SPA
- TailwindCSS, PostCSS를 활용한 반응형 UI
- 로그인/회원가입, 게시글 목록/상세/작성/수정/삭제
- 댓글, 좋아요, 구독 등 소셜 기능
- Context API를 통한 상태 관리
- 컴포넌트 기반 설계 및 재사용성 강화
- 페이지별 라우팅 및 접근 제어

## 폴더 구조

```
luvit-blog/
├─ luvit-nestjs/      # NestJS 백엔드
│  ├─ src/            # 주요 소스코드 및 모듈
│  ├─ prisma/         # Prisma 스키마 및 마이그레이션
│  ├─ images/         # 이미지 리소스
│  ├─ test/           # 테스트 코드
│  └─ ...             # 설정 파일 등
├─ luvit-react/       # React 프론트엔드
│  ├─ src/            # 주요 소스코드 및 컴포넌트
│  ├─ public/         # 정적 리소스
│  └─ ...             # 설정 파일 등
```

## 설치 및 실행 방법

### 필수 요구사항

- Node.js 18 이상
- PostgreSQL 데이터베이스
- (선택) Bun, Vite, Prisma, TailwindCSS, Clerk 등 계정 및 API Key

### 백엔드 (luvit-nestjs)

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# 데이터베이스 마이그레이션 및 시드
npx prisma migrate dev
npx prisma generate

# 서버 실행
npm run start:dev
```

### 프론트엔드 (luvit-react)

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) (Vite 기본 포트) 또는 [http://localhost:3000](http://localhost:3000) (NestJS 기본 포트)로 접속하여 결과를 확인하세요.

## 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 검사
- `npm run test` - 테스트 실행

## 참고 자료

- [NestJS 공식 문서](https://docs.nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [React 공식 문서](https://react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Clerk Auth](https://clerk.com/)
