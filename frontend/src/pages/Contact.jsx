// Contact.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/ui/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectScale: 'Growth Pipeline (<$2k/mo)',
    channelInterest: 'TikTok + Reels Grid',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' }); // 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);
        
      if (error) throw error;
      
      setStatus({
        type: 'success',
        message: '🔒 transmission secure. Pipeline sequence initiated. Our asset strategy team will contact you shortly.'
      });
      setFormData({ 
        name: '', 
        email: '', 
        company: '', 
        projectScale: 'Growth Pipeline (<$2k/mo)', 
        channelInterest: 'TikTok + Reels Grid', 
        message: '' 
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus({
        type: 'error',
        message: 'System interruption detected. Please verify inputs or contact us directly at production@shortworks.media'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-neutral-100 antialiased selection:bg-neutral-800 selection:text-white overflow-hidden">
      <Navbar />
      
      {/* Background Micro Decorative Accent Linings */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* ==========================================
            LEFT ATTENTION BRAND COLUMN
           ========================================== */}
        <section className="lg:col-span-5 flex flex-col justify-between space-y-12 lg:py-4">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-widest text-neutral-400 uppercase backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Secure Intake Pipeline
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-none">
              Let's build <br/>what works.
            </h1>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-medium max-w-md">
              Have questions regarding scale, technical workflow distribution matrices, or custom assets? Drop your structural context into the deployment payload matrix.
            </p>
          </div>

          {/* Quick Direct Routing Contacts */}
          <div className="space-y-6 border-t border-neutral-900 pt-8">
            {[
              { label: 'Direct Production Desk', value: 'production@shortworks.media', sub: 'Est. response time: <2 hrs' },
              { label: 'Corporate Office Headquarters', value: 'London Workspace Matrix, UK', sub: 'By structural appointment only' }
            ].map((contact, idx) => (
              <div key={idx} className="group">
                <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500 block mb-1">{contact.label}</span>
                <span className="text-white text-sm font-bold tracking-wide block transition-colors group-hover:text-neutral-300">{contact.value}</span>
                <span className="text-neutral-500 text-[11px] font-medium block mt-0.5">{contact.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            RIGHT CUSTOM INTAKE CONTROL FORM
           ========================================== */}
        <section className="lg:col-span-7 bg-[#0F0F12] border border-neutral-900/80 rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent" />
          
          {status.type && (
            <div className={`p-4 rounded-xl text-xs font-bold mb-8 transition-all ${
              status.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400 pl-1">Identity Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="James Bennett"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-neutral-950/60 border border-neutral-900 focus:border-neutral-700 text-white text-xs font-medium p-4 rounded-xl transition duration-150 outline-none placeholder:text-neutral-600 focus:bg-neutral-950"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400 pl-1">Secure Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="james@bennettbuilders.co.uk"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-neutral-950/60 border border-neutral-900 focus:border-neutral-700 text-white text-xs font-medium p-4 rounded-xl transition duration-150 outline-none placeholder:text-neutral-600 focus:bg-neutral-950"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400 pl-1">Company / Project Framework</label>
              <input
                type="text"
                name="company"
                placeholder="Bennett Building Services Ltd"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-neutral-950/60 border border-neutral-900 focus:border-neutral-700 text-white text-xs font-medium p-4 rounded-xl transition duration-150 outline-none placeholder:text-neutral-600 focus:bg-neutral-950"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400 pl-1">Estimated Monthly Scale</label>
                <div className="relative">
                  <select
                    name="projectScale"
                    value={formData.projectScale}
                    onChange={handleChange}
                    className="w-full bg-neutral-950/60 border border-neutral-900 focus:border-neutral-700 text-white text-xs font-medium p-4 pr-10 rounded-xl transition duration-150 outline-none appearance-none cursor-pointer focus:bg-neutral-950"
                  >
                    <option>Starter Allocation (&lt;$1k/mo)</option>
                    <option>Growth Pipeline (&lt;$2k/mo)</option>
                    <option>Scale Domination (&lt;$5k/mo)</option>
                    <option>Enterprise Content Matrix ($5k+/mo)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400 pl-1">Primary Channels Focus</label>
                <div className="relative">
                  <select
                    name="channelInterest"
                    value={formData.channelInterest}
                    onChange={handleChange}
                    className="w-full bg-neutral-950/60 border border-neutral-900 focus:border-neutral-700 text-white text-xs font-medium p-4 pr-10 rounded-xl transition duration-150 outline-none appearance-none cursor-pointer focus:bg-neutral-950"
                  >
                    <option>TikTok + Reels Grid</option>
                    <option>YouTube Shorts Focus</option>
                    <option>Multi-Channel Omni Expansion</option>
                    <option>Pure Strategy Blueprinting</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-black text-neutral-400 pl-1">Project Payload Description</label>
              <textarea
                name="message"
                placeholder="Detail current social roadblocks, current account assets, content timelines, or requirements..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-neutral-950/60 border border-neutral-900 focus:border-neutral-700 text-white text-xs font-medium p-4 rounded-xl transition duration-150 outline-none h-40 resize-none placeholder:text-neutral-600 focus:bg-neutral-950"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-neutral-200 text-black p-4 rounded-xl font-black text-xs uppercase tracking-wider transition duration-150 disabled:bg-neutral-800 disabled:text-neutral-500 flex items-center justify-center gap-2 relative shadow-md mt-2"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <span>Submit Blueprint Payload</span>
              )}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}