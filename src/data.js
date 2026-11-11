// 샘플 데이터. 나중에 백엔드(Express + SQLite)를 붙이면
// 이 파일 대신 fetch('/api/routes') 같은 API 응답을 쓰면 됩니다.

export const CATEGORY = {
  맛집: { color: '#B23A0A', short: '맛' },
  카페: { color: '#7A5230', short: '카' },
  관광지: { color: '#0B6E6E', short: '관' },
  숙소: { color: '#3B4A9A', short: '숙' },
};

const p = (name, cat, x, y, tone, extra = {}) => ({ id: name, name, cat, x, y, tone, ...extra });

export const ROUTES = [
  {
    id: 'busan-sea', kind: '루트', region: '부산', title: '부산 1박 2일 바다 코스',
    author: '@바다보러가자', initial: '바', authorTone: '#CBE0E8', creator: true,
    likes: 3200, saves: '2.1천', tone: '#BFD9E2', photo: '광안리 야경',
    days: '1박 2일', move: '도보·버스', visited: '2026년 10월 방문 · 3일 전 작성',
    desc: '해운대에서 시작해서 광안리 야경으로 마무리하는 코스예요. 첫날은 해운대 주변을 걸어서, 둘째 날은 민락·기장 쪽으로 이동했어요. 동백섬 산책로는 아침에 가면 한적해서 좋아요!',
    tags: ['부산여행', '1박2일', '바다', '야경', '해운대맛집'],
    places: [
      p('해운대 해수욕장', '관광지', 18, 26, '#BFD9E2', { day: 1, stay: '1시간', memo: '아침 산책 추천. 해변 따라 동백섬까지 이어져요.' }),
      p('해리단길 브런치 카페', '카페', 34, 50, '#E8D9C7', { day: 1, stay: '1시간', memo: '옛 해운대역 뒤 골목. 창가 자리가 예뻐요.' }),
      p('동백섬 누리마루', '관광지', 54, 36, '#CFE2C8', { day: 1, stay: '40분', memo: '산책로 한 바퀴 30분. 광안대교 뷰 포인트.' }),
      p('광안리 해변', '관광지', 68, 62, '#C9DCEB', { day: 1, stay: '저녁 · 야경', memo: '해 지고 나서 광안대교 조명 꼭 보세요.' }),
      p('민락동 횟집 골목', '맛집', 80, 46, '#F1D4C8', { day: 2, stay: '점심 1시간 30분', memo: '모둠회 추천. 2층 오션뷰 자리 있어요.' }),
      p('해동용궁사', '관광지', 88, 74, '#E4DCCF', { day: 2, stay: '1시간', memo: '바다 위 절. 주말엔 이른 시간 방문 추천.' }),
    ],
  },
  {
    id: 'seongsu-cafe', kind: '루트', region: '서울', title: '성수동 카페 & 소품샵 반나절',
    author: '@서울산책러', initial: '산', authorTone: '#EADFCB', creator: true,
    likes: 1900, saves: '1.4천', tone: '#E8D9C7', photo: '성수 카페 골목', days: '반나절', move: '도보',
    visited: '2026년 9월 방문', desc: '성수역에서 시작해 서울숲까지 걸으며 들르는 카페와 소품샵 코스예요.',
    tags: ['서울', '성수', '카페투어'],
    places: [
      p('성수 대림창고', '카페', 22, 30, '#E8D9C7', { stay: '1시간', memo: '공장 개조 카페' }),
      p('연무장길 소품샵', '관광지', 40, 48, '#EADFCB', { stay: '40분', memo: '편집숍이 몰려 있어요' }),
      p('성수 베이커리', '카페', 58, 36, '#F1E3CF', { stay: '30분', memo: '소금빵 추천' }),
      p('서울숲', '관광지', 76, 62, '#CFE2C8', { stay: '1시간', memo: '산책 마무리' }),
      p('뚝섬 한강공원', '관광지', 86, 80, '#C9DCEB', { stay: '노을', memo: '해 질 녘 추천' }),
    ],
  },
  {
    id: 'jeju-east', kind: '루트', region: '제주', title: '제주 동쪽 감성 드라이브',
    author: '@귤밭여행', initial: '귤', authorTone: '#D6E7CF', creator: true,
    likes: 1500, saves: '980', tone: '#CFE2C8', photo: '성산일출봉', days: '1일', move: '자동차',
    visited: '2026년 10월 방문', desc: '함덕에서 출발해 섭지코지까지 동쪽 해안도로를 따라가는 드라이브 코스예요.',
    tags: ['제주', '드라이브', '바다'],
    places: [
      p('함덕해변', '관광지', 14, 30, '#C9DCEB', { stay: '40분', memo: '에메랄드빛 바다' }),
      p('월정리 카페거리', '카페', 32, 24, '#E8D9C7', { stay: '1시간', memo: '오션뷰 카페' }),
      p('세화 해변', '관광지', 50, 34, '#BFD9E2', { stay: '30분', memo: '조용한 해변' }),
      p('성산일출봉', '관광지', 72, 46, '#CFE2C8', { stay: '1시간 30분', memo: '이른 아침 추천' }),
      p('섭지코지', '관광지', 84, 66, '#D6E7CF', { stay: '1시간', memo: '산책로 한 바퀴' }),
    ],
  },
  {
    id: 'gangwon-surf', kind: '루트', region: '강원', title: '강릉·양양 서핑과 바다 맛집',
    author: '@파도타기', initial: '파', authorTone: '#C9DCEB', likes: 990, saves: '760', tone: '#C9DCEB', photo: '양양 해변',
    days: '1박 2일', move: '자동차', visited: '2026년 8월 방문', desc: '서핑 강습과 바다 맛집을 묶은 코스예요.',
    tags: ['강원', '서핑', '양양'],
    places: [
      p('양양 서피비치', '관광지', 30, 24, '#C9DCEB', { stay: '3시간', memo: '서핑 강습' }),
      p('양양 물회집', '맛집', 46, 44, '#F1D4C8', { stay: '1시간', memo: '시원한 물회' }),
      p('강릉 안목해변 카페', '카페', 64, 60, '#E8D9C7', { stay: '1시간', memo: '커피거리' }),
      p('경포대', '관광지', 80, 76, '#CFE2C8', { stay: '40분', memo: '호수 산책' }),
    ],
  },
  {
    id: 'osaka-food', kind: '루트', region: '오사카', title: '오사카 2박 3일 먹방 루트',
    author: '@먹고또먹고', initial: '먹', authorTone: '#F4DCD1', creator: true,
    likes: 2400, saves: '1.8천', tone: '#F1D4C8', photo: '도톤보리', days: '2박 3일', move: '지하철',
    visited: '2026년 7월 방문', desc: '현지인이 줄 서는 맛집 위주로 정리한 오사카 먹방 루트예요.',
    tags: ['오사카', '먹방', '해외여행'],
    places: [
      p('구로몬 시장', '맛집', 20, 30, '#F4DCD1', { day: 1, stay: '1시간', memo: '아침 먹방' }),
      p('도톤보리', '관광지', 40, 46, '#F1D4C8', { day: 1, stay: '2시간', memo: '타코야키 필수' }),
      p('신세카이', '맛집', 56, 64, '#EADFCB', { day: 2, stay: '1시간', memo: '쿠시카츠' }),
      p('오사카성', '관광지', 72, 30, '#CFE2C8', { day: 2, stay: '1시간 30분', memo: '천수각 전망' }),
      p('우메다 라멘 골목', '맛집', 84, 18, '#F1E3CF', { day: 3, stay: '1시간', memo: '마지막 날 저녁' }),
    ],
  },
  {
    id: 'jongno-old', kind: '루트', region: '서울', title: '종로 노포 맛집 한 바퀴',
    author: '@골목미식가', initial: '골', authorTone: '#E4DCCF', likes: 910, saves: '640', tone: '#E4DCCF', photo: '익선동 골목',
    days: '하루', move: '도보', visited: '2026년 6월 방문', desc: '오래된 맛집 위주로 걷는 종로 코스예요.',
    tags: ['서울', '노포', '맛집'],
    places: [
      p('광장시장', '맛집', 24, 40, '#F1D4C8', { stay: '1시간', memo: '빈대떡' }),
      p('익선동 한옥거리', '관광지', 44, 28, '#E4DCCF', { stay: '1시간', memo: '골목 산책' }),
      p('종로 칼국수', '맛집', 62, 50, '#F4DCD1', { stay: '40분', memo: '오래된 노포' }),
      p('청계천', '관광지', 80, 66, '#C9DCEB', { stay: '30분', memo: '저녁 산책' }),
    ],
  },
  {
    id: 'seongsu-rain', kind: '게시물', region: '서울', title: '성수동 비 오는 날 가기 좋은 카페 3곳',
    author: '@서울산책러', initial: '산', authorTone: '#EADFCB', likes: 842, saves: '410', tone: '#E8D9C7', photo: '성수 카페',
    days: '반나절', move: '도보', visited: '2026년 10월 방문', desc: '비 오는 날 창밖 보기 좋은 카페만 골랐어요.', tags: ['서울', '카페'],
    places: [p('성수 대림창고', '카페', 30, 40, '#E8D9C7', { stay: '1시간' }), p('성수 베이커리', '카페', 54, 52, '#F1E3CF', { stay: '40분' }), p('서울숲 카페', '카페', 74, 34, '#EADFCB', { stay: '1시간' })],
  },
  {
    id: 'yangyang-sunset', kind: '게시물', region: '강원', title: '양양 서피비치 일몰, 이 시간에 가세요',
    author: '@파도타기', initial: '파', authorTone: '#C9DCEB', likes: 620, saves: '305', tone: '#C9DCEB', photo: '서피비치',
    days: '당일', move: '자동차', visited: '2026년 9월 방문', desc: '일몰은 오후 6시쯤이 가장 예뻤어요.', tags: ['강원', '일몰'],
    places: [p('양양 서피비치', '관광지', 40, 40, '#C9DCEB', { stay: '2시간' }), p('양양 물회집', '맛집', 64, 58, '#F1D4C8', { stay: '1시간' })],
  },
  {
    id: 'huinnyeoul', kind: '게시물', region: '부산', title: '흰여울문화마을 골목 산책 기록',
    author: '@느린여행자', initial: '느', authorTone: '#D5E3EC', likes: 388, saves: '122', tone: '#D5E3EC', photo: '흰여울마을',
    days: '반나절', move: '버스', visited: '2026년 10월 방문', desc: '바다를 끼고 걷는 골목 산책.', tags: ['부산', '산책'],
    places: [p('흰여울문화마을', '관광지', 46, 46, '#D5E3EC', { stay: '1시간 30분' })],
  },
  {
    id: 'jeju-west', kind: '루트', region: '제주', title: '제주 서쪽 오름 & 바다 하루 코스',
    author: '@오름러버', initial: '오', authorTone: '#D9E6CF', likes: 770, saves: '512', tone: '#D9E6CF', photo: '새별오름',
    days: '1일', move: '자동차', visited: '2026년 10월 방문', desc: '오름 하나, 바다 둘, 카페 하나.', tags: ['제주', '오름'],
    places: [p('새별오름', '관광지', 24, 30, '#D9E6CF', { stay: '1시간' }), p('협재해변', '관광지', 46, 56, '#C9DCEB', { stay: '1시간' }), p('애월 카페거리', '카페', 66, 40, '#E8D9C7', { stay: '1시간' }), p('곽지해변', '관광지', 82, 64, '#BFD9E2', { stay: '노을' })],
  },
  {
    id: 'kuromon', kind: '게시물', region: '오사카', title: '구로몬 시장 아침 먹방 후기',
    author: '@먹고또먹고', initial: '먹', authorTone: '#F4DCD1', likes: 1100, saves: '430', tone: '#F4DCD1', photo: '구로몬 시장',
    days: '오전', move: '도보', visited: '2026년 7월 방문', desc: '아침 9시 전에 가면 덜 붐벼요.', tags: ['오사카', '시장'],
    places: [p('구로몬 시장', '맛집', 40, 44, '#F4DCD1', { stay: '1시간' }), p('도톤보리', '관광지', 64, 60, '#F1D4C8', { stay: '1시간' })],
  },
];

