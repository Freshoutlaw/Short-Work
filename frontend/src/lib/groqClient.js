// groqClient.js
export const sendChatMessage = async (messages) => {
  const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/groq-chat`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  return res.json();
};