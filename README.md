## 🛠 Tech Stack

### Package Manager

- **pnpm**
  - 빠른 설치 속도와 효율적인 디스크 사용

---

### Framework

- **Next.js (React)**
  - App Router 기반 구조
  - SSR / CSR 혼합 렌더링 지원
  - 파일 기반 라우팅으로 직관적인 구조 설계

---

### State Management

#### Client State

- **Zustand**
  - 가볍고 간결한 전역 상태 관리
  - 최소한의 보일러플레이트로 빠른 개발 가능
  - 컴포넌트 간 상태 공유에 최적화

**사용 범위**

- 반려동물 동반 여부 필터
- 사용자 선택 상태 (선택된 코스 등)
- UI 상태 (지도 위치, 토글 등)

---

#### Server State

- **React Query (TanStack Query)**
  - 서버 데이터 캐싱 및 동기화
  - 자동 refetch 및 비동기 상태 관리
  - 로딩 / 에러 처리 간소화

**사용 범위**

- 여행 코스 추천 데이터 조회
- 장소 리스트 및 상세 정보 요청
- 필터 변경에 따른 데이터 재요청 및 캐싱

---

### 📌 State Management Strategy

| 구분         | 도구        | 설명                       |
| ------------ | ----------- | -------------------------- |
| Client State | Zustand     | UI 상태 및 사용자 인터랙션 |
| Server State | React Query | API 기반 비동기 데이터     |

→ 상태를 역할별로 분리하여 불필요한 리렌더링을 줄이고 유지보수성을 확보

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router (페이지 및 라우팅)
│   ├── layout.tsx
│   ├── page.tsx          # 홈
│   ├── explore/          # 코스 탐색 페이지
│   │   └── page.tsx
│   ├── course/
│   │   └── [id]/page.tsx # 코스 상세
│   └── api/              # Route Handler (서버 API)
│
├── features/             # 도메인(기능) 단위 모듈
│   ├── course/           # 여행 코스 관련 기능
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/     # API 요청 및 비즈니스 로직
│   │   └── types.ts
│   │
│   ├── pet/              # 반려동물 필터 기능
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   │
│   └── map/              # 지도 관련 기능
│       ├── components/
│       └── hooks/
│
├── components/           # 공통 UI 컴포넌트 (재사용)
│   ├── Button/
│   ├── Card/
│   ├── Modal/
│   └── Chart/
│
├── store/                # Zustand (클라이언트 상태)
│   ├── filterStore.ts
│   ├── courseStore.ts
│   └── mapStore.ts
│
├── hooks/                # 전역 커스텀 훅
├── lib/                  # 외부 라이브러리 설정 (axios 등)
├── styles/               # 전역 스타일
├── constants/            # 상수 관리
├── types/                # 공통 타입 정의
└── utils/                # 유틸 함수
```
