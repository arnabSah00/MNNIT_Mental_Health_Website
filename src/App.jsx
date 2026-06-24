import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Services from './components/Services'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import StudentLogin from './pages/login/StudentLogin'
import CounsellorLogin from './pages/login/CounsellorLogin'
import AdministratorLogin from './pages/login/AdministratorLogin'
import DeanLogin from './pages/login/DeanLogin'
import TeleManasPage from './pages/TeleManasPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import StudentDashboard from './pages/student/StudentDashboard'
import CounsellorDashboard from './pages/counsellor/CounsellorDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import DeanDashboard from './pages/dean/DeanDashboard'
import './styles/App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Services />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/login/student" element={<StudentLogin />} />
              <Route path="/login/counsellor" element={<CounsellorLogin />} />
              <Route path="/login/administrator" element={<AdministratorLogin />} />
              <Route path="/login/dean" element={<DeanLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/tele_manas" element={<TeleManasPage />} />

              {/* Protected Student Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute
                    element={<StudentDashboard />}
                    allowedRoles={['student']}
                  />
                }
              />

              {/* Protected Counsellor Routes */}
              <Route
                path="/counsellor/dashboard"
                element={
                  <ProtectedRoute
                    element={<CounsellorDashboard />}
                    allowedRoles={['counsellor']}
                  />
                }
              />

              {/* Protected Administrator Routes */}
              <Route
                path="/administrator/dashboard"
                element={
                  <ProtectedRoute
                    element={<AdminDashboard />}
                    allowedRoles={['administrator']}
                  />
                }
              />

              {/* Protected Dean Routes */}
              <Route
                path="/dean/dashboard"
                element={
                  <ProtectedRoute
                    element={<DeanDashboard />}
                    allowedRoles={['dean']}
                  />
                }
              />

              {/* Redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