export const getRoute = (id) => ROUTES.find((r) => r.id === id);

export const CREATORS = [
  { initial: '바', name: '@바다보러가자', tag: '바다·해변 여행', course: '부산 해안선 따라 1박 2일', tone: '#CBE0E8', routeId: 'busan-sea' },
  { initial: '먹', name: '@먹고또먹고', tag: '맛집 크리에이터', course: '오사카 현지인 맛집 9곳', tone: '#F4DCD1', routeId: 'osaka-food' },
  { initial: '귤', name: '@귤밭여행', tag: '제주 감성 여행', course: '제주 동쪽 숨은 카페 코스', tone: '#D6E7CF', routeId: 'jeju-east' },
  { initial: '산', name: '@서울산책러', tag: '도심 산책', course: '서울 한옥 골목 걷기', tone: '#EADFCB', routeId: 'seongsu-cafe' },
];

export const STEPS = [
  { n: 1, title: '루트 발견', desc: '크리에이터와 여행자가 공유한 여행 콘텐츠를 탐색해요' },
  { n: 2, title: '루트 선택', desc: '마음에 드는 코스를 원클릭으로 내 여행에 담아요' },
  { n: 3, title: '지도 확인', desc: '맛집·카페·관광지의 위치와 방문 순서를 지도에서 봐요' },
  { n: 4, title: '루트 수정', desc: '장소를 추가·삭제하고 순서를 자유롭게 바꿔요' },
  { n: 5, title: '여행 시작', desc: '선택한 루트를 따라 이동하고, 상황에 맞게 경로를 바꿔요' },
];

