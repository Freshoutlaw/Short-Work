// VideoPortfolio.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const VideoPortfolio = () => {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase.from('video_portfolio').select('*').order('created_at', { ascending: false });
      if (data) setVideos(data);
    };
    fetchVideos();
  }, []);

  const getEmbedHtml = (url) => {
    if (url.includes('tiktok.com')) return `<blockquote class="tiktok-embed" cite="${url}" data-video-id="${url.split('/').pop()}"><section></section></blockquote><script async src="https://www.tiktok.com/embed.js"></script>`;
    if (url.includes('instagram.com')) return `<blockquote class="instagram-media" data-instgrm-permalink="${url}"></blockquote><script async src="//www.instagram.com/embed.js"></script>`;
    return '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map(video => (
        <div key={video.id} className="bg-white/5 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition" onClick={() => setSelected(video)}>
          <div className="aspect-[9/16] bg-black flex items-center justify-center">
            <div className="text-center text-white/40">▶️ {video.platform} video</div>
          </div>
          <div className="p-4">
            <p className="font-medium">{video.client_name}</p>
            <div className="text-sm text-white/40">{video.views?.toLocaleString()} views</div>
          </div>
        </div>
      ))}
      {selected && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="max-w-2xl w-full bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div dangerouslySetInnerHTML={{ __html: getEmbedHtml(selected.embed_url) }} />
            <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2">✕</button>
          </div>
        </div>
      )}
    </div>
  );
};