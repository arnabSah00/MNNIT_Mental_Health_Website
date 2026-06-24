import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Auth.css'

const DeanDashboard = () => {
  const { user } = useAuth()

  const stats = [
    { label: 'Total Requests', value: '0', icon: '📊' },
    { label: 'Pending', value: '0', icon: '⏳' },
    { label: 'Completed', value: '0', icon: '✅' },
    { label: 'Completion Rate', value: '0%', icon: '📈' }
  ]

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1>👔 Dean Dashboard</h1>
          <p>Welcome, {user?.name}! Your ID: {user?.userId}</p>
        </div>

        {/* Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#5b3ba6' }}>
                {stat.value}
              </div>
              <div style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Trends */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2>Monthly Trends</h2>
          <div className="table-container" style={{ marginTop: '20px' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Requests</th>
                  <th>Completed</th>
                  <th>Resolution Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No data available</td>
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

export default DeanDashboard
