import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

const useAuthStore = create((set) => ({
  session: null,
  user: null,
  role: null,
  isAuthenticated: false,
  isVerified: false,
  loading: true,
  error: null,

  // Initialize auth state on app load
  initializeAuth: async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        set({ error: sessionError.message, loading: false });
        return;
      }

      if (session?.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, role, is_verified')
          .eq('id', session.user.id)
          .single();

        if (!userError && userData) {
          set({
            session,
            user: session.user,
            role: userData.role,
            isAuthenticated: true,
            isVerified: userData.is_verified || false,
            loading: false,
            error: null,
          });
        } else {
          set({
            session,
            user: session.user,
            isAuthenticated: true,
            isVerified: false,
            loading: false,
            error: null,
          });
        }
      } else {
        set({
          session: null,
          user: null,
          role: null,
          isAuthenticated: false,
          isVerified: false,
          loading: false,
          error: null,
        });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Register and trigger OTP
  register: async (email, password, fullName, companyName) => {
    set({ loading: true, error: null });
    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          },
        },
      });

      if (signupError) {
        set({ error: signupError.message, loading: false });
        return { success: false, error: signupError.message };
      }

      // Store email in sessionStorage for OTP verification
      sessionStorage.setItem('otp-target-email', email);
      sessionStorage.setItem('otp-target-user-id', data.user?.id);

      // Trigger OTP send
      const otpResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-otp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (!otpResponse.ok) {
        const errorData = await otpResponse.json();
        set({ error: errorData.error || 'Failed to send OTP', loading: false });
        return { success: false, error: errorData.error || 'Failed to send OTP' };
      }

      set({ loading: false });
      return { success: true };
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      set({ error: message, loading: false });
      return { success: false, error: message };
    }
  },

  // Verify OTP and authenticate
  verifyOTP: async (email, otp) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-otp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.valid) {
        const errorMsg = result.error || result.message || 'Invalid or expired verification code';
        set({ error: errorMsg, loading: false });
        return { success: false, error: errorMsg };
      }

      // Fetch updated user data
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, role, is_verified')
          .eq('id', session.user.id)
          .single();

        set({
          session,
          user: session.user,
          role: userData?.role,
          isAuthenticated: true,
          isVerified: userData?.is_verified || true,
          loading: false,
          error: null,
        });

        // Clean up session storage
        sessionStorage.removeItem('otp-target-email');
        sessionStorage.removeItem('otp-target-user-id');

        return { success: true };
      }

      set({ error: 'Failed to authenticate user', loading: false });
      return { success: false, error: 'Failed to authenticate user' };
    } catch (err) {
      const message = err.message || 'OTP verification failed. Please try again.';
      set({ error: message, loading: false });
      return { success: false, error: message };
    }
  },

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        set({ error: loginError.message, loading: false });
        return { success: false, error: loginError.message };
      }

      if (data.session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, role, is_verified')
          .eq('id', data.session.user.id)
          .single();

        set({
          session: data.session,
          user: data.session.user,
          role: userData?.role,
          isAuthenticated: true,
          isVerified: userData?.is_verified || false,
          loading: false,
          error: null,
        });

        return { success: true };
      }

      set({ error: 'Authentication failed', loading: false });
      return { success: false, error: 'Authentication failed' };
    } catch (err) {
      const message = err.message || 'Login failed. Please try again.';
      set({ error: message, loading: false });
      return { success: false, error: message };
    }
  },

  // Logout
  logout: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({
        session: null,
        user: null,
        role: null,
        isAuthenticated: false,
        isVerified: false,
        loading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const message = err.message || 'Logout failed';
      set({ error: message, loading: false });
      return { success: false, error: message };
    }
  },

  // Update verification status
  markAsVerified: () => {
    set((state) => ({
      isVerified: true,
    }));
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
