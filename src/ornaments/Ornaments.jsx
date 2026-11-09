/* Hand-built SVG ornaments. All gold strokes reference the shared gradients in <GoldDefs/>. */
import React, { useMemo } from 'react';

const G = 'url(#g-gold)';
const GS = 'url(#g-gold-soft)';
const SOLID = '#c9a45c';

/* ---------- shared gradient definitions (render once) ---------- */
export function GoldDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6428" />
          <stop offset=".22" stopColor="#d2ad66" />
          <stop offset=".42" stopColor="#f7e8c0" />
          <stop offset=".58" stopColor="#d4ae68" />
          <stop offset=".8" stopColor="#9a7232" />
          <stop offset="1" stopColor="#e6cb92" />
        </linearGradient>
        <linearGradient id="g-gold-soft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e2b6" />
          <stop offset=".5" stopColor="#c9a45c" />
          <stop offset="1" stopColor="#8f6a2c" />
        </linearGradient>
        <linearGradient id="g-rose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9c5f4f" />
          <stop offset=".45" stopColor="#f2c9b5" />
          <stop offset="1" stopColor="#b77a63" />
        </linearGradient>
        <radialGradient id="g-flame" cx="50%" cy="72%" r="62%">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset=".35" stopColor="#ffd77a" />
          <stop offset=".75" stopColor="#f08a24" />
          <stop offset="1" stopColor="#c2410c" />
        </radialGradient>
        <radialGradient id="g-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd98a" stopOpacity=".75" />
          <stop offset=".4" stopColor="#f2a541" stopOpacity=".25" />
          <stop offset="1" stopColor="#f2a541" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ---------- geometry helpers ---------- */
const petal = (r0, r1, w) =>
  `M0 ${-r0}C${w} ${-(r0 + (r1 - r0) * 0.28)} ${w * 0.55} ${-(r1 - (r1 - r0) * 0.12)} 0 ${-r1}` +
  `C${-w * 0.55} ${-(r1 - (r1 - r0) * 0.12)} ${-w} ${-(r0 + (r1 - r0) * 0.28)} 0 ${-r0}Z`;

const ring = (n, fn) => Array.from({ length: n }, (_, i) => fn((i * 360) / n, i));

