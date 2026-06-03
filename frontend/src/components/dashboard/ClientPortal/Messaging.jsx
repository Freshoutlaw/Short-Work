// Messaging.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export const Messaging = ({ clientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    supabase.from('client_messages').select('*').eq('client_id', clientId).order('created_at').then(({ data }) => setMessages(data || []));
    const sub = supabase.channel(`messages:${clientId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'client_messages', filter: `client_id=eq.${clientId}` }, payload => setMessages(prev => [...prev, payload.new])).subscribe();
    return () => sub.unsubscribe();
  }, []);

  const send = async () => {
    await supabase.from('client_messages').insert({ client_id: clientId, from: 'client', message: newMsg });
    setNewMsg('');
  };

  return (
    <div className="h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {messages.map(m => <div key={m.id} className={`p-2 rounded ${m.from === 'client' ? 'bg-white/10 text-right' : 'bg-white/5'}`}>{m.message}</div>)}
      </div>
      <div className="flex gap-2 mt-2">
        <input className="flex-1 bg-black/50 p-2 rounded" value={newMsg} onChange={e => setNewMsg(e.target.value)} />
        <button onClick={send} className="bg-white text-black px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
};