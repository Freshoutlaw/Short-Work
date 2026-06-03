// index.ts
// Follow this structure: supabase functions new generate-audit
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const groqApiKey = Deno.env.get('GROQ_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { answers } = await req.json();
    
    // Build prompt for Groq
    const prompt = `
      You are a social media auditor. Based on the following answers, generate a short, punchy audit report (max 100 words) that highlights how much the business is underperforming compared to competitors in their niche.
      Answers: ${JSON.stringify(answers)}
      Output format: "Your content is performing X% below similar businesses in [industry]. Specifically, [key insight]. We recommend [one action]."
      Replace X with a believable percentage (20-80%).
    `;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    const groqData = await groqRes.json();
    const auditText = groqData.choices[0].message.content;
    
    // Extract percentage (simple regex)
    const percentMatch = auditText.match(/(\d+)%/);
    const performancePercent = percentMatch ? parseInt(percentMatch[1]) : 42;

    return new Response(JSON.stringify({ auditText, performancePercent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});