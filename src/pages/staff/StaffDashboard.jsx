import StudentDashboard from '../student/StudentDashboard'

// Staff reuse the exact same dashboard UI (book + track appointments).
const StaffDashboard = () => <StudentDashboard />

export default StaffDashboard