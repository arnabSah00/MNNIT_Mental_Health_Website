import { FaEnvelope, FaPhone } from 'react-icons/fa'
import {
  LOCATION_KEY,
  COUNSELLOR_SCHEDULE,
  FACULTY_CONTACTS
} from '../data/counselling'
import './CounsellingPage.css'

const telHref = (phone) => 'tel:' + phone.replace(/[^0-9+]/g, '')

const CounsellingPage = () => {
  return (
    <div className="counsel-page">
      <section className="counsel-hero">
        <span className="counsel-eyebrow">
          Mental Health &amp; Wellbeing Center, MNNIT Allahabad
        </span>
        <h1>Individual Counselling</h1>
      </section>

      <div className="counsel-container">
        <p className="counsel-intro">
          It is essential for students to stay physically and mentally healthy so
          they can concentrate and complete their academic work. The Institute's
          Health Centre and Spiritual &amp; Mental Wellbeing Center are committed
          to this. For counselling regarding any anxiety or stress-related concern,
          students may contact the professional counsellors (for boys / girls)
          appointed at the Institute, at the designated place on the days and times
          given below.
        </p>

        {/* Location key */}
        <div className="counsel-keybox">
          <span className="counsel-keybox-title">Location Key</span>
          <div className="counsel-keybox-items">
            {LOCATION_KEY.map((loc) => (
              <span className="counsel-key-item" key={loc.code}>
                <strong>{loc.code}</strong> - {loc.name}
              </span>
            ))}
          </div>
        </div>

        {/* Schedule table */}
        <h2 className="counsel-section-title">Counsellor Schedule</h2>
        <div className="counsel-table-wrap">
          <table className="counsel-table">
            <thead>
              <tr>
                <th>Counsellor</th>
                <th>Day</th>
                <th>Time</th>
                <th>Place</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {COUNSELLOR_SCHEDULE.map((row, i) => (
                <tr key={i}>
                  <td>
                    <span className="counsel-name">{row.name}</span>
                    <span className="counsel-role">{row.role}</span>
                  </td>
                  <td>{row.day}</td>
                  <td>{row.time}</td>
                  <td>
                    <span className="counsel-place">{row.place}</span>
                  </td>
                  <td>
                    <a href={telHref(row.phone)} className="counsel-link">
                      <FaPhone /> {row.phone}
                    </a>
                    <a href={'mailto:' + row.email} className="counsel-link">
                      <FaEnvelope /> {row.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="counsel-note">
          Apart from the times above, for urgent needs students may contact the
          concerned guardian / Head of Department, Faculty In-charge (Boys),
          Faculty In-charge (Girls), the Medical Officer, or the Dean (Student
          Welfare). Students may also contact the Faculty / Associate Faculty
          In-charge (Counsellors) via their office email, listed below.
        </p>

        {/* Faculty contacts */}
        <h2 className="counsel-section-title">Faculty In-charge &amp; Medical Officers</h2>
        <div className="counsel-cards">
          {FACULTY_CONTACTS.map((c, i) => (
            <div className="counsel-card" key={i}>
              <h3>{c.name}</h3>
              <span className="counsel-card-role">{c.role}</span>
              <p className="counsel-card-dept">{c.department}</p>
              <a href={'mailto:' + c.email} className="counsel-link">
                <FaEnvelope /> {c.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CounsellingPage