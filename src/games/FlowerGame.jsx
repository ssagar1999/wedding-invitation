import React, { useEffect, useRef, useState } from 'react';

const DURATION = 30;
const KINDS = [
  { pts: 1, col: '#e9963a', w: 60 },   // marigold
  { pts: 2, col: '#b8324f', w: 26 },   // rose
  { pts: 5, col: '#f6e3b0', w: 8, glow: true }, // golden bloom
  { pts: 3, diya: true, w: 6 },
];
const pick = () => { let r = Math.random() * 100; for (const k of KINDS) if ((r -= k.w) < 0) return k; return KINDS[0]; };
const rank = (s) => s >= 120 ? 'Shahi Baraati' : s >= 80 ? 'Sangeet Star' : s >= 45 ? 'Dancing Mama-ji' : s >= 20 ? 'Eager Cousin' : 'Sweet-Tooth Guest';
const store = { get: (k) => { try { return +localStorage.getItem(k) || 0; } catch { return 0; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

/* Phoolon Ki Barsaat — catch falling blossoms in a golden thaal. */
export default function FlowerGame() {
  const cv = useRef(null);
  const st = useRef(null);
  const [hud, setHud] = useState({ score: 0, time: DURATION });
  const [best, setBest] = useState(() => store.get('ls_best'));
  const [phase, setPhase] = useState('ready'); // ready | play | over
  const [result, setResult] = useState(null);

  useEffect(() => {
    const c = cv.current, ctx = c.getContext('2d'), W = c.width, H = c.height;
    const keys = {};
    const s = (st.current = { run: false, items: [], fx: [], thaal: { x: W / 2, tx: W / 2, w: 96 } });

    const flower = (x, y, r, col, rot, glow) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      if (glow) { ctx.shadowColor = '#ffe9b0'; ctx.shadowBlur = 18; }
      ctx.fillStyle = col;
      for (let i = 0; i < 10; i++) { ctx.rotate(Math.PI / 5); ctx.beginPath(); ctx.ellipse(0, -r * 0.6, r * 0.28, r * 0.6, 0, 0, 7); ctx.fill(); }
      ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(90,35,10,.85)'; ctx.beginPath(); ctx.arc(0, 0, r * 0.24, 0, 7); ctx.fill();
      ctx.restore();
    };
    const diya = (x, y, r) => {
      ctx.save(); ctx.translate(x, y);
      const g = ctx.createLinearGradient(0, 0, 0, r); g.addColorStop(0, '#f3e2b6'); g.addColorStop(1, '#9a7232');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-r, 0); ctx.quadraticCurveTo(0, r * 1.3, r, 0); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#ffcf6a'; ctx.shadowColor = '#ff9a2a'; ctx.shadowBlur = 16;
      ctx.beginPath(); ctx.moveTo(0, -r * 1.25); ctx.quadraticCurveTo(r * 0.6, -r * 0.4, 0, -r * 0.08); ctx.quadraticCurveTo(-r * 0.6, -r * 0.4, 0, -r * 1.25); ctx.fill();
      ctx.restore();
    };
    const bg = () => {
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a0a16'); g.addColorStop(1, '#16040a');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(201,164,92,.16)'; ctx.lineWidth = 1;
      for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.arc(W / 2, H * 0.42, i * 56, 0, 7); ctx.stroke(); }
      ctx.font = 'italic 64px "Great Vibes", cursive'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(201,164,92,.13)';
      ctx.fillText('L & S', W / 2, H * 0.46);
    };
    const thaal = () => {
      const { x, w } = s.thaal, y = H - 54;
      ctx.save(); ctx.translate(x, y);
      const g = ctx.createLinearGradient(-w / 2, 0, w / 2, 26);
      g.addColorStop(0, '#8a6428'); g.addColorStop(0.45, '#f7e8c0'); g.addColorStop(1, '#a47b34');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.quadraticCurveTo(0, 36, w / 2, 0); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#6b4a18'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#9b1c31'; ctx.beginPath(); ctx.arc(0, 7, 4.5, 0, 7); ctx.fill();
      ctx.restore();
    };
    const idle = () => { bg(); thaal(); };
    idle();

    let last = 0, spawn = 0, end = 0, raf = 0;
    const frame = (now) => {
      if (!s.run) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const left = Math.max(0, (end - now) / 1000), el = DURATION - left;
      if (keys.ArrowLeft) s.thaal.tx -= 460 * dt;
      if (keys.ArrowRight) s.thaal.tx += 460 * dt;
      s.thaal.tx = Math.max(s.thaal.w / 2, Math.min(W - s.thaal.w / 2, s.thaal.tx));
      s.thaal.x += (s.thaal.tx - s.thaal.x) * Math.min(1, dt * 14);
      if ((spawn -= dt) <= 0) {
        s.items.push({ k: pick(), x: 28 + Math.random() * (W - 56), y: -30, v: 150 + Math.random() * 120 + el * 5, r: 17 + Math.random() * 6, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 3 });
        spawn = 0.38 - el * 0.004;
      }
      bg();
      for (const it of s.items) {
        it.y += it.v * dt; it.rot += it.vr * dt;
        it.k.diya ? diya(it.x, it.y, it.r * 0.9) : flower(it.x, it.y, it.r, it.k.col, it.rot, it.k.glow);
        if (!it.gone && it.y > H - 64 && it.y < H - 26 && Math.abs(it.x - s.thaal.x) < s.thaal.w / 2 + 6) {
          it.gone = true; s.score += it.k.pts;
          s.fx.push({ x: it.x, y: H - 62, t: 0, txt: '+' + it.k.pts });
        }
      }
      s.items = s.items.filter((i) => !i.gone && i.y < H + 40);
      thaal();
      ctx.font = '600 22px "Cormorant Garamond", serif'; ctx.textAlign = 'center';
      for (const f of s.fx) { f.t += dt; f.y -= 50 * dt; ctx.globalAlpha = Math.max(0, 1 - f.t * 1.6); ctx.fillStyle = '#f3e2b6'; ctx.fillText(f.txt, f.x, f.y); }
      ctx.globalAlpha = 1; s.fx = s.fx.filter((f) => f.t < 0.65);
      setHud({ score: s.score, time: Math.ceil(left) });
      if (left <= 0) { s.run = false; s.onEnd(s.score); return; }
      raf = requestAnimationFrame(frame);
    };
    s.start = () => { s.items = []; s.fx = []; s.score = 0; s.run = true; last = performance.now(); end = last + DURATION * 1000; spawn = 0; raf = requestAnimationFrame(frame); };

    const move = (e) => { const r = c.getBoundingClientRect(), p = e.touches ? e.touches[0] : e; s.thaal.tx = (p.clientX - r.left) * (W / r.width); if (!s.run) { s.thaal.x = s.thaal.tx; idle(); } };
    const tm = (e) => { if (s.run) e.preventDefault(); move(e); };
    const kd = (e) => { if (s.run && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); keys[e.key] = true; } };
    const ku = (e) => { keys[e.key] = false; };
    c.addEventListener('mousemove', move); c.addEventListener('touchmove', tm, { passive: false }); c.addEventListener('touchstart', move, { passive: true });
    window.addEventListener('keydown', kd); window.addEventListener('keyup', ku);
    return () => { s.run = false; cancelAnimationFrame(raf); c.removeEventListener('mousemove', move); c.removeEventListener('touchmove', tm); c.removeEventListener('touchstart', move); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  useEffect(() => {
    st.current.onEnd = (score) => {
      const nb = score > best;
      if (nb) { setBest(score); store.set('ls_best', score); }
      setResult({ score, nb, title: rank(score) });
      setPhase('over');
    };
  }, [best]);

  const start = () => { setResult(null); setPhase('play'); st.current.start(); };

  return (
    <div className="game-box">
      <div className="hud"><span>Score <b>{hud.score}</b></span><span>Time <b>{hud.time}</b></span><span>Best <b>{best}</b></span></div>
      <canvas ref={cv} width="420" height="540" className="game-canvas" />
      {phase !== 'play' && (
        <div className="game-overlay">
          {phase === 'over' && result ? (
            <>
              <p className="eyebrow">Your title</p>
              <h4 className="game-title gold-text">{result.title}</h4>
              <p>You caught <b>{result.score}</b> points{result.nb ? ' — a new best!' : '.'}<br />Thank you for showering the couple with blessings.</p>
            </>
          ) : (
            <>
              <h4 className="game-title gold-text">Phoolon Ki Barsaat</h4>
              <p>Slide the golden thaal to catch the falling blossoms. Golden blooms are worth the most — 30 seconds.</p>
            </>
          )}
          <button className="btn-open sm" onClick={start}><span>{phase === 'over' ? 'Play Again' : 'Play'}</span></button>
        </div>
      )}
    </div>
  );
}
