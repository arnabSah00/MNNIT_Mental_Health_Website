import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { counsellorAPI } from '../../services/api'
import useBackLogout from '../../hooks/useBackLogout'
import '../../styles/Auth.css'

const STATUS_BADGE = {
  PENDING:   { color:'#f39c12', label:'Pending' },
  APPROVED:  { color:'#3498db', label:'Approved' },
  COMPLETED: { color:'#27ae60', label:'Completed' },
  REJECTED:  { color:'#e74c3c', label:'Rejected' },
}

const TYPE_BADGE = {
  student: { color:'#5b3ba6', label:'Student' },
  faculty: { color:'#0d7a5f', label:'Faculty' },
  staff:   { color:'#b8860b', label:'Staff' },
}

const RESOLUTION_LABEL = {
  RESOLVED:  'Resolved',
  FOLLOW_UP: 'Follow-Up Required',
  REFERRED:  'Referred to Specialist',
}

const CounsellorDashboard = () => {
  const { user, logout } = useAuth()
  useBackLogout()

  const [activeTab, setActiveTab] = useState('pending')
  const [pending, setPending] = useState([])
  const [solved, setSolved] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type:'', text:'' })

  // Search + filter
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  // Complete-session modal
  const [confirmModal, setConfirmModal] = useState(null)
  const [notes, setNotes] = useState('')
  const [resolution, setResolution] = useState('RESOLVED')
  const [submitting, setSubmitting] = useState(false)

  // Detail panel (opens on name click)
  const [detail, setDetail] = useState(null)      // the clicked appointment row
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)
  const [prescription, setPrescription] = useState('')
  const [detailStatus, setDetailStatus] = useState('PENDING')
  const [savingRx, setSavingRx] = useState(false)

  const fetchPending = async () => {
    setLoading(true)
    try {
      const res = await counsellorAPI.getPendingRequests()
      setPending(res.data || [])
    } catch { setMsg({ type:'error', text:'Failed to load pending requests.' }) }
    finally { setLoading(false) }
  }

  const fetchSolved = async () => {
    setLoading(true)
    try {
      const res = await counsellorAPI.getSolvedRequests()
      setSolved(res.data || [])
    } catch { setMsg({ type:'error', text:'Failed to load solved cases.' }) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchPending(); fetchSolved() }, [])

  const handleAccept = async (requestId) => {
    try {
      await counsellorAPI.updateAppointment(requestId, { status: 'APPROVED' })
      setMsg({ type:'success', text:'Request approved! The person has been notified.' })
      fetchPending(); fetchSolved()
    } catch { setMsg({ type:'error', text:'Failed to approve. Try again.' }) }
  }

  const handleReject = async (requestId) => {
    if (!window.confirm('Reject this request?')) return
    try {
      await counsellorAPI.updateAppointment(requestId, { status: 'REJECTED' })
      setMsg({ type:'success', text:'Request rejected.' })
      fetchPending()
    } catch { setMsg({ type:'error', text:'Failed to reject. Try again.' }) }
  }

  const openConfirmModal = (req) => {
    setConfirmModal(req)
    setNotes('')
    setResolution('RESOLVED')
  }

  const handleComplete = async () => {
    if (!notes.trim()) { setMsg({ type:'error', text:'Please add session notes.' }); return }
    setSubmitting(true)
    try {
      await counsellorAPI.confirmBooking(confirmModal.request_id, {
        date: new Date().toISOString().split('T')[0],
        timeslot: confirmModal.time_slot,
        action_performed: notes,
        status: resolution,
      })
      setMsg({ type:'success', text:'Session marked as completed!' })
      setConfirmModal(null)
      fetchPending(); fetchSolved()
    } catch { setMsg({ type:'error', text:'Failed to complete. Try again.' }) }
    finally { setSubmitting(false) }
  }

  // Open the detail panel and load this person's full history.
  const openDetail = async (row) => {
    setDetail(row)
    setPrescription(row.prescription || '')
    setDetailStatus(row.status || 'PENDING')
    setHistoryLoading(true)
    try {
      const res = await counsellorAPI.getBookerHistory(row.booker_id)
      setHistory(res.data || [])
    } catch { setHistory([]) }
    finally { setHistoryLoading(false) }
  }

  const closeDetail = () => {
    setDetail(null)
    setHistory([])
    setPrescription('')
  }

  const handleSaveRx = async () => {
    setSavingRx(true)
    try {
      await counsellorAPI.savePrescription(detail.request_id, { prescription })
      setMsg({ type:'success', text:'Prescription saved.' })
      fetchPending(); fetchSolved()
    } catch { setMsg({ type:'error', text:'Failed to save prescription.' }) }
    finally { setSavingRx(false) }
  }

  const handleDetailStatus = async (newStatus) => {
    setDetailStatus(newStatus)
    try {
      await counsellorAPI.updateStatus(detail.request_id, newStatus)
      setMsg({ type:'success', text:'Status updated to ' + newStatus + '.' })
      fetchPending(); fetchSolved()
      // refresh history so the panel reflects the change
      const res = await counsellorAPI.getBookerHistory(detail.booker_id)
      setHistory(res.data || [])
    } catch { setMsg({ type:'error', text:'Failed to update status.' }) }
  }

  // Apply search + type filter to whichever list is active.
  const rows = activeTab === 'pending' ? pending : solved
  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchesType = typeFilter === 'all' || r.booker_type === typeFilter
      const q = search.trim().toLowerCase()
      const matchesSearch = !q ||
        (r.booker_name && r.booker_name.toLowerCase().includes(q)) ||
        (r.registration_number && r.registration_number.toLowerCase().includes(q))
      return matchesType && matchesSearch
    })
  }, [rows, search, typeFilter])

  const NameCell = ({ row }) => {
    const tb = TYPE_BADGE[row.booker_type] || { color:'#999', label: row.booker_type || 'User' }
    return (
      <button
        onClick={() => openDetail(row)}
        style={{ background:'none', border:'none', padding:0, cursor:'pointer', textAlign:'left', color:'#5b3ba6', fontWeight:600 }}
        title="View details"
      >
        {row.booker_name}
        <span style={{ background:tb.color, color:'white', padding:'1px 7px', borderRadius:'10px', fontSize:'0.68rem', marginLeft:'8px', verticalAlign:'middle' }}>{tb.label}</span>
      </button>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <h1>Counsellor Dashboard</h1>
            <p>Welcome, <strong>{user?.name}</strong></p>
          </div>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>

        {msg.text && (
          <div className={msg.type==='error' ? 'error-message' : 'success-message'} style={{ marginBottom:'16px' }}>
            {msg.text} <button style={{ float:'right', background:'none', border:'none', cursor:'pointer', fontWeight:'bold' }} onClick={() => setMsg({type:'',text:''})}>x</button>
          </div>
        )}

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'14px', marginBottom:'20px' }}>
          {[
            { label:'Pending', value: pending.length, color:'#f39c12' },
            { label:'Solved',  value: solved.length,  color:'#27ae60' },
          ].map(c => (
            <div key={c.label} style={{ background:'white', borderRadius:'10px', padding:'20px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.07)', borderTop:'4px solid ' + c.color }}>
              <div style={{ fontSize:'2rem', fontWeight:'bold', color:c.color }}>{c.value}</div>
              <div style={{ color:'#666', fontSize:'0.9rem' }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-tabs">
          <button className={'dashboard-tab ' + (activeTab==='pending'?'active':'')} onClick={() => { setActiveTab('pending'); fetchPending() }}>
            Pending Requests ({pending.length})
          </button>
          <button className={'dashboard-tab ' + (activeTab==='solved'?'active':'')} onClick={() => { setActiveTab('solved'); fetchSolved() }}>
            Solved Cases ({solved.length})
          </button>
        </div>

        {/* Search + type filter */}
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', margin:'16px 0' }}>
          <input
            type="text"
            placeholder="Search by name or reg no..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex:1, minWidth:'220px', padding:'9px 12px', borderRadius:'8px', border:'1px solid #ddd' }}
          />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            style={{ padding:'9px 12px', borderRadius:'8px', border:'1px solid #ddd' }}
          >
            <option value="all">All types</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Pending */}
        {activeTab === 'pending' && (
          <div style={{ background:'white', borderRadius:'12px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
              <h2>Pending Requests</h2>
              <button className="btn btn-secondary" onClick={fetchPending} disabled={loading}>Refresh</button>
            </div>
            {loading ? (
              <p style={{ textAlign:'center', padding:'40px', color:'#888' }}>Loading...</p>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'40px', color:'#888' }}>
                <p>No matching pending requests.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Reg No / Email</th>
                      <th>Branch</th>
                      <th>Requested Date</th>
                      <th>Time Slot</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((req, i) => (
                      <tr key={req.request_id}>
                        <td>{i+1}</td>
                        <td><NameCell row={req} /></td>
                        <td>{req.registration_number || req.booker_email}</td>
                        <td>{req.branch || '-'}</td>
                        <td>{new Date(req.appointment_date).toLocaleDateString('en-IN')}</td>
                        <td>{req.time_slot}</td>
                        <td style={{ display:'flex', gap:'6px' }}>
                          <button className="btn btn-primary" style={{ padding:'4px 10px', fontSize:'0.82rem' }} onClick={() => handleAccept(req.request_id)}>Accept</button>
                          <button className="btn" style={{ padding:'4px 10px', fontSize:'0.82rem', background:'#27ae60', color:'white', border:'none', borderRadius:'4px', cursor:'pointer' }} onClick={() => openConfirmModal(req)}>Complete</button>
                          <button className="btn btn-danger" style={{ padding:'4px 10px', fontSize:'0.82rem' }} onClick={() => handleReject(req.request_id)}>Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Solved */}
        {activeTab === 'solved' && (
          <div style={{ background:'white', borderRadius:'12px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
              <h2>Solved Cases</h2>
              <button className="btn btn-secondary" onClick={fetchSolved} disabled={loading}>Refresh</button>
            </div>
            {loading ? (
              <p style={{ textAlign:'center', padding:'40px', color:'#888' }}>Loading...</p>
            ) : filtered.length === 0 ? (
              <p style={{ textAlign:'center', padding:'40px', color:'#888' }}>No matching solved cases.</p>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Reg No / Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((req, i) => {
                      const badge = STATUS_BADGE[req.status] || { color:'#999', label: req.status }
                      return (
                        <tr key={req.request_id}>
                          <td>{i+1}</td>
                          <td><NameCell row={req} /></td>
                          <td>{req.registration_number || req.booker_email}</td>
                          <td>{new Date(req.appointment_date).toLocaleDateString('en-IN')}</td>
                          <td>{req.time_slot}</td>
                          <td><span style={{ background:badge.color, color:'white', padding:'3px 8px', borderRadius:'10px', fontSize:'0.8rem' }}>{badge.label}</span></td>
                          <td style={{ maxWidth:'200px', fontSize:'0.85rem', color:'#555' }}>{req.action_performed || '-'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Complete Session Modal */}
        {confirmModal && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
            <div style={{ background:'white', borderRadius:'14px', padding:'32px', width:'440px', maxWidth:'90vw', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
              <h3>Mark Session as Completed</h3>
              <p style={{ color:'#555', marginBottom:'16px' }}>Person: <strong>{confirmModal.booker_name}</strong></p>
              <div className="form-group">
                <label>Session Notes / Action Taken</label>
                <textarea rows="4" placeholder="Describe what was discussed and actions taken..." value={notes} onChange={e => setNotes(e.target.value)} style={{ width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ddd', resize:'vertical' }} />
              </div>
              <div className="form-group">
                <label>Resolution Status</label>
                <select value={resolution} onChange={e => setResolution(e.target.value)} style={{ width:'100%', padding:'8px', borderRadius:'6px', border:'1px solid #ddd' }}>
                  <option value="RESOLVED">Resolved</option>
                  <option value="FOLLOW_UP">Follow-Up Required</option>
                  <option value="REFERRED">Referred to Specialist</option>
                </select>
              </div>
              <div style={{ display:'flex', gap:'10px', marginTop:'8px' }}>
                <button className="btn-login" style={{ flex:1 }} onClick={handleComplete} disabled={submitting}>
                  {submitting ? 'Saving...' : 'Confirm & Complete'}
                </button>
                <button className="btn btn-secondary" style={{ flex:1 }} onClick={() => setConfirmModal(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Detail Panel (slide-over) */}
        {detail && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'flex-end', zIndex:1100 }} onClick={closeDetail}>
            <div
              style={{ background:'#faf9fc', width:'560px', maxWidth:'96vw', height:'100%', overflowY:'auto', padding:'28px', boxShadow:'-8px 0 32px rgba(0,0,0,0.2)' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <h2 style={{ margin:0 }}>{detail.booker_name}</h2>
                  <p style={{ margin:'4px 0', color:'#666', fontSize:'0.9rem' }}>
                    {(TYPE_BADGE[detail.booker_type] || {}).label} &nbsp;|&nbsp; {detail.registration_number || detail.booker_email}
                    {detail.branch ? ' | ' + detail.branch : ''}
                  </p>
                </div>
                <button onClick={closeDetail} style={{ background:'none', border:'none', fontSize:'1.4rem', cursor:'pointer', color:'#888' }}>x</button>
              </div>

              {/* Current problem */}
              <section style={{ background:'white', borderRadius:'10px', padding:'16px', marginTop:'18px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
                <h4 style={{ margin:'0 0 8px' }}>Current Problem / Reason</h4>
                <p style={{ margin:0, color:'#444', whiteSpace:'pre-wrap' }}>{detail.description || 'No description provided.'}</p>
                <p style={{ margin:'10px 0 0', fontSize:'0.85rem', color:'#777' }}>
                  Requested: {new Date(detail.appointment_date).toLocaleDateString('en-IN')} at {detail.time_slot}
                </p>
              </section>

              {/* Status update */}
              <section style={{ background:'white', borderRadius:'10px', padding:'16px', marginTop:'14px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
                <h4 style={{ margin:'0 0 8px' }}>Update Status</h4>
                <select
                  value={detailStatus}
                  onChange={e => handleDetailStatus(e.target.value)}
                  style={{ width:'100%', padding:'9px', borderRadius:'6px', border:'1px solid #ddd' }}
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </section>

              {/* Prescription */}
              <section style={{ background:'white', borderRadius:'10px', padding:'16px', marginTop:'14px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
                <h4 style={{ margin:'0 0 8px' }}>Prescription / Advice</h4>
                <textarea
                  rows="4"
                  placeholder="Medication, advice, referrals, next steps..."
                  value={prescription}
                  onChange={e => setPrescription(e.target.value)}
                  style={{ width:'100%', padding:'9px', borderRadius:'6px', border:'1px solid #ddd', resize:'vertical' }}
                />
                <button className="btn-login" style={{ marginTop:'10px' }} onClick={handleSaveRx} disabled={savingRx}>
                  {savingRx ? 'Saving...' : 'Save Prescription'}
                </button>
              </section>

              {/* Previous visits */}
              <section style={{ background:'white', borderRadius:'10px', padding:'16px', marginTop:'14px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
                <h4 style={{ margin:'0 0 10px' }}>Previous Visits & Solutions</h4>
                {historyLoading ? (
                  <p style={{ color:'#888' }}>Loading history...</p>
                ) : history.length === 0 ? (
                  <p style={{ color:'#888' }}>No past visits.</p>
                ) : (
                  history.map((h) => {
                    const badge = STATUS_BADGE[h.status] || { color:'#999', label:h.status }
                    return (
                      <div key={h.request_id} style={{ borderLeft:'3px solid ' + badge.color, padding:'8px 12px', marginBottom:'10px', background:'#fbfaff', borderRadius:'6px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.85rem' }}>
                          <strong>{new Date(h.appointment_date).toLocaleDateString('en-IN')} - {h.time_slot}</strong>
                          <span style={{ background:badge.color, color:'white', padding:'1px 8px', borderRadius:'10px', fontSize:'0.72rem' }}>{badge.label}</span>
                        </div>
                        {h.description && <p style={{ margin:'6px 0 2px', fontSize:'0.85rem', color:'#555' }}><em>Problem:</em> {h.description}</p>}
                        {h.action_performed && <p style={{ margin:'2px 0', fontSize:'0.85rem', color:'#555' }}><em>Solution:</em> {h.action_performed}</p>}
                        {h.resolution && <p style={{ margin:'2px 0', fontSize:'0.8rem', color:'#777' }}><em>Resolution:</em> {RESOLUTION_LABEL[h.resolution] || h.resolution}</p>}
                        {h.prescription && <p style={{ margin:'2px 0', fontSize:'0.8rem', color:'#777' }}><em>Prescription:</em> {h.prescription}</p>}
                      </div>
                    )
                  })
                )}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CounsellorDashboard
