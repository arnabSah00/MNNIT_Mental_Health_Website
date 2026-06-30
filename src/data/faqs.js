// ---------------------------------------------------------------------------
// FAQ DATA  (edit questions/answers freely)
// ---------------------------------------------------------------------------
// Structure: an array of categories. Each category has:
//   id     - unique key (used for the sidebar tab)
//   label  - text shown on the sidebar button
//   items  - array of { q, a } objects (question + answer)
//
// The answer (a) can be plain text. For a simple bullet list, pass an array
// of strings instead of a string — the page renders it as bullets.
// ---------------------------------------------------------------------------

export const FAQ_CATEGORIES = [
  {
    id: 'counselling',
    label: 'Counselling',
    items: [
      {
        q: 'What is Counselling and Psychotherapy?',
        a: 'Counselling and psychotherapy are collaborative processes that help individuals understand and address personal, emotional, academic, interpersonal, and mental health concerns. They provide a safe, confidential, and non-judgmental space to explore thoughts and feelings, develop coping strategies, and work toward personal goals. Counselling often focuses on current concerns and specific goals, while psychotherapy involves a deeper exploration of long-standing patterns. The approach used depends on your individual needs.'
      },
      {
        q: 'Do I have to pay for Counselling?',
        a: 'No. All registered students (undergraduate and postgraduate), employees of the institute, and their registered dependents can avail the service free of cost. If you need to see the psychiatrist, that expenditure is also borne by the service.'
      },
      {
        q: 'How do I avail the service?',
        a: 'You can book an appointment through the website homepage and choose between offline sessions and online Single Session Therapy (SST). If you are in significant distress, you may walk in to the centre during working hours. For urgent concerns outside office hours, please visit the Health Centre.'
      },
      {
        q: 'What are the facilities available?',
        a: [
          'Offline counselling sessions',
          'Online Single Session Therapy (SST)',
          '24x7 telephonic mental health support through Tele-MANAS (Government of India helpline)',
          'Clinical facilities such as psychiatrists and cyber support'
        ]
      },
      {
        q: 'What kind of problems can I talk to a counsellor about?',
        a: [
          'Stress, anxiety, or low mood',
          'Academic or workplace challenges',
          'Relationship and family difficulties',
          'Adjustment to a new environment or life changes',
          'Loneliness, homesickness, or social concerns',
          'Self-esteem and confidence issues',
          'Grief, loss, or other difficult life experiences'
        ]
      },
      {
        q: 'What are Tele-MANAS sessions?',
        a: "Tele-MANAS (Tele Mental Health Assistance and Networking Across States) is India's 24/7, free tele-mental health initiative providing counseling, consultation, e-prescriptions, and referrals via a toll-free helpline (14416) and app, in multiple languages. It is a digital extension of the National Mental Health Programme."
      },
      {
        q: 'How confidential is counselling?',
        a: 'Counselling is a confidential service. Information shared is not disclosed without your knowledge and consent. There are exceptional circumstances where confidentiality may be limited to protect your safety or that of others, or where disclosure is required by law. Whenever possible, the counsellor will discuss the situation with you first.'
      },
      {
        q: 'If I have had counselling, does it go on my record?',
        a: 'No. Counselling is completely confidential and does not go on your academic or personal record. The counsellor keeps brief notes for their own use, which are not part of any official record and are destroyed after a certain period.'
      }
    ]
  },
  {
    id: 'academic',
    label: 'Academic Help',
    items: [
      {
        q: 'What academic help facilities are available?',
        a: ['Academic Mentors', 'Central Academic Directory', 'AM (remedial) classes']
      },
      {
        q: 'Who are Academic Mentors?',
        a: 'Academic Mentors are senior students selected to assist you with specific courses. They hold regular remedial sessions and help clear doubts regarding course material and exam preparation.'
      },
      {
        q: 'What are AM classes?',
        a: 'AM classes are remedial sessions conducted by Academic Mentors to help students grasp difficult concepts and prepare for exams. They cover the difficult parts rather than the entire syllabus and are a supportive supplement to college lectures.'
      },
      {
        q: 'Only weak students attend remedial classes, right?',
        a: "Not at all. It is always possible to miss certain concepts in class or during self-study, and the academic load can feel pressurizing at times. Asking for help doesn't undermine your intelligence; it shows your willingness to learn."
      },
      {
        q: 'Can the centre help in updating grades?',
        a: 'No, the centre does not handle or assist with grade updates. For any concerns related to grades, please contact your respective academic department or the concerned faculty.'
      }
    ]
  },
  {
    id: 'sbf',
    label: 'Student Benevolence',
    items: [
      {
        q: 'What is the Student Benevolence Fund?',
        a: 'The Student Benevolence Fund (SBF) provides financial assistance to students facing emergency financial hardships, ensuring that financial constraints do not hinder their education or well-being.'
      },
      {
        q: 'How can I apply for SBF?',
        a: 'You can apply by reaching out to the Head of the centre or the Dean (Student Welfare). The application process is confidential.'
      },
      {
        q: 'What are the criteria for the SBF scholarship?',
        a: [
          'Parental income',
          'CPI / academic performance',
          'Student should not be receiving financial support from any other source'
        ]
      }
    ]
  }
]