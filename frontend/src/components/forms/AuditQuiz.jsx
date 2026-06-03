// AuditQuiz.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const questions = [
  { id: 'platform', text: 'Which platforms do you currently use?', options: ['TikTok only', 'Instagram only', 'Both', 'None yet'] },
  { id: 'frequency', text: 'How often do you post?', options: ['Daily', 'Few times a week', 'Once a week', 'Rarely'] },
  { id: 'engagement', text: 'What is your current engagement rate?', options: ['<1%', '1-3%', '3-5%', '>5%', "I don't know"] },
  { id: 'industry', text: 'What industry are you in?', options: ['Trades', 'Restaurant', 'Salon/Beauty', 'Professional Service', 'Other'] },
  { id: 'size', text: 'How many employees?', options: ['1-5', '6-20', '21-50', '50+'] },
];

export const AuditQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('quizAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  const handleAnswer = (value) => {
    const qid = questions[step].id;
    setAnswers({ ...answers, [qid]: value });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      // 1. Store lead in Supabase
      const { data: lead, error: leadError } = await supabase
        .from('leads')
        .insert({ name: 'Quiz User', email: 'user@example.com', source: 'quiz', quiz_score: answers })
        .select()
        .single();
      if (leadError) throw leadError;

      // 2. Call Groq Edge Function to generate audit report
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-audit`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const { auditText, performancePercent } = await response.json();

      // 3. Store audit report
      await supabase.from('audit_reports').insert({
        lead_id: lead.id,
        answers,
        ai_report: auditText,
        performance_percent: performancePercent,
      });

      setReport({ text: auditText, percent: performancePercent });
    } catch (err) {
      console.error(err);
      setReport({ text: 'We couldn’t generate your report right now. Please contact us directly.', percent: 0 });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setReport(null);
    localStorage.removeItem('quizAnswers');
  };

  if (report) {
    return (
      <div className="bg-black/90 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center max-w-xl mx-auto">
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-2xl font-bold mb-2">Your Content Audit</h3>
        <p className="text-gray-300 mb-6">{report.text}</p>
        <div className="text-4xl font-black text-red-400 mb-6">{report.percent}% below competitors</div>
        <a href="#contact" className="bg-white text-black px-6 py-3 rounded-full font-bold inline-block">Book Free Strategy Call →</a>
        <button onClick={resetQuiz} className="block text-sm text-white/40 mt-4 underline">Start over</button>
      </div>
    );
  }

  return (
    <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-xl mx-auto">
      <div className="mb-6">
        <div className="text-xs text-white/40 mb-2">Step {step+1} of {questions.length}</div>
        <div className="h-1 bg-white/10 rounded-full"><div className="h-1 bg-white rounded-full" style={{ width: `${((step+1)/questions.length)*100}%` }} /></div>
      </div>
      <h3 className="text-2xl font-bold mb-6">{questions[step].text}</h3>
      <div className="flex flex-col gap-3">
        {questions[step].options.map(opt => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="text-left px-4 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
          >
            {opt}
          </button>
        ))}
      </div>
      {loading && <div className="text-center mt-6">Generating your personalized report...</div>}
    </div>
  );
};