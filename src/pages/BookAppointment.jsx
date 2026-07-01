import { Link } from 'react-router-dom'
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from 'react-icons/fa'
import './BookAppointment.css'

const OPTIONS = [
  {
    label: 'Student',
    desc: 'Book and track a counselling appointment as a student.',
    to: '/login/booker?role=student',
    icon: <FaUserGraduate />
  },
  {
    label: 'Faculty',
    desc: 'Book and track an appointment as a faculty member.',
    to: '/login/booker?role=faculty',
    icon: <FaChalkboardTeacher />
  },
  {
    label: 'Staff',
    desc: 'Book and track an appointment as institute staff.',
    to: '/login/booker?role=staff',
    icon: <FaUserTie />
  }
]

const BookAppointment = () => {
  return (
    <div className="book-appt-page">
      <section className="book-appt-hero">
        <span className="book-appt-eyebrow">
          Mental Health &amp; Wellbeing Center, MNNIT Allahabad
        </span>
        <h1>Book an Appointment</h1>
        <p className="book-appt-subtitle">Please select who you are to continue.</p>
      </section>

      <div className="book-appt-container">
        <div className="book-appt-grid">
          {OPTIONS.map((o) => (
            <Link to={o.to} className="book-appt-card" key={o.label}>
              <span className="book-appt-icon">{o.icon}</span>
              <h3>{o.label}</h3>
              <p>{o.desc}</p>
              <span className="book-appt-cta">Continue</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookAppointment
