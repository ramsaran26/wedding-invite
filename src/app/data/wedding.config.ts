// Placeholder details: replace with the real ones.
export const WEDDING = {
  groom: 'Praveen',
  groomPhone: '7010064331',
  bride: 'Gayathri',
  bridePhone: '9629948130',
  tagline: 'Two families, one celebration',
  date: '2026-10-25T09:30:00+05:30',
  city: 'Theni, Tamil Nadu',
  // country code + number, digits only (no + or spaces). 91 = India
  whatsapp: { groom: '919087828357', bride: '919629948130' },

  calendar: {
    start: '2026-10-25T10:05:00+05:30',
    end: '2026-10-25T11:05:00+05:30',
    location: 'V.L. Krishnasamy Rukmaniammal Kalyan Mahal, Lakshmipuram, NH-45, Grand Southern Trunk Road, Theni, Tamil Nadu 625523',
    description: 'Join us as we celebrate the wedding of Praveen and Gayathri.',
  },
  events: [
    { name: 'Sangeet', date: '23 October 2026', time: '5:00 pm onwards', place: 'The Party Park, Madurai', mapUrl: 'https://maps.app.goo.gl/zfNX4AWCD7pnT5ni7' },
    { name: 'Engagement & Reception', date: '24 October 2026', time: '6:00 pm onwards', place: 'VLK Mahal, Theni' , mapUrl: 'https://maps.app.goo.gl/XtDpAmRuMaTYSCHv7',},
    { name: 'Muhurtham', date: '25 October 2026', time: '10:05 am onwards', place: 'VLK Mahal, Theni', mapUrl: 'https://maps.app.goo.gl/XtDpAmRuMaTYSCHv7', },
  ],
  venueOne: {
    name: 'V.L. Krishnasamy Rukmaniammal Kalyan Mahal',
    address: 'Lakshmipuram, NH-45, Grand Southern Trunk Road, Theni, Tamil Nadu 625523',
    mapUrl: 'https://maps.app.goo.gl/XtDpAmRuMaTYSCHv7',
  },
  venueTwo: {
    name: 'The Party Park',
    address: 'Kodimangalam Main Rd, Kodimangalam, Koolappandi, Madurai, Tamil Nadu 625014',
    mapUrl: 'https://maps.app.goo.gl/zfNX4AWCD7pnT5ni7',
  },
  story: [
    { 
      year: 'Mar 2026', 
      title: 'A Little Hello', 
      text: 'A matrimony match led to an Instagram hello — and a conversation we didn’t want to end.',
      photo: '/assets/little_hello.jpg'
    },
    { 
      year: '29 Mar 2026', 
      title: 'Where It Began', 
      text: 'At Meenakshi Amman Temple, Madurai, our first meeting turned a virtual beginning into something real.',
      photo: '/assets/where_it_began.jpeg'
    },
    { 
      year: 'Apr–May 2026', 
      title: 'Becoming Us', 
      text: 'Long conversations, little discoveries, and countless reasons to look forward to each other.',
      photo: '/assets/becoming_us.jpg'
    },
    { 
      year: '11 June 2026', 
      title: 'A Beautiful Yes', 
      text: 'Love found its way to our families, and we said yes to forever — together.',
      photo: '/assets/beautiful_yes.jpeg'
    },
    { 
      year: 'Aug 2026', 
      title: 'Making Memories', 
      text: 'From wedding shopping to our pre-wedding moments, we celebrated the little joys along the way.',
      photo: '/assets/making_memories.jpeg'
    },
    { 
      year: '23 Oct 2026', 
      title: 'Let the Celebrations Begin', 
      text: 'With music, laughter and our favourite people, we begin our wedding celebrations in Madurai.',
      photo: '/assets/let_the_celebrations_begin.jpeg'
    },
    { 
      year: '24–25 Oct 2026', 
      title: 'Our Forever Begins', 
      text: 'A reception, a wedding, and two hearts becoming one — in the beautiful hills of Theni.',
      photo: '/assets/our_forever_begins.jpeg'
    }
  ],
  photos: [
    '/assets/gallery_1.jpeg',
    '/assets/gallery_2.jpeg',
    '/assets/gallery_3.jpeg',
    '/assets/gallery_4.jpeg',
    '/assets/gallery_5.jpeg',
    '/assets/gallery_6.jpeg',
  ],
};

// Fallback theme. public/theme.json overrides these at runtime.
export const WEDDING_THEME: Record<string, string> = {
  primary: '#8a1c2b',
  secondary: '#f7e7b4',
  tertiary: '#d9a21b',
  text1: '#2b1418',
  text2: '#59464a',
  text3: '#86797b',
  bg: '#fffdf7',
};
