import React from 'react';
import { Corner, Divider, Mandala, Vine } from '../ornaments/Ornaments.jsx';
import Ganesha from '../ornaments/Ganesha.jsx';
import Reveal from './Reveal.jsx';

/* The main card — designed like layered physical stationery. */
export default function InvitationCard({ wedding }) {
  const c = wedding.card;
  return (
    <section className="section card-section" id="invitation">
      <Reveal className="card">
        <div className="card-frame">
          {['tl', 'tr', 'bl', 'br'].map((k) => <Corner key={k} className={`corner ${k}`} />)}
          <div className="card-inner">
            <Mandala className="card-mandala" />

            <div className="card-head">
              <Ganesha size={104} className="ganesha" />
              <p className="shloka deva">
                {c.shloka.map((l, i) => <span key={i}>{l}</span>)}
              </p>
            </div>

            <Vine className="vine" width={220} />

            <p className="eyebrow blessings-intro">{c.blessingsIntro}</p>
            <ul className="elders">
              {c.blessings.map((b) => <li key={b}>{b}</li>)}
            </ul>

            <Divider />

            <p className="host gold-text">{c.host}</p>
            <p className="host-line">{c.hostLine.map((l, i) => <span key={i}>{l}</span>)}</p>

            <div className="names" aria-label={`${wedding.bride} with ${wedding.groom}`}>
              <h2 className="name gold-text">{wedding.bride}</h2>
              <p className="parents">{c.brideParents.map((l, i) => <span key={i}>{l}</span>)}</p>
              <span className="amp script">with</span>
              <h2 className="name gold-text">{wedding.groom}</h2>
              <p className="parents">{c.groomParents.map((l, i) => <span key={i}>{l}</span>)}</p>
            </div>

            <Divider variant="lotus" />

            <p className="date-line">{c.dateLine}</p>
            <p className="date-sub">{wedding.events.map((e) => e.title).join(' & ')}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
