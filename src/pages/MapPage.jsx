import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORY, MAP_PLACES } from '../data.js';
import Photo from '../components/Photo.jsx';
import { CloseIcon, LocateIcon, MinusIcon, PlusIcon, SearchIcon } from '../components/Icons.jsx';

const CATS = ['전체', '맛집', '카페', '관광지', '숙소'];

function findPlace(name) {
  if (!name) return null;
  return MAP_PLACES.find((m) => m.name === name || name.startsWith(m.name.split(' ')[0]) || m.name.startsWith(name.split(' ')[0]));
}

export default function MapPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addPlace, trip } = useApp();
  const [cat, setCat] = useState('전체');
  const [view, setView] = useState('장소');
  const [selId, setSelId] = useState(() => findPlace(params.get('place'))?.id ?? 'gwangalli');

  const visible = MAP_PLACES.filter((p) => cat === '전체' || p.cat === cat);
  const sel = visible.find((p) => p.id === selId);

  const addToTrip = (p) => {
    const lastDay = Math.max(...Object.keys(trip.days).map(Number), 1);
    addPlace(lastDay, { id: p.name, name: p.name, cat: p.cat, stay: '1시간', x: p.x, y: p.y, tone: p.tone });
    navigate('/my-trip', { state: { day: lastDay } });
  };

  return (
    <div className="app-body">
      <aside className="side-panel">
        <div className="stack" style={{ padding: '20px 20px 12px', gap: 14, borderBottom: '1px solid var(--line)' }}>
          <label className="search" style={{ borderRadius: 12, padding: '0 12px' }}>
            <SearchIcon />
            <span className="sr-only">장소 검색</span>
            <input type="search" defaultValue="부산 해운대·광안리" style={{ padding: '12px 0' }} />
          </label>
          <div role="tablist" aria-label="보기" className="segment">
            {['장소', '여행 루트', '게시물'].map((v) => (
              <button key={v} type="button" role="tab" aria-selected={view === v} className={view === v ? 'is-on' : ''} onClick={() => setView(v)}>{v}</button>
            ))}
          </div>
          <span className="small muted">지도 영역 안의 장소 {visible.length}곳</span>
        </div>
        <ul className="stack" style={{ listStyle: 'none', margin: 0, padding: '8px 12px 16px', gap: 4 }}>
          {visible.map((p) => (
            <li key={p.id}>
              <button type="button" className={'list-btn' + (p.id === selId ? ' is-on' : '')} onClick={() => setSelId(p.id)}>
                <Photo tone={p.tone} height={60} className="thumb" />
                <span className="stack" style={{ gap: 3, minWidth: 0, flex: '1 1 auto' }}>
                  <span className="row" style={{ gap: 6 }}><span className="badge badge--cat" style={{ background: CATEGORY[p.cat].color }}>{p.cat}</span><strong style={{ fontSize: 15 }}>{p.name}</strong></span>
                  <span className="small muted">{p.addr}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>게시물 {p.posts} · 루트 {p.routes}개 포함</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="map-area">
        <div className="map" style={{ position: 'absolute', inset: 0 }}>
          <div className="map__bg" aria-hidden="true">
            <div className="map__sea" />
            <div className="map__sea" style={{ left: '-5%', right: 'auto', bottom: '-25%', width: '40%', height: '45%', borderRadius: '0 60% 0 0' }} />
            <div className="map__road" style={{ top: '36%', height: 10, transform: 'rotate(-6deg)' }} />
            <div className="map__road map__road--thin" style={{ top: '18%', transform: 'rotate(4deg)' }} />
            <div className="map__road map__road--v" style={{ left: '28%', width: 8, transform: 'rotate(14deg)' }} />
            <div className="map__road map__road--v" style={{ left: '58%', width: 6, transform: 'rotate(-10deg)' }} />
            <span style={{ position: 'absolute', left: '70%', top: '74%', fontSize: 13, color: '#4F6F7A', fontWeight: 700 }}>광안대교</span>
            <span style={{ position: 'absolute', left: '76%', top: '88%', fontSize: 14, color: '#4F6F7A', fontWeight: 700, letterSpacing: '0.2em' }}>수영만</span>
          </div>

          <div className="map__float row wrap" style={{ left: 16, top: 16, right: 90, gap: 8 }}>
            {CATS.map((c) => {
              const on = c === cat;
              return (
                <button key={c} type="button" aria-pressed={on} className={'chip chip--dark' + (on ? ' is-on' : '')} style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.08)', fontWeight: 700, color: on ? '#fff' : 'var(--ink)' }} onClick={() => setCat(c)}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: c === '전체' ? (on ? '#fff' : 'var(--ink)') : CATEGORY[c].color }} />{c}
                </button>
              );
            })}
          </div>

          {visible.map((p) => (
            <button key={p.id} type="button" aria-label={p.name} className={'map-pin-btn' + (p.id === selId ? ' is-on' : '')} style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => setSelId(p.id)}>
              <span className="map-pin-btn__body" style={{ borderColor: CATEGORY[p.cat].color }}>
                <span className="map-pin-btn__dot" style={{ background: CATEGORY[p.cat].color }}>{CATEGORY[p.cat].short}</span>{p.name}
              </span>
            </button>
          ))}

          {sel && (
            <div className="map__float popover" style={{ right: 24, bottom: 24, zIndex: 10 }}>
              <Photo tone={sel.tone} height={140} label="사진 · 여행자 게시물">
                <button type="button" aria-label="닫기" onClick={() => setSelId(null)} style={{ position: 'absolute', right: 10, top: 10, width: 36, height: 36, borderRadius: '50%', border: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CloseIcon /></button>
              </Photo>
              <div className="stack" style={{ padding: '16px 18px 18px', gap: 10 }}>
                <div className="row" style={{ gap: 8 }}><span className="badge badge--cat" style={{ background: CATEGORY[sel.cat].color }}>{sel.cat}</span><strong style={{ fontSize: 18 }}>{sel.name}</strong></div>
                <span className="muted" style={{ fontSize: 14 }}>{sel.addr} · {sel.hours}</span>
                <span style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>“{sel.quote}”</span>
                <span className="small teal bold">이 장소가 포함된 루트 {sel.routes}개 · 게시물 {sel.posts}개</span>
                <div className="row" style={{ gap: 8 }}>
                  <button type="button" className="btn btn--primary" style={{ flex: '1 1 auto', fontSize: 14 }} onClick={() => addToTrip(sel)}>내 여행에 추가</button>
                  <Link to={`/routes/${sel.routeId}`} className="btn btn--outline" style={{ flex: '1 1 auto', fontSize: 14, fontWeight: 700 }}>게시물 보기</Link>
                </div>
              </div>
            </div>
          )}

          <div className="map__float stack" style={{ right: 24, top: 72, gap: 8 }}>
            <div className="stack" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
              <button type="button" aria-label="확대" className="ghost-btn" style={{ width: 44, borderRadius: 0, borderBottom: '1px solid var(--line)' }}><PlusIcon size={18} /></button>
              <button type="button" aria-label="축소" className="ghost-btn" style={{ width: 44, borderRadius: 0 }}><MinusIcon size={18} /></button>
            </div>
            <button type="button" aria-label="내 위치" className="float-btn" style={{ width: 44, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal)' }}><LocateIcon /></button>
          </div>

          <button type="button" className="btn btn--dark btn--pill map__float" style={{ left: '50%', bottom: 24, transform: 'translateX(-50%)', fontSize: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>이 지역에서 다시 검색</button>
        </div>
      </main>
    </div>
  );
}
