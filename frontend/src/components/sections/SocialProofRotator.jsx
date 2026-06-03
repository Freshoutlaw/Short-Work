// SocialProofRotator.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const SocialProofRotator = () => {
  const [proofs, setProofs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchProofs = async () => {
      const { data } = await supabase.from('social_proof').select('*').eq('is_active', true);
      if (data) setProofs(data);
    };
    fetchProofs();
  }, []);

  useEffect(() => {
    if (!proofs.length) return;
    const interval = setInterval(() => setIndex((i) => (i + 1) % proofs.length), 6000);
    return () => clearInterval(interval);
  }, [proofs]);

  if (!proofs.length) return null;

  const p = proofs[index];
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
      <div className="text-4xl mb-3">📈</div>
      <p className="text-lg font-medium">
        <span className="font-bold">{p.business_name}</span> grew from{' '}
        <span className="text-red-400">{p.before_followers.toLocaleString()}</span> to{' '}
        <span className="text-green-400">{p.after_followers.toLocaleString()}</span> followers on {p.platform}
      </p>
      <p className="text-sm text-white/50 mt-2">{p.engagement_growth}% engagement increase</p>
      <a href={p.verified_url} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 underline mt-4 inline-block">
        View on {p.platform} →
      </a>
    </div>
  );
};