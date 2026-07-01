import { Link } from 'react-router-dom'
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'
import { ARTICLES } from '../data/articles'
import './ArticlesPage.css'

const initials = (name) => {
  const clean = name.split(',')[0].trim()
  const parts = clean.split(/\s+/)
  const first = parts[0] ? parts[0][0] : ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

const CardBody = ({ a }) => {
  return (
    <>
      {a.image ? (
        <div className="article-card-banner article-card-banner-image">
          <img src={a.image} alt={a.title} />
        </div>
      ) : (
        <div
          className="article-card-banner"
          style={{ background: '#' + (a.color || '5b3ba6') }}
        >
          <span className="article-card-initials">{initials(a.author)}</span>
        </div>
      )}
      <div className="article-card-content">
        <span className="article-card-tag">
          {a.type === 'external' ? 'External' : 'Student Article'}
        </span>
        <h3 className="article-card-title">{a.title}</h3>
        <p className="article-card-author">
          {a.author}
          {a.date ? ' - ' + a.date : ''}
        </p>
        <p className="article-card-excerpt">{a.excerpt}</p>
        <span className="article-card-cta">
          {a.type === 'external' ? (
            <>
              Read on site <FaExternalLinkAlt />
            </>
          ) : (
            <>
              Read article <FaArrowRight />
            </>
          )}
        </span>
      </div>
    </>
  )
}

const ArticlesPage = () => {
  return (
    <div className="articles-page">
      <section className="articles-hero">
        <span className="articles-eyebrow">
          Mental Health &amp; Wellbeing Center, MNNIT Allahabad
        </span>
        <h1>Wellness Articles</h1>
        <p className="articles-subtitle">
          Reflections and resources on wellbeing - some written by our own students.
        </p>
      </section>

      <div className="articles-container">
        <div className="articles-grid">
          {ARTICLES.map((a) =>
            a.type === 'external' ? (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-card"
              >
                <CardBody a={a} />
              </a>
            ) : (
              <Link
                key={a.id}
                to={'/wellness-articles/' + a.id}
                className="article-card"
              >
                <CardBody a={a} />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticlesPage
