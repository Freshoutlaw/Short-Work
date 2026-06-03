// FloatingChatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../../lib/groqClient';

export const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hi! Ask me about ShortWork's services." }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const { reply } = await sendChatMessage([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-black/95 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col z-50 shadow-2xl">
          <div className="flex justify-between items-center p-3 border-b border-white/10">
            <span className="font-bold">ShortWork AI</span>
            <button onClick={() => setOpen(false)} className="text-white/60">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-3 py-2 rounded-xl ${msg.role === 'user' ? 'bg-white text-black' : 'bg-white/10'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && <div className="text-white/40 text-sm">Typing...</div>}
            <div ref={bottomRef} />
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about pricing, services..."
              className="flex-1 bg-black/50 border border-white/20 rounded-full px-3 py-1 text-sm"
            />
            <button onClick={sendMessage} className="bg-white text-black px-3 py-1 rounded-full text-sm">Send</button>
          </div>
        </div>
      )}
    </>
  );
};