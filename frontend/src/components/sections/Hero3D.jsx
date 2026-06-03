// Hero3D.jsx
import { useParallax3D } from '../../hooks/useParallax3D';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

// Floating stat card that animates on scroll
const StatCard = ({ label, value, sub, delay }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = parseFloat(value);
    if (isNaN(target)) return;
    let start = 0;
    const duration = 1500;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className={`stat-card absolute backdrop-blur-xl bg-black/80 border border-white/10 rounded-xl p-4 min-w-[140px] animate-fadeInRight`} style={{ animationDelay: `${delay}s` }}>
      <div className="text-[10px] tracking-wider text-white/40 uppercase">{label}</div>
      <div className="text-3xl font-black tracking-tight">
        {typeof count === 'number' ? (value.includes('M') ? count.toFixed(1) + 'M' : Math.floor(count)) : value}
      </div>
      <div className="text-xs text-green-400 mt-1">{sub}</div>
    </div>
  );
};

export const Hero3D = () => {
  const containerRef = useParallax3D();
  const [stats, setStats] = useState({
    views: '1.2M',
    followers: '+24.6K',
    engagement: '14.8%',
    leads: '312',
  });

  useEffect(() => {
    // Fetch real stats from Supabase (example – replace with actual query)
    const fetchStats = async () => {
      const { data } = await supabase.from('agency_stats').select('*').single();
      if (data) setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <section className="relative h-[680px] md:h-[720px] overflow-hidden bg-black text-white">
      {/* Background depth layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-black" />
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-14 flex flex-col lg:flex-row items-center gap-12 h-full">
        {/* Left column */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-xs tracking-wider bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            UK's Specialist Short-Form Content Agency
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
            We Help Businesses<br />
            Become Impossible<br />
            To <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-shimmer">Ignore</span> Online.
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-md mx-auto lg:mx-0">
            We turn your expertise into short-form content that builds trust, grows your audience, and generates high-quality clients — consistently.
          </p>
          <div className="flex flex-wrap gap-3 mt-5 justify-center lg:justify-start">
            <a href="#contact" className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wide hover:bg-gray-200 transition flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M8 12h8M12 8v8" /></svg>
              Book Call
            </a>
            <a href="#case-studies" className="border border-white/30 px-6 py-2 rounded-full text-xs uppercase tracking-wide hover:bg-white/10 transition">
              View Cases →
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-white/10">
            <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">Trusted by businesses across the UK</div>
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              {['BENNETT', 'APEX', 'MANCHESTER DENTAL', 'JB ELECTRICAL', 'EVOLVE'].map(logo => (
                <span key={logo} className="text-xs tracking-wider text-white/30 font-mono">{logo}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column – 3D Phone with floating stats */}
        <div className="flex-1 relative flex justify-center" ref={containerRef} style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}>
          <div className="relative w-[480px] h-[1400px] md:w-[550px] md:h-[1500px]">
            <img
              src="/assets/phone.png"
              alt="ShortWork on mobile"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))' }}
            />
            <StatCard label="Views This Month" value={stats.views} sub="↑ +127%" delay={0} className="top-16 left-4" />
            <StatCard label="Follower Growth" value={stats.followers} sub="89% vs last 30 days" delay={0.15} className="top-32 right-4" />
            <StatCard label="Engagement Rate" value={stats.engagement} sub="↑ +3.2%" delay={0.3} className="bottom-48 left-4" />
            <StatCard label="Leads Generated" value={stats.leads} sub="↑ +76%" delay={0.45} className="bottom-32 right-4" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-4 whitespace-nowrap">
              <span className="text-2xl font-black">5.0</span>
              <div>
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <div className="text-[10px] text-white/40">400+ Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};