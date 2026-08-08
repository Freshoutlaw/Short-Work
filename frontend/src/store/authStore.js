import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabaseClient';

const ensureSupabase = () => {
  if (!supabase) {
    return { configured: false, error: 'Supabase is not configured for this environment.' };
  }

  return { configured: true };
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      role: null,
      isVerified: false,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Initialize auth state
      initAuth: async () => {
        const authGuard = ensureSupabase();
        if (!authGuard.configured) {
          set({ loading: false, isAuthenticated: false, user: null, session: null, role: null, isVerified: false, error: null });
          return;
        }

        set({ loading: true });
        try {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            set({ error: sessionError.message, loading: false, isAuthenticated: false });
            return;
          }

          if (session?.user) {
            set({ user: session.user, session, isAuthenticated: true });
            
            // Fetch user role and verification status
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('role, is_verified')
              .eq('id', session.user.id)
              .single();
            
            if (!userError && userData) {
              set({ 
                role: userData.role,
                isVerified: userData.is_verified || false,
                loading: false,
                error: null,
              });
            } else {
              set({ 
                isVerified: false,
                loading: false,
              });
            }
          } else {
            set({ 
              user: null,
              session: null,
              isAuthenticated: false,
              isVerified: false,
              loading: false,
              error: null,
            });
          }
        } catch (err) {
          set({ error: err.message, loading: false, isAuthenticated: false });
        }
      },

      // Register with full validation
      register: async (email, password, fullName, companyName) => {
        const authGuard = ensureSupabase();
        if (!authGuard.configured) {
          set({ loading: false, error: authGuard.error });
          return { success: false, error: authGuard.error };
        }

        set({ loading: true, error: null });
        try {
          if (!email || !password || !fullName || !companyName) {
            throw new Error('All fields are required');
          }

          if (password.length < 8) {
            throw new Error('Password must be at least 8 characters');
          }

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
            throw signupError;
          }

          // Create user record in database
          const { error: userError } = await supabase.from('users').insert({
            id: data.user.id,
            email,
            full_name: fullName,
            company_name: companyName,
            role: 'client',
            is_verified: false,
          });

          if (userError) {
            throw userError;
          }

          // Store email for OTP verification
          sessionStorage.setItem('otp-target-email', email);

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
            const otpError = await otpResponse.json();
            throw new Error(otpError.error || 'Failed to send OTP');
          }

          set({ loading: false });
          return { success: true };
        } catch (err) {
          const message = err.message || 'Registration failed. Please try again.';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      // Login with full validation
      login: async (email, password) => {
        const authGuard = ensureSupabase();
        if (!authGuard.configured) {
          set({ loading: false, error: authGuard.error, isAuthenticated: false });
          return { success: false, error: authGuard.error };
        }

        set({ loading: true, error: null });
        try {
          if (!email || !password) {
            throw new Error('Email and password are required');
          }

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            throw error;
          }

          if (!data.session?.user) {
            throw new Error('Authentication failed');
          }

          set({ user: data.session.user, session: data.session, isAuthenticated: true });

          // Fetch user role and verification status
          const { data: userData } = await supabase
            .from('users')
            .select('role, is_verified')
            .eq('id', data.session.user.id)
            .single();

          set({ 
            role: userData?.role || 'client',
            isVerified: userData?.is_verified || false,
            loading: false,
            error: null,
          });

          return { success: true };
        } catch (err) {
          const message = err.message || 'Login failed. Please try again.';
          set({ error: message, loading: false, isAuthenticated: false });
          return { success: false, error: message };
        }
      },

      // Logout
      logout: async () => {
        const authGuard = ensureSupabase();
        if (!authGuard.configured) {
          set({ loading: false, user: null, session: null, role: null, isVerified: false, isAuthenticated: false, error: null });
          return { success: true };
        }

        set({ loading: true });
        try {
          const { error } = await supabase.auth.signOut();
          if (error) {
            throw error;
          }
          
          set({ 
            user: null, 
            session: null, 
            role: null, 
            isVerified: false, 
            isAuthenticated: false,
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

      // Verify OTP with full validation
      verifyOTP: async (email, otp) => {
        const authGuard = ensureSupabase();
        if (!authGuard.configured) {
          set({ loading: false, error: authGuard.error });
          return { success: false, error: authGuard.error };
        }

        set({ loading: true, error: null });
        try {
          if (!email || !otp) {
            throw new Error('Email and OTP are required');
          }

          if (!/^\d{6}$/.test(otp)) {
            throw new Error('OTP must be exactly 6 digits');
          }

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
            throw new Error(result.error || result.message || 'Invalid or expired verification code');
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
              role: userData?.role || 'client',
              isVerified: userData?.is_verified || true,
              isAuthenticated: true,
              loading: false,
              error: null,
            });

            // Clean up session storage
            sessionStorage.removeItem('otp-target-email');

            return { success: true };
          }

          throw new Error('Failed to authenticate user');
        } catch (err) {
          const message = err.message || 'OTP verification failed. Please try again.';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      // Send OTP with error handling
      sendOTP: async (email) => {
        const authGuard = ensureSupabase();
        if (!authGuard.configured) {
          set({ loading: false, error: authGuard.error });
          return { success: false, error: authGuard.error };
        }

        set({ loading: true, error: null });
        try {
          if (!email) {
            throw new Error('Email is required');
          }

          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-otp`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send OTP');
          }

          set({ loading: false });
          return { success: true };
        } catch (err) {
          const message = err.message || 'Failed to send OTP. Please try again.';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      // Update user
      updateUser: async (updates) => {
        const authGuard = ensureSupabase();
        if (!authGuard.configured) {
          set({ loading: false, error: authGuard.error });
          return { success: false, error: authGuard.error };
        }

        set({ loading: true });
        try {
          if (!get().user?.id) {
            throw new Error('User not authenticated');
          }

          const { error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', get().user.id);

          if (error) {
            throw error;
          }

          set({ loading: false });
          return { success: true };
        } catch (err) {
          const message = err.message || 'Failed to update user';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Mark as verified (used after successful OTP)
      markAsVerified: () => set({ isVerified: true }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        role: state.role,
        isVerified: state.isVerified,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
