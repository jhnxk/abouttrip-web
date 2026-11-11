import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { ROUTES, CREATORS, STEPS, getRoute } from '../data.js';
import MiniMap from '../components/MiniMap.jsx';
import Photo, { Avatar } from '../components/Photo.jsx';
import { BoltIcon, BookmarkIcon, SearchIcon } from '../components/Icons.jsx';

const CHIPS = [
  { label: '서울 맛집·카페 투어', region: '서울' },
  { label: '강원도 바다 여행', region: '강원' },
  { label: '제주 감성 여행', region: '제주' },
  { label: '부산 1박 2일', region: '부산' },
  { label: '오사카 먹방', region: '오사카' },
];

export default function Home() {
  const navigate = useNavigate();
  const { startTrip, isSaved, toggleSave } = useApp();
  const [query, setQuery] = useState('');
  const featured = getRoute('busan-sea');
  const popular = ROUTES.filter((r) => r.kind === '루트').slice(0, 6);

  // 원클릭 여행 시작 → 내 여행 일정으로 복사하고 내 여행 화면으로 이동
  const oneClick = (id) => { startTrip(id); navigate('/my-trip'); };

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <section className="container hero">
        <div className="hero__text">
          <span className="badge badge--coral" style={{ alignSelf: 'flex-start', fontSize: 14 }}>여행 소셜 플랫폼</span>
          <h1 className="hero__title">마음에 든 그 여행,<br />원클릭으로 <span className="teal">내 여행</span>이 됩니다</h1>
          <p className="hero__desc">크리에이터와 여행자들이 공유한 루트를 발견하고, 내 여행으로 바꿔보세요! 장소 추가·삭제, 순서 변경도 자유롭게.</p>
          <form className="hero__search" onSubmit={onSearch}>
            <label className="search">
              <SearchIcon size={20} />
              <span className="sr-only">여행지 검색</span>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="지역, 장소, 크리에이터를 검색해보세요" />
            </label>
            <button type="submit" className="btn btn--primary" style={{ minHeight: 48, padding: '0 24px' }}>검색</button>
          </form>
          <div className="row wrap" style={{ gap: 8 }}>
            {CHIPS.map((c) => (
              <Link key={c.label} to={`/explore?region=${encodeURIComponent(c.region)}`} className="chip" style={{ minHeight: 36, padding: '0 14px' }}>#{c.label}</Link>
            ))}
          </div>
        </div>

        <div className="card hero__card">
          <MiniMap places={featured.places} height={320}>
            <span className="photo__badge" style={{ left: 16, top: 16 }}>{featured.region} · 장소 {featured.places.length}곳</span>
          </MiniMap>
          <div className="stack" style={{ padding: '20px 24px 24px', gap: 14 }}>
            <div className="row" style={{ gap: 10 }}>
              <Avatar initial={featured.initial} tone="#FCEDE6" size={36} />
              <div className="stack"><strong style={{ fontSize: 15 }}>{featured.author}</strong><span className="small muted">여행 크리에이터</span></div>
            </div>
            <Link to={`/routes/${featured.id}`} className="route-card__title" style={{ fontSize: 20 }}>{featured.title}</Link>
            <div className="row wrap small" style={{ gap: 6, color: 'var(--ink-3)' }}>
              {featured.places.slice(0, 4).map((pl, i) => (
                <span key={pl.id}>{i > 0 && <span aria-hidden="true">→ </span>}{pl.name.split(' ')[0]}</span>
              ))}
              <span>→ …</span>
            </div>
            <button type="button" className="btn btn--primary btn--lg btn--block" onClick={() => oneClick(featured.id)}>
              <BoltIcon />원클릭 여행 시작하기
            </button>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section__head">
          <div><h2 className="section__title">지금 인기 있는 여행 루트</h2><p className="section__sub">저장 수와 참여도가 높은 루트를 모았어요</p></div>
          <Link to="/explore" className="bold" style={{ textDecoration: 'none' }}>전체 보기 →</Link>
        </div>
        <div className="grid">
          {popular.map((r) => (
            <article key={r.id} className="card route-card">
              <Link to={`/routes/${r.id}`} className="photo" style={{ background: r.tone, height: 190 }}>
                <span className="photo__badge">루트 · {r.places.length}곳</span>
                <span className="photo__label">사진 · {r.photo}</span>
              </Link>
              <div className="route-card__body">
                <span className="small teal bold">{r.region}</span>
                <Link to={`/routes/${r.id}`} className="route-card__title">{r.title}</Link>
                <span className="muted" style={{ fontSize: 14 }}>{r.author} · 저장 {r.saves}</span>
                <div className="row" style={{ gap: 8, marginTop: 'auto', paddingTop: 6 }}>
                  <button type="button" className={'icon-btn' + (isSaved(r.id) ? ' is-on' : '')} aria-pressed={isSaved(r.id)} aria-label="루트 저장" onClick={() => toggleSave(r.id)}>
                    <BookmarkIcon filled={isSaved(r.id)} />
                  </button>
                  <button type="button" className="btn btn--soft" style={{ flex: '1 1 auto' }} onClick={() => oneClick(r.id)}>원클릭 시작</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container section" style={{ paddingTop: 64 }}>
          <div><h2 className="section__title">크리에이터 추천 코스</h2><p className="section__sub">영상과 사진 속 그 장소들, 순서까지 정리된 코스로 만나보세요</p></div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {CREATORS.map((c) => (
              <Link key={c.name} to={`/routes/${c.routeId}`} className="creator-card">
                <div className="row" style={{ gap: 12 }}>
                  <Avatar initial={c.initial} tone={c.tone} size={48} />
                  <div className="stack" style={{ gap: 2 }}><strong>{c.name}</strong><span className="small muted">{c.tag}</span></div>
                </div>
                <Photo tone={c.tone} height={120} label="대표 사진" className="thumb" />
                <div className="bold" style={{ fontSize: 16, lineHeight: 1.4 }}>{c.course}</div>
                <span className="small teal bold">코스 보기 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section" style={{ paddingTop: 72 }}>
        <div style={{ textAlign: 'center' }}><h2 className="section__title">발견부터 출발까지, 한 곳에서</h2><p className="section__sub">나만의 여행을 만드세요!</p></div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.n} className="card step">
              <span className="step__n">{s.n}</span>
              <strong style={{ fontSize: 18 }}>{s.title}</strong>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)' }}>{s.desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="container" style={{ paddingBottom: 72 }}>
        <div className="cta">
          <div className="stack" style={{ gap: 8 }}>
            <strong style={{ fontSize: 28, fontWeight: 900 }}>내 여행도 루트로 공유해보세요</strong>
            <span style={{ color: '#D7EDEA' }}>사진과 함께 다녀온 장소를 지도에 태그하면, 누군가의 다음 여행이 됩니다</span>
          </div>
          <Link to="/login" className="btn btn--lg" style={{ background: '#fff', color: 'var(--teal)' }}>무료로 시작하기</Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <strong style={{ color: 'var(--ink)' }}>어바웃트립</strong>
          <div className="row wrap" style={{ gap: 20 }}>
            <a href="#">서비스 소개</a><a href="#">이용약관</a><a href="#">개인정보처리방침</a><a href="#">콘텐츠 신고</a>
          </div>
        </div>
      </footer>
    </>
  );
}
