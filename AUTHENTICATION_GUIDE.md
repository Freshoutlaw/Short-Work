# ShortWork Authentication & Security Implementation

## Overview

This document describes the complete authentication flow, security measures, and production-ready implementation for the ShortWork platform.

## Authentication Flow

### 1. User Registration Flow

**URL**: `/register`

```
Landing Page (Unauthenticated)
    ↓
User clicks "Book a Call" / "Book a Session" / CTA
    ↓
Check Authentication Status
    ├─ Not Authenticated → Redirect to /register
    ├─ Authenticated but Unverified → Redirect to /verify-otp
    └─ Authenticated & Verified → Allow Action
    ↓
Registration Form (if not authenticated)
    ├─ Full Name (required)
    ├─ Company Name (required)
    ├─ Email (required, validated)
    ├─ Password (minimum 8 characters)
    ├─ Confirm Password (must match)
    └─ Terms & Conditions (must accept)
    ↓
POST /auth/signup via Supabase
    ├─ User record created in auth.users
    ├─ User profile created in users table
    │  └─ Set is_verified = false
    └─ Return user.id and session
    ↓
Auto-trigger OTP Generation
    ├─ POST /functions/v1/send-otp
    ├─ Generate secure 6-digit OTP
    ├─ Store in user_otp table with 10-minute expiration
    ├─ Send via Resend email service
    └─ Store email in sessionStorage for verification
    ↓
Redirect to /verify-otp
```

### 2. OTP Verification Flow

**URL**: `/verify-otp`

```
OTP Verification Page
    ├─ Check: is email in sessionStorage?
    │  └─ No → Redirect to /register (expired session)
    ├─ Display target email
    └─ Provide 6-digit input field
    ↓
User enters 6-digit OTP
    ├─ Validate format (6 digits only)
    ├─ Rate limit check (max 10 attempts/hour)
    └─ POST /functions/v1/verify-otp
    ↓
Backend Verification
    ├─ Fetch OTP record by email
    ├─ Check: OTP matches?
    │  └─ No → Return error, increment attempts
    ├─ Check: OTP not expired?
    │  └─ Expired → Delete OTP record, redirect to resend
    └─ Valid → Update users table: is_verified = true
    ↓
Successful Verification
    ├─ Clear sessionStorage
    ├─ Update auth store: isVerified = true
    └─ Redirect to /dashboard
```

### 3. Login Flow

**URL**: `/login`

```
Login Page (Unauthenticated Only)
    ├─ Email input (validated)
    ├─ Password input
    └─ Submit button
    ↓
POST /auth/signin via Supabase
    ├─ Validate credentials
    ├─ Return session if valid
    └─ Return error if invalid
    ↓
Check Verification Status
    ├─ Fetch user from users table
    ├─ Check: is_verified = true?
    │  ├─ Yes → Redirect to /dashboard
    │  └─ No → Redirect to /verify-otp (if needed)
    └─ Fetch role for admin checks
```

### 4. Protected Route Access

**ProtectedRoute Component Guards**

```
Protected Route Request
    ↓
Check: isAuthenticated?
    ├─ No → Redirect to /login
    └─ Yes → Continue
    ↓
Check: requireVerified && !isVerified?
    ├─ Yes → Redirect to /verify-otp
    └─ No → Continue
    ↓
Check: requireAdmin && role !== 'owner'?
    ├─ Yes → Redirect to /
    └─ No → Render protected component
```

## Authentication State Management

### Zustand Store (`useAuthStore`)

**Location**: `src/store/authStore.js`

**State Properties**:
- `user`: Supabase auth user object
- `session`: Supabase session token
- `role`: User role ('client', 'owner', 'team_member')
- `isAuthenticated`: Boolean indicating if user is logged in
- `isVerified`: Boolean indicating if user has verified OTP
- `loading`: Boolean for request states
- `error`: Error message if any operation fails

**Methods**:
- `initAuth()`: Initialize auth state on app load
- `register(email, password, fullName, companyName)`: Register new user and trigger OTP
- `login(email, password)`: Authenticate existing user
- `verifyOTP(email, otp)`: Verify 6-digit OTP code
- `sendOTP(email)`: Resend OTP to email
- `logout()`: Sign out user
- `updateUser(updates)`: Update user profile
- `clearError()`: Clear error state
- `markAsVerified()`: Mark user as verified

## Security Measures

### Frontend Security

1. **Protected Routes**
   - All sensitive routes use `<ProtectedRoute>` wrapper
   - `requireVerified={true}` enforces OTP verification
   - `requireAdmin={true}` enforces admin role check
   - Unauthenticated users redirected to `/login`

2. **State Validation**
   - Auth store checks `isAuthenticated` and `isVerified` before allowing access
   - SessionStorage used to pass email between registration and OTP verification
   - All sensitive data cleared after verification

3. **Form Validation**
   - Email validation with regex pattern
   - Password minimum 8 characters
   - Password confirmation matching
   - OTP format validation (6 digits only)
   - All inputs sanitized before submission

4. **CTA Interception**
   - All Call-To-Action buttons check authentication state
   - Unauthenticated clicks redirect to registration
   - Unverified clicks redirect to OTP verification
   - Only verified users can access protected features

### Backend Security

1. **Rate Limiting**
   - OTP generation: Max 5 requests per email per hour
   - OTP verification: Max 10 attempts per email per hour
   - Returns 429 (Too Many Requests) when limit exceeded

2. **OTP Security**
   - Generated using `crypto.getRandomValues()` for cryptographic randomness
   - 6-digit format with leading zeros preserved
   - 10-minute expiration time
   - Deleted immediately after successful verification
   - Stored separately from user data

3. **Input Validation**
   - Email format validation
   - OTP format validation (exactly 6 digits)
   - Required field checks
   - Content-Type validation

4. **Error Handling**
   - No stack traces returned to client
   - Generic error messages for security issues
   - Detailed errors logged server-side only
   - HTTP status codes used correctly (400, 401, 429, 500)

5. **Database Security**
   - Row-Level Security (RLS) enabled on all tables
   - Users can only read/update their own data
   - Service role used for OTP operations
   - Indexes created for performance and query optimization
   - Foreign key constraints for referential integrity

6. **Email Security**
   - OTP sent via Resend (verified email service)
   - Beautiful HTML templates with proper encoding
   - No sensitive data in email subjects/body except OTP code

## Database Schema

### users table
```sql
id (UUID) - Primary key, references auth.users
email (TEXT) - Unique email address
full_name (TEXT) - User's full name
company_name (TEXT) - User's company name
role (TEXT) - 'client', 'owner', or 'team_member'
is_verified (BOOLEAN) - OTP verification status
verified_at (TIMESTAMP) - When user verified
created_at (TIMESTAMP) - Account creation time
updated_at (TIMESTAMP) - Last update time
```

### user_otp table
```sql
id (UUID) - Primary key
email (TEXT) - Email address (unique constraint)
otp (TEXT) - 6-digit OTP code
expires_at (TIMESTAMP) - OTP expiration time
created_at (TIMESTAMP) - OTP creation time
attempts (INTEGER) - Failed verification attempts
```

## Environment Variables

### Frontend (.env.local)
```
VITE_SUPABASE_URL=https://buycomfwdiarzchbwdtu.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_yUOTves0B7mDf-wLj-3MFw_41kkraB_
```

### Backend (Supabase Edge Functions)
```
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
RESEND_API_KEY=<your-resend-api-key>
```

## Error Handling

### Frontend Error Messages
- "Full name is required"
- "Company name is required"
- "Valid email address is required"
- "Password must be at least 8 characters"
- "Passwords do not match"
- "You must accept the Terms and Conditions"
- "Registration failed. Please try again."
- "Please enter a complete 6-digit code"
- "OTP must contain only numbers"
- "Invalid or expired verification code"
- "Too many verification attempts. Please try again later."
- "Email not found. Please register again."

### Backend HTTP Status Codes
- `200 OK`: Successful operation
- `400 Bad Request`: Invalid input or validation failure
- `405 Method Not Allowed`: Wrong HTTP method
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Unexpected server error

## Testing the Flow

### Manual Testing Checklist

1. **Registration Flow**
   - [ ] Navigate to home page
   - [ ] Click "Book a Call" without logging in
   - [ ] Redirect to `/register`
   - [ ] Fill registration form with valid data
   - [ ] Submit form
   - [ ] Verify redirect to `/verify-otp`
   - [ ] Check email for OTP code

2. **OTP Verification**
   - [ ] Receive email with 6-digit code
   - [ ] Enter code in verification form
   - [ ] Submit form
   - [ ] Verify redirect to `/dashboard`
   - [ ] Check that `isVerified` is true in auth store

3. **Login Flow**
   - [ ] Logout from dashboard
   - [ ] Navigate to `/login`
   - [ ] Enter registered email and password
   - [ ] Submit form
   - [ ] Verify redirect to `/dashboard` (if verified before)

4. **Protected Routes**
   - [ ] Try to access `/verify-otp` without being authenticated
   - [ ] Should redirect to `/login`
   - [ ] Try to access `/admin/*` without admin role
   - [ ] Should redirect to `/`
   - [ ] Try to manually type `/verify-otp` when already verified
   - [ ] Should redirect to `/dashboard`

5. **CTA Interception**
   - [ ] Logout from all accounts
   - [ ] Click "Get Your Free Audit" button
   - [ ] Should redirect to `/register`
   - [ ] Create account and verify OTP
   - [ ] Click "Get Your Free Audit" button
   - [ ] Should redirect to `/quiz`

## Deployment Notes

### Before Going to Production

1. **Environment Variables**
   - [ ] Update `VITE_SUPABASE_URL` in frontend `.env.local`
   - [ ] Update `VITE_SUPABASE_ANON_KEY` in frontend
   - [ ] Set `SUPABASE_URL` in Supabase Edge Functions
   - [ ] Set `SUPABASE_SERVICE_ROLE_KEY` in Supabase Edge Functions
   - [ ] Set `RESEND_API_KEY` in Supabase Edge Functions

2. **Database Setup**
   - [ ] Run migration: `001_init_auth_schema.sql`
   - [ ] Enable RLS on production
   - [ ] Set up proper RLS policies
   - [ ] Create indexes for performance
   - [ ] Set up automated backups

3. **Security Audit**
   - [ ] Review all RLS policies
   - [ ] Test rate limiting
   - [ ] Verify no stack traces in error responses
   - [ ] Check CORS settings on Edge Functions
   - [ ] Verify email service working in production

4. **Monitoring**
   - [ ] Set up error logging
   - [ ] Monitor OTP request rates
   - [ ] Track registration success rates
   - [ ] Monitor verification failures
   - [ ] Set up alerts for suspicious activity

## Troubleshooting

### Common Issues

1. **OTP not received**
   - Check email address is valid
   - Check Resend API key is correct
   - Check rate limit hasn't been exceeded
   - Check Supabase logs for errors

2. **"Invalid or expired verification code"**
   - Verify code was entered correctly
   - Check code hasn't expired (10 minutes)
   - Check no typos in email address
   - Request new code if expired

3. **"Too many verification attempts"**
   - Wait 1 hour for rate limit to reset
   - Or use different email address
   - Or contact support to manually reset

4. **Can't access admin dashboard**
   - Verify user role is set to 'owner' in database
   - Check `requireAdmin={true}` on admin route
   - Verify user is verified before accessing admin

5. **Auth state not persisting**
   - Check Zustand persist middleware is working
   - Check localStorage isn't being cleared
   - Check `initAuth()` is called on app load
   - Check browser allows localStorage

## Performance Optimizations

1. **Lazy Loading**
   - Routes are lazy loaded for faster initial page load
   - OTP functions use edge computing for low latency

2. **Database Indexes**
   - Email indexes for faster OTP lookups
   - Verification status indexes for dashboard queries
   - Expiration time indexes for cleanup queries

3. **Caching**
   - Zustand store persists auth state to localStorage
   - Reduces database queries on app reload
   - Session validity checked at app initialization

4. **Rate Limiting**
   - Prevents abuse of OTP generation
   - Prevents brute force verification attempts
   - In-memory tracking for minimal overhead

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
   - Add optional TOTP or security key support
   - Require 2FA for admin accounts

2. **Social Login**
   - Google OAuth integration
   - LinkedIn OAuth integration
   - Facebook OAuth integration

3. **Passwordless Auth**
   - Magic links instead of passwords
   - Passkey support for biometric authentication

4. **Advanced Security**
   - IP whitelisting
   - Device fingerprinting
   - Suspicious activity detection

5. **User Management**
   - Admin panel for user management
   - Bulk user invitations
   - Role and permission management
