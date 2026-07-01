import StudentDashboard from '../student/StudentDashboard'

// Faculty reuse the exact same dashboard UI (book + track appointments).
const FacultyDashboard = () => <StudentDashboard />

export default FacultyDashboard