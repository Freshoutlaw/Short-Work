import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../hooks/useTheme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login, loading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Valid email address is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300 ${
      isDark ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'
    }`}>
      {/* Return Navigation Anchor */}
      <div className="w-full max-w-md mb-6 px-2">
        <a href="/" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors group">
          <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to Hub</span>
        </a>
      </div>

      <div className={`w-full max-w-md rounded-3xl border backdrop-blur-xl transition-all duration-300 p-8 md:p-10 ${
        isDark 
          ? 'bg-neutral-900/40 border-neutral-800/80 shadow-2xl shadow-black/60' 
          : 'bg-white border-neutral-200 shadow-xl shadow-neutral-200/50'
      }`}>
        {/* Core Branding Header */}
        <div className="mb-8 text-center sm:text-left">
          <img src="/assets/logo.png" alt="ShortWork" className="h-6 w-auto object-contain mx-auto sm:mx-0 mb-6 dark" />
          <h1 className="text-3xl font-black tracking-tight uppercase">Welcome Back</h1>
          <p className="mt-1.5 text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
            Log in to manage your short-form content dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-500 text-xs font-semibold leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Address Block */}
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase mb-2 text-neutral-400 dark:text-neutral-500">
              Work Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input
                type="email"
                placeholder="operator@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all duration-200 outline-none ${
                  isDark
                    ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-600 focus:ring-2 focus:ring-neutral-800/30'
                    : 'bg-neutral-50 border-neutral-200 text-black placeholder-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200'
                }`}
                required
              />
            </div>
          </div>

          {/* Password Security Block */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                Password
              </label>
              <a href="/forgot" className="text-[11px] font-bold tracking-wide uppercase text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-11 pr-12 py-3.5 rounded-xl border text-sm transition-all duration-200 outline-none ${
                  isDark
                    ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-600 focus:border-neutral-600 focus:ring-2 focus:ring-neutral-800/30'
                    : 'bg-neutral-50 border-neutral-200 text-black placeholder-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me Option */}
          <div className="flex items-center">
            <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-500 dark:border-neutral-800 dark:bg-neutral-950" />
            <label htmlFor="remember-me" className="ml-2 block text-xs font-bold uppercase tracking-wide text-neutral-400">Remember Me</label>
          </div>

          {/* Submit Action Block */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? 'bg-gradient-to-r from-neutral-100 to-white text-black hover:opacity-90 shadow-white/5'
                : 'bg-neutral-950 text-white hover:bg-black shadow-neutral-950/20'
            }`}
          >
            {loading ? 'Authorizing Operator...' : 'Log In'}
          </button>
        </form>

        {/* Third Party Dynamic Breakouts */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral-200 dark:border-neutral-800" /></div>
          <span className="relative bg-white dark:bg-[#121212] px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Or</span>
        </div>

        <div className="space-y-2.5">
          {['Google', 'LinkedIn', 'Facebook'].map((provider) => (
            <button key={provider} className={`w-full py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-3 transition-colors ${
              isDark ? 'bg-neutral-950/50 border-neutral-800 hover:bg-neutral-900 text-white' : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-900'
            }`}>
              <span className="font-semibold text-neutral-400">Continue with</span> {provider}
            </button>
          ))}
        </div>

        {/* Footer Navigation Trigger */}
        <div className={`mt-8 pt-6 border-t text-center ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Don't have an operational account?{' '}
            <Link to="/register" className="font-bold uppercase tracking-wide text-neutral-950 dark:text-white border-b border-neutral-400 dark:border-neutral-600 hover:border-current transition-colors ml-1">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}