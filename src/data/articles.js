// ---------------------------------------------------------------------------
// WELLNESS ARTICLES DATA
// ---------------------------------------------------------------------------
// Two kinds of articles:
//
//  1. EXTERNAL  -> a card that links out to another website.
//       { id, type: 'external', title, author, excerpt, color, url }
//
//  2. INTERNAL  -> a student-written article shown in full on our own site
//                  at /wellness-articles/:id
//       { id, type: 'internal', title, author, date, excerpt, color,
//         body: [ 'paragraph 1', 'paragraph 2', ... ] }
//
// To add an article, copy one object and fill in the fields.
//   - id must be unique and url-friendly (used in the address bar).
//   - color is the card's accent (any hex without the #).
//   - body is an array of paragraphs (internal articles only).
// ---------------------------------------------------------------------------

export const ARTICLES = [
  {
    id: 'managing-exam-stress',
    type: 'internal',
    title: 'Managing Exam Stress: A Student\'s Guide',
    author: 'Riya Sharma, B.Tech CSE',
    date: 'June 2026',
    excerpt:
      'Practical, student-tested ways to stay calm and focused during exam season without burning out.',
    color: '5b3ba6',
    // Optional: a URL (or leave this line out to use the initials banner)
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
    body: [
      'Exam season can feel overwhelming, but a few small habits make a big difference. The goal is not to eliminate stress completely, but to keep it at a level that helps you focus rather than freeze.',
      'Start by breaking your syllabus into small, specific tasks. "Revise all of physics" is intimidating; "revise rotational motion for 40 minutes" is doable. Crossing off small tasks gives a steady sense of progress.',
      'Protect your sleep. Pulling an all-nighter before an exam usually costs more in concentration than it gains in revision. Aim for consistent sleep, especially the night before.',
      'Finally, remember that one exam does not define you. If you are struggling with persistent anxiety, reach out to a counsellor - talking to someone helps more than most people expect.'
    ]
  },
  {
    id: 'sleep-and-wellbeing',
    type: 'internal',
    title: 'Why Sleep Is Your Best Study Tool',
    author: 'Aditya Kumar, B.Tech ECE',
    date: 'May 2026',
    excerpt:
      'How good sleep quietly improves memory, mood, and focus - and simple ways to sleep better in a hostel.',
    color: '27ae60',
    image: '',
    body: [
      'We often treat sleep as the first thing to sacrifice when we are busy. But sleep is when your brain consolidates memory and processes emotion - skipping it undercuts the very studying you stayed up to do.',
      'In a hostel, noise and light make sleep harder. A simple eye mask and earplugs can help more than you would expect. Try to keep a consistent sleep and wake time, even on weekends.',
      'Avoid screens right before bed, and if your mind is racing, jot down tomorrow\'s tasks on paper so you are not holding them in your head. Small changes compound over a few weeks.'
    ]
  },
  {
    id: 'mind-mental-health-article',
    type: 'external',
    title: 'Understanding Anxiety (WHO)',
    author: 'World Health Organization',
    excerpt:
      'An accessible overview of what anxiety disorders are, common signs, and where to find help.',
    color: '2980b9',
    image: '',
    url: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders'
  }
]

export const getArticleById = (id) => ARTICLES.find((a) => a.id === id)
