import { Link } from 'react-router-dom'
import {
  FaUserMd,
  FaPhoneAlt,
  FaHeart,
  FaUsers,
  FaComments,
  FaBookOpen,
  FaArrowRight
} from 'react-icons/fa'
import { RESOURCE_CARDS } from '../../data/home'
import './ResourceCards.css'

// Map the data's icon name to an actual icon component.
const ICONS = {
  userMd: FaUserMd,
  phone: FaPhoneAlt,
  heart: FaHeart,
  users: FaUsers,
  comments: FaComments,
  bookOpen: FaBookOpen
}

const isInternal = (url) => url && url.startsWith('/')

const CardInner = ({ card }) => {
  const Icon = ICONS[card.icon] || FaHeart
  return (
    <>
      <div className="resource-card-visual">
        <Icon />
      </div>
      <div className="resource-card-meta">{card.meta}</div>
      <h3 className="resource-card-title">{card.title}</h3>
      <p className="resource-card-desc">{card.desc}</p>
      <span className="resource-card-cta">
        {card.cta} <FaArrowRight />
      </span>
    </>
  )
}

const ResourceCards = () => {
  return (
    <section className="resource-cards">
      <div className="container">
        <div className="resource-grid">
          {RESOURCE_CARDS.map((card, i) =>
            isInternal(card.url) ? (
              <Link to={card.url} className="resource-card" key={i}>
                <CardInner card={card} />
              </Link>
            ) : (
              <a href={card.url} className="resource-card" key={i}>
                <CardInner card={card} />
              </a>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default ResourceCards