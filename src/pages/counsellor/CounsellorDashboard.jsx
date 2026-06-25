import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import useBackLogout from '../../hooks/useBackLogout'
import '../../styles/Auth.css'

const CounsellorDashboard = () => {
  const { user } = useAuth()
  useBackLogout()
  const [activeTab, setActiveTab] = useState('pending')

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1>👨‍⚕️ Counsellor Dashboard</h1>
          <p>Welcome, {user?.name}! Your ID: {user?.userId}</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Pending Requests
          </button>
          <button
            className={`dashboard-tab ${activeTab === 'solved' ? 'active' : ''}`}
            onClick={() => setActiveTab('solved')}
          >
            ✅ Solved Cases
          </button>
        </div>

        {/* Pending Requests Tab */}
        <div className={`tab-content ${activeTab === 'pending' ? 'active' : ''}`}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Reg No</th>
                  <th>Problem</th>
                  <th>Requested Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No pending requests</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Solved Cases Tab */}
        <div className={`tab-content ${activeTab === 'solved' ? 'active' : ''}`}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Reg No</th>
                  <th>Problem</th>
                  <th>Appointment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No solved cases</td>
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

export default CounsellorDashboard
