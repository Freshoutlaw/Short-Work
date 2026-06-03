import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const navigate = useNavigate();
  const { verifyOTP, sendOTP, loading } = useAuthStore();

  useEffect(() => {
    const cachedEmail = sessionStorage.getItem('otp-target-email');
    if (cachedEmail) {
      setTargetEmail(cachedEmail);
    } else {
      setError('Session expired. Please register again.');
      setTimeout(() => navigate('/register'), 2000);
    }
  }, [navigate]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const verify = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a complete 6-digit code');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must contain only numbers');
      return;
    }

    const result = await verifyOTP(targetEmail, otp);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError(result.error || 'Verification failed. Please try again.');
    }
  };

  const handleResend = async () => {
    setError('');
    if (!targetEmail) {
      setError('Email not found. Please register again.');
      return;
    }

    setResendCooldown(60);
    const result = await sendOTP(targetEmail);
    
    if (!result.success) {
      setError(result.error || 'Failed to resend code');
      setResendCooldown(0);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm bg-neutral-900/50 backdrop-blur-xl border border-neutral-800/80 rounded-2xl p-8 shadow-2xl text-center z-10">
        <div className="w-12 h-12 mx-auto mb-5 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-800 text-neutral-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4.8a2 2 0 012.22 0l8 4.8A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5M11 14h2" />
          </svg>
        </div>

        <h2 className="text-2xl font-black tracking-tight uppercase mb-2">Verify Identity</h2>
        <p className="text-xs text-neutral-400 mb-6 max-w-[280px] mx-auto leading-relaxed">
          We have dispatched an isolated 6‑digit access code to <span className="text-white font-semibold">{targetEmail || 'your work email'}</span>.
        </p>

        <form onSubmit={verify} className="space-y-4">
          <input 
            type="text" 
            placeholder="000000" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
            className="w-full px-4 py-3.5 bg-neutral-950 border border-neutral-800 rounded-xl text-center text-2xl font-black tracking-[0.5em] text-white placeholder-neutral-800 focus:outline-none focus:border-neutral-500 transition-colors duration-200" 
            maxLength={6}
            disabled={loading || success}
            required
            autoComplete="off"
          />

          {error && <div className="text-xs text-red-400 font-medium">{error}</div>}
          {success && <div className="text-xs text-green-400 font-medium animate-pulse">Credentials Validated. Launching Terminal...</div>}

          <button 
            type="submit" 
            disabled={loading || success || otp.length !== 6}
            className="w-full bg-white text-black py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-neutral-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-xl"
          >
            {loading ? 'Processing Token...' : 'Verify Signature'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-neutral-800/60">
          <button 
            type="button"
            disabled={resendCooldown > 0 || loading}
            onClick={handleResend}
            className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : 'Resend Verification Token'}
          </button>
        </div>
      </div>
    </div>
  );
}