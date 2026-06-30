import { Link } from 'react-router-dom'
import { ANNOUNCEMENTS } from '../../data/home'
import './Announcements.css'

const isInternal = (url) => url && url.startsWith('/')

const Announcements = () => {
  return (
    <section className="announcements">
      <div className="container">
        <h2 className="home-section-heading">Important Announcements &amp; Updates</h2>

        <div className="announcement-grid">
          {ANNOUNCEMENTS.map((n, i) => (
            <div className="announcement-card" key={i}>
              <div className="announcement-top">
                <span className="announcement-category">{n.category}</span>
                <span className="announcement-date">{n.date}</span>
              </div>
              <h3 className="announcement-title">{n.title}</h3>
              <p className="announcement-desc">{n.description}</p>

              {n.link ? (
                isInternal(n.link.url) ? (
                  <Link to={n.link.url} className="announcement-btn">
                    {n.link.label}
                  </Link>
                ) : (
                  <a
                    href={n.link.url}
                    className="announcement-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {n.link.label}
                  </a>
                )
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Announcements
