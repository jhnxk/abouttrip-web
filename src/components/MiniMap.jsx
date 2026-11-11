import { CATEGORY } from '../data.js';

// 간단한 그림 지도. places 의 x, y(0~100%) 위치에 번호 핀을 찍고 순서대로 점선을 잇는다.
// 실제 서비스에서는 카카오맵/네이버지도 API 컴포넌트로 바꾸면 됩니다.
export default function MiniMap({ places, height = 260, labels = false, colorByCategory = false, children }) {
  const points = places.map((p) => `${p.x},${p.y}`).join(' ');
  return (
    <div className="map" style={{ height }}>
      <div className="map__bg" aria-hidden="true">
        <div className="map__sea" />
        <div className="map__road" style={{ top: '38%', transform: 'rotate(-7deg)' }} />
        <div className="map__road map__road--thin" style={{ top: '18%', transform: 'rotate(4deg)' }} />
        <div className="map__road map__road--v" style={{ left: '30%', transform: 'rotate(12deg)' }} />
      </div>
      <svg className="map__route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={points} fill="none" stroke="#0B6E6E" strokeWidth="3" strokeDasharray="7 5"
          strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {places.map((p, i) => {
        const color = colorByCategory ? CATEGORY[p.cat]?.color || '#0B6E6E' : '#0B6E6E';
        return labels ? (
          <span key={p.id + i} className="map__label" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <span className="map__num" style={{ background: color }}>{i + 1}</span>{p.name}
          </span>
        ) : (
          <span key={p.id + i} className="map__pin" style={{ left: `${p.x}%`, top: `${p.y}%`, background: color }}>{i + 1}</span>
        );
      })}
      {children}
    </div>
  );
}
