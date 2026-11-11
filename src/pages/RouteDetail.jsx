import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { COMMENTS, ROUTES, getRoute } from '../data.js';
import MiniMap from '../components/MiniMap.jsx';
import Photo, { Avatar } from '../components/Photo.jsx';
import { BoltIcon, BookmarkIcon, CommentIcon, HeartIcon, ShareIcon } from '../components/Icons.jsx';

export default function RouteDetail() {
  // /routes/:id 의 id 값을 꺼낸다 (예: /routes/busan-sea → 'busan-sea')
  const { id } = useParams();
  const route = getRoute(id);
  const navigate = useNavigate();
  const { user, startTrip, isSaved, toggleSave } = useApp();
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [comments, setComments] = useState(COMMENTS);
  const [draft, setDraft] = useState('');

  if (!route) return <Navigate to="/explore" replace />;

  const saved = isSaved(route.id);
  const similar = ROUTES.filter((r) => r.region === route.region && r.id !== route.id).concat(ROUTES.filter((r) => r.region !== route.region)).slice(0, 3);

  const oneClick = () => { startTrip(route.id); navigate('/my-trip'); };

  const addComment = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login', { state: { from: `/routes/${route.id}` } }); return; }
    if (!draft.trim()) return;
    setComments((c) => [...c, { id: Date.now(), initial: user.initial, name: '@' + user.name, when: '방금', text: draft.trim(), likes: 0, tone: '#FCEDE6' }]);
    setDraft('');
  };

  return (
    <div className="container stack" style={{ padding: '24px 24px 72px', gap: 20 }}>
      <nav aria-label="현재 위치" className="row wrap muted" style={{ gap: 8, fontSize: 14 }}>
        <Link to="/explore" className="muted">탐색</Link><span aria-hidden="true">/</span>
        <Link to={`/explore?region=${encodeURIComponent(route.region)}`} className="muted">{route.region}</Link><span aria-hidden="true">/</span>
        <span style={{ color: 'var(--ink)' }}>{route.title}</span>
      </nav>

      <div className="layout-2col">
        <main>
          <div className="gallery">
            <Photo tone={route.tone} label={`사진 · ${route.photo}`} />
            <Photo tone="#D5E3EC" label={`사진 · ${route.places[0]?.name}`} />
            <Photo tone="#E8D9C7" label="영상 · 1:24"><span className="photo__badge" style={{ left: 'auto', right: 10, top: 10, background: 'var(--ink)', color: '#fff' }}>+12</span></Photo>
          </div>

          <div className="row wrap" style={{ justifyContent: 'space-between', gap: 12 }}>
            <div className="row" style={{ gap: 12 }}>
              <Avatar initial={route.initial} tone={route.authorTone} size={48} />
              <div className="stack" style={{ gap: 2 }}>
                <strong>{route.author} {route.creator && <span className="badge badge--teal" style={{ marginLeft: 4, borderRadius: 6, padding: '2px 6px' }}>크리에이터</span>}</strong>
                <span className="small muted">{route.visited}</span>
              </div>
            </div>
            <button type="button" className={'btn btn--pill ' + (following ? 'btn--outline' : 'btn--dark')} aria-pressed={following} onClick={() => setFollowing((f) => !f)}>
              {following ? '팔로잉' : '팔로우'}
            </button>
          </div>

          <div className="stack" style={{ gap: 14 }}>
            <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.3 }}>{route.title}</h1>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-3)' }}>{route.desc}</p>
            <div className="row wrap" style={{ gap: 8 }}>
              {route.tags.map((t) => <Link key={t} to={`/explore?q=${encodeURIComponent(t)}`} style={{ fontSize: 14, textDecoration: 'none' }}>#{t}</Link>)}
            </div>
          </div>

          <div className="row wrap" style={{ gap: 8, padding: '12px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <button type="button" className="btn btn--pill btn--outline" aria-pressed={liked} onClick={() => setLiked((v) => !v)}
              style={liked ? { background: 'var(--coral-soft)', color: 'var(--coral-ink)', borderColor: 'var(--coral-soft)', fontWeight: 700 } : { fontWeight: 700 }}>
              <HeartIcon filled={liked} />좋아요 {(route.likes + (liked ? 1 : 0)).toLocaleString()}
            </button>
            <a href="#comments" className="btn btn--pill btn--outline" style={{ fontWeight: 700 }}><CommentIcon />댓글 {comments.length}</a>
            <button type="button" className="btn btn--pill btn--outline" aria-pressed={saved} onClick={() => toggleSave(route.id)}
              style={saved ? { background: 'var(--teal-soft)', color: 'var(--teal)', borderColor: 'var(--teal-soft)', fontWeight: 700 } : { fontWeight: 700 }}>
              <BookmarkIcon filled={saved} />{saved ? '저장됨' : '저장'}
            </button>
            <button type="button" className="btn btn--pill btn--outline" style={{ fontWeight: 700 }} onClick={() => navigator.clipboard?.writeText(window.location.href)}><ShareIcon />링크 복사</button>
          </div>

          <section className="stack" style={{ gap: 14 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900 }}>이 루트의 장소 <span className="teal">{route.places.length}곳</span></h2>
            <ol className="timeline">
              {route.places.map((pl, i) => (
                <li key={pl.id} className="timeline__item">
                  <div className="timeline__rail"><span className="timeline__num">{i + 1}</span></div>
                  <div className="card place-card">
                    <Photo tone={pl.tone} height={72} className="thumb" />
                    <div className="stack" style={{ flex: '1 1 240px', minWidth: 0, gap: 4 }}>
                      <div className="row wrap" style={{ gap: 8 }}><strong>{pl.name}</strong><span className="badge" style={{ background: 'var(--chip)', color: 'var(--ink-3)', borderRadius: 6, padding: '2px 8px' }}>{pl.cat}</span></div>
                      {pl.memo && <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{pl.memo}</span>}
                      <span style={{ fontSize: 12 }} className="muted">{pl.day ? `DAY ${pl.day} · ` : ''}머문 시간 {pl.stay}</span>
                    </div>
                    <Link to={`/map?place=${encodeURIComponent(pl.name)}`} className="bold" style={{ fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap' }}>지도에서 보기</Link>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="comments" className="stack" style={{ gap: 16 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900 }}>댓글 {comments.length}</h2>
            <form className="row" style={{ gap: 10, alignItems: 'flex-start' }} onSubmit={addComment}>
              <span className="avatar avatar--me" style={{ width: 40, height: 40 }}>{user ? user.initial : '?'}</span>
              <label style={{ flex: '1 1 auto' }}>
                <span className="sr-only">댓글 쓰기</span>
                <textarea className="textarea" rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={user ? '궁금한 점이나 다녀온 후기를 남겨보세요' : '로그인하고 댓글을 남겨보세요'} />
              </label>
              <button type="submit" className="btn btn--dark" style={{ minHeight: 48 }}>등록</button>
            </form>
            {comments.map((c) => (
              <div key={c.id} className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
                <Avatar initial={c.initial} tone={c.tone} size={40} />
                <div className="stack" style={{ gap: 4, minWidth: 0 }}>
                  <span style={{ fontSize: 14 }}><strong>{c.name}</strong> <span className="small muted">{c.when}</span></span>
                  <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)' }}>{c.text}</span>
                  <span className="row small muted" style={{ gap: 14 }}><span>좋아요 {c.likes}</span><span>답글 달기</span></span>
                </div>
              </div>
            ))}
          </section>
        </main>

        <aside>
          <div className="card" style={{ overflow: 'hidden' }}>
            <MiniMap places={route.places} height={260}>
              <Link to="/map" className="photo__badge" style={{ left: 'auto', right: 12, top: 12, padding: '8px 12px', textDecoration: 'none', fontSize: 13 }}>크게 보기</Link>
            </MiniMap>
            <div className="stack" style={{ padding: 20, gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
                <div className="stat"><div className="small muted">일정</div><strong>{route.days}</strong></div>
                <div className="stat"><div className="small muted">장소</div><strong>{route.places.length}곳</strong></div>
                <div className="stat"><div className="small muted">이동</div><strong>{route.move}</strong></div>
              </div>
              <button type="button" className="btn btn--primary btn--lg" style={{ minHeight: 56, fontSize: 17 }} onClick={oneClick}><BoltIcon />원클릭 여행 시작하기</button>
              <span className="small muted" style={{ textAlign: 'center', lineHeight: 1.6 }}>이 루트가 내 여행 일정으로 복사돼요.<br />장소 추가·삭제, 순서 변경은 자유롭게!</span>
            </div>
          </div>
          <div className="card stack" style={{ padding: 20, gap: 12 }}>
            <strong>비슷한 루트</strong>
            {similar.map((s) => (
              <Link key={s.id} to={`/routes/${s.id}`} className="row" style={{ gap: 12, textDecoration: 'none', color: 'var(--ink)' }}>
                <Photo tone={s.tone} height={56} className="thumb" />
                <span className="stack" style={{ gap: 2, minWidth: 0 }}><strong style={{ fontSize: 14 }}>{s.title}</strong><span style={{ fontSize: 12 }} className="muted">{s.author} · {s.places.length}곳</span></span>
              </Link>
            ))}
          </div>
          <a href="#" className="small muted" style={{ textAlign: 'center' }}>장소 정보가 다른가요? 수정 제안 · 신고</a>
        </aside>
      </div>
    </div>
  );
}
