/* Small frontal Ganesh ji in gold line-and-fill style, set inside a lotus medallion. */
import React from 'react';

const G = 'url(#g-gold)';
const INK = '#3a0a16';

export default function Ganesha({ size = 104, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-70 -70 140 140" aria-label="Shri Ganesh" role="img">
      {/* medallion */}
      <circle r="66" fill="none" stroke={G} strokeWidth="1" />
      <circle r="61" fill="none" stroke={G} strokeWidth=".5" strokeDasharray="1 3" />
      {Array.from({ length: 20 }, (_, i) => (
        <path key={i} transform={`rotate(${i * 18})`} d="M0 -50C4 -53 4 -57 0 -60C-4 -57 -4 -53 0 -50Z" fill={G} opacity=".75" />
      ))}
      <circle r="48" fill={INK} stroke={G} strokeWidth="1.3" />
      <circle r="45" fill="url(#g-glow)" opacity=".55" />

      <g transform="translate(0 2)">
        {/* ears */}
        <path d="M-12 -14C-24 -24 -40 -22 -42 -8C-44 6 -36 18 -22 16C-16 15 -13 10 -12 4Z" fill={G} />
        <path d="M12 -14C24 -24 40 -22 42 -8C44 6 36 18 22 16C16 15 13 10 12 4Z" fill={G} />
        {/* ear ornament: inset rim + dotted border */}
        <path d="M-14 -12C-24 -19 -36 -18 -37.5 -7C-39 4 -32 12 -21 11" fill="none" stroke={INK} strokeWidth=".9" />
        <path d="M14 -12C24 -19 36 -18 37.5 -7C39 4 32 12 21 11" fill="none" stroke={INK} strokeWidth=".9" />
        <path d="M-16 -8C-23 -12 -31 -11 -32 -5C-33 2 -28 7 -21 6" fill="none" stroke={INK} strokeWidth="1.4" strokeDasharray=".1 3" strokeLinecap="round" />
        <path d="M16 -8C23 -12 31 -11 32 -5C33 2 28 7 21 6" fill="none" stroke={INK} strokeWidth="1.4" strokeDasharray=".1 3" strokeLinecap="round" />
        {/* crown (mukut) */}
        <path d="M-14 -22L-11 -34-6 -30 0 -42 6 -30 11 -34 14 -22Z" fill={G} />
        <path d="M-15 -22H15V-18H-15Z" fill={G} />
        <circle cy="-34" r="2" fill={INK} /><circle cx="-8" cy="-26" r="1.3" fill={INK} /><circle cx="8" cy="-26" r="1.3" fill={INK} />
        <circle cy="-44" r="1.8" fill={G} />

        {/* head */}
        <path d="M-15 -18H15C17 -8 16 2 12 8C8 13 4 14 0 14C-4 14 -8 13 -12 8C-16 2 -17 -8 -15 -18Z" fill={G} stroke={INK} strokeWidth=".7" />
        {/* tilak + eyes */}
        <path d="M0 -16V-8" stroke="#9b1c31" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M-3 -16H3" stroke={INK} strokeWidth="1" strokeLinecap="round" />
        <path d="M-11 -7Q-7 -10 -3 -7.5M11 -7Q7 -10 3 -7.5" fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" />
        <path d="M-10.5 -3C-8.5 -5.6 -4.5 -5.6 -3 -3C-4.5 -1.4 -8.5 -1.4 -10.5 -3Z" fill={INK} />
        <path d="M10.5 -3C8.5 -5.6 4.5 -5.6 3 -3C4.5 -1.4 8.5 -1.4 10.5 -3Z" fill={INK} />
        <circle cx="-6.6" cy="-3.4" r=".7" fill="#f6e8c4" /><circle cx="6.6" cy="-3.4" r=".7" fill="#f6e8c4" />

        {/* tusks */}
        <path d="M-7 8C-10 12 -12 14 -15 14C-12 11 -10 9 -9 7Z" fill="#fbf3e4" />
        <path d="M7 8C9 10 10 11 11 12C10 12 8.5 11 7.5 10Z" fill="#fbf3e4" />

        {/* trunk: tapering down, curling to his left */}
        <path d="M0 4C-0.5 14 -3.5 23 -2 31" fill="none" stroke={G} strokeWidth="8.5" strokeLinecap="round" />
        <path d="M-2 31C0 38 8 40 12 35C15 31 12 26 8.5 28C6.5 29.5 7 32 9 32.5" fill="none" stroke={G} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-3.4 12Q0 13.6 3.4 12M-4 17Q-0.6 18.6 2.8 17M-4.6 22Q-1.4 23.6 1.8 22M-4.8 27Q-1.8 28.4 1.2 27" fill="none" stroke={INK} strokeWidth=".7" opacity=".75" />
      </g>
    </svg>
  );
}
