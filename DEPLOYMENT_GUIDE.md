# ShortWork Production Deployment Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Supabase account with a project
- Resend account for email sending
- Git for version control

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shortwork
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. Frontend Environment Configuration

Create `.env.local` in the `frontend` directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your Supabase project settings:
1. Go to Settings → API → URL (copy Project URL)
2. Go to Settings → API → Keys → anon public (copy key)

### 4. Backend Setup

Backend functions are managed through Supabase Edge Functions and don't require local installation, but you can test them locally using the Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Setup local environment
cd backend
cp .env.template .env
```

### 5. Backend Environment Configuration

Create `.env` in the `backend` directory:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-api-key
```

Get these values:
1. **SUPABASE_URL**: From Supabase Settings → API
2. **SUPABASE_SERVICE_ROLE_KEY**: From Supabase Settings → API → Keys (service_role)
3. **RESEND_API_KEY**: From your Resend dashboard

### 6. Database Setup

Run the migration file in Supabase SQL Editor:

1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Create new query
4. Copy contents of `backend/migrations/001_init_auth_schema.sql`
5. Click Run

This will:
- Create `users` table
- Create `user_otp` table
- Setup Row Level Security (RLS)
- Create indexes for performance
- Setup triggers for automatic timestamps

### 7. Deploy Edge Functions to Supabase

```bash
# Deploy send-otp function
supabase functions deploy send-otp --env-file backend/.env

# Deploy verify-otp function
supabase functions deploy verify-otp --env-file backend/.env
```

Verify deployment:
1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Confirm both functions are deployed and online

## Running Locally

### Frontend Development

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Testing the Complete Flow

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Navigate to registration**
   - Go to `http://localhost:5173`
   - Click "Book a Call" or navigate to `/register`

3. **Create test account**
   - Full Name: Test User
   - Company: Test Company
   - Email: test@example.com
   - Password: TestPassword123
   - Accept Terms

4. **Receive OTP**
   - Check email for 6-digit code
   - If using Resend test mode, check Resend dashboard

5. **Verify OTP**
   - Enter 6-digit code
   - Submit verification
   - Should redirect to dashboard

6. **Access Protected Content**
   - Click CTA buttons to verify protection
   - Try accessing `/admin` without admin role
   - Should redirect to home page

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates optimized bundle in `frontend/dist/`

### Backend Deployment to Production

```bash
# Deploy to production Supabase
supabase functions deploy send-otp --project-ref your-prod-project-ref --env-file backend/.env
supabase functions deploy verify-otp --project-ref your-prod-project-ref --env-file backend/.env
```

## Production Deployment

### Option 1: Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

Set environment variables in Vercel project settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy frontend
cd frontend
netlify deploy --prod
```

Configure in `frontend/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Docker (Self-hosted)

Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build -t shortwork-frontend .
docker run -p 3000:3000 shortwork-frontend
```

## Security Checklist

### Before Production

- [ ] Update all environment variables to production values
- [ ] Enable RLS on all Supabase tables
- [ ] Review and test all RLS policies
- [ ] Set up CORS properly in Supabase Edge Functions
- [ ] Enable HTTPS for all connections
- [ ] Test rate limiting under load
- [ ] Verify email service (Resend) is working
- [ ] Setup error logging and monitoring
- [ ] Enable Supabase database backups
- [ ] Configure backup retention policy
- [ ] Test disaster recovery process
- [ ] Review password reset flow (if implemented)
- [ ] Test 2FA if implemented
- [ ] Verify no sensitive data in logs
- [ ] Setup CDN for static assets
- [ ] Configure DDoS protection

### Ongoing Monitoring

- [ ] Monitor authentication errors
- [ ] Track OTP generation rates
- [ ] Monitor email delivery rates
- [ ] Check database performance
- [ ] Review error logs regularly
- [ ] Monitor API response times
- [ ] Track registration completion rates
- [ ] Monitor verification success rates

## Troubleshooting

### Email Not Received

1. **Check Resend API Key**
   ```bash
   # Verify in Supabase Edge Functions settings
   supabase functions list
   ```

2. **Check Email Validity**
   - Resend requires valid email format
   - Some test emails may not work

3. **Check Rate Limiting**
   - Max 5 OTP requests per email per hour
   - Wait or use different email

### Database Errors

1. **Check Connection String**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT version();
   ```

2. **Check RLS Policies**
   ```sql
   -- List policies
   SELECT * FROM pg_policies;
   ```

3. **Check User Permissions**
   ```sql
   -- Verify users table access
   SELECT * FROM users LIMIT 1;
   ```

### Frontend Errors

1. **Check Console for Errors**
   - Open DevTools (F12)
   - Check Console tab
   - Check Network tab

2. **Clear Cache**
   - Clear browser cache
   - Clear localStorage
   - Hard refresh (Ctrl+Shift+R)

3. **Check Environment Variables**
   - Verify `.env.local` exists
   - Restart dev server after changes
   - Variables must start with `VITE_`

## Performance Optimization

### Frontend

1. **Lazy Loading**
   - Routes are lazy loaded in `App.jsx`
   - Images should use `loading="lazy"`
   - Consider code splitting for large components

2. **Caching**
   - Auth state persisted to localStorage
   - Static assets cached by CDN
   - API responses cached where appropriate

3. **Bundle Size**
   ```bash
   npm run build
   # Check dist folder size
   ```

### Backend

1. **Database Indexes**
   - Already created in migration file
   - Monitor slow query logs
   - Add indexes as needed

2. **Edge Function Optimization**
   - Functions are deployed globally
   - Minimal dependencies reduce cold start time
   - Response time typically <100ms

## Logging and Monitoring

### Setup Error Tracking

1. **Sentry.io** (Recommended)
   ```bash
   npm install @sentry/react
   ```

2. **LogRocket**
   ```bash
   npm install logrocket
   ```

3. **Datadog**
   ```bash
   npm install @datadog/browser-rum
   ```

### Monitor Key Metrics

- Registration completion rate
- OTP verification success rate
- Email delivery rate
- Authentication error rate
- API response times
- Database query performance

## Maintenance

### Regular Tasks

- [ ] Review and update dependencies monthly
- [ ] Monitor error logs for patterns
- [ ] Clean up expired OTP records (automated)
- [ ] Review RLS policies quarterly
- [ ] Test disaster recovery quarterly
- [ ] Update security patches immediately

### Backup Strategy

1. **Supabase Automated Backups**
   - Daily backups retained for 7 days
   - Weekly backups retained for 4 weeks
   - Configure in Supabase settings

2. **Manual Backups**
   ```bash
   # Export database
   supabase db pull
   ```

### Version Control

```bash
# Never commit .env files
echo ".env*" >> .gitignore
echo "dist/" >> .gitignore
echo "node_modules/" >> .gitignore

# Track changes properly
git add -A
git commit -m "production: deploy version 1.0.0"
git push origin main
```

## Support and Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Resend Documentation](https://resend.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Rollback Plan

If something goes wrong in production:

1. **Database Issues**
   ```bash
   # Restore from backup in Supabase
   # Go to Settings → Backups → Restore
   ```

2. **Frontend Issues**
   ```bash
   # Revert to previous deployment
   # In Vercel/Netlify dashboard, select previous deployment
   ```

3. **Edge Function Issues**
   ```bash
   # Rollback function
   supabase functions delete send-otp
   supabase functions deploy send-otp --env-file backend/.env
   ```

## Conclusion

Follow this guide for a smooth production deployment. Always test thoroughly in staging before deploying to production. Monitor key metrics and respond quickly to any issues.
