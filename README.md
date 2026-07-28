# 구지훈 — 백엔드 개발자 웹 포트폴리오

DB/백엔드 없이 React에 콘텐츠를 하드코딩한 정적 포트폴리오입니다.
(Vite + React + TypeScript + Tailwind CSS)

## 실행

```bash
npm install
npm run dev      # 개발 서버 (기본 http://localhost:5173 — 포트 사용 중이면 5174, 5175... 로 자동 변경)
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 로컬 확인
```

## 구조

```
src/
├── components/
│   ├── Layout.tsx          # 헤더/푸터/라우트 골격 + 연락처(CONTACT) 정의
│   ├── ProjectHeader.tsx   # 프로젝트 상세 페이지 상단 공통 헤더 (GitHub 링크 포함)
│   ├── TroubleCard.tsx     # 트러블슈팅 카드 (문제→원인→해결→결과 + 펼치기)
│   └── ui.tsx              # Section, SectionNav, Figure, CodeBlock, Expand 등 공용 UI
└── pages/
    ├── Home.tsx            # 메인 (소개·타임라인·자격증·스킬·프로젝트·Aim Pro) — 내용 수정은 여기
    ├── Fantry.tsx          # Fantry 상세 (대표 프로젝트)
    ├── Ddasoom.tsx         # Ddasoom 상세
    └── IntelliMarket.tsx   # intelliMarket 상세
public/images/              # 프로젝트별 스크린샷·다이어그램 (+ profile.png 증명사진)
```

- 내용 수정은 각 페이지 파일(`src/pages/*.tsx`)의 텍스트를 직접 고치면 됩니다.
- 연락처(이메일·GitHub)는 `src/components/Layout.tsx`의 `CONTACT` 상수 한 곳에서 관리합니다.
- 존재하지 않는 경로는 404 페이지(`App.tsx`의 NotFound)로 처리됩니다.

## Firebase Hosting 배포

`firebase.json`에 SPA 리라이트 설정이 되어 있습니다.

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # 기존 firebase.json 유지 선택, public 디렉토리: dist
npm run build
firebase deploy
```

> react-router의 BrowserRouter를 쓰므로, 다른 호스팅으로 옮길 경우에도
> "모든 경로 → /index.html" 리라이트 설정이 필요합니다.

## 배포 당일 체크리스트

1. **OG 태그** — `index.html` 주석 참고: `og:url` 추가 + 1200×630 썸네일을 `public/og.png`로 만들어 `og:image`를 **절대 URL**로 지정
2. **GitHub 링크 6개 실제 클릭 확인** — 팀 저장소(SeSac-3, SinsegeaBackend-8th-Team4, hye000ne)가 전부 열리는지
3. **팀 저장소 README 이정표** — 각 저장소 README에 "내 담당: 패키지/주요 PR 링크" 추가 (심사위원이 10초 안에 내 코드를 찾도록)
