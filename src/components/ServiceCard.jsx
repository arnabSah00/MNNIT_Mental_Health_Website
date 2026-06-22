import './ServiceCard.css'

const ServiceCard = ({ icon: Icon, title, description, onLearnMore }) => {
  return (
    <div className="service-card">
      <div className="card-icon">
        {Icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="btn btn-primary btn-sm" onClick={onLearnMore}>
        Learn More
      </button>
    </div>
  )
}

export default ServiceCard
