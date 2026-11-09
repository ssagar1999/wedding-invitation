import React from 'react';
import { motion } from 'framer-motion';
import { Arch, Diya, Divider, Mandala } from '../ornaments/Ornaments.jsx';
import { MONTHS } from '../lib/calendar.js';

const ease = [0.22, 1, 0.36, 1];
const item = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
};

/* Palace doors + arch. `opening` swings the doors open; onDone fires when they are clear. */
export default function Opening({ wedding, opening, onOpen, onDone }) {
  const [ring, wed] = wedding.events;
  const doorT = { duration: 1.9, ease: [0.65, 0, 0.25, 1], delay: 0.55 };

  return (
    <div className="opening" role="dialog" aria-label="Save the date">
      {/* the two palace doors form the background */}
      {['left', 'right'].map((side) => (
        <motion.div
          key={side}
          className={`door ${side}`}
          initial={false}
          animate={opening ? { rotateY: side === 'left' ? -108 : 108, opacity: [1, 1, 0] } : { rotateY: 0, opacity: 1 }}
          transition={opening ? { ...doorT, opacity: { ...doorT, times: [0, 0.75, 1] } } : { duration: 0 }}
          onAnimationComplete={() => opening && side === 'right' && onDone()}
        >
          <div className="door-panel">
            <span className="door-boss" />
            <span className="door-boss b2" />
          </div>
        </motion.div>
      ))}

      <motion.div
        className="opening-stage"
        initial="hidden"
        animate={opening ? { opacity: 0, scale: 0.94, filter: 'blur(8px)', transition: { duration: 0.7, ease } } : 'show'}
        variants={{ show: { transition: { staggerChildren: 0.28, delayChildren: 0.9 } } }}
      >
        <div className="opening-arch">
          <Arch className="arch-svg" draw />
          <Mandala className="opening-mandala" detail="full" />
        </div>

        <div className="opening-content">
          <motion.div variants={item} className="opening-diya"><Diya size={66} /></motion.div>
          <motion.p variants={item} className="eyebrow">With the blessings of the Almighty</motion.p>
          <motion.p variants={item} className="script opening-script">Two hearts, one beautiful journey…</motion.p>
          <motion.div variants={item}><Divider /></motion.div>
          <motion.h1 variants={item} className="save-date gold-text">Save the Date</motion.h1>
          <motion.ul variants={item} className="opening-dates">
            {[ring, wed].map((ev) => (
              <li key={ev.id}>
                <span className="od-day gold-text">{ev.day}</span>
                <span className="od-month">{MONTHS[ev.month - 1]}{wedding.year ? ` ${wedding.year}` : ''}</span>
                <span className="od-title">{ev.title}</span>
              </li>
            ))}
          </motion.ul>
          <motion.div variants={item}>
            <button className="btn-open" onClick={onOpen} disabled={opening}>
              <span>Open Invitation</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
