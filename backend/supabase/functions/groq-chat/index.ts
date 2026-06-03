// index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const groqApiKey = Deno.env.get('GROQ_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });

  try {
    const { messages } = await req.json();
    const systemPrompt = `You are ShortWork AI assistant. If user asks about pricing, respond exactly: "We handle pricing personally. Book a consultation." Keep all answers short, helpful, and conversion-focused. Never provide exact prices.`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.5,
        max_tokens: 150,
      }),
    });

    const data = await groqRes.json();
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});