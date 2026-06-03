// quizStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabaseClient';

export const useQuizStore = create(
  persist(
    (set, get) => ({
      currentStep: 0,
      answers: {},
      quizHistory: [],
      loading: false,
      error: null,
      report: null,
      auditScore: null,

      // Reset quiz
      resetQuiz: () => set({ currentStep: 0, answers: {}, report: null, error: null }),

      // Update answer for a question
      updateAnswer: (questionId, answer) => {
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        }));
      },

      // Move to next step
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

      // Move to previous step
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

      // Submit quiz and generate audit report
      submitQuiz: async (userEmail, userName) => {
        set({ loading: true, error: null });
        try {
          const answers = get().answers;

          // Store quiz submission
          const { data: quiz, error: quizError } = await supabase
            .from('quiz_submissions')
            .insert({
              email: userEmail,
              answers,
              submitted_at: new Date().toISOString(),
            })
            .select()
            .single();

          if (quizError) throw quizError;

          // Call Groq Edge Function to generate audit report
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-audit-report`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ answers }),
            }
          );

          const reportData = await response.json();
          if (!response.ok) throw new Error(reportData.error || 'Failed to generate report');

          // Store in quiz_reports table
          await supabase.from('quiz_reports').insert({
            quiz_submission_id: quiz.id,
            email: userEmail,
            audit_text: reportData.auditText,
            performance_percent: reportData.performancePercent,
          });

          set({
            report: reportData.auditText,
            auditScore: reportData.performancePercent,
            loading: false,
            quizHistory: [...get().quizHistory, { id: quiz.id, timestamp: new Date(), score: reportData.performancePercent }],
          });

          return { success: true, report: reportData.auditText, score: reportData.performancePercent };
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, error: err.message };
        }
      },

      // Load quiz history for user
      loadQuizHistory: async (userEmail) => {
        set({ loading: true });
        try {
          const { data, error } = await supabase
            .from('quiz_submissions')
            .select('*')
            .eq('email', userEmail)
            .order('submitted_at', { ascending: false });

          if (error) throw error;
          set({ quizHistory: data || [], loading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, error: err.message };
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'quiz-store',
      partialize: (state) => ({
        answers: state.answers,
        currentStep: state.currentStep,
        quizHistory: state.quizHistory,
      }),
    }
  )
);
