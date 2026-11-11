import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Explore from './pages/Explore.jsx';
import RouteDetail from './pages/RouteDetail.jsx';
import MapPage from './pages/MapPage.jsx';
import Community from './pages/Community.jsx';
import MyTrip from './pages/MyTrip.jsx';

// 화면 주소(URL)와 페이지 컴포넌트를 연결하는 곳.
// 버튼/링크에서 <Link to="/explore"> 나 navigate('/my-trip') 을 쓰면
// 새로고침 없이 해당 페이지로 바뀝니다.
export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  const hideHeader = pathname === '/login';

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/routes/:id" element={<RouteDetail />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/my-trip" element={<MyTrip />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
