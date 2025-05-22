import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import BillUpload from '@/pages/BillUpload';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Profile from '@/pages/Profile';
import Marketplace from '@/pages/Marketplace';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/bill-upload" element={
            <ProtectedRoute>
              <BillUpload />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/marketplace" element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } />

          {/* Redirect root to login if not authenticated, home if authenticated */}
          <Route path="/" element={
            JSON.parse(localStorage.getItem("currentUser") || "null") 
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
