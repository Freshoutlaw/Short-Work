// routes.jsx
// Complete route configuration for ShortWork application
// Routing logic is implemented in App.jsx using React Router v6

export const ROUTES = {
  // Public Routes
  HOME: '/',
  INDUSTRY: (slug) => `/industry/${slug}`,
  BLOG: '/blog',
  BLOG_POST: (slug) => `/blog/${slug}`,
  CONTACT: '/contact',

  // Authentication Routes
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_OTP: '/verify-otp',

  // Protected Client Routes
  DASHBOARD: '/dashboard',
  QUIZ: '/quiz',

  // Admin Routes (requires 'owner' role and verification)
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_VIDEOS: '/admin/videos',
};

// Route protection configuration
export const ROUTE_CONFIG = {
  // Public routes - no authentication required
  public: [ROUTES.HOME, ROUTES.CONTACT],

  // Auth routes - only accessible when not authenticated
  auth: [ROUTES.LOGIN, ROUTES.REGISTER],

  // OTP routes - only accessible when authenticated but not verified
  otp: [ROUTES.VERIFY_OTP],

  // Protected routes - require authentication and verification
  protected: [
    ROUTES.DASHBOARD,
    ROUTES.QUIZ,
  ],

  // Admin routes - require authentication, verification, and 'owner' role
  admin: [
    ROUTES.ADMIN,
    ROUTES.ADMIN_DASHBOARD,
    ROUTES.ADMIN_ANALYTICS,
    ROUTES.ADMIN_LEADS,
    ROUTES.ADMIN_BLOG,
    ROUTES.ADMIN_VIDEOS,
  ],
};

// Route metadata for navigation
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'ShortWork - Transform Your Expertise into Content',
    public: true,
  },
  [ROUTES.INDUSTRY]: {
    title: 'Industry Solutions',
    description: 'Industry-specific solutions for your business',
    public: true,
  },
  [ROUTES.BLOG]: {
    title: 'Blog',
    description: 'Latest insights and updates',
    public: true,
  },
  [ROUTES.CONTACT]: {
    title: 'Contact',
    description: 'Get in touch with our team',
    public: true,
  },
  [ROUTES.LOGIN]: {
    title: 'Login',
    description: 'Sign in to your account',
    requiresAuth: false,
  },
  [ROUTES.REGISTER]: {
    title: 'Register',
    description: 'Create a new account',
    requiresAuth: false,
  },
  [ROUTES.VERIFY_OTP]: {
    title: 'Verify Email',
    description: 'Verify your email address',
    requiresAuth: true,
    requiresVerification: false,
  },
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard',
    description: 'Your client dashboard',
    requiresAuth: true,
    requiresVerification: true,
  },
  [ROUTES.QUIZ]: {
    title: 'Social Media Audit',
    description: 'Take the quiz to get your audit',
    requiresAuth: true,
    requiresVerification: true,
  },
  [ROUTES.ADMIN]: {
    title: 'Admin Panel',
    description: 'Administration dashboard',
    requiresAuth: true,
    requiresVerification: true,
    requiresAdmin: true,
  },
};

