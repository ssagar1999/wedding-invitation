import React, { useEffect, useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import { eventDate, downloadICS } from '../lib/calendar.js';
import Reveal from './Reveal.jsx';
import { Divider } from '../ornaments/Ornaments.jsx';

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown({ wedding }) {
  const target = eventDate(wedding.events[wedding.events.length - 1], wedding.year);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!target) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [target && target.getTime()]);

  const d = target ? Math.max(0, (target.getTime() - now) / 1000) : null;
  const cells = [
    ['Days', d == null ? null : Math.floor(d / 86400)],
    ['Hours', d == null ? null : Math.floor((d % 86400) / 3600)],
    ['Minutes', d == null ? null : Math.floor((d % 3600) / 60)],
    ['Seconds', d == null ? null : Math.floor(d % 60)],
  ];

  return (
    <section className="section countdown-section">
      <Reveal>
        <p className="eyebrow">Counting the moments</p>
        <h3 className="section-title gold-text">Until We Say “Forever”</h3>
        <div className="count-grid" role="timer" aria-live="off">
          {cells.map(([label, v]) => (
            <div className="count-cell" key={label}>
              <span className={`count-num ${v == null ? 'pending' : ''}`}>{v == null ? '—' : pad(v)}</span>
              <span className="count-label">{label}</span>
            </div>
          ))}
        </div>
        {!wedding.year && <p className="tba center">The countdown begins once the year is announced</p>}
        <Divider />
        <button
          className="btn-ghost"
          onClick={() => downloadICS(wedding.events, wedding)}
          disabled={!wedding.year}
          title={wedding.year ? 'Add both celebrations to your calendar' : 'Available once the year is announced'}
        >
          <CalendarPlus size={18} strokeWidth={1.4} />
          <span>Save Both Dates</span>
        </button>
      </Reveal>
    </section>
  );
}
