/* =====================================================================
   WEDDING DETAILS — edit everything here. No design code needs to change.

   • Any value left as `null` shows an elegant "to be announced" placeholder.
   • `year` is deliberately null until confirmed. While it is null the
     countdown and "Save to calendar" show a graceful placeholder.
     Set it like:  year: 2027
   ===================================================================== */

export const wedding = {
  bride: 'Lakshita',
  groom: 'Shubham',
  monogram: 'L | S',

  year: 2027,

  // Text on the main invitation card.
  card: {
    shloka: ['वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।', 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'],
    blessingsIntro: 'With the heavenly blessings of',
    blessings: [
      'Late Smt. Sarla Devi & Late Shri Damodar Lal Bhargava',
      'Late Smt. Kusum & Late Dr. Ramakant Bhargava',
    ],
    host: 'Dr. Meenakshi Bhargava',
    hostLine: ['requests the honor of your presence', 'at the wedding of her beloved daughter'],
    brideParents: ['daughter of Dr. Meenakshi Bhargava', 'and Late Shri Nirbhay Kumar Bhargava'],
    groomParents: ['son of Smt. Sudesh Sagar', 'and Shri Praveen Sagar'],
    dateLine: '15th & 16th February 2027',
  },

  events: [
    {
      id: 'ring',
      month: 2,          // February
      day: 15,
      title: 'Ring Ceremony',
      tagline: 'An evening of love, promises and beautiful beginnings.',
      time: null,        // e.g. '7:00 PM onwards'
      startTime: null,   // 24h 'HH:MM' for the calendar, e.g. '19:00'
      durationHours: 4,
      venue: 'World Square Mall',
      address: 'Main Grand Trunk Road, Delhi',
      mapsUrl: null,     // optional exact Google Maps link; otherwise venue + address is searched
    },
    {
      id: 'wedding',
      month: 2,
      day: 16,
      title: 'Wedding Ceremony',
      tagline: 'A celebration of love, traditions and a lifetime together.',
      time: null,
      startTime: null,
      durationHours: 6,
      venue: 'World Square Mall',
      address: 'Main Grand Trunk Road, Delhi',
      mapsUrl: null,
    },
  ],

  // Couple photos (files in /public/photos). Set any to null to hide it.
  photos: {
    portrait: 'photos/couple-portrait.jpg',
    garden: 'photos/couple-garden.jpg',
  },

  // "Judi Jodi" — starts when the guest taps "Open Invitation"; the round button mutes it.
  music: {
    src: 'music.mp3',  // file in /public
    startAt: 45,       // seconds — also where it loops back to
  },

  share: {
    // Text sent with the WhatsApp share button (the page link is appended).
    message: "You're invited! 💍 Lakshita & Shubham — Ring Ceremony on 15 February and Wedding on 16 February. Open the invitation:",
  },

  // "With best compliments from" — each couple is [first name, second name].
  compliments: {
    intro: 'With best compliments from',
    sides: [
      {
        title: 'Paternal Side',
        couples: [
          ['Smt Usha', 'Shri V.K. Bhargava'],
          ['Dr Sunita', 'Dr P.K. Bhargava'],
          ['Smt Archana', 'Shri Vichitra Bhargava'],
          ['Smt Renu', 'Shri Sanjay Bhargava'],
          ['Priya', 'Sunny Bhargava'],
          ['Anshika', 'Piyush Bhargava'],
          ['Neha', 'Gaurav Bhargava'],
        ],
        others: [
          ['Pooja', 'Dr Harsh', 'Rajat', 'Sanchit', 'Sankalp'],
          ['Ansh', 'Yuvi', 'Yashvi'],
        ],
      },
      {
        title: 'Maternal Side',
        couples: [
          ['Dr Sangeeta', 'Dr Suresh Bhargava'],
          ['Smt Priti', 'Shri Pankaj Bhargava'],
          ['Smt Nupur', 'Shri Raghav Bhargava'],
          ['Smt Kanchan', 'Raghu Devarakonda'],
        ],
        others: [],
      },
    ],
  },

  closing: {
    line: 'Your presence will make our celebration even more special.',
  },

  // Set false to hide the two little games section.
  games: true,
};
