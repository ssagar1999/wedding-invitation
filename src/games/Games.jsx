import React, { useState } from 'react';
import FlowerGame from './FlowerGame.jsx';
import DiyaGame from './DiyaGame.jsx';
import Reveal from '../components/Reveal.jsx';

const TABS = [
  { id: 'flowers', label: 'Phoolon Ki Barsaat', C: FlowerGame },
  { id: 'diya', label: 'Diya Jalao', C: DiyaGame },
];

export default function Games() {
  const [tab, setTab] = useState('flowers');
  const Active = TABS.find((t) => t.id === tab).C;
  return (
    <section className="section games">
      <Reveal>
        <p className="eyebrow">Before the big day</p>
        <h3 className="section-title gold-text">A Little Celebration</h3>
        <p className="lede">Two small games, made with love — play while you wait for the festivities.</p>
        <div className="tabs" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} className={`tab ${tab === t.id ? 'on' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <Active key={tab} />
      </Reveal>
    </section>
  );
}
