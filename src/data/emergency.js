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
        name: 'Dr. Kamlesh Kumar',
        role: 'Professional Counsellor / Psychologist',
        office: 'Health Center, MNNIT',
        email: 'drkamlesh50@gmail.com'
      },
      {
        name: 'Mrs. Kalpana Srivastava',
        role: 'Professional Counsellor / Psychologist',
        office: 'Health Centre, MNNIT',
        email: 'kalpansrivastava509@gmail.com'
      }
    ]
  },
  {
    id: 'health',
    label: 'Health Centre',
    title: 'Health Centre',
    rows: [
      { dept: 'Emergency (Indoor)', phones: ['0532-2271809'], danger: true },
      { dept: 'Reception (Outdoor)', phones: ['0512-2259-701', '0512-2259-702'] }
    ]
  },
  {
    id: 'ambulance',
    label: 'Ambulance ',
    title: 'Ambulance',
    rows: [
      { dept: 'Ambulance Number', phones: ['0532-2271809' , '9415014451'] },
      // { dept: 'Security Office', phones: ['0512-2259-711', '0512-2259-712'] },
      // { dept: 'Main Gate', phones: ['0512-2259-713'] },
      // { dept: 'Police Chowki', phones: ['0512-2259-714'] }
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
        dept: 'Academic Affairs',
        person: 'Prof. Neeraj Tyagi',
        email: 'neeraj@mnnit.ac.in',
        phone: '+91-05322271657',
      },
      {
        dept: 'Faculty Welfare',
        person: 'Prof. Vinay Kumar Srivastava',
        // role: 'Faculty Welfare',
        email: 'vinay@mnnit.ac.in',
        phone: '+91-9140228182',
      },
      {
        dept: 'Students Welfare',
        name: 'Prof. Asheesh Kumar Singh',
        // role: 'Students Welfare',
        email: 'asheesh@mnnit.ac.in',
        phone: '+91-9455133600',
      }
    ]
  }
]