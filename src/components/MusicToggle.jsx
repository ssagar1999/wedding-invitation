import React, { useEffect, useRef, useState } from 'react';
import { Music2, VolumeX } from 'lucide-react';

/* Silent until the guest interacts: tapping "Open Invitation" (which dispatches
   `ls-music-play`) or this button starts it. Starts at `startAt` and loops back there. */
export default function MusicToggle({ src, startAt = 0, show }) {
  const audio = useRef(null);
  const [on, setOn] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const a = new Audio(src);
    a.preload = 'metadata';
    const seek = () => { if (a.currentTime < startAt - 1) { try { a.currentTime = startAt; } catch {} } };
    a.addEventListener('loadedmetadata', seek);
    a.addEventListener('playing', seek);
    a.addEventListener('ended', () => { a.currentTime = startAt; a.play().catch(() => {}); });
    audio.current = a;
    return () => a.pause();
  }, [src, startAt]);

  // play() is called synchronously inside the tap so iOS/Android allow it
  const play = () => {
    const a = audio.current;
    if (a.readyState >= 1 && a.currentTime < startAt - 1) { try { a.currentTime = startAt; } catch {} }
    a.play().then(() => setOn(true)).catch(() => setOn(false));
  };
  const pause = () => { audio.current.pause(); setOn(false); };

  useEffect(() => {
    const h = () => play();
    window.addEventListener('ls-music-play', h);
    return () => window.removeEventListener('ls-music-play', h);
  }, []);

  useEffect(() => {
    if (!show || on) return;
    const t1 = setTimeout(() => setHint(true), 2500), t2 = setTimeout(() => setHint(false), 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [show, on]);

  if (!show) return null;
  return (
    <div className="music">
      {hint && !on && <span className="music-hint">Tap for music</span>}
      <button className={`music-btn ${on ? 'on' : ''}`} onClick={() => { setHint(false); on ? pause() : play(); }} aria-pressed={on} aria-label={on ? 'Mute music' : 'Play music'}>
        {on ? <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span> : <VolumeX size={20} strokeWidth={1.4} />}
        <Music2 className="music-note" size={11} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );
}
