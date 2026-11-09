import React, { useState } from 'react';
import { Clock, MapPin, Landmark, Navigation, CalendarPlus } from 'lucide-react';
import { AgniMotif, Corner, Divider, RingsMotif } from '../ornaments/Ornaments.jsx';
import { MONTHS, googleCalendarUrl, downloadICS, mapsUrl } from '../lib/calendar.js';
import Reveal from './Reveal.jsx';

const Detail = ({ icon: Icon, label, value, tba }) => (
  <div className="detail">
    <span className="detail-ico"><Icon size={18} strokeWidth={1.3} /></span>
    <div>
      <span className="detail-label">{label}</span>
      {value ? <span className="detail-value">{value}</span> : <span className="tba">{tba}</span>}
    </div>
  </div>
);

export default function EventCard({ ev, wedding, variant, index }) {
  const [calOpen, setCalOpen] = useState(false);
  const maps = mapsUrl(ev);
  const Motif = variant === 'ring' ? RingsMotif : AgniMotif;

  return (
    <Reveal className={`event-card ev-${variant}`} delay={index * 0.12}>
      <div className="ev-arch">
        <Corner className="corner tl" /><Corner className="corner tr" />
        <div className="ev-top">
          <span className="ev-count">{index === 0 ? 'The First Celebration' : 'The Grand Celebration'}</span>
          <Motif className="ev-motif" />
          <div className="ev-date">
            <span className="ev-day gold-text">{ev.day}</span>
            <span className="ev-month">{MONTHS[ev.month - 1]}{wedding.year ? ` ${wedding.year}` : ''}</span>
          </div>
          <h3 className="ev-title">{ev.title}</h3>
          <p className="ev-tag">{ev.tagline}</p>
        </div>

        <Divider />

        <div className="ev-details">
          <Detail icon={Clock} label="Time" value={ev.time} tba="Time to be announced" />
          <Detail icon={Landmark} label="Venue" value={ev.venue} tba="Venue to be announced" />
          <Detail icon={MapPin} label="Address" value={ev.address} tba="Address to follow" />
        </div>

        <div className="ev-actions">
          {maps ? (
            <a className="btn-ghost sm" href={maps} target="_blank" rel="noopener noreferrer">
              <Navigation size={16} strokeWidth={1.4} /><span>Directions</span>
            </a>
          ) : (
            <span className="btn-ghost sm is-disabled" aria-disabled="true"><Navigation size={16} strokeWidth={1.4} /><span>Map soon</span></span>
          )}
          <div className="cal-wrap">
            <button className="btn-ghost sm" onClick={() => setCalOpen((o) => !o)} disabled={!wedding.year} aria-expanded={calOpen}
              title={wedding.year ? 'Add to calendar' : 'Available once the year is announced'}>
              <CalendarPlus size={16} strokeWidth={1.4} /><span>Calendar</span>
            </button>
            {calOpen && wedding.year && (
              <div className="cal-pop" role="menu">
                <a role="menuitem" href={googleCalendarUrl(ev, wedding)} target="_blank" rel="noopener noreferrer" onClick={() => setCalOpen(false)}>Google Calendar</a>
                <button role="menuitem" onClick={() => { downloadICS([ev], wedding); setCalOpen(false); }}>Apple / Outlook (.ics)</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
