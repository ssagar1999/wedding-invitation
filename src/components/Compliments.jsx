import React from 'react';
import { Corner, Divider, Lotus } from '../ornaments/Ornaments.jsx';
import Reveal from './Reveal.jsx';

/* "With best compliments from" — family names on a framed panel, paternal & maternal sides. */
export default function Compliments({ wedding }) {
  const c = wedding.compliments;
  if (!c || !c.sides?.length) return null;
  return (
    <section className="section compliments" id="compliments">
      <Reveal className="comp-panel">
        <div className="comp-frame">
          {['tl', 'tr', 'bl', 'br'].map((k) => <Corner key={k} className={`corner ${k}`} />)}
          <div className="comp-inner">
            <Lotus width={86} className="comp-lotus" />
            <h2 className="comp-title script">{c.intro}</h2>
            <Divider />

            <div className="comp-sides">
              {c.sides.map((side, si) => (
                <div className="comp-side" key={side.title}>
                  {si > 0 && <span className="comp-sep" aria-hidden="true" />}
                  <h3 className="comp-side-title gold-text">{side.title}</h3>
                  <ul className="comp-list">
                    {side.couples.map(([a, b]) => (
                      <li key={a + b}>
                        <span>{a}</span>
                        <span className="comp-dash" aria-hidden="true">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {side.others?.length > 0 && (
                    <div className="comp-others">
                      {side.others.map((row) => (
                        <p key={row.join()}>
                          {row.map((n, i) => (
                            <React.Fragment key={n}>
                              {i > 0 && <span className="comp-dot" aria-hidden="true"> · </span>}
                              <span className="nowrap">{n}</span>
                            </React.Fragment>
                          ))}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
