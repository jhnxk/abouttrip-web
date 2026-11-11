import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Logo } from '../components/Header.jsx';

const STOPS = ['함덕해변', '월정리 카페', '세화 해변', '성산일출봉', '섭지코지'];

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  // 다른 화면에서 로그인하러 왔다면 원래 화면으로 돌려보낸다
  const back = location.state?.from || '/explore';

  const finish = (name) => { login(name); navigate(back, { replace: true }); };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !pw) { setError('이메일과 비밀번호를 입력해주세요.'); return; }
    // 백엔드 연결 시: await fetch('/api/login', { method: 'POST', body: ... })
    finish(email.split('@')[0] || '나');
  };

  return (
    <div className="login">
      <div className="login__visual">
        <Logo light />
        <div className="stack" style={{ position: 'relative', gap: 20, maxWidth: 520 }}>
          <h1 style={{ fontSize: 44, lineHeight: 1.25, fontWeight: 900, letterSpacing: '-0.03em' }}>다른 사람의 여행을<br />내 여행으로</h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#D7EDEA' }}>여행을 발견하고, 공유하고, 그대로 따라가는 여행 소셜 플랫폼. 로그인하고 저장한 루트와 내 여행 일정을 확인하세요.</p>
          <Link to="/routes/jeju-east" className="stack" style={{ gap: 12, padding: 20, borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.22)', color: '#fff', textDecoration: 'none' }}>
            <span className="small bold" style={{ color: '#D7EDEA' }}>오늘의 추천 루트</span>
            <strong style={{ fontSize: 18 }}>제주 동쪽 감성 드라이브 · 7곳</strong>
            <span className="row wrap" style={{ gap: 6 }}>
              {STOPS.map((s, i) => (
                <span key={s} className="row small" style={{ gap: 6 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', color: 'var(--teal)', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>{s}
                </span>
              ))}
            </span>
          </Link>
        </div>
        <span />
        <div className="login__ring" aria-hidden="true" />
      </div>

      <main className="login__main">
        <div className="stack" style={{ width: '100%', maxWidth: 420, gap: 28 }}>
          <div className="stack" style={{ gap: 8 }}>
            <h2 style={{ fontSize: 30, fontWeight: 900 }}>로그인</h2>
            <p className="muted" style={{ fontSize: 15 }}>아직 회원이 아니신가요? <a href="#" className="bold">회원가입</a></p>
          </div>

          <div className="stack" style={{ gap: 10 }}>
            <button type="button" className="social" style={{ background: '#FEE500', color: '#191600' }} onClick={() => finish('나')}>카카오로 계속하기</button>
            <button type="button" className="social" style={{ background: '#03A94D', color: '#fff' }} onClick={() => finish('나')}>네이버로 계속하기</button>
            <button type="button" className="social" style={{ background: '#fff', color: 'var(--ink)', border: '1px solid var(--line-2)' }} onClick={() => finish('나')}>Google로 계속하기</button>
          </div>

          <div className="divider">또는 이메일로 로그인</div>

          <form className="stack" style={{ gap: 16 }} onSubmit={onSubmit} noValidate>
            <label className="field">이메일
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" autoComplete="email" />
            </label>
            <label className="field">비밀번호
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호 입력" autoComplete="current-password" />
            </label>
            {error && <p role="alert" style={{ color: 'var(--danger)', fontSize: 14 }}>{error}</p>}
            <div className="row wrap" style={{ justifyContent: 'space-between', gap: 8, fontSize: 14 }}>
              <label className="row" style={{ gap: 8, color: 'var(--ink-3)' }}><input type="checkbox" style={{ width: 18, height: 18, accentColor: 'var(--teal)' }} />로그인 상태 유지</label>
              <a href="#" className="muted">비밀번호 찾기</a>
            </div>
            <button type="submit" className="btn btn--dark btn--lg">로그인</button>
          </form>
          <p className="muted" style={{ fontSize: 12, lineHeight: 1.6 }}>로그인 시 어바웃트립 이용약관 및 개인정보처리방침에 동의하게 됩니다. 위치 정보는 지도 기능 사용 시에만 별도 동의 후 이용됩니다.</p>
        </div>
      </main>
    </div>
  );
}
