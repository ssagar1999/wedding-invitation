import React from 'react';
import { Corner, Divider, Mandala, OmMedallion, Vine } from '../ornaments/Ornaments.jsx';
import Reveal from './Reveal.jsx';

/* The main card — designed like layered physical stationery. */
export default function InvitationCard({ wedding }) {
  const yr = wedding.year ? ` · ${wedding.year}` : '';
  return (
    <section className="section card-section" id="invitation">
      <Reveal className="card">
        <div className="card-frame">
          {['tl', 'tr', 'bl', 'br'].map((c) => <Corner key={c} className={`corner ${c}`} />)}
          <div className="card-inner">
            <Mandala className="card-mandala" />

            <div className="card-head">
              <p className="deva">॥ श्री गणेशाय नमः ॥</p>
              <OmMedallion size={92} className="om" />
              <p className="eyebrow">With the blessings of Lord Ganesha</p>
            </div>

            <Vine className="vine" width={240} />

            <p className="families">{wedding.families}</p>

            <h2 className="names" aria-label={`${wedding.bride} and ${wedding.groom}`}>
              <span className="name gold-text">{wedding.bride}</span>
              <span className="amp script">&amp;</span>
              <span className="name gold-text">{wedding.groom}</span>
            </h2>

            <p className="invite-line">invite you to celebrate<br />the beginning of their forever.</p>

            <Divider variant="lotus" />

            <div className="card-dates">
              {wedding.events.map((ev, i) => (
                <React.Fragment key={ev.id}>
                  {i > 0 && <span className="cd-sep" aria-hidden="true" />}
                  <div className="cd">
                    <span className="cd-day">{ev.day}</span>
                    <span className="cd-mon">February{yr}</span>
                    <span className="cd-title">{ev.title}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
