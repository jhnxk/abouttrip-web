import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { COMMUNITY_POSTS, LOUNGES, PEOPLE, TRENDS, getRoute } from '../data.js';
import Photo, { Avatar } from '../components/Photo.jsx';
import { ImageIcon, PinIcon, QuestionIcon, RouteIcon } from '../components/Icons.jsx';

const MENU = ['전체 피드', '질문·답변', '여행 후기', '내 팔로잉'];
const MENU_FILTER = { '전체 피드': null, '질문·답변': '질문', '여행 후기': '후기', '내 팔로잉': 'following' };

export default function Community() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [menu, setMenu] = useState('전체 피드');
  const [tab, setTab] = useState('인기');
  const [follows, setFollows] = useState({});
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [draft, setDraft] = useState('');
  const [liked, setLiked] = useState({});

  const publish = () => {
    if (!user) { navigate('/login', { state: { from: '/community' } }); return; }
    if (!draft.trim()) return;
    // 백엔드 연결 시: await fetch('/api/posts', { method: 'POST', body: JSON.stringify({ text: draft }) })
    setPosts((ps) => [{ id: Date.now(), type: '일반', initial: user.initial, name: '@' + user.name, tone: '#FCEDE6', where: '방금', text: draft.trim(), likes: 0, comments: 0, saves: 0 }, ...ps]);
    setDraft('');
    setTab('최신'); // 방금 쓴 글이 맨 위에 보이도록
    setMenu('전체 피드');
  };

  const filter = MENU_FILTER[menu];
  let shown = posts.filter((p) => !filter || (filter === 'following' ? PEOPLE.some((pp) => follows[pp.id] && pp.name === p.name) : p.type === filter));
  if (tab === '인기') shown = [...shown].sort((a, b) => b.likes - a.likes);

  return (
    <div className="container" style={{ padding: '32px 24px 72px', display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-start' }}>
      <nav aria-label="커뮤니티 메뉴" className="side-nav">
        <div className="stack" style={{ gap: 2 }}>
          {MENU.map((m) => (
            <button key={m} type="button" className={m === menu ? 'is-on' : ''} aria-pressed={m === menu} onClick={() => setMenu(m)}>{m}</button>
          ))}
        </div>
        <div className="stack" style={{ gap: 2 }}>
          <span className="bold muted" style={{ fontSize: 12, padding: '0 12px 6px' }}>지역 라운지</span>
          {LOUNGES.map((l) => (
            <Link key={l.name} to={`/explore?region=${encodeURIComponent(l.name)}`} style={{ minHeight: 40, fontSize: 14, color: 'var(--ink-3)' }}>{l.name}<span style={{ fontSize: 12 }} className="muted">새 글 {l.n}</span></Link>
          ))}
        </div>
      </nav>

      <main className="stack" style={{ flex: '999 1 560px', minWidth: 0, gap: 20 }}>
        <div className="card stack" style={{ padding: 18, gap: 12 }}>
          <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
            <span className="avatar avatar--me">{user ? user.initial : '?'}</span>
            <label style={{ flex: '1 1 auto' }}>
              <span className="sr-only">새 글 쓰기</span>
              <textarea className="textarea" rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} style={{ border: 0, background: 'var(--ground)' }}
                placeholder={user ? '여행 이야기를 공유하거나, 궁금한 점을 물어보세요' : '로그인하고 여행 이야기를 공유해보세요'} />
            </label>
          </div>
          <div className="row wrap" style={{ justifyContent: 'space-between', gap: 8, paddingLeft: 56 }}>
            <div className="row wrap" style={{ gap: 4 }}>
              <button type="button" className="tool-btn"><ImageIcon />사진·영상</button>
              <button type="button" className="tool-btn" onClick={() => navigate('/map')}><PinIcon sw={2} />장소 태그</button>
              <button type="button" className="tool-btn" onClick={() => navigate('/my-trip')}><RouteIcon />루트 첨부</button>
              <button type="button" className="tool-btn" onClick={() => setMenu('질문·답변')}><QuestionIcon />질문하기</button>
            </div>
            <button type="button" className="btn btn--primary" style={{ minHeight: 40, fontSize: 14 }} onClick={publish}>게시</button>
          </div>
        </div>

        <div role="tablist" aria-label="피드 정렬" className="tabs">
          {['인기', '최신', '팔로잉'].map((t) => (
            <button key={t} type="button" role="tab" aria-selected={t === tab} className={'tab' + (t === tab ? ' is-on' : '')} onClick={() => { setTab(t); if (t === '팔로잉') setMenu('내 팔로잉'); }}>{t}</button>
          ))}
        </div>

        {shown.length === 0 && <p className="card muted" style={{ padding: 24 }}>아직 볼 수 있는 글이 없어요. 오른쪽에서 여행자를 팔로우해보세요.</p>}

        {shown.map((p) => {
          const route = p.routeId && getRoute(p.routeId);
          const isLiked = !!liked[p.id];
          return (
            <article key={p.id} className="card post">
              <div className="row" style={{ justifyContent: 'space-between', gap: 12 }}>
                <div className="row" style={{ gap: 10 }}>
                  <Avatar initial={p.initial} tone={p.tone} size={44} />
                  <div className="stack"><strong style={{ fontSize: 15 }}>{p.name}</strong><span className="small muted">{p.where}</span></div>
                </div>
                {p.type === '질문' && <span className="badge badge--coral">질문</span>}
                {p.type === '후기' && <span className="badge badge--teal">여행 후기{route ? ' · 루트 첨부' : ''}</span>}
              </div>
              {p.title && <strong style={{ fontSize: 18, lineHeight: 1.5 }}>{p.title}</strong>}
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>{p.text}</p>
              {p.photos && (
                <div className="photo-grid">
                  {p.photos.map((t, i) => (
                    <Photo key={i} tone={t} height={160}>
                      {i === p.photos.length - 1 && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(21,25,30,0.55)', color: '#fff', fontWeight: 700 }}>+5</span>}
                    </Photo>
                  ))}
                </div>
              )}
              {p.video && <Photo tone={p.video} height={220} label="영상 · 0:42" className="thumb" />}
              {route && (
                <Link to={`/routes/${route.id}`} className="row" style={{ gap: 12, padding: '12px 14px', borderRadius: 14, background: 'var(--teal-softer)', textDecoration: 'none', color: 'var(--ink)' }}>
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--teal)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 40px' }}><RouteIcon size={20} /></span>
                  <span className="stack" style={{ flex: '1 1 auto', minWidth: 0 }}><strong style={{ fontSize: 15 }}>{route.title} · {route.places.length}곳</strong><span className="small" style={{ color: 'var(--muted)' }}>{route.places.slice(0, 4).map((x) => x.name).join(' → ')} → …</span></span>
                  <span className="bold teal" style={{ fontSize: 14, whiteSpace: 'nowrap' }}>루트 보기</span>
                </Link>
              )}
              {route && (
                <div className="row wrap" style={{ gap: 6 }}>
                  {route.places.slice(0, 4).map((x) => (
                    <Link key={x.id} to={`/map?place=${encodeURIComponent(x.name)}`} className="row small" style={{ gap: 4, padding: '6px 10px', borderRadius: 999, background: 'var(--chip)', color: 'var(--ink-3)', textDecoration: 'none' }}><PinIcon size={13} color="var(--teal)" sw={2.4} />{x.name}</Link>
                  ))}
                </div>
              )}
              {p.answer && (
                <div className="stack" style={{ background: 'var(--ground)', borderRadius: 14, padding: '14px 16px', gap: 6 }}>
                  <span className="small bold teal">채택된 답변 · {p.answer.by}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)' }}>{p.answer.text}</span>
                </div>
              )}
              <div className="post__actions">
                <button type="button" aria-pressed={isLiked} onClick={() => setLiked((l) => ({ ...l, [p.id]: !isLiked }))} style={isLiked ? { color: 'var(--coral-ink)', fontWeight: 700 } : undefined}>
                  {p.type === '질문' ? '도움돼요' : '좋아요'} {p.likes + (isLiked ? 1 : 0)}
                </button>
                <button type="button">{p.type === '질문' ? '답변' : '댓글'} {p.comments}</button>
                {p.type === '질문' ? <button type="button" className="teal bold">답변하기</button> : <button type="button">저장 {p.saves ?? 0}</button>}
              </div>
            </article>
          );
        })}
      </main>

      <aside className="stack" style={{ flex: '1 1 280px', minWidth: 0, gap: 20 }}>
        <div className="card stack" style={{ padding: 20, gap: 14 }}>
          <strong>추천 여행자</strong>
          {PEOPLE.map((pp) => {
            const on = !!follows[pp.id];
            return (
              <div key={pp.id} className="row" style={{ gap: 10 }}>
                <Avatar initial={pp.initial} tone={pp.tone} size={40} />
                <span className="stack" style={{ flex: '1 1 auto', minWidth: 0 }}><strong style={{ fontSize: 14 }}>{pp.name}</strong><span style={{ fontSize: 12 }} className="muted">{pp.desc}</span></span>
                <button type="button" aria-pressed={on} className={'btn btn--pill ' + (on ? 'btn--outline' : 'btn--dark')} style={{ minHeight: 36, padding: '0 12px', fontSize: 13, fontWeight: 700 }} onClick={() => setFollows((f) => ({ ...f, [pp.id]: !on }))}>{on ? '팔로잉' : '팔로우'}</button>
              </div>
            );
          })}
        </div>
        <div className="card stack" style={{ padding: 20, gap: 12 }}>
          <strong>지금 뜨는 태그</strong>
          <ol className="stack" style={{ margin: 0, padding: 0, listStyle: 'none', gap: 10 }}>
            {TRENDS.map((t) => (
              <li key={t.n} className="row" style={{ gap: 10, fontSize: 14 }}>
                <span className="bold teal" style={{ width: 18 }}>{t.n}</span>
                <Link to={`/explore?q=${encodeURIComponent(t.q)}`} style={{ color: 'var(--ink)', textDecoration: 'none', fontWeight: 500, flex: '1 1 auto' }}>#{t.tag}</Link>
                <span style={{ fontSize: 12 }} className="muted">글 {t.count}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="stack" style={{ background: 'var(--ink)', color: '#fff', borderRadius: 20, padding: 20, gap: 10 }}>
          <strong>내 여행 루트 공유 이벤트</strong>
          <span style={{ fontSize: 14, lineHeight: 1.6, color: '#D4D8DD' }}>다녀온 여행을 루트로 공유하면 인기 루트로 소개될 기회를 드려요.</span>
          <Link to="/my-trip" className="btn" style={{ alignSelf: 'flex-start', minHeight: 40, background: '#fff', color: 'var(--ink)', fontSize: 14 }}>참여하기</Link>
        </div>
      </aside>
    </div>
  );
}
