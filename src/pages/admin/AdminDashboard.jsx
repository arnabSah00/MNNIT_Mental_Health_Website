import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Auth.css'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1>⚙️ Administrator Dashboard</h1>
          <p>Welcome, {user?.name}! Your ID: {user?.userId}</p>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <h2>Search Appointments</h2>
          <div className="form-group" style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Search by Registration Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Reg No</th>
                <th>Age</th>
                <th>Problem</th>
                <th>Status</th>
                <th>Submitted Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No records found</td>
                <td>-</td>
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
  )
}

export default AdminDashboard
