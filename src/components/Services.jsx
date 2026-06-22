import { useState } from 'react'
import ServiceCard from './ServiceCard'
import './Services.css'

const Services = () => {
  const [activeModal, setActiveModal] = useState(null)

  const services = [
    {
      id: 1,
      title: 'Counseling Sessions',
      description: 'Get individual appointments with professional counsellors to discuss your concerns.',
      icon: '💬'
    },
    {
      id: 2,
      title: 'Workshops & Events',
      description: 'Participate in awareness programs and mental health education workshops.',
      icon: '📅'
    },
    {
      id: 3,
      title: 'Academic Support',
      description: 'Receive peer-supported academic help to overcome learning challenges.',
      icon: '📚'
    },
    {
      id: 4,
      title: 'Crisis Support',
      description: 'Access immediate support during emotional or mental health emergencies.',
      icon: '🆘'
    },
    {
      id: 5,
      title: 'Support Groups',
      description: 'Join community groups to connect with others facing similar challenges.',
      icon: '👥'
    },
    {
      id: 6,
      title: 'Self-Help Resources',
      description: 'Access online assessment tools and awareness videos for self-care.',
      icon: '🎯'
    },
    {
      id: 7,
      title: 'Family Support',
      description: 'Get guidance on how to support family members during difficult times.',
      icon: '❤️'
    },
    {
      id: 8,
      title: 'De-Addiction Services',
      description: 'Professional help for substance and behavioral addiction recovery.',
      icon: '🏥'
    },
  ]

  const handleLearnMore = (id) => {
    setActiveModal(id)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive mental health and wellbeing support tailored for you</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              onLearnMore={() => handleLearnMore(service.id)}
            />
          ))}
        </div>
      </div>

      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <h3>Service Details</h3>
            <p>This service is designed to provide comprehensive support for your mental health and wellbeing needs. Our experienced team of counsellors and support staff are ready to assist you.</p>
            <button className="btn btn-primary" onClick={closeModal}>
              Schedule a Session
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
