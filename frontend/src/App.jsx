import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Lazy load for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const IndustryPage = lazy(() => import('./pages/IndustryPage'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const OTPVerification = lazy(() => import('./components/auth/OTPVerification'));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
const AdminLayout = lazy(() => import('./components/dashboard/Admin/AdminLayout'));

function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="bg-black text-white min-h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/industry/:slug" element={<IndustryPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* OTP Verification - Only accessible after registration */}
          <Route 
            path="/verify-otp" 
            element={
              <ProtectedRoute requireVerified={false}>
                <OTPVerification />
              </ProtectedRoute>
            } 
          />

          {/* Protected Client Dashboard - Requires authentication and verification */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requireVerified={true}>
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Admin Dashboard - Requires admin role */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requireVerified={true} requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;