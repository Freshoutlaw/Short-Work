import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Rate limiting for verification attempts
const VERIFICATION_RATE_LIMIT = 10; // Max 10 attempts per email
const VERIFICATION_RATE_WINDOW = 3600000; // 1 hour in milliseconds

interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const verificationLimitMap = new Map<string, RateLimitEntry>();

function checkVerificationRateLimit(email: string): { allowed: boolean; message: string } {
  const now = Date.now();
  const entry = verificationLimitMap.get(email);

  if (entry && now - entry.timestamp < VERIFICATION_RATE_WINDOW) {
    if (entry.count >= VERIFICATION_RATE_LIMIT) {
      return {
        allowed: false,
        message: 'Too many verification attempts. Please try again later.',
      };
    }
    entry.count++;
  } else {
    verificationLimitMap.set(email, { count: 1, timestamp: now });
  }

  return { allowed: true, message: '' };
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed', valid: false }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Content-Type must be application/json', valid: false }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { email, otp } = await req.json();

    // Validate input
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address', valid: false }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!otp || !/^\d{6}$/.test(otp)) {
      return new Response(
        JSON.stringify({ error: 'Invalid OTP format', valid: false }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check rate limit
    const rateLimitCheck = checkVerificationRateLimit(email);
    if (!rateLimitCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: rateLimitCheck.message,
          valid: false,
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch OTP record from database
    const { data, error: queryError } = await supabase
      .from('user_otp')
      .select('*')
      .eq('email', email)
      .single();

    if (queryError || !data) {
      return new Response(
        JSON.stringify({
          error: 'Invalid or expired verification code',
          valid: false,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check OTP value
    if (data.otp !== otp) {
      return new Response(
        JSON.stringify({
          error: 'Invalid verification code',
          valid: false,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check OTP expiration
    const expiresAt = new Date(data.expires_at);
    if (expiresAt < new Date()) {
      // Clean up expired OTP
      await supabase.from('user_otp').delete().eq('email', email);

      return new Response(
        JSON.stringify({
          error: 'Verification code has expired. Please request a new one.',
          valid: false,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Update user as verified
    const { error: updateError } = await supabase
      .from('users')
      .update({ is_verified: true, verified_at: new Date().toISOString() })
      .eq('email', email);

    if (updateError) {
      console.error('Error updating user verification status:', updateError);
      return new Response(
        JSON.stringify({
          error: 'Failed to verify user. Please try again.',
          valid: false,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Delete OTP record after successful verification
    await supabase.from('user_otp').delete().eq('email', email);

    return new Response(
      JSON.stringify({
        valid: true,
        message: 'Email verified successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err) {
    console.error('Verification error:', err);
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred. Please try again.',
        valid: false,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});