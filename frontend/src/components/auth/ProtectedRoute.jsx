import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { isSupabaseConfigured } from '../../lib/supabaseClient';

export const ProtectedRoute = ({ children, requireVerified = false, requireAdmin = false }) => {
  const { isAuthenticated, isVerified, role, loading } = useAuthStore();

  if (!isSupabaseConfigured) {
    return children;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-neutral-500 tracking-widest uppercase font-bold text-xs animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-ping" />
          Verifying Clearance...
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but requires verification
  if (requireVerified && !isVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  // Requires admin role
  if (requireAdmin && role !== 'owner') {
    return <Navigate to="/" replace />;
  }

  return children;
};