// 지도 화면(부산 해운대·광안리 일대) 장소
export const MAP_PLACES = [
  { id: 'haeundae', name: '해운대 해수욕장', cat: '관광지', x: 74, y: 22, addr: '해운대구 우동', hours: '상시 개방', quote: '아침 산책하기 제일 좋은 시간은 7시!', posts: 312, routes: 88, tone: '#BFD9E2', routeId: 'busan-sea' },
  { id: 'haeridan', name: '해리단길 카페', cat: '카페', x: 62, y: 14, addr: '해운대구 우동', hours: '10:00–21:00', quote: '창가 자리 브런치 강추', posts: 96, routes: 31, tone: '#E8D9C7', routeId: 'busan-sea' },
  { id: 'dongbaek', name: '동백섬', cat: '관광지', x: 56, y: 40, addr: '해운대구 우동', hours: '상시 개방', quote: '광안대교 뷰 포인트 숨은 명소', posts: 140, routes: 52, tone: '#CFE2C8', routeId: 'busan-sea' },
  { id: 'gwangalli', name: '광안리 해변', cat: '관광지', x: 40, y: 56, addr: '수영구 광안동', hours: '상시 개방', quote: '해 지고 나서 다리 조명 꼭 보세요', posts: 421, routes: 104, tone: '#C9DCEB', routeId: 'busan-sea' },
  { id: 'millak', name: '민락동 횟집', cat: '맛집', x: 48, y: 30, addr: '수영구 민락동', hours: '11:00–23:00', quote: '2층 오션뷰 자리에서 모둠회', posts: 77, routes: 24, tone: '#F1D4C8', routeId: 'busan-sea' },
  { id: 'gukbap', name: '수영 돼지국밥', cat: '맛집', x: 26, y: 34, addr: '수영구 수영동', hours: '24시간', quote: '해장으로 완벽', posts: 58, routes: 19, tone: '#F4DCD1', routeId: 'busan-sea' },
  { id: 'hotel', name: '광안 오션 스테이', cat: '숙소', x: 32, y: 48, addr: '수영구 광안동', hours: '체크인 15:00', quote: '오션뷰 객실에서 야경 감상', posts: 34, routes: 12, tone: '#D9DDF0', routeId: 'huinnyeoul' },
  { id: 'rooftop', name: '민락 루프탑 카페', cat: '카페', x: 52, y: 22, addr: '수영구 민락동', hours: '11:00–22:00', quote: '노을 질 때 루프탑 최고', posts: 63, routes: 17, tone: '#EADFCB', routeId: 'busan-sea' },
];

