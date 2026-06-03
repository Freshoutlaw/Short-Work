// Services.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import Button from '../components/ui/Button';

// ==========================================
// CLEAN SVG VECTOR ACCOMPANIMENTS 
// ==========================================
const SvgIcons = {
  video: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  strategy: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  calendar: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  community: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  analytics: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  leadGen: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 15.5A3.5 3.5 0 1 0 8 12a3.5 3.5 0 0 0 3.5 3.5zm0 0V21m0-9H21m-9.5 0V3" />
    </svg>
  )
};

export default function Services() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const additionalServices = [
    {
      title: 'Video Production',
      description: 'Professional short-form video content optimized specifically for TikTok, Reels, and YouTube Shorts.',
      svg: SvgIcons.video,
      features: ['Script writing & Hook formulas', 'High-end dynamic editing', 'Sound tracking & Trend matching', 'Color grading & Captions']
    },
    {
      title: 'Strategy Consultation',
      description: 'Personalized multi-channel platform strategy mapped exactly to your primary business conversion pipeline.',
      svg: SvgIcons.strategy,
      features: ['Deep market analysis', 'Competitor framework research', 'Structured growth roadmaps', 'Advanced metric KPI tracking']
    },
    {
      title: 'Content Calendar',
      description: 'Meticulously structured posting matrix optimizing consistency, timing, global reach, and audience hooks.',
      svg: SvgIcons.calendar,
      features: ['30-day comprehensive scheduling', 'Macro content pillar breakdown', 'Optimal high-traffic posting slots', 'Platform specific performance logs']
    },
    {
      title: 'Community Management',
      description: 'Transform passive viewers into an active community of loyal advocates by commanding your comment sections.',
      svg: SvgIcons.community,
      features: ['In-depth comment feedback loops', 'Immediate direct message response lines', 'Algorithmic engagement acceleration', 'Audience sentiment tracking metrics']
    },
    {
      title: 'Analytics & Reporting',
      description: 'Transparent, deep-dive data auditing to cleanly evaluate real client attribution and clear return on investment.',
      svg: SvgIcons.analytics,
      features: ['Comprehensive monthly growth summaries', 'Viewer conversion trend charts', 'Direct ROI mapping systems', 'Audience retention diagnostic logs']
    },
    {
      title: 'Lead Generation',
      description: 'Nurture views and systemize incoming target profiles straight into qualified inbound sales opportunities.',
      svg: SvgIcons.leadGen,
      features: ['High-intent CTA design optimizations', 'Targeted lead-capture workflows', 'Interactive profile verification metrics', 'Automated nurturing sequences']
    }
  ];

  const faqs = [
    { q: 'How long does it take to see results?', a: 'Most clients see tangible view acceleration and profile growth velocity within 4-6 weeks. Real operational pipeline conversions and sales impact typically mature into consistent streams within 90 days.' },
    { q: 'What if we are just starting out?', a: 'Perfect! We work with brands at all deployment tiers. We architect your foundational digital assets, establishing core hooks and style guides that rapidly build market visibility from the ground up.' },
    { q: 'Can we customize a package?', a: 'Absolutely. Our tiers serve as architectural pillars. We collaborate directly with you to craft specialized feature combinations tailored directly to your budget constraints and monthly asset requirements.' },
    { q: 'What platforms do you work with?', a: 'We focus intensely on short-form hubs: TikTok, Instagram Reels, and YouTube Shorts. We can also cross-pollinate high-performing creative matrices into Facebook feeds and LinkedIn profiles.' },
    { q: 'Do you handle the video production?', a: 'Yes! In our growth and enterprise paths, we handle the entire execution loop. We manage everything from script conceptualization, narrative building, production guidelines, to final export editing.' },
    { q: 'How do you measure success?', a: 'We audit raw core vanity metrics like audience retention graphs, views, and click-through numbers, but we optimize specifically for bottom-line KPIs like qualified customer inquiries and booked client calls.' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-neutral-100 antialiased selection:bg-neutral-800 selection:text-white overflow-hidden">
      <Navbar />
      
      {/* ==========================================
          HERO OVERVIEW GRID INTERACTION
         ========================================== */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 border-b border-neutral-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider text-neutral-300 uppercase mb-6 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" /> Core Capabilities Matrix
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white leading-none">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl leading-relaxed font-medium">
            Complete short-form social asset ecosystems engineered to supercharge engagement and drive predictable lead generation. From cinematic conceptualization to end-to-end inbound pipeline architecture.
          </p>
        </div>
      </section>

      {/* ==========================================
          MAIN ATTACHED EXTENSION GRID
         ========================================== */}
      <div className="relative border-b border-neutral-900">
        <ServicesGrid />
      </div>

      {/* ==========================================
          WHY SHORTWORK: GRID SYSTEM CARDS
         ========================================== */}
      <section className="py-32 px-6 md:px-12 bg-black relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-16">
            <span className="text-[11px] font-black tracking-widest text-neutral-500 uppercase block mb-3">Enterprise Frameworks</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Why Choose ShortWork?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, idx) => {
              const Icon = service.svg;
              const isHovered = hoveredCard === idx;
              return (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`p-8 rounded-2xl bg-[#0F0F12] border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                    isHovered ? 'border-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'border-neutral-900'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neutral-500 via-white to-neutral-500 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{service.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-8 font-medium">{service.description}</p>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-neutral-900/60">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3 text-xs text-neutral-300 font-medium leading-tight">
                        <svg className="w-3.5 h-3.5 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          INTERACTIVE TIMELINE PROCESS LAYER
         ========================================== */}
      <section className="py-32 px-6 md:px-12 bg-[#0C0C0F] border-y border-neutral-900 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-20">
            <span className="text-[11px] font-black tracking-widest text-neutral-500 uppercase block mb-3">Workflow Systems</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Our Execution Engine</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: '01', title: 'Audit Diagnostics', desc: 'Deep analytics extraction uncovering platform performance bottlenecks.' },
              { step: '02', title: 'Asset Blueprints', desc: 'Tailoring programmatic content hooks and localized growth strategy blueprints.' },
              { step: '03', title: 'Production Velocity', desc: 'High-frequency engineering and processing of custom in-house media files.' },
              { step: '04', title: 'Attribution Tuning', desc: 'Real-time optimization feedback arrays focused entirely on target acquisition.' }
            ].map((item, index) => (
              <div key={index} className="relative group bg-[#0F0F12]/60 p-6 rounded-2xl border border-neutral-900/80 hover:border-neutral-700 transition-all">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-4xl font-black text-neutral-800 tracking-tighter group-hover:text-neutral-500 transition-colors duration-300">{item.step}</span>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-9 left-[75%] w-[45%] h-[1px] bg-gradient-to-r from-neutral-800 via-neutral-900 to-transparent z-10" />
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2.5 text-white tracking-wide">{item.title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA TRANSFORM CONVERSION CONTAINER
         ========================================== */}
      <section className="py-32 px-6 md:px-12 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/30 via-black to-black opacity-60 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
            Ready to Dominate <br/>Your Feed Matrix?
          </h2>
          <p className="text-neutral-400 text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed font-medium">
            Unlock programmatic organic execution models designed purely to generate commercial engagement velocity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/pricing" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-black font-black uppercase tracking-wider text-xs px-8 py-4 rounded-xl hover:bg-neutral-200 transition duration-200">
                View Architecture Plans
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-transparent text-white font-black uppercase tracking-wider text-xs px-8 py-4 rounded-xl border border-neutral-800 hover:border-white hover:bg-white/5 transition duration-200">
                Initiate Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          ACCORDION ACCENT FAQ BLOCK
         ========================================== */}
      <section className="py-32 px-6 md:px-12 bg-[#0A0A0C] border-t border-neutral-900 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-black tracking-widest text-neutral-500 uppercase block mb-3">Knowledge Library</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-xl transition-all duration-300 bg-[#0F0F12] ${
                    isOpen ? 'border-neutral-700 bg-[#121217]' : 'border-neutral-900 hover:border-neutral-800'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-sm md:text-base text-white tracking-wide focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className={`transform transition-transform duration-200 ml-4 p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 ${isOpen ? 'rotate-180 text-white' : ''}`}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[500px] opacity-100 border-t border-neutral-900/60' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="p-6 text-xs md:text-sm text-neutral-400 leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}