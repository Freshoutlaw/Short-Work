import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { AuditQuiz } from '../components/forms/AuditQuiz';
import { ROICalculator } from '../components/forms/ROICalculator';

export default function QuizPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      setSession(session);
      setLoading(false);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        setSession(session);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <section className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs tracking-wider text-white/40 uppercase">Free Audit</span>
            <h1 className="text-5xl md:text-6xl font-black mt-4">How does your content stack up?</h1>
            <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">Answer 5 quick questions and get an AI‑powered report tailored to your business.</p>
          </div>
          <AuditQuiz />
        </section>

        <section>
          <div className="text-center mb-12">
            <span className="text-xs tracking-wider text-white/40 uppercase">ROI Calculator</span>
            <h2 className="text-5xl md:text-6xl font-black mt-4">See what weak content costs you</h2>
            <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">Discover the revenue impact of your current content strategy.</p>
          </div>
          <ROICalculator />
        </section>
      </div>
    </div>
  );
}
