// AdminLayout.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { LeadsTable } from './LeadsTable';
import { QuizAnalytics } from './QuizAnalytics';
import { VideoManager } from './VideoManager';
import { BlogEditor } from './BlogEditor';

export const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('leads');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        supabase.from('users').select('role').eq('id', data.user.id).single().then(({ data: roleData }) => {
          if (roleData?.role === 'owner') setUser(data.user);
          else window.location.href = '/';
        });
      } else window.location.href = '/login';
    });
  }, []);

  if (!user) return <div className="text-center py-20">Loading admin...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 p-4 flex gap-6 overflow-x-auto">
        {['leads', 'quiz', 'videos', 'blog', 'social-proof'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 ${tab === t ? 'bg-white text-black rounded-full' : 'text-white/60'}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="p-6 max-w-7xl mx-auto">
        {tab === 'leads' && <LeadsTable />}
        {tab === 'quiz' && <QuizAnalytics />}
        {tab === 'videos' && <VideoManager />}
        {tab === 'blog' && <BlogEditor />}
      </div>
    </div>
  );
};