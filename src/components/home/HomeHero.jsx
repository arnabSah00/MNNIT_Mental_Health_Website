import { Link } from 'react-router-dom'
import './HomeHero.css'

const HomeHero = () => {
  return (
    <section className="home-hero">
      <div className="home-hero-overlay"></div>
      <div className="container home-hero-inner">
        <span className="home-hero-badge">
          MOTILAL NEHRU NATIONAL INSTITUTE OF TECHNOLOGY ALLAHABAD
        </span>
        <h1 className="home-hero-title">
          Mental Health &amp; Wellbeing Center
        </h1>
        <p className="home-hero-subtext">
          The Mental Health &amp; Wellbeing Center is your home away from home. We are
          a team of professional counsellors and psychiatrists, empathetic students,
          and faculty advisors here to support you emotionally and academically.
        </p>
        <p className="home-hero-emergency">
          In case of any emergency, please reach the Health Centre for assistance
        </p>
        <div className="home-hero-buttons">
          <Link to="/book-appointment" className="home-btn-primary">
            Book Appointment
          </Link>
          <Link to="/faqs" className="home-btn-outline">
            Information for Students
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeHero