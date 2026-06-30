import { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { FAQ_CATEGORIES } from '../data/faqs'
import './FAQPage.css'

const AccordionItem = ({ item }) => {
  const [open, setOpen] = useState(false)
  const answerIsList = Array.isArray(item.a)

  return (
    <div className={'faq-item ' + (open ? 'open' : '')}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{item.q}</span>
        <span className="faq-icon">{open ? <FaMinus /> : <FaPlus />}</span>
      </button>
      {open ? (
        <div className="faq-answer">
          {answerIsList ? (
            <ul>
              {item.a.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p>{item.a}</p>
          )}
        </div>
      ) : null}
    </div>
  )
}

const FAQPage = () => {
  const [activeCat, setActiveCat] = useState(FAQ_CATEGORIES[0].id)
  const current = FAQ_CATEGORIES.find((c) => c.id === activeCat)

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <span className="faq-eyebrow">
          Center for Mental Health and Wellbeing, MNNIT Allahabad
        </span>
        <h1>Frequently Asked Questions</h1>
      </section>

      <div className="faq-body">
        <aside className="faq-sidebar">
          <div className="faq-sidebar-title">Browse Categories</div>
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={'faq-nav-btn ' + (activeCat === cat.id ? 'active' : '')}
              onClick={() => setActiveCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}

          <div className="faq-contact-box">
            <p>Still have questions?</p>
            <a href="/team" className="faq-contact-btn">
              Contact the Team
            </a>
          </div>
        </aside>

        <section className="faq-content">
          {current.items.map((item) => (
            <AccordionItem key={item.q} item={item} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default FAQPage