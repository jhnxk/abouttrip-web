import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../data.js';
import { Avatar } from '../components/Photo.jsx';
import { BookmarkIcon, HeartIcon, PinIcon, SearchIcon } from '../components/Icons.jsx';

const REGIONS = ['전체', '서울', '부산', '제주', '강원', '오사카'];
const TYPES = [{ label: '전체', key: null }, { label: '여행 루트', key: '루트' }, { label: '게시물', key: '게시물' }];
const THEMES = ['맛집', '카페', '관광지', '숙소', '바다', '야경'];
const SORTS = { 인기순: (a, b) => b.likes - a.likes, 최신순: () => 0, '저장 많은 순': (a, b) => parseFloat(b.saves) - parseFloat(a.saves) };

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + '천' : String(n));

export default function Explore() {
  // 필터 값을 URL(?region=부산&type=루트)에 저장하면
  // 다른 화면에서 링크로 바로 필터된 상태를 열 수 있고, 뒤로가기도 자연스러워요
  const [params, setParams] = useSearchParams();
  const region = params.get('region') || '전체';
  const type = params.get('type') || '전체';
  const q = params.get('q') || '';
  const sort = params.get('sort') || '인기순';

  const update = (key, value, empty) => {
    const next = new URLSearchParams(params);
    if (!value || value === empty) next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  };

  const typeKey = TYPES.find((t) => t.label === type)?.key;
  const query = q.trim().toLowerCase();
  const cards = ROUTES
    .filter((c) => region === '전체' || c.region === region)
    .filter((c) => !typeKey || c.kind === typeKey)
    .filter((c) => !query || [c.title, c.author, c.region, ...c.tags, ...c.places.map((p) => `${p.name} ${p.cat}`)].join(' ').toLowerCase().includes(query))
    .sort(SORTS[sort]);

  return (
    <div className="container stack" style={{ padding: '40px 24px 72px', gap: 28 }}>
      <div className="section__head" style={{ gap: 16 }}>
        <div><h1 style={{ fontSize: 34, fontWeight: 900 }}>여행 탐색</h1><p className="section__sub">지역·테마별로 다른 여행자의 루트와 게시물을 둘러보세요</p></div>
        <label className="search" style={{ flex: '0 1 420px', minWidth: 260 }}>
          <SearchIcon />
          <span className="sr-only">검색</span>
          <input type="search" value={q} onChange={(e) => update('q', e.target.value, '')} placeholder="장소, 태그, 크리에이터 검색" />
        </label>
      </div>

      <div className="card stack" style={{ padding: 20, gap: 16 }}>
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="bold" style={{ width: 56, fontSize: 14, color: 'var(--ink-3)' }}>지역</span>
          {REGIONS.map((r) => (
            <button key={r} type="button" className={'chip' + (r === region ? ' is-on' : '')} aria-pressed={r === region} onClick={() => update('region', r, '전체')}>{r}</button>
          ))}
        </div>
        <div className="row wrap" style={{ gap: 8 }}>
          <span className="bold" style={{ width: 56, fontSize: 14, color: 'var(--ink-3)' }}>테마</span>
          {THEMES.map((t) => (
            <button key={t} type="button" className={'chip chip--soft' + (q === t ? ' is-on' : '')} onClick={() => update('q', q === t ? '' : t, '')}>#{t}</button>
          ))}
        </div>
      </div>

      <div className="row wrap" style={{ justifyContent: 'space-between', gap: 12, borderBottom: '1px solid var(--line)' }}>
        <div role="tablist" aria-label="콘텐츠 유형" className="row wrap" style={{ gap: 4 }}>
          {TYPES.map((t) => (
            <button key={t.label} type="button" role="tab" aria-selected={t.label === type} className={'tab' + (t.label === type ? ' is-on' : '')} onClick={() => update('type', t.label, '전체')}>{t.label}</button>
          ))}
        </div>
        <label className="row" style={{ gap: 8, fontSize: 14, color: 'var(--ink-3)', paddingBottom: 8 }}>정렬
          <select value={sort} onChange={(e) => update('sort', e.target.value, '인기순')} style={{ minHeight: 40, borderRadius: 10, border: '1px solid var(--line-2)', padding: '0 10px', background: '#fff' }}>
            {Object.keys(SORTS).map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <span className="muted" style={{ fontSize: 14 }}>
        {cards.length ? `콘텐츠 ${cards.length}개` : '조건에 맞는 콘텐츠가 아직 없어요. 다른 지역이나 유형을 골라보세요.'}
      </span>

      <div className="grid">
        {cards.map((c) => (
          <article key={c.id} className="card route-card">
            <Link to={`/routes/${c.id}`} className="photo" style={{ background: c.tone, height: c.kind === '루트' ? 220 : 180 }}>
              <span className="photo__badge" style={c.kind === '루트' ? { background: 'var(--teal)', color: '#fff' } : undefined}>
                {c.kind === '루트' ? `여행 루트 · ${c.places.length}곳` : '게시물'}
              </span>
              <span className="photo__label">사진 · {c.photo}</span>
            </Link>
            <div className="route-card__body" style={{ padding: '16px 18px 18px' }}>
              <div className="row small teal bold" style={{ gap: 6 }}><PinIcon size={14} />{c.region} · 태그된 장소 {c.places.length}곳</div>
              <Link to={`/routes/${c.id}`} className="route-card__title" style={{ fontSize: 17 }}>{c.title}</Link>
              <div className="row" style={{ justifyContent: 'space-between', gap: 8 }}>
                <span className="row" style={{ gap: 8, fontSize: 14, color: 'var(--ink-3)' }}><Avatar initial={c.initial} tone={c.authorTone} size={28} />{c.author}</span>
                <span className="row small muted" style={{ gap: 12 }}>
                  <span className="row" style={{ gap: 4 }}><HeartIcon size={14} />{fmt(c.likes)}</span>
                  <span className="row" style={{ gap: 4 }}><BookmarkIcon size={14} />{c.saves}</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
