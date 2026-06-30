import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa'
import { TESTIMONIALS } from '../../data/home'
import './Testimonials.css'

const Testimonials = () => {
  const [index, setIndex] = useState(0)
  const total = TESTIMONIALS.length

  const goTo = (i) => setIndex((i + total) % total)
  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  // Auto-advance every 6 seconds.
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((cur) => (cur + 1) % total)
    }, 6000)
    return () => clearInterval(timer)
  }, [total])

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="home-section-heading">What Our Students Say</h2>

        <div className="testimonial-carousel">
          <button
            className="testimonial-arrow"
            onClick={prev}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          <div className="testimonial-slide">
            <FaQuoteLeft className="testimonial-quote-icon" />
            <p className="testimonial-text">{TESTIMONIALS[index]}</p>
          </div>

          <button
            className="testimonial-arrow"
            onClick={next}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={'testimonial-dot ' + (i === index ? 'active' : '')}
              onClick={() => goTo(i)}
              aria-label={'Go to testimonial ' + (i + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials