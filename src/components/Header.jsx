import { useState } from 'react'
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaMedium,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const socialMedia = [
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      url: 'https://www.facebook.com',
      tooltip: 'Like us on Facebook'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://www.instagram.com',
      tooltip: 'Follow us on Instagram'
    },
    {
      name: 'Youtube',
      icon: <FaYoutube />,
      url: 'https://www.youtube.com',
      tooltip: 'Subscribe us on Youtube'
    },
    {
      name: 'Medium',
      icon: <FaMedium />,
      url: 'https://medium.com',
      tooltip: 'Follow us on Medium'
    }
  ]

  const navigationLinks = [
    { label: 'Team', href: '#team' },
    {
      label: 'Services',
      href: '#services',
      submenu: [
        { label: 'Mental Health Support', href: '#' },
        { label: 'Counseling Sessions', href: '#' },
        { label: 'Crisis Support', href: '#' },
        { label: 'Group Therapy', href: '#' }
      ]
    },
    {
      label: 'Appointments',
      href: '#appointments',
      submenu: [
        { label: 'Book Online', href: '#' },
        { label: 'Check Status', href: '#' },
        { label: 'Reschedule', href: '#' },
        { label: 'Cancel Appointment', href: '#' }
      ]
    },
    {
      label: 'Support',
      href: '#support',
      submenu: [
        { label: 'Emergency Hotline', href: '#' },
        { label: 'Peer Support', href: '#' },
        { label: 'Family Counseling', href: '#' },
        { label: 'Crisis Resources', href: '#' }
      ]
    },
    {
      label: 'Info for Students',
      href: '#info-students',
      submenu: [
        { label: 'New Students', href: '#' },
        { label: 'Academic Help', href: '#' },
        { label: 'Wellness Programs', href: '#' },
        { label: 'Student FAQ', href: '#' }
      ]
    },
    {
      label: 'SelfHelp',
      href: '#selfhelp',
      submenu: [
        { label: 'Self Assessment Tools', href: '#' },
        { label: 'Wellness Articles', href: '#' },
        { label: 'Meditation Videos', href: '#' },
        { label: 'Resource Library', href: '#' }
      ]
    },
    { label: 'Emergency', href: '#emergency' }
  ]

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container navbar-content">
          {/* Logo */}
          <a href="#home" className="navbar-brand">
            <h2>🧠 MHC</h2>
          </a>
          
          {/* Menu Toggle Button */}
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links */}
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navigationLinks.map((link) => (
              <li 
                key={link.label} 
                className={`nav-item ${link.submenu ? 'has-dropdown' : ''}`}
                onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
                onMouseLeave={() => link.submenu && setActiveDropdown(null)}
              >
                <a 
                  href={link.href} 
                  onClick={() => {
                    if (link.submenu) {
                      toggleDropdown(link.label)
                    } else {
                      closeMenu()
                    }
                  }}
                >
                  {link.label}
                </a>

                {/* Dropdown Menu */}
                {link.submenu && (
                  <ul className={`dropdown-menu ${activeDropdown === link.label ? 'active' : ''}`}>
                    {link.submenu.map((item) => (
                      <li key={item.label}>
                        <a href={item.href} onClick={closeMenu}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            {/* Social Media - Mobile Menu */}
            <li className="social-menu-mobile-divider"></li>
            <li className="social-menu-mobile-wrapper">
              <span className="social-menu-title">Follow Us</span>
              <div className="social-menu-mobile">
                {socialMedia.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link-mobile"
                    onClick={closeMenu}
                    title={social.tooltip}
                  >
                    <span className="social-icon-mobile">{social.icon}</span>
                    <span className="social-text-mobile">{social.name}</span>
                  </a>
                ))}
              </div>
            </li>
          </ul>

          {/* Social Media - Desktop Icons with Tooltips */}
          <div className="nav-icons">
            {socialMedia.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-desktop"
                title={social.tooltip}
              >
                <span className="icon-emoji">{social.icon}</span>
                <span className="tooltip-text">{social.tooltip}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header