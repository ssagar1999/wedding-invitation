/* Calendar + maps helpers. Everything degrades gracefully while `year` is null. */
const pad = (n) => String(n).padStart(2, '0');

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function eventDate(ev, year) {
  if (!year) return null;
  const [h, m] = (ev.startTime || '00:00').split(':').map(Number);
  return new Date(year, ev.month - 1, ev.day, h, m, 0);
}

function stamp(ev, year) {
  const ymd = `${year}${pad(ev.month)}${pad(ev.day)}`;
  if (!ev.startTime) {
    const next = new Date(year, ev.month - 1, ev.day + 1);
    return { allDay: true, start: ymd, end: `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}` };
  }
  const s = eventDate(ev, year), e = new Date(s.getTime() + (ev.durationHours || 4) * 3600e3);
  const f = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  return { allDay: false, start: f(s), end: f(e) };
}

const location = (ev) => [ev.venue, ev.address].filter(Boolean).join(', ');
const title = (ev, w) => `${ev.title} · ${w.bride} & ${w.groom}`;

export function googleCalendarUrl(ev, w) {
  const t = stamp(ev, w.year);
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: title(ev, w),
    dates: `${t.start}/${t.end}`,
    details: `${ev.tagline}\n\nWith love, ${w.bride} & ${w.groom}`,
  });
  const loc = location(ev);
  if (loc) p.set('location', loc);
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export function downloadICS(events, w) {
  const esc = (s) => String(s).replace(/[,;\\]/g, (c) => '\\' + c).replace(/\n/g, '\\n');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//LS Wedding//Invitation//EN', 'CALSCALE:GREGORIAN'];
  events.forEach((ev) => {
    const t = stamp(ev, w.year);
    lines.push(
      'BEGIN:VEVENT',
      `UID:${ev.id}-${w.year}@ls-wedding`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      t.allDay ? `DTSTART;VALUE=DATE:${t.start}` : `DTSTART:${t.start}`,
      t.allDay ? `DTEND;VALUE=DATE:${t.end}` : `DTEND:${t.end}`,
      `SUMMARY:${esc(title(ev, w))}`,
      `DESCRIPTION:${esc(ev.tagline)}`,
      ...(location(ev) ? [`LOCATION:${esc(location(ev))}`] : []),
      'END:VEVENT',
    );
  });
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${w.bride}-${w.groom}-wedding.ics`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

export function mapsUrl(ev) {
  if (ev.mapsUrl) return ev.mapsUrl;
  const q = location(ev);
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : null;
}
