import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORY, SUGGESTIONS } from '../data.js';
import MiniMap from '../components/MiniMap.jsx';
import Photo from '../components/Photo.jsx';
import { BoltIcon, ChevronDown, ChevronUp, PlayIcon, PlusIcon, TrashIcon, WalkIcon } from '../components/Icons.jsx';

// 두 장소 사이 거리로 대략적인 이동 시간을 계산 (실제로는 길찾기 API 결과를 쓰면 됨)
function legOf(a, b) {
  const d = Math.hypot(a.x - b.x, a.y - b.y);
  const mins = Math.round(d * 0.5) + 4;
  return { mins, text: (d > 32 ? '지하철·버스 ' : '도보 ') + mins + '분' };
}

const DATE_LABEL = ['12월 20일 (일)', '12월 21일 (월)', '12월 22일 (화)'];

export default function MyTrip() {
  const { trip, setDayPlaces, addPlace } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const dayKeys = Object.keys(trip.days).map(Number).sort((a, b) => a - b);
  const [day, setDay] = useState(location.state?.day ?? dayKeys[0] ?? 1);
  const [started, setStarted] = useState(false);
  const current = dayKeys.includes(day) ? day : dayKeys[0] ?? 1;
  const list = trip.days[current] || [];

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = list.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setDayPlaces(current, next);
  };
  const remove = (id) => setDayPlaces(current, list.filter((x) => x.id !== id));

  const allIds = new Set(Object.values(trip.days).flat().map((x) => x.id));
  const suggestions = SUGGESTIONS.filter((s) => !allIds.has(s.id));

  let total = 0;
  const legs = list.map((p, i) => {
    if (!list[i + 1]) return null;
    const leg = legOf(p, list[i + 1]);
    total += leg.mins;
    return leg.text;
  });

  return (
    <>
      <div className="trip-bar">
        <div className="stack" style={{ gap: 6, minWidth: 0 }}>
          <div className="row wrap" style={{ gap: 10 }}>
            <h1 style={{ fontSize: 26, fontWeight: 900 }}>{trip.title}</h1>
            <span className="badge badge--coral" style={{ fontSize: 13 }}>{trip.dates}</span>
          </div>
          <span className="row wrap" style={{ gap: 6, fontSize: 14, color: 'var(--muted)' }}>
            <BoltIcon size={15} color="var(--teal)" />{trip.author} 님의 루트에서 원클릭으로 가져왔어요 · <Link to={`/routes/${trip.sourceId}`} className="bold">원본 보기</Link>
          </span>
        </div>
        <div className="row wrap" style={{ gap: 8 }}>
          <button type="button" className="btn btn--outline" style={{ fontWeight: 700, fontSize: 14 }}>일행 초대</button>
          <button type="button" className="btn btn--outline" style={{ fontWeight: 700, fontSize: 14 }} onClick={() => navigate('/community')}>내 루트로 공유</button>
          <button type="button" className="btn btn--primary" aria-pressed={started} onClick={() => setStarted((s) => !s)}>
            <PlayIcon />{started ? '여행 중' : '여행 시작'}
          </button>
        </div>
      </div>

      <div className="app-body" style={{ minHeight: 'calc(100vh - 160px)' }}>
        <section aria-label="일정" className="side-panel stack" style={{ padding: 20, gap: 16, flex: '1 1 400px', maxHeight: 'calc(100vh - 160px)' }}>
          <div role="tablist" aria-label="여행 일자" style={{ display: 'grid', gridTemplateColumns: `repeat(${dayKeys.length || 1}, minmax(0, 1fr))`, gap: 8 }}>
            {dayKeys.map((d) => (
              <button key={d} type="button" role="tab" aria-selected={d === current} className={'day-tab' + (d === current ? ' is-on' : '')} onClick={() => setDay(d)}>
                <strong style={{ fontSize: 15 }}>DAY {d}</strong><span style={{ fontSize: 12 }}>{DATE_LABEL[d - 1] || ''}</span>
              </button>
            ))}
          </div>

          <div className="row" style={{ justifyContent: 'space-between', fontSize: 14, color: 'var(--muted)' }}>
            <span>장소 {list.length}곳 · 예상 이동 약 {total}분</span><span className="small">화살표로 순서 변경</span>
          </div>

          <ol className="stack" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {list.map((p, i) => (
              <li key={p.id} className="stack">
                <div className="trip-item">
                  <span className="timeline__num" style={{ width: 34, height: 34, flex: '0 0 34px', background: CATEGORY[p.cat]?.color }}>{i + 1}</span>
                  <Photo tone={p.tone} height={52} className="thumb" />
                  <span className="stack" style={{ gap: 2, minWidth: 0, flex: '1 1 auto' }}>
                    <strong style={{ fontSize: 15 }}>{p.name}</strong>
                    <span style={{ fontSize: 12 }} className="muted">{p.cat} · {p.stay}</span>
                  </span>
                  <span className="row" style={{ gap: 2 }}>
                    <button type="button" className="ghost-btn" aria-label={`${p.name} 위로 이동`} disabled={i === 0} onClick={() => move(i, -1)}><ChevronUp /></button>
                    <button type="button" className="ghost-btn" aria-label={`${p.name} 아래로 이동`} disabled={i === list.length - 1} onClick={() => move(i, 1)}><ChevronDown /></button>
                    <button type="button" className="ghost-btn" aria-label={`${p.name} 일정에서 삭제`} onClick={() => remove(p.id)} style={{ color: 'var(--danger)' }}><TrashIcon /></button>
                  </span>
                </div>
                {legs[i] && <div className="leg"><WalkIcon />{legs[i]}</div>}
              </li>
            ))}
          </ol>

          {list.length === 0 && (
            <div style={{ padding: 24, borderRadius: 16, background: 'var(--ground)', textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
              이 날의 장소를 모두 뺐어요. 아래에서 추천 장소를 추가하거나 지도에서 골라보세요.
            </div>
          )}

          <button type="button" className="add-btn" onClick={() => navigate('/map')}><PlusIcon />지도에서 장소 찾아 추가</button>

          <div className="stack" style={{ background: 'var(--teal-softer)', borderRadius: 16, padding: 16, gap: 10 }}>
            <strong className="teal" style={{ fontSize: 14 }}>동선 근처 추천 장소</strong>
            {suggestions.map((s) => (
              <div key={s.id} className="row" style={{ gap: 10 }}>
                <Photo tone={s.tone} height={44} className="thumb" />
                <span className="stack" style={{ flex: '1 1 auto', minWidth: 0 }}><strong style={{ fontSize: 14 }}>{s.name}</strong><span style={{ fontSize: 12, color: 'var(--muted)' }}>{s.why}</span></span>
                <button type="button" className="btn btn--primary btn--pill" style={{ minHeight: 36, padding: '0 12px', fontSize: 13 }} onClick={() => addPlace(current, s)}>추가</button>
              </div>
            ))}
            {suggestions.length === 0 && <span className="small" style={{ color: 'var(--muted)' }}>추천 장소를 모두 추가했어요.</span>}
          </div>
        </section>

        <main className="map-area">
          <MiniMap places={list} labels colorByCategory>
            <div className="map__float stack" style={{ left: 20, top: 20, background: '#fff', borderRadius: 16, padding: '14px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', gap: 4, maxWidth: 280 }}>
              <strong style={{ fontSize: 15 }}>DAY {current} 동선</strong>
              <span className="small" style={{ color: 'var(--muted)' }}>{list.length}곳 · 예상 이동 약 {total}분</span>
            </div>
            <div className="map__float stack" style={{ right: 20, top: 20, gap: 8 }}>
              <button type="button" className="float-btn">경로 다시 찾기</button>
              <button type="button" className="float-btn" onClick={() => setDay(dayKeys[(dayKeys.indexOf(current) + 1) % dayKeys.length])}>다음 날 보기</button>
            </div>
            {list[0] && (
              <div className="map__float row" style={{ left: 20, right: 20, bottom: 20, justifyContent: 'center' }}>
                <div className="next-bar">
                  <span className="stack" style={{ gap: 2 }}><span style={{ fontSize: 12, color: '#BFC5CC' }}>{started ? '지금 가는 곳' : '첫 목적지'}</span><strong style={{ fontSize: 15 }}>{list[0].name}</strong></span>
                  <span style={{ width: 1, height: 32, background: 'var(--ink-3)' }} />
                  <span style={{ fontSize: 14, color: '#E4E6EA' }}>{list[1] ? `이후 ${list[1].name}까지 ${legs[0]}` : '마지막 장소예요'}</span>
                  <button type="button" className="btn" style={{ minHeight: 40, background: '#fff', color: 'var(--ink)', fontSize: 13 }}>길 안내</button>
                </div>
              </div>
            )}
          </MiniMap>
        </main>
      </div>
    </>
  );
}
