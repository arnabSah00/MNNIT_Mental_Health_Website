import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'
import { ROLE_CONFIG } from '../../constants/index'
import '../../styles/Auth.css'

/**
 * RoleLogin renders a dedicated login screen for one fixed role.
 * The role is set by the page that mounts it, so there is no
 * user-type dropdown — the URL itself determines the role.
 */
const RoleLogin = ({ role }) => {
  const config = ROLE_CONFIG[role]
  const navigate = useNavigate()
  const { login } = useAuth()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!config) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="error-message">Unknown login role.</div>
          <div className="auth-links">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!userId || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    // --- DEV BYPASS (no backend) -------------------------------------
    // Set VITE_DEV_LOGIN=true in .env.local to skip the real API and log
    // in with any non-empty userId/password. REMOVE FOR PRODUCTION.
    if (import.meta.env.VITE_DEV_LOGIN === 'true') {
      const fakeUser = {
        name: `Demo ${config.label}`,
        userId,
        userType: config.userType
      }
      login(fakeUser, 'dev-token')
      navigate(config.dashboard)
      setLoading(false)
      return
    }
    // -----------------------------------------------------------------

    try {
      const response = await authAPI.login(config.userType, userId, password)

      if (response.success) {
        const userData = { ...response.user, userType: config.userType }
        login(userData, response.token)
        navigate(config.dashboard)
      } else {
        setError(response.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>
            {config.icon} {config.label} Login
          </h1>
          <p>Mental Health Center - MNNIT Allahabad</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="userId">{config.idLabel}</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={config.idPlaceholder}
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : `Login as ${config.label}`}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/">Back to Home</Link>
        </div>

        <div className="role-switch">
          <span>Not a {config.label}?</span>
          <div className="role-switch-links">
            {Object.entries(ROLE_CONFIG)
              .filter(([key]) => key !== role)
              .map(([key, c]) => (
                <Link key={key} to={`/login/${key}`}>
                  {c.icon} {c.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleLogin
