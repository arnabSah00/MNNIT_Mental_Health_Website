import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>About Us</h4>
              <p>
                Mental Health & Wellbeing Center is dedicated to providing comprehensive 
                mental health support and services to our community.
              </p>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#appointments">Appointments</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>
                <strong>Address:</strong><br/>
                Mental Health Center<br/>
                House No. 503, Type V<br/>
                Kanpur, 208016
              </p>
              <p>
                <strong>Phone:</strong><br/>
                +91 512 2597784
              </p>
              <p>
                <strong>Email:</strong><br/>
                counselor@example.com
              </p>
            </div>

            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">▶️</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Mental Health & Wellbeing Center. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
