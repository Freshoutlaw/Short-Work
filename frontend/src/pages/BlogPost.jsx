import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
        if (error) throw error;
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <button onClick={() => navigate('/blog')} className="text-blue-400 hover:text-blue-300 mb-8">
          ← Back to Blog
        </button>
        <h1 className="text-5xl md:text-7xl font-black mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-8">{post.excerpt}</p>
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">{post.content}</div>
        </div>
      </div>
    </div>
  );
}
