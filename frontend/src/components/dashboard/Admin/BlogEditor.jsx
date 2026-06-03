// BlogEditor.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export const BlogEditor = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    supabase.from('blog_posts').select('*').then(({ data }) => setPosts(data || []));
  }, []);

  const publish = async () => {
    await supabase.from('blog_posts').insert({ title, content_markdown: content, slug, published_at: new Date() });
    window.location.reload();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Blog Manager</h3>
      <div className="space-y-4 mb-8">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/50 p-2 rounded" />
        <input placeholder="Slug (url-friendly)" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-black/50 p-2 rounded" />
        <textarea placeholder="Markdown content" rows={6} value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-black/50 p-2 rounded" />
        <button onClick={publish} className="bg-white text-black px-4 py-2 rounded">Publish</button>
      </div>
      <div className="space-y-2">
        {posts.map(p => <div key={p.id} className="border-b border-white/10 py-2">{p.title}</div>)}
      </div>
    </div>
  );
};