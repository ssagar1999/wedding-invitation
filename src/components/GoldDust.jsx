/* Fine metallic gold dust: soft drifting motes + the occasional four-point glint.
   Sprites are pre-rendered once; the loop pauses when the tab is hidden. */
import { useEffect, useRef } from 'react';

const TONES = ['255,236,190', '232,207,154', '214,178,108', '246,224,176', '242,201,181'];

function makeSprite(rgb, glint) {
  const s = glint ? 48 : 16, c = document.createElement('canvas');
  c.width = c.height = s;
  const x = c.getContext('2d'), h = s / 2;
  const g = x.createRadialGradient(h, h, 0, h, h, h);
  g.addColorStop(0, `rgba(255,251,236,1)`);
  g.addColorStop(glint ? 0.08 : 0.25, `rgba(${rgb},.95)`);
  g.addColorStop(glint ? 0.25 : 0.6, `rgba(${rgb},.25)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g;
  x.fillRect(0, 0, s, s);
  if (glint) {
    x.globalCompositeOperation = 'lighter';
    [[s, 1.2], [1.2, s]].forEach(([w, hh]) => {
      const lg = x.createLinearGradient(h - w / 2, h - hh / 2, h + w / 2, h + hh / 2);
      lg.addColorStop(0, 'rgba(255,240,200,0)');
      lg.addColorStop(0.5, 'rgba(255,248,225,.95)');
      lg.addColorStop(1, 'rgba(255,240,200,0)');
      x.fillStyle = lg;
      x.fillRect(h - w / 2, h - hh / 2, w, hh);
    });
  }
  return c;
}

export default function GoldDust({ density = 1, className = '', fixed = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dots = TONES.map((t) => makeSprite(t, false));
    const glints = TONES.slice(0, 2).map((t) => makeSprite(t, true));
    let W = 0, H = 0, dpr = 1, P = [], raf = 0, running = true;

    const seed = () => {
      const n = Math.round(Math.min(140, (W * H) / 9000) * density);
      P = Array.from({ length: n }, () => spawn(true));
    };
    const spawn = (anywhere) => ({
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 10,
      z: 0.35 + Math.random() * 0.9,              // depth: size + speed
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(0.05 + Math.random() * 0.18),
      ph: Math.random() * Math.PI * 2,
      tw: 0.008 + Math.random() * 0.02,
      tone: (Math.random() * dots.length) | 0,
      glint: 0,
    });
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of P) {
        if (!reduce) {
          p.ph += p.tw; p.x += p.vx + Math.sin(p.ph * 0.7) * 0.06 * p.z; p.y += p.vy * p.z;
          if (p.y < -10) Object.assign(p, spawn(false));
          if (p.glint > 0) p.glint -= 0.018;
          else if (Math.random() < 0.0009) p.glint = 1;
        }
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(p.ph));
        const s = (2.2 + p.z * 3.2);
        ctx.globalAlpha = Math.min(1, tw * (0.35 + p.z * 0.5));
        ctx.drawImage(dots[p.tone], p.x - s / 2, p.y - s / 2, s, s);
        if (p.glint > 0) {
          const g = Math.sin(p.glint * Math.PI), gs = 10 + p.z * 16;
          ctx.globalAlpha = g * 0.9;
          ctx.drawImage(glints[p.tone % 2], p.x - gs / 2, p.y - gs / 2, gs, gs);
        }
      }
      ctx.globalAlpha = 1;
    };
    const loop = () => { if (!running) return; draw(); raf = requestAnimationFrame(loop); };
    const vis = () => { running = !document.hidden && !reduce; cancelAnimationFrame(raf); if (running) loop(); };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', vis);
    reduce ? draw() : loop();
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', vis); };
  }, [density]);

  return <canvas ref={ref} className={`gold-dust ${fixed ? 'fixed' : ''} ${className}`} aria-hidden="true" />;
}
