import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../hooks/useTheme';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { register, loading } = useAuthStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (!companyName.trim()) {
      setError('Company name is required');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Valid email address is required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the Terms and Conditions');
      return;
    }

    const result = await register(email, password, fullName, companyName);
    
    if (result.success) {
      navigate('/verify-otp');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  const isDark = theme === 'dark';
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const passwordValid = password.length >= 8;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300 ${
      isDark ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'
    }`}>
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
        <div className="mb-8 text-center sm:text-left">
          <img src="/assets/logo.png" alt="ShortWork" className="h-9 w-40 object-contain mx-auto sm:mx-0 mb-6 dark" />
          <h1 className="text-3xl font-black tracking-tight uppercase">Join ShortWorks</h1>
          <p className="mt-1.5 text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
            Start transforming your expertise into high-quality content.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-500 text-xs font-semibold leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name Block */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase mb-1.5 text-neutral-400 dark:text-neutral-500">Full Name</label>
            <input
              type="text"
              placeholder="Alex Mercer"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-600' : 'bg-neutral-50 border-neutral-200 text-black focus:border-neutral-400'
              }`}
              required
            />
          </div>

          {/* Company Name Block */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase mb-1.5 text-neutral-400 dark:text-neutral-500">Company Name</label>
            <input
              type="text"
              placeholder="Enterprise Operations"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-600' : 'bg-neutral-50 border-neutral-200 text-black focus:border-neutral-400'
              }`}
              required
            />
          </div>

          {/* Work Email Block */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase mb-1.5 text-neutral-400 dark:text-neutral-500">Work Email</label>
            <input
              type="email"
              placeholder="operator@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-600' : 'bg-neutral-50 border-neutral-200 text-black focus:border-neutral-400'
              }`}
              required
            />
          </div>

          {/* Security Credentials Block Splitting Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase mb-1.5 text-neutral-400 dark:text-neutral-500">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-4 pr-10 py-3 rounded-xl border text-sm transition-all duration-200 outline-none ${
                    isDark ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-600' : 'bg-neutral-50 border-neutral-200 text-black focus:border-neutral-400'
                  }`}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase mb-1.5 text-neutral-400 dark:text-neutral-500">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-4 pr-10 py-3 rounded-xl border text-sm transition-all duration-200 outline-none ${
                    isDark ? 'bg-neutral-950 border-neutral-800 text-white focus:border-neutral-600' : 'bg-neutral-50 border-neutral-200 text-black focus:border-neutral-400'
                  }`}
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center px-1 text-[11px]">
            <span className={passwordValid ? 'text-green-500 font-semibold' : 'text-neutral-400'}>&bull; Min 8 Characters</span>
            {confirmPassword && (
              <span className={passwordsMatch ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                {passwordsMatch ? '✓ Matching' : '✗ Unmatched'}
              </span>
            )}
          </div>

          {/* Terms Assertion Box */}
          <div className="flex items-start mt-2">
            <input id="terms" type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="h-4 w-4 mt-0.5 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-500 dark:border-neutral-800 dark:bg-neutral-950" />
            <label htmlFor="terms" className="ml-2 block text-xs font-bold uppercase tracking-wide text-neutral-400 leading-tight">Terms and Conditions</label>
          </div>

          <button
            type="submit"
            disabled={loading || !passwordValid || !passwordsMatch || !agreeTerms}
            className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-950 text-white hover:bg-black'
            }`}
          >
            {loading ? 'Compiling Operator Entry...' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral-200 dark:border-neutral-800" /></div>
          <span className="relative bg-white dark:bg-[#121212] px-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Or</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {['Google', 'LinkedIn', 'Facebook'].map((p) => (
            <button key={p} className={`py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider text-center transition-colors ${
              isDark ? 'bg-neutral-950/50 border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-white' : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900'
            }`}>
              {p}
            </button>
          ))}
        </div>

        <div className={`mt-8 pt-6 border-t text-center ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Already verified?{' '}
            <Link to="/login" className="font-bold uppercase tracking-wide text-neutral-950 dark:text-white border-b border-neutral-400 dark:border-neutral-600 hover:border-current transition-colors ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
