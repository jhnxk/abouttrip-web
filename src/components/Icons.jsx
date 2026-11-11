// 화면에서 쓰는 선 아이콘 모음. size, color 로 크기와 색을 바꿀 수 있어요.
const base = (size, color, sw = 2) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color,
  strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
});

export const PinIcon = ({ size = 18, color = 'currentColor', sw = 2.2 }) => (
  <svg {...base(size, color, sw)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const SearchIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg {...base(size, color)}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
export const PlusIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg {...base(size, color, 2.4)}><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg {...base(size, color, 2.4)}><path d="M5 12h14" /></svg>
);
export const BoltIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg {...base(size, color, 2.2)}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
);
export const HeartIcon = ({ size = 18, color = 'currentColor', filled = false }) => (
  <svg {...base(size, color)} fill={filled ? color : 'none'}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
export const BookmarkIcon = ({ size = 18, color = 'currentColor', filled = false }) => (
  <svg {...base(size, color)} fill={filled ? color : 'none'}><path d="M6 3h12v18l-6-4-6 4z" /></svg>
);
export const CommentIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg {...base(size, color)}><path d="M4 5h16v11H9l-5 4z" /></svg>
);
export const ShareIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg {...base(size, color)}><path d="M4 12v7h16v-7M12 3v12M7 8l5-5 5 5" /></svg>
);
export const CloseIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg {...base(size, color, 2.2)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const LocateIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg {...base(size, color, 2.2)}><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>
);
export const ChevronUp = ({ size = 16, color = 'currentColor' }) => (
  <svg {...base(size, color, 2.2)}><path d="M6 15l6-6 6 6" /></svg>
);
export const ChevronDown = ({ size = 16, color = 'currentColor' }) => (
  <svg {...base(size, color, 2.2)}><path d="M6 9l6 6 6-6" /></svg>
);
export const TrashIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg {...base(size, color)}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>
);
export const WalkIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg {...base(size, color)}><circle cx="12" cy="5" r="2" /><path d="M10 22l2-8 3 3v5M12 14l-2-4 4-1 3 3" /></svg>
);
export const PlayIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
);
export const RouteIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg {...base(size, color)}><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6" /></svg>
);
export const ImageIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg {...base(size, color)}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 17l-5-5-8 7" /></svg>
);
export const QuestionIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg {...base(size, color)}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17h.01" /></svg>
);
