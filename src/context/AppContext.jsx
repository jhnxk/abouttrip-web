import { createContext, useContext, useMemo, useState } from 'react';
import { getRoute } from '../data.js';

// 여러 화면이 함께 쓰는 상태(로그인한 사용자, 저장한 루트, 내 여행 일정)를 보관하는 곳.
// 지금은 브라우저 메모리에만 있어서 새로고침하면 초기화돼요.
// 백엔드를 붙이면 이 함수들 안에서 API를 호출하도록 바꾸면 됩니다.
const AppContext = createContext(null);

function tripFromRoute(route) {
  const days = {};
  route.places.forEach((pl) => {
    const d = pl.day || 1;
    (days[d] = days[d] || []).push({ ...pl });
  });
  return {
    sourceId: route.id,
    title: route.title,
    author: route.author,
    dates: '12월 20일 – 21일',
    days,
  };
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState(() => new Set());
  const [trip, setTrip] = useState(() => tripFromRoute(getRoute('busan-sea')));

  const value = useMemo(() => ({
    user,
    login: (name = '나') => setUser({ name, initial: name.slice(0, 1) }),
    logout: () => setUser(null),

    isSaved: (id) => savedIds.has(id),
    toggleSave: (id) => setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    }),

    trip,
    // 원클릭 여행 시작: 루트의 장소들을 그대로 복사해서 내 여행 일정으로 만든다
    startTrip: (routeId) => {
      const route = getRoute(routeId);
      if (route) setTrip(tripFromRoute(route));
    },
    setDayPlaces: (day, places) => setTrip((t) => ({ ...t, days: { ...t.days, [day]: places } })),
    addPlace: (day, place) => setTrip((t) => {
      const list = t.days[day] || [];
      if (list.some((x) => x.id === place.id)) return t;
      return { ...t, days: { ...t.days, [day]: [...list, { ...place }] } };
    }),
  }), [user, savedIds, trip]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
