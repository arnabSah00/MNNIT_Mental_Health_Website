import { NEWS_ITEMS } from '../../data/home'
import './NewsTicker.css'

const NewsTicker = () => {
  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...NEWS_ITEMS, ...NEWS_ITEMS]

  return (
    <section className="news-ticker">
      <div className="news-ticker-label">TO NOTE</div>
      <div className="news-ticker-track">
        <div className="news-ticker-content">
          {loop.map((item, i) => (
            <span className="news-ticker-item" key={i}>
              <span className="news-ticker-tag">{item.tag}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsTicker