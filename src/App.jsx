import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { wedding } from './config/wedding.js';
import { GoldDefs, Mandala } from './ornaments/Ornaments.jsx';
import GoldDust from './components/GoldDust.jsx';
import Opening from './components/Opening.jsx';
import InvitationCard from './components/InvitationCard.jsx';
import PhotoArch from './components/PhotoArch.jsx';
import Countdown from './components/Countdown.jsx';
import EventCard from './components/EventCard.jsx';
import Closing from './components/Closing.jsx';
import Compliments from './components/Compliments.jsx';
import MusicToggle from './components/MusicToggle.jsx';
import Reveal from './components/Reveal.jsx';
import Games from './games/Games.jsx';

export default function App() {
  const [stage, setStage] = useState('closed'); // closed → opening → open

  useEffect(() => {
    document.documentElement.classList.toggle('locked', stage !== 'open');
    if (stage === 'opening') window.scrollTo(0, 0);
  }, [stage]);

  return (
    <>
      <GoldDefs />
      <div className="backdrop" aria-hidden="true">
        <Mandala className="side-mandala left" />
        <Mandala className="side-mandala right" />
      </div>
      <GoldDust />

      <motion.main
        className="main"
        initial={false}
        animate={stage === 'closed' ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: stage === 'opening' ? 0.6 : 0 }}
        aria-hidden={stage === 'closed'}
      >
        <InvitationCard wedding={wedding} />

        {wedding.photos?.portrait && (
          <section className="section story">
            <Reveal>
              <p className="eyebrow">Two hearts</p>
              <h3 className="section-title gold-text">One Beautiful Journey</h3>
            </Reveal>
            <Reveal delay={0.1}>
              <PhotoArch src={wedding.photos.portrait} alt={`${wedding.bride} and ${wedding.groom}`} position="50% 30%" />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="script story-line">and so the story begins…</p>
            </Reveal>
          </section>
        )}

        <section className="section events">
          <Reveal>
            <p className="eyebrow">The celebrations</p>
            <h3 className="section-title gold-text">Wedding Festivities</h3>
          </Reveal>
          <div className="event-grid">
            {wedding.events.map((ev, i) => (
              <EventCard key={ev.id} ev={ev} wedding={wedding} variant={ev.id === 'ring' ? 'ring' : 'wedding'} index={i} />
            ))}
          </div>
        </section>

        <Countdown wedding={wedding} />
        <Compliments wedding={wedding} />
        {wedding.games && <Games />}
        <Closing wedding={wedding} />
      </motion.main>

      {stage !== 'open' && (
        <Opening wedding={wedding} opening={stage === 'opening'} onOpen={() => { window.dispatchEvent(new Event('ls-music-play')); setStage('opening'); }} onDone={() => setStage('open')} />
      )}

      <MusicToggle src={wedding.music.src} startAt={wedding.music.startAt} show={stage !== 'closed'} />
    </>
  );
}
