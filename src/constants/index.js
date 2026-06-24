// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// User Types
export const USER_TYPES = {
  STUDENT: 'student',
  COUNSELLOR: 'counsellor',
  ADMINISTRATOR: 'administrator',
  DEAN: 'dean'
}

// Role Configuration - drives the four dedicated login pages
export const ROLE_CONFIG = {
  student: {
    userType: 'student',
    label: 'Student',
    icon: '👨‍🎓',
    idLabel: 'Roll Number / User ID',
    idPlaceholder: 'e.g. STU001',
    dashboard: '/student/dashboard'
  },
  counsellor: {
    userType: 'counsellor',
    label: 'Counsellor',
    icon: '👨‍⚕️',
    idLabel: 'Counsellor ID',
    idPlaceholder: 'e.g. COUN001',
    dashboard: '/counsellor/dashboard'
  },
  administrator: {
    userType: 'administrator',
    label: 'Administrator',
    icon: '⚙️',
    idLabel: 'Administrator ID',
    idPlaceholder: 'e.g. ADMIN001',
    dashboard: '/administrator/dashboard'
  },
  dean: {
    userType: 'dean',
    label: 'Dean, Student Welfare',
    icon: '👔',
    idLabel: 'Dean ID',
    idPlaceholder: 'e.g. DEAN001',
    dashboard: '/dean/dashboard'
  }
}

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

// Status Colors
export const STATUS_COLORS = {
  pending: '#f39c12',
  confirmed: '#3498db',
  completed: '#27ae60',
  cancelled: '#e74c3c'
}

// Time Slots
export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM'
]

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  STUDENT_LOGIN: '/login/student',
  COUNSELLOR_LOGIN: '/login/counsellor',
  ADMIN_LOGIN: '/login/administrator',
  DEAN_LOGIN: '/login/dean',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  STUDENT_DASHBOARD: '/student/dashboard',
  COUNSELLOR_DASHBOARD: '/counsellor/dashboard',
  ADMIN_DASHBOARD: '/administrator/dashboard',
  DEAN_DASHBOARD: '/dean/dashboard',
  SELF_APPOINTMENT: '/self-appointment',
  REFERRAL: '/referral',
  TELE_MANAS: '/tele-manas'
}

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access. Please login again.',
  INVALID_CREDENTIALS: 'Invalid username or password.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  APPOINTMENT_BOOKED: 'Appointment booked successfully!',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully!',
  PASSWORD_RESET: 'Password reset successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!'
}

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'mhc_token',
  USER: 'mhc_user',
  REFRESH_TOKEN: 'mhc_refresh_token'
}

// Validation Rules
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  REG_NO_PATTERN: /^[A-Z]+\d+$/
}
