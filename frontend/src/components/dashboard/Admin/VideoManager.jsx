// VideoManager.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ platform: 'tiktok', embed_url: '', client_name: '', views: 0 });

  useEffect(() => {
    supabase.from('video_portfolio').select('*').then(({ data }) => setVideos(data || []));
  }, []);

  const addVideo = async () => {
    await supabase.from('video_portfolio').insert(form);
    window.location.reload();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Video Portfolio</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input placeholder="Client name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="bg-black/50 p-2 rounded" />
        <input placeholder="Embed URL" value={form.embed_url} onChange={(e) => setForm({ ...form, embed_url: e.target.value })} className="bg-black/50 p-2 rounded" />
        <button onClick={addVideo} className="bg-white text-black p-2 rounded">Add Video</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {videos.map(v => <div key={v.id} className="bg-white/5 p-2 rounded">{v.client_name}</div>)}
      </div>
    </div>
  );
};