/* ---------- Mandala ---------- */
export function Mandala({ className = '', style, detail = 'full', center }) {
  const body = useMemo(() => {
    const els = [];
    let k = 0;
    const add = (el) => els.push(React.cloneElement(el, { key: k++ }));
    // centre
    add(<circle r="10" fill="none" stroke={G} strokeWidth="1.2" />);
    ring(8, (a) => add(<path d={petal(10, 26, 7)} transform={`rotate(${a})`} fill="none" stroke={G} strokeWidth="1" />));
    add(<circle r="30" fill="none" stroke={G} strokeWidth=".8" />);
    ring(24, (a) => add(<circle cx="0" cy="-34" r="1.4" fill={G} transform={`rotate(${a})`} />));
    // lotus ring
    ring(12, (a) => add(<path d={petal(38, 70, 16)} transform={`rotate(${a})`} fill="none" stroke={G} strokeWidth="1.1" />));
    ring(12, (a) => add(<path d={petal(44, 62, 7)} transform={`rotate(${a})`} fill={G} opacity=".22" />));
    ring(12, (a) => add(<path d={petal(40, 64, 11)} transform={`rotate(${a + 15})`} fill="none" stroke={G} strokeWidth=".6" opacity=".7" />));
    add(<circle r="74" fill="none" stroke={G} strokeWidth="1" />);
    add(<circle r="78" fill="none" stroke={G} strokeWidth=".5" strokeDasharray="1.5 3.5" />);
    if (detail !== 'simple') {
      // scallops
      ring(32, (a) => add(<path d="M-7.3 -82A7.4 7.4 0 0 1 7.3 -82" transform={`rotate(${a})`} fill="none" stroke={G} strokeWidth=".9" />));
      ring(32, (a) => add(<circle cx="0" cy="-92" r="1.6" fill={G} transform={`rotate(${a + 5.625})`} />));
      // outer leaves
      ring(24, (a) => add(<path d={petal(96, 132, 10)} transform={`rotate(${a})`} fill="none" stroke={G} strokeWidth="1" />));
      ring(24, (a) => add(<path d="M0 -100V-126" transform={`rotate(${a})`} stroke={G} strokeWidth=".5" />));
      ring(24, (a) => add(<path d={petal(104, 122, 4)} transform={`rotate(${a + 7.5})`} fill={G} opacity=".35" />));
      add(<circle r="136" fill="none" stroke={G} strokeWidth=".8" />);
      ring(48, (a) => add(<path d="M0 -138L2.2 -144 0 -150 -2.2 -144Z" transform={`rotate(${a})`} fill={G} opacity=".8" />));
      add(<circle r="154" fill="none" stroke={G} strokeWidth=".5" strokeDasharray="2 4" />);
    }
    return els;
  }, [detail]);
  const R = detail === 'simple' ? 84 : 158;
  return (
    <svg className={className} style={style} viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`} aria-hidden="true">
      {body}
      {center}
    </svg>
  );
}

/* ---------- Mughal multifoil arch frame ---------- */
function cubicPt(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}
function cusped(inset, springY, apexY, W, H, lobes = 6) {
  const L = inset, R = W - inset, cx = W / 2;
  const left = [[L, springY], [L, springY - (springY - apexY) * 0.55], [cx - (cx - L) * 0.42, apexY + (springY - apexY) * 0.2], [cx, apexY]];
  const pts = [];
  for (let i = 0; i <= lobes; i++) pts.push(cubicPt(...left, i / lobes));
  const all = [...pts, ...pts.slice(0, -1).reverse().map(([x, y]) => [W - x, y])];
  let d = `M${L} ${H}V${springY}`;
  for (let i = 1; i < all.length; i++) {
    const [x0, y0] = all[i - 1], [x1, y1] = all[i];
    const r = Math.hypot(x1 - x0, y1 - y0) * 0.6;
    d += `A${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  d += `V${H}`;
  return { d, cusps: all };
}
function pointed(inset, springY, apexY, W, H) {
  const L = inset, R = W - inset, cx = W / 2;
  return `M${L} ${H}V${springY}C${L} ${springY - (springY - apexY) * 0.55} ${cx - (cx - L) * 0.42} ${apexY + (springY - apexY) * 0.2} ${cx} ${apexY}` +
    `C${cx + (cx - L) * 0.42} ${apexY + (springY - apexY) * 0.2} ${R} ${springY - (springY - apexY) * 0.55} ${R} ${springY}V${H}`;
}

export function Arch({ className = '', W = 320, H = 520, draw = false, hangings = true }) {
  const outer = pointed(6, 190, 8, W, H);
  const outer2 = pointed(14, 194, 22, W, H);
  const { d: inner, cusps } = cusped(30, 204, 52, W, H, 6);
  const dl = draw ? { pathLength: 1, className: 'draw' } : {};
  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <path d={outer} fill="none" stroke={G} strokeWidth="2.2" {...dl} />
      <path d={outer2} fill="none" stroke={G} strokeWidth=".8" {...dl} />
      <path d={inner} fill="none" stroke={G} strokeWidth="1.4" {...dl} />
      {/* keystone ornament */}
      <g transform={`translate(${W / 2} 30)`} className={draw ? 'fade-late' : ''}>
        <path d="M0 -14C6 -6 8 0 0 10C-8 0 -6 -6 0 -14Z" fill={G} />
        <circle cy="16" r="2.2" fill={G} />
        <path d="M-18 4C-10 4 -6 0 -4 -6M18 4C10 4 6 0 4 -6" fill="none" stroke={G} strokeWidth="1" />
      </g>
      {/* little hanging drops at every cusp */}
      {hangings && cusps.slice(1, -1).map(([x, y], i) => (
        <g key={i} className={draw ? 'fade-late' : ''} style={{ animationDelay: `${1.2 + i * 0.05}s` }}>
          <line x1={x} y1={y} x2={x} y2={y + 9 + (i % 2) * 5} stroke={SOLID} strokeWidth=".6" />
          <circle cx={x} cy={y + 11 + (i % 2) * 5} r="1.9" fill={G} />
        </g>
      ))}
      {/* pillar details */}
      {[18, W - 18].map((x, i) => (
        <g key={i} className={draw ? 'fade-late' : ''}>
          <path d={`M${x} 214V${H - 10}`} stroke={SOLID} strokeWidth=".6" strokeDasharray="1 5" />
          <path d={`M${x - 6} 206h12l-3 6h-6z`} fill={G} />
        </g>
      ))}
    </svg>
  );
}

/* ---------- Diya ---------- */
export function Diya({ className = '', size = 64 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="34" r="34" fill="url(#g-glow)" className="diya-glow" />
      <path className="flame" d="M50 6c9 12 14 20 10 31-2 6-6 8-10 8s-8-2-10-8C36 26 41 18 50 6z" fill="url(#g-flame)" />
      <path d="M50 22c3 6 4 10 2 15-1 2-1.5 3-2 3s-1-1-2-3c-2-5-1-9 2-15z" fill="#fffbe6" opacity=".85" className="flame" />
      <path d="M10 52h80c0 18-17 30-40 30S10 70 10 52z" fill={GS} />
      <path d="M10 52c12 7 68 7 80 0" fill="none" stroke="#6b4a18" strokeWidth="1.5" />
      <path d="M24 64c8 4 44 4 52 0" fill="none" stroke="#f7e8c0" strokeWidth=".8" opacity=".7" />
      <path d="M38 82h24l4 8H34z" fill={G} />
    </svg>
  );
}

/* ---------- Om medallion (auspicious symbol) ---------- */
export function OmMedallion({ className = '', size = 96 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-60 -60 120 120" aria-hidden="true">
      <circle r="56" fill="none" stroke={G} strokeWidth="1" />
      <circle r="51" fill="none" stroke={G} strokeWidth=".5" strokeDasharray="1 3" />
      {ring(16, (a, i) => <path key={i} d={petal(38, 50, 5)} transform={`rotate(${a})`} fill="none" stroke={G} strokeWidth=".8" />)}
      <circle r="35" fill="#3a0a16" stroke={G} strokeWidth="1.2" />
      <text y="13" textAnchor="middle" fontSize="40" fill={G} style={{ fontFamily: '"Noto Sans Devanagari","Kohinoor Devanagari","Mangal",serif' }}>ॐ</text>
    </svg>
  );
}

/* ---------- Lotus ---------- */
export function Lotus({ className = '', width = 120 }) {
  return (
    <svg className={className} width={width} viewBox="-60 -46 120 56" aria-hidden="true">
      <path d="M0 -42C12 -28 12 -10 0 4C-12 -10 -12 -28 0 -42Z" fill={G} opacity=".9" />
      <path d="M0 4C-6 -12 -18 -26 -32 -30C-30 -14 -20 -2 0 4Z" fill="none" stroke={G} strokeWidth="1.3" />
      <path d="M0 4C6 -12 18 -26 32 -30C30 -14 20 -2 0 4Z" fill="none" stroke={G} strokeWidth="1.3" />
      <path d="M0 4C-14 -4 -34 -12 -54 -8C-42 4 -22 8 0 4Z" fill="none" stroke={G} strokeWidth="1.1" />
      <path d="M0 4C14 -4 34 -12 54 -8C42 4 22 8 0 4Z" fill="none" stroke={G} strokeWidth="1.1" />
      <path d="M-40 8H40" stroke={SOLID} strokeWidth=".8" />
    </svg>
  );
}

/* ---------- Divider ---------- */
export function Divider({ className = '', variant = 'diamond' }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <span className="divider-line" />
      {variant === 'lotus' ? (
        <Lotus width={54} />
      ) : (
        <svg width="46" height="18" viewBox="-23 -9 46 18">
          <path d="M0 -8L5 0 0 8 -5 0Z" fill={G} />
          <circle cx="-12" r="2" fill={G} /><circle cx="12" r="2" fill={G} />
          <circle cx="-19" r="1.2" fill={G} /><circle cx="19" r="1.2" fill={G} />
        </svg>
      )}
      <span className="divider-line r" />
    </div>
  );
}