export const SUGGESTIONS = [
  { id: '민락 루프탑 카페', name: '민락 루프탑 카페', cat: '카페', stay: '1시간', x: 48, y: 70, tone: '#EADFCB', why: '광안리에서 도보 8분 · 노을 명소' },
  { id: '수영 돼지국밥', name: '수영 돼지국밥', cat: '맛집', stay: '40분', x: 24, y: 72, tone: '#F4DCD1', why: '동선 위 · 24시간 영업' },
];

export const COMMENTS = [
  { id: 1, initial: '여', name: '@여행가고싶다', when: '2시간 전', text: '해동용궁사는 대중교통으로 가셨나요? 이동 시간이 궁금해요!', likes: 12, tone: '#E4DCCF' },
  { id: 2, initial: '바', name: '@바다보러가자', when: '1시간 전', text: '버스 타고 갔어요! 내 여행으로 가져가시면 장소 사이 이동 경로도 같이 보여요.', likes: 21, tone: '#CBE0E8' },
  { id: 3, initial: '느', name: '@느린여행자', when: '어제', text: '이 루트 그대로 다녀왔는데 동백섬 아침 산책 최고였어요.', likes: 34, tone: '#D5E3EC' },
];

export const COMMUNITY_POSTS = [
  { id: 1, type: '후기', initial: '귤', name: '@귤밭여행', tone: '#D6E7CF', where: '제주 라운지 · 1시간 전',
    text: '2박 3일 제주 동쪽 다녀왔어요. 비 예보 있어서 걱정했는데 오히려 사람 없이 한적했어요. 다녀온 장소들 루트로 묶어뒀으니 그대로 가져가셔도 돼요!',
    photos: ['#CFE2C8', '#D5E3EC', '#EADFCB'], routeId: 'jeju-east', likes: 214, comments: 32, saves: 88 },
  { id: 2, type: '질문', initial: '여', name: '@여행가고싶다', tone: '#E4DCCF', where: '오사카 라운지 · 3시간 전',
    title: 'Q. 오사카 먹방 루트, 2박 3일이면 하루에 몇 곳이 적당할까요?',
    text: '@먹고또먹고 님 루트를 가져왔는데 장소가 많아서 일정이 빡빡할까 봐요. 부모님이랑 같이 가요.',
    answer: { by: '@먹고또먹고', text: '부모님과 가시면 하루 3곳 정도 추천드려요. 구로몬 시장은 2일차 아침으로 옮기고, 신세카이는 빼셔도 동선이 훨씬 편해요.' },
    likes: 46, comments: 7 },
  { id: 3, type: '일반', initial: '파', name: '@파도타기', tone: '#C9DCEB', where: '강원 라운지 · 어제',
    text: '이번 주말 양양 서피비치 파도 좋다고 해요. 서핑 강습 + 근처 맛집 묶은 당일 코스 올려볼게요. 같이 가실 분들 참고하세요!',
    video: '#C9DCEB', likes: 132, comments: 19, saves: 41 },
];

export const PEOPLE = [
  { id: 'a', initial: '먹', name: '@먹고또먹고', desc: '맛집 크리에이터 · 루트 24개', tone: '#F4DCD1' },
  { id: 'b', initial: '바', name: '@바다보러가자', desc: '바다 여행 · 루트 12개', tone: '#CBE0E8' },
  { id: 'c', initial: '오', name: '@오름러버', desc: '제주 오름 · 루트 9개', tone: '#D9E6CF' },
  { id: 'd', initial: '골', name: '@골목미식가', desc: '서울 노포 · 루트 15개', tone: '#E4DCCF' },
];

export const TRENDS = [
  { n: 1, tag: '겨울바다', q: '바다', count: '1.2천' }, { n: 2, tag: '부산야경', q: '야경', count: '860' },
  { n: 3, tag: '오사카먹방', q: '먹방', count: '740' }, { n: 4, tag: '제주카페', q: '카페', count: '690' }, { n: 5, tag: '당일치기', q: '일몰', count: '520' },
];

export const LOUNGES = [
  { name: '서울', n: 32 }, { name: '부산', n: 18 }, { name: '제주', n: 27 }, { name: '강원', n: 9 }, { name: '오사카', n: 21 },
];
