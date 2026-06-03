// groq.types.ts

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatRequest = {
  messages: ChatMessage[];
};

export type ChatResponse = {
  reply: string;
};

export type AuditReportRequest = {
  answers: Record<string, string | number>;
};

export type AuditReportResponse = {
  auditText: string;
  performancePercent: number;
};

export type OTPRequest = {
  email: string;
  otp?: string;
};

export type OTPResponse = {
  valid?: boolean;
  success?: boolean;
  error?: string;
  message?: string;
};
