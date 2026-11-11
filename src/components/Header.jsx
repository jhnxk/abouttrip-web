import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { PinIcon, PlusIcon } from './Icons.jsx';

const MENU = [
  { to: '/', label: '홈', end: true },
  { to: '/explore', label: '탐색' },
  { to: '/map', label: '지도' },
  { to: '/community', label: '커뮤니티' },
  { to: '/my-trip', label: '내 여행' },
];

export function Logo({ light = false }) {
  return (
    <Link to="/" className={'logo' + (light ? ' logo--light' : '')}>
      <span className="logo__mark"><PinIcon size={18} /></span>어바웃트립
    </Link>
  );
}

export default function Header() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
        <nav aria-label="주 메뉴" className="nav">
          {MENU.map((m) => (
            // NavLink 는 현재 주소와 같으면 active 클래스를 자동으로 붙여줘요
            <NavLink key={m.to} to={m.to} end={m.end} className={({ isActive }) => 'nav__item' + (isActive ? ' is-active' : '')}>
              {m.label}
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          {user ? (
            <>
              <button type="button" className="btn btn--dark btn--pill" onClick={() => navigate('/community')}>
                <PlusIcon />글쓰기
              </button>
              <button type="button" className="avatar avatar--me" aria-label="로그아웃" title="로그아웃" onClick={logout}>
                {user.initial}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--outline btn--pill">로그인</Link>
              <Link to="/login" className="btn btn--dark btn--pill">시작하기</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
