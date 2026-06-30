import { useState } from 'react'
import { FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa'
import { EMERGENCY_CATEGORIES, EMERGENCY_NOTE } from '../data/emergency'
import './EmergencyPage.css'

const telHref = (phone) => 'tel:' + phone.replace(/[^0-9+]/g, '')

const EmergencyPage = () => {
  const [active, setActive] = useState('heads')
  const [showPopup, setShowPopup] = useState(true)
  const current = EMERGENCY_CATEGORIES.find((c) => c.id === active)

  return (
    <div className="emergency-page">
      <section className="emergency-hero">
        <span className="emergency-eyebrow">
          Center for Mental Health and Wellbeing, MNNIT Allahabad
        </span>
        <h1>Emergency Contacts</h1>
        <p className="emergency-hero-note">
          In case of any emergency, please reach the Health Centre for assistance
        </p>
      </section>

      <div className="emergency-ticker">
        <div className="emergency-ticker-label">IMPORTANT NOTE</div>
        <div className="emergency-ticker-track">
          <div className="emergency-ticker-content">
            <span>{EMERGENCY_NOTE}</span>
            <span>{EMERGENCY_NOTE}</span>
            <span>{EMERGENCY_NOTE}</span>
            <span>{EMERGENCY_NOTE}</span>
          </div>
        </div>
      </div>

      <div className="emergency-body">
        <aside className="emergency-sidebar">
          {EMERGENCY_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={'emergency-nav-btn ' + (active === c.id ? 'active' : '')}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
          <a href="/team" className="emergency-nav-link">
            CMHW Team
          </a>
        </aside>

        <section className="emergency-content">
          <h2>{current.title}</h2>
          {current.intro ? (
            <p className="emergency-intro">{current.intro}</p>
          ) : null}

          {current.cards ? (
            <div className="emergency-cards">
              {current.cards.map((card) => (
                <div className="emergency-card" key={card.name}>
                  <h3>{card.name}</h3>
                  <span className="emergency-card-role">{card.role}</span>
                  <p>
                    <strong>Office:</strong> {card.office}
                  </p>
                  <a href={'mailto:' + card.email}>
                    <FaEnvelope /> {card.email}
                  </a>
                </div>
              ))}
            </div>
          ) : null}

          {current.rows ? (
            <div>
              {current.rows.map((row) => (
                <div className="emergency-row" key={row.dept}>
                  <div className="emergency-row-dept">{row.dept}</div>
                  <div className="emergency-row-phones">
                    {row.phones.map((p) => {
                      const href = telHref(p)
                      const cls = row.danger ? 'phone-danger' : ''
                      return (
                        <a key={p} href={href} className={cls}>
                          <FaPhone /> {p}
                        </a>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {current.contacts ? (
            <div>
              {current.contacts.map((c) => {
                const phoneHref = telHref(c.phone)
                const mailHref = 'mailto:' + c.email
                return (
                  <div className="emergency-contact" key={c.dept}>
                    <div className="emergency-contact-dept">{c.dept}</div>
                    <div className="emergency-contact-person">{c.person}</div>
                    <div className="emergency-contact-links">
                      <a href={phoneHref}>
                        <FaPhone /> {c.phone}
                      </a>
                      <a href={mailHref}>
                        <FaEnvelope /> {c.email}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}
        </section>
      </div>

      {showPopup ? (
        <div className="emergency-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="emergency-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="emergency-popup-close"
              onClick={() => setShowPopup(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <h2>In Case of Emergency</h2>
            <p>
              Please reach out to the <strong>Health Centre</strong> immediately
              for assistance.
            </p>
            <a href="tel:05122259700" className="emergency-popup-call">
              <FaPhone /> 0512-2259-700
            </a>
            <p className="emergency-popup-sub">
              Emergency (Indoor) - Available 24x7
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default EmergencyPage