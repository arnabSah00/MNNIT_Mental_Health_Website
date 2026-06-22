import { useState, useEffect } from 'react'
import './Hero.css'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { id: 1, color: '#d782d9' },
    { id: 2, color: '#a78bcc' },
    { id: 3, color: '#8b5fbf' },
    { id: 4, color: '#7848b5' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Mental Health & Wellbeing</h1>
          <h3>Support Center</h3>
          <p>
            We are a team of professional counsellors, empathetic students and faculty 
            advisors dedicated to assist you emotionally and academically.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Help</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>

        <div className="hero-carousel">
          <div className="carousel-container">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundColor: slide.color }}
              >
                <div className="slide-number">{slide.id}</div>
              </div>
            ))}

            <button className="carousel-control prev" onClick={prevSlide}>
              ❮
            </button>
            <button className="carousel-control next" onClick={nextSlide}>
              ❯
            </button>
          </div>

          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