/* ---------- Corner flourish (top-left; rotate for others) ---------- */
export function Corner({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" aria-hidden="true">
      <path d="M6 114V46C6 24 24 6 46 6H114" fill="none" stroke={G} strokeWidth="1.6" />
      <path d="M14 106V50C14 30 30 14 50 14H106" fill="none" stroke={G} strokeWidth=".7" />
      <path d="M22 84C22 50 50 22 84 22" fill="none" stroke={G} strokeWidth="1" />
      <path d="M30 70C34 52 52 34 70 30C60 40 54 46 52 52C46 54 40 60 30 70Z" fill={G} opacity=".85" />
      <path d="M26 96C30 92 34 90 40 90M96 26C92 30 90 34 90 40" fill="none" stroke={G} strokeWidth="1" />
      <circle cx="40" cy="90" r="2.4" fill={G} /><circle cx="90" cy="40" r="2.4" fill={G} />
      <path d="M22 22l7 3-3 4-4-7zM22 22l3 7 4-3-7-4z" fill={G} />
      <circle cx="22" cy="22" r="3" fill={G} />
      <path d="M50 92c6-2 10-6 12-12M92 50c-2 6-6 10-12 12" fill="none" stroke={G} strokeWidth=".7" />
    </svg>
  );
}

/* ---------- Floral vine (horizontal) ---------- */
export function Vine({ className = '', width = 300 }) {
  const els = useMemo(() => {
    const out = [];
    const n = 9;
    for (let i = 0; i < n; i++) {
      const x = 20 + (i * 260) / (n - 1), up = i % 2 === 0;
      const y = 20 + (up ? -6 : 6) * 0.5;
      if (i === Math.floor(n / 2)) continue;
      out.push(<path key={'l' + i} d={`M${x} 20q${up ? '6 -12 14 -12q-4 10 -14 12z' : '6 12 14 12q-4 -10 -14 -12z'}`} fill={G} opacity=".85" />);
      if (i % 2 === 1) out.push(<circle key={'d' + i} cx={x - 8} cy={up ? 26 : 13} r="1.5" fill={G} />);
    }
    return out;
  }, []);
  return (
    <svg className={className} width={width} viewBox="0 0 300 40" aria-hidden="true">
      <path d="M10 20C50 8 90 32 130 20M170 20C210 8 250 32 290 20" fill="none" stroke={G} strokeWidth="1.1" />
      {els}
      <g transform="translate(150 20)">
        {ring(6, (a, i) => <path key={i} d={petal(3, 13, 5)} transform={`rotate(${a})`} fill={G} />)}
        <circle r="3.2" fill="#3a0a16" stroke={G} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ---------- Event motifs ---------- */
export function RingsMotif({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 140 110" aria-hidden="true">
      <circle cx="70" cy="58" r="44" fill="url(#g-glow)" opacity=".7" />
      <circle cx="55" cy="66" r="24" fill="none" stroke="url(#g-rose)" strokeWidth="5" />
      <circle cx="55" cy="66" r="24" fill="none" stroke="#fff3e6" strokeWidth=".8" opacity=".5" />
      <circle cx="85" cy="66" r="24" fill="none" stroke={G} strokeWidth="5" />
      <circle cx="85" cy="66" r="24" fill="none" stroke="#fff8e1" strokeWidth=".8" opacity=".5" />
      <path d="M77 30L85 22 93 30 85 42Z" fill="#fdf6ea" stroke={G} strokeWidth="1.2" />
      <path d="M77 30H93M81 30L85 42 89 30M81 30 85 22 89 30" fill="none" stroke="#c9a45c" strokeWidth=".6" />
      <g className="twinkle" style={{ transformOrigin: '104px 20px' }}>
        <path d="M104 12L105.5 18.5 112 20 105.5 21.5 104 28 102.5 21.5 96 20 102.5 18.5Z" fill="#fff4d6" />
      </g>
    </svg>
  );
}

export function AgniMotif({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 140 110" aria-hidden="true">
      <circle cx="70" cy="52" r="46" fill="url(#g-glow)" />
      <g className="flame" style={{ transformOrigin: '70px 76px' }}>
        <path d="M70 14c14 18 22 30 16 46-3 8-9 12-16 12s-13-4-16-12c-6-16 2-28 16-46z" fill="url(#g-flame)" />
        <path d="M54 40c6 10 8 18 4 28-4-2-8-8-8-14 0-6 2-10 4-14zM86 40c-6 10-8 18-4 28 4-2 8-8 8-14 0-6-2-10-4-14z" fill="url(#g-flame)" opacity=".85" />
        <path d="M70 40c5 8 7 14 4 22-1 3-3 4-4 4s-3-1-4-4c-3-8-1-14 4-22z" fill="#fffbe6" opacity=".9" />
      </g>
      <path d="M36 74h68l-6 10H42z" fill={G} />
      <path d="M30 84h80l-6 10H36z" fill={GS} />
      <path d="M24 94h92l-4 8H28z" fill={G} />
      <path d="M44 79h52M40 89h60" stroke="#5a1020" strokeWidth=".8" strokeDasharray="2 3" />
    </svg>
  );
}
