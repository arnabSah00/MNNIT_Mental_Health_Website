import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Auth.css'

const StudentDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1>👨‍🎓 Student Dashboard</h1>
          <p>Welcome, {user?.name}! Your ID: {user?.userId}</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            📅 New Appointment
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'status' ? 'active' : ''}`}
            onClick={() => setActiveTab('status')}
          >
            📋 Check Status
          </button>
        </div>

        {/* Dashboard Tab */}
        <div className={`tab-content ${activeTab === 'dashboard' ? 'active' : ''}`}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
            <h2>Welcome to Your Dashboard</h2>
            <p>View your appointments and book new sessions here.</p>
          </div>
        </div>

        {/* New Appointment Tab */}
        <div className={`tab-content ${activeTab === 'appointments' ? 'active' : ''}`}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
            <h2>Book New Appointment</h2>
            <form style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label>Appointment Date</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Time Slot</label>
                <select required>
                  <option>-- Select Time --</option>
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                </select>
              </div>
              <div className="form-group">
                <label>Problem Description</label>
                <textarea rows="4" placeholder="Describe your concern..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Book Appointment
              </button>
            </form>
          </div>
        </div>

        {/* Check Status Tab */}
        <div className={`tab-content ${activeTab === 'status' ? 'active' : ''}`}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Counsellor</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No appointments found</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
