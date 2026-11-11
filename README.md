# 어바웃트립 웹 (React)

디자인 캔버스의 화면 7개를 React 앱 하나로 옮기고, 버튼과 메뉴로 서로 이어지게 만든 프로젝트예요.
데이터는 아직 `src/data.js`의 샘플 데이터를 쓰고, 백엔드는 없어요.

## 실행 방법

[Node.js](https://nodejs.org) 18 이상(LTS 권장)을 설치한 뒤, 이 폴더에서 아래 명령을 실행하세요.

```bash
npm install     # 처음 한 번만 (react, react-router-dom, vite 설치)
npm run dev     # 개발 서버 실행 → 브라우저에서 http://localhost:5173 이 열려요
```

- 파일을 고치고 저장하면 브라우저가 바로 바뀌어요.
- `npm run build` → `dist/` 폴더에 배포용 파일이 만들어지고, `npm run preview`로 확인할 수 있어요.
- `dist/index.html`을 더블클릭해서 여는 방식(file://)으로는 동작하지 않아요. 꼭 `npm run dev` 또는 `npm run preview`로 열어주세요.

## 화면 주소

| 주소 | 화면 | 파일 |
|---|---|---|
| `/` | 처음 화면(홈) | `src/pages/Home.jsx` |
| `/login` | 로그인 | `src/pages/Login.jsx` |
| `/explore` | 콘텐츠 탐색 (`?region=부산&type=여행 루트&q=카페`) | `src/pages/Explore.jsx` |
| `/routes/:id` | 루트·게시물 상세 (예: `/routes/busan-sea`) | `src/pages/RouteDetail.jsx` |
| `/map` | 지도 (`?place=광안리 해변`) | `src/pages/MapPage.jsx` |
| `/community` | 소셜 커뮤니티 | `src/pages/Community.jsx` |
| `/my-trip` | 원클릭으로 가져온 내 여행 일정 | `src/pages/MyTrip.jsx` |

## 화면이 이어지는 원리 (React Router)

HTML 파일을 여러 개 두는 대신, 페이지 하나에서 **주소에 따라 다른 컴포넌트를 보여주는** 방식이에요.

1. `src/main.jsx` — 앱 전체를 `<BrowserRouter>`로 감싸요.
2. `src/App.jsx` — `<Route path="/map" element={<MapPage />} />`처럼 주소와 화면을 짝지어요.
3. 화면을 옮겨 가는 방법은 두 가지예요.
   - 링크: `<Link to="/explore">탐색</Link>` (일반 `<a href>` 대신 사용, 새로고침 없음)
   - 코드로 이동: `const navigate = useNavigate(); navigate('/my-trip');`
4. 주소에서 값 꺼내기
   - `/routes/:id` → `const { id } = useParams();`
   - `?region=부산` → `const [params] = useSearchParams(); params.get('region')`
5. 헤더 메뉴는 `<NavLink>`를 써서, 지금 보고 있는 화면의 메뉴에 자동으로 강조 표시가 들어가요.

### 화면끼리 상태 공유 (Context)

`src/context/AppContext.jsx`에 여러 화면이 같이 쓰는 값을 모아뒀어요.

- `user`, `login()`: 로그인하면 헤더가 "로그인/시작하기"에서 "글쓰기/내 프로필"로 바뀌어요.
- `isSaved()`, `toggleSave()`: 저장한 루트예요.
- `trip`, `startTrip(routeId)`: **원클릭 여행 시작**이에요. 루트의 장소들을 복사해 내 여행 일정으로 만들어요.
- `addPlace()`, `setDayPlaces()`: 지도에서 장소를 추가하고, 내 여행에서 순서를 바꾸거나 삭제해요.

지금은 브라우저 메모리에만 저장돼서, 새로고침하면 처음 상태로 돌아가요.

## 연결된 흐름

- 홈 → "원클릭 여행 시작하기" → 내 여행 (부산 루트가 일정으로 복사됨)
- 홈 해시태그 → 지역 필터가 적용된 탐색 → 카드 → 상세 → 원클릭 → 내 여행
- 상세 "지도에서 보기" → 지도 (해당 장소 선택됨) → "내 여행에 추가" → 내 여행
- 커뮤니티에서 로그인 없이 "게시" → 로그인 화면 → 로그인 후 원래 화면으로 복귀
- 내 여행 "원본 보기" → 원래 루트 상세

## 다음 단계: 백엔드 붙이기 (Node.js + Express + SQLite)

1. 프로젝트 옆에 `server/` 폴더를 만들고 `npm i express better-sqlite3`를 설치해요.
2. API를 만들어요. 예: `GET /api/routes`, `GET /api/routes/:id`, `POST /api/login`, `POST /api/posts`, `GET·PUT /api/trips/me`
3. `vite.config.js`에 프록시를 추가해서, 프론트에서 `/api` 요청이 서버로 가게 해요.
   ```js
   server: { proxy: { '/api': 'http://localhost:3001' } }
   ```
4. 이제 `data.js`를 import하던 곳을 `fetch('/api/routes')`로, `AppContext`의 함수들을 API 호출로 바꾸면 돼요.
   코드 안에 `// 백엔드 연결 시:` 주석으로 바꿀 위치를 표시해뒀어요.

## 폴더 구조

```
src/
  main.jsx            앱 시작점 (BrowserRouter)
  App.jsx             주소 ↔ 화면 연결
  styles.css          색·버튼·레이아웃 공통 스타일
  data.js             샘플 데이터 (나중에 API로 교체)
  context/AppContext.jsx
  components/         Header, MiniMap(그림 지도), Photo, Icons
  pages/              화면 7개
```

지도는 그림으로 그린 가짜 지도예요. 실제 지도는 카카오맵·네이버지도 API로 `MiniMap` 컴포넌트를 바꾸면 돼요.
