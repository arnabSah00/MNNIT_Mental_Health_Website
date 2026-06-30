// ---------------------------------------------------------------------------
// EMERGENCY CONTACTS DATA  (placeholder — replace with real MNNIT details)
// ---------------------------------------------------------------------------
// Each category renders one of three shapes:
//   cards    -> head-style cards (name, role, office, email)
//   rows     -> dept + phone numbers (set danger:true to color a number red)
//   contacts -> dept + person + phone + email (used for Deans)
// ---------------------------------------------------------------------------

export const EMERGENCY_NOTE =
  'In case of any emergency, please reach the Health Centre for assistance.'

export const EMERGENCY_CATEGORIES = [
  {
    id: 'heads',
    label: 'Heads',
    title: 'CMHW Heads',
    intro:
      'The Center for Mental Health and Wellbeing is managed by the Head-Admin and Head-Clinical to ensure both administrative efficiency and clinical excellence.',
    cards: [
      {
        name: 'Dr. Rajesh Verma',
        role: 'Head-Admin, CMHW',
        office: 'Admin Block, MNNIT',
        email: 'headadmin@mnnit.ac.in'
      },
      {
        name: 'Dr. Anita Sharma',
        role: 'Head-Clinical, CMHW',
        office: 'Health Centre, MNNIT',
        email: 'headclinical@mnnit.ac.in'
      }
    ]
  },
  {
    id: 'health',
    label: 'Health Centre',
    title: 'Health Centre',
    rows: [
      { dept: 'Emergency (Indoor)', phones: ['0512-2259-700'], danger: true },
      { dept: 'Reception (Outdoor)', phones: ['0512-2259-701', '0512-2259-702'] }
    ]
  },
  {
    id: 'security',
    label: 'Security / Police',
    title: 'Security & Police',
    rows: [
      { dept: 'Security Control Room', phones: ['0512-2259-710'] },
      { dept: 'Security Office', phones: ['0512-2259-711', '0512-2259-712'] },
      { dept: 'Main Gate', phones: ['0512-2259-713'] },
      { dept: 'Police Chowki', phones: ['0512-2259-714'] }
    ]
  },
  {
    id: 'fire',
    label: 'Fire',
    title: 'Fire Safety',
    rows: [
      { dept: 'Fire Control Room', phones: ['0512-2259-720'] },
      { dept: 'Fire Station', phones: ['0512-2259-721'] },
      { dept: 'Fire Office', phones: ['0512-2259-722'] }
    ]
  },
  {
    id: 'deans',
    label: 'Deans',
    title: 'Institute Deans',
    contacts: [
      {
        dept: 'Dean (Student Welfare)',
        person: 'Prof. A. K. Singh',
        phone: '0512-2259-730',
        email: 'dsw@mnnit.ac.in'
      },
      {
        dept: 'Dean (Academic Affairs)',
        person: 'Prof. B. Kumar',
        phone: '0512-2259-731',
        email: 'daa@mnnit.ac.in'
      },
      {
        dept: 'Dean (R & C)',
        person: 'Prof. C. Sharma',
        phone: '0512-2259-732',
        email: 'drc@mnnit.ac.in'
      }
    ]
  }
]