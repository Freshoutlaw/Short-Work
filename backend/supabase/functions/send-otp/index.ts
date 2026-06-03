import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

// Rate limiting: Track OTP requests per email
const REQUEST_RATE_LIMIT = 5; // Max 5 requests per email
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const OTP_VALIDITY_DURATION = 10 * 60 * 1000; // 10 minutes

interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function checkRateLimit(email: string): { allowed: boolean; message: string } {
  const now = Date.now();
  const entry = rateLimitMap.get(email);

  if (entry && now - entry.timestamp < RATE_LIMIT_WINDOW) {
    if (entry.count >= REQUEST_RATE_LIMIT) {
      return {
        allowed: false,
        message: `Too many OTP requests. Please try again later.`,
      };
    }
    entry.count++;
  } else {
    rateLimitMap.set(email, { count: 1, timestamp: now });
  }

  return { allowed: true, message: '' };
}

function generateSecureOTP(): string {
  const array = new Uint8Array(3);
  crypto.getRandomValues(array);
  const otp = ((array[0] << 16) | (array[1] << 8) | array[2]) % 1000000;
  return String(otp).padStart(6, '0');
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
      JSON.stringify({ error: 'Method not allowed' }),
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
        JSON.stringify({ error: 'Content-Type must be application/json' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { email } = await req.json();

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check rate limit
    const rateLimitCheck = checkRateLimit(email);
    if (!rateLimitCheck.allowed) {
      return new Response(
        JSON.stringify({ error: rateLimitCheck.message }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate secure OTP
    const otp = generateSecureOTP();
    const expiresAt = new Date(Date.now() + OTP_VALIDITY_DURATION).toISOString();

    // Store OTP in database
    const { error: upsertError } = await supabase
      .from('user_otp')
      .upsert(
        {
          email,
          otp,
          expires_at: expiresAt,
          created_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

    if (upsertError) {
      console.error('Database error:', upsertError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate OTP. Please try again.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Send OTP via email
    const { error: emailError } = await resend.emails.send({
      from: 'ShortWork <noreply@shortwork.co.uk>',
      to: email,
      subject: 'Your ShortWork Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #000;">Verify Your ShortWork Account</h2>
              <p>Your verification code is:</p>
              <div style="background: #f0f0f0; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                <code style="font-size: 32px; font-weight: bold; letter-spacing: 4px;">${otp}</code>
              </div>
              <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
              <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (emailError) {
      console.error('Email sending error:', emailError);
      return new Response(
        JSON.stringify({ error: 'Failed to send verification email. Please try again.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'OTP sent successfully',
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
    console.error('Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
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