// analytics.js
import { supabase } from './supabaseClient';

export const trackEvent = async (eventName, eventData = {}) => {
  try {
    // Skip if running locally and not in production
    if (!import.meta.env.PROD) {
      console.log('[Analytics]', eventName, eventData);
      return;
    }

    const { error } = await supabase.from('analytics_events').insert({
      event_name: eventName,
      event_data: eventData,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });

    if (error) console.error('[Analytics Error]', error);
  } catch (err) {
    console.error('[Analytics Error]', err);
  }
};

export const trackPageView = (pathname) => {
  trackEvent('page_view', { pathname });
};

export const trackQuizSubmission = (quizScore, completionTime) => {
  trackEvent('quiz_submission', { quiz_score: quizScore, completion_time: completionTime });
};

export const trackLeadCapture = (source, email) => {
  trackEvent('lead_capture', { source, email });
};

export const trackChatMessage = (messageType, category) => {
  trackEvent('chat_message', { message_type: messageType, category });
};

export const trackROICalculation = (results) => {
  trackEvent('roi_calculation', results);
};

export const trackConversion = (type, value) => {
  trackEvent('conversion', { conversion_type: type, conversion_value: value });
};
