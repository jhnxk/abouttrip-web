// 사진 자리 표시. 실제 이미지가 생기면 <img src=... /> 로 바꾸면 됩니다.
export default function Photo({ tone, label, height, width, className = '', children }) {
  // thumb(정사각 썸네일)은 너비를 따로 주지 않으면 높이와 같게 맞춘다
  const w = width ?? (className.includes('thumb') && height <= 80 ? height : undefined);
  return (
    <div className={'photo ' + className} style={{ background: tone, height, width: w }}>
      {label && <span className="photo__label">{label}</span>}
      {children}
    </div>
  );
}

export function Avatar({ initial, tone, size = 40 }) {
  return (
    <span className="avatar" style={{ background: tone, width: size, height: size, flexBasis: size, fontSize: size * 0.4 }}>
      {initial}
    </span>
  );
}
