// database.types.ts

export type User = {
  id: string;
  email: string;
  name?: string;
  role: 'client' | 'owner' | 'admin';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
};

export type Lead = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  industry?: string;
  source: 'quiz' | 'form' | 'chat' | 'direct';
  quiz_score?: Record<string, any>;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  created_at: string;
  updated_at: string;
};

export type QuizSubmission = {
  id: string;
  email: string;
  answers: Record<string, string | number>;
  submitted_at: string;
};

export type QuizReport = {
  id: string;
  quiz_submission_id: string;
  email: string;
  audit_text: string;
  performance_percent: number;
  created_at: string;
};

export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  seo_keywords?: string;
};

export type ROISubmission = {
  id: string;
  email: string;
  business_type: string;
  monthly_revenue?: number;
  average_order_value?: number;
  monthly_orders?: number;
  roi_calculation: Record<string, any>;
  submitted_at: string;
};

export type UserOTP = {
  email: string;
  otp: string;
  expires_at: string;
};

export type AnalyticsEvent = {
  id: string;
  event_name: string;
  event_data: Record<string, any>;
  user_agent?: string;
  timestamp: string;
};

export type ClientPortalData = {
  id: string;
  user_id: string;
  onboarding_status: 'pending' | 'in_progress' | 'completed';
  content_calendar?: Record<string, any>;
  analytics?: Record<string, any>;
  messages?: string;
  created_at: string;
  updated_at: string;
};
