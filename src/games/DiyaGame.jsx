import React, { useRef, useState } from 'react';
import { Diya } from '../ornaments/Ornaments.jsx';

const NOTES = [261.63, 293.66, 329.63, 392, 440, 523.25]; // Raga Bhoopali
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const store = { get: (k) => { try { return +localStorage.getItem(k) || 0; } catch { return 0; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

/* Diya Jalao — watch the diyas light in order, then light them back. */
export default function DiyaGame() {
  const [lit, setLit] = useState(-1);
  const [bad, setBad] = useState(-1);
  const [round, setRound] = useState(0);
  const [best, setBest] = useState(() => store.get('ls_dbest'));
  const [msg, setMsg] = useState('Press start and watch carefully.');
  const [playing, setPlaying] = useState(false);
  const g = useRef({ seq: [], pos: 0, accept: false, ac: null });

  const tone = (i) => {
    try {
      const s = g.current;
      s.ac ||= new (window.AudioContext || window.webkitAudioContext)();
      const ac = s.ac, o = ac.createOscillator(), v = ac.createGain();
      o.type = 'triangle'; o.frequency.value = NOTES[i];
      v.gain.setValueAtTime(0.0001, ac.currentTime); v.gain.exponentialRampToValueAtTime(0.16, ac.currentTime + 0.02);
      v.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.5);
      o.connect(v); v.connect(ac.destination); o.start(); o.stop(ac.currentTime + 0.55);
    } catch {}
  };
  const flash = async (i, ms) => { setLit(i); tone(i); await wait(ms); setLit(-1); await wait(160); };

  const next = async () => {
    const s = g.current;
    s.seq.push((Math.random() * 6) | 0);
    setRound(s.seq.length);
    s.accept = false; setMsg('Watch the diyas…'); await wait(700);
    const speed = Math.max(220, 430 - s.seq.length * 18);
    for (const i of s.seq) await flash(i, speed);
    s.pos = 0; s.accept = true; setMsg('Your turn — light them in the same order.');
  };

  const press = async (i) => {
    const s = g.current;
    if (!s.accept) return;
    setLit(i); tone(i); setTimeout(() => setLit((l) => (l === i ? -1 : l)), 260);
    if (i !== s.seq[s.pos]) {
      s.accept = false; setBad(i); setTimeout(() => setBad(-1), 500);
      const score = s.seq.length - 1;
      if (score > best) { setBest(score); store.set('ls_dbest', score); }
      setMsg(score >= 8 ? `Wah! ${score} rounds — the memory of a true Pandit-ji.` : score >= 4 ? `${score} rounds — beautifully lit!` : `${score} round${score === 1 ? '' : 's'} — the diyas flickered. Try again!`);
      setPlaying(false); return;
    }
    if (++s.pos === s.seq.length) { s.accept = false; setMsg('Shubh! Next round…'); await wait(900); next(); }
  };

  const start = () => { g.current.seq = []; setPlaying(true); next(); };

  return (
    <div className="game-box">
      <div className="hud"><span>Round <b>{round}</b></span><span>Best <b>{best}</b></span></div>
      <div className="diya-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <button key={i} className={`dbtn ${lit === i ? 'lit' : ''} ${bad === i ? 'bad' : ''}`} onClick={() => press(i)} aria-label={`Diya ${i + 1}`}>
            <Diya size={64} />
          </button>
        ))}
      </div>
      <p className="dstat">{msg}</p>
      <div className="center pad-b">
        <button className="btn-open sm" onClick={start} disabled={playing}><span>{playing ? 'Playing…' : round ? 'Play Again' : 'Start'}</span></button>
      </div>
    </div>
  );
}
