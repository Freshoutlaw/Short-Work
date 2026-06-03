// HomePage.jsx
import { useState, useEffect } from 'react';
import { Hero3D } from '../components/sections/Hero3D';
import { FloatingChatbot } from '../components/ui/FloatingChatbot';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import Navbar from '../components/ui/Navbar';
import { supabase } from '../lib/supabaseClient';
import { useTheme } from '../hooks/useTheme';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


// ==========================================
// FOOTER UTILITY COMPONENTS & ICONS
// ==========================================

const EnvelopeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.001 5.45-4.436 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.263-1.643a11.822 11.822 0 005.783 1.511h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.536-8.412z" />
  </svg>
);

const GreenCheck = () => (
  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const SocialIcon = ({ d, title }) => (
  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" title={title}>
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d={d} />
    </svg>
  </a>
);

const SwLogo = () => (
  <div className="flex items-center">
    <div className="text-4xl font-bold border-r-2 border-white pr-4 text-white tracking-tighter">S/W</div>
    <div className="pl-4">
      <div className="text-xl font-medium tracking-tight text-white">SHORTWORKS</div>
      <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">CONTENT THAT WORKS</div>
    </div>
  </div>
);

// Star Icon component for review rating
const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ==========================================
// FOOTER COMPONENT
// ==========================================

const Footer = () => {
  const instagramD = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";
  const tiktokD = "M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-7.032 6.273c.001 3.495 2.846 6.331 6.35 6.331a6.355 6.355 0 0 0 6.35-6.331V9.824a7.96 7.96 0 0 0 4.607 1.44v-3.5a4.79 4.79 0 0 1-1.042-1.078Z";
  const linkedinD = "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";
  const youtubeD = "M19.615 3.184c-3.604-.215-11.625-.215-15.23 0-3.897.233-4.385 2.334-4.385 8.816 0 6.468.487 8.584 4.385 8.816 3.6.215 11.626.215 15.23 0 3.897-.233 4.385-2.334 4.385-8.816 0-6.47-.487-8.586-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z";

  const quickLinksLeft = ['Home', 'About', 'Services'];
  const quickLinksCenter = ['Industries', 'Portfolio', 'Case Studies'];
  const quickLinksRight = ['Blog', 'Contact', 'Dashboard'];

  return (
    <footer className="w-full font-sans select-none">
      {/* CTA Top Bar - Premium Dark Texture split */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-12 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-neutral-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-1/4 opacity-40 pointer-events-none"
             style={{
               background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 15%, transparent 15%, transparent 20%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.05) 35%, transparent 35%)`,
             }}>
        </div>
        
        <div className="lg:w-1/2 mb-8 lg:mb-0 relative z-10 pr-8">
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight uppercase">
            READY TO GROW YOUR BUSINESS<br />WITH CONTENT THAT WORKS?
          </h2>
          <p className="text-lg text-neutral-400 font-medium">Book your free strategy call today and let's build your growth engine.</p>
        </div>

        <div className="lg:w-auto flex flex-col md:flex-row md:items-center relative z-10 gap-8">
          <div className="flex flex-col gap-4 w-full sm:w-auto">
            {/* Book Call Button */}
            <a href="#" className="flex items-center justify-between bg-neutral-100 text-neutral-950 px-6 py-4 rounded-xl font-bold text-base hover:bg-white transition-all duration-300 gap-12 group shadow-lg active:scale-[0.98]">
              <span className='flex items-center gap-3'> <EnvelopeIcon className="w-5 h-5 text-neutral-900" /> Book Strategy Call </span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            {/* Chat on WhatsApp Button */}
            <a href="#" className="flex items-center justify-between bg-black text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-neutral-900 border border-neutral-800 transition-all duration-300 gap-12 active:scale-[0.98]">
              <span className='flex items-center gap-3'> <WhatsAppIcon /> Chat on WhatsApp </span>
              <span className='w-5'></span>
            </a>
          </div>
          <ul className="text-neutral-300 text-sm font-medium space-y-2.5 bg-neutral-950/30 p-6 rounded-2xl border border-neutral-800/50 backdrop-blur-sm">
            <li className="flex items-center"><GreenCheck /> No Commitment</li>
            <li className="flex items-center"><GreenCheck /> 45 Minute Strategy Call</li>
            <li className="flex items-center"><GreenCheck /> Custom Growth Plan</li>
            <li className="flex items-center"><GreenCheck /> 100% Focused on Results</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-gradient-to-b from-black to-neutral-950 text-neutral-400 p-12 md:px-16 md:py-20 flex flex-col gap-16 border-t border-neutral-900">
        <div className="flex flex-col lg:flex-row justify-between gap-12 items-start">
          {/* Column 1 - Logo */}
          <div className="w-full lg:w-auto">
            <SwLogo />
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex-grow w-full lg:w-auto flex flex-wrap justify-between sm:justify-around gap-10">
            <div className="flex flex-col gap-6">
              <h4 className="text-white text-xs font-bold tracking-widest uppercase">QUICK LINKS</h4>
              <div className='flex gap-12 sm:gap-16'>
                <ul className="space-y-3 text-sm font-medium">
                  {quickLinksLeft.map(link => <li key={link}><a href="#" className="hover:text-white transition-colors duration-200">{link}</a></li>)}
                </ul>
                <ul className="space-y-3 text-sm font-medium">
                  {quickLinksCenter.map(link => <li key={link}><a href="#" className="hover:text-white transition-colors duration-200">{link}</a></li>)}
                </ul>
                <ul className="space-y-3 text-sm font-medium">
                  {quickLinksRight.map(link => <li key={link}><a href="#" className="hover:text-white transition-colors duration-200">{link}</a></li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3 & 4 - Connect & Location */}
          <div className='flex flex-col sm:flex-row gap-12 lg:items-start w-full lg:w-auto justify-between lg:justify-end'>
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold tracking-widest uppercase">LET'S CONNECT</h4>
              <div className="space-y-3 text-sm font-medium">
                <a href="mailto:hello@shortworks.media" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                  <EnvelopeIcon className="w-4 h-4 text-neutral-500"/> hello@shortworks.media
                </a>
                <a href="tel:01161234567" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg> 0116 123 4567
                </a>
                <div className="flex items-center gap-5 pt-3">
                  <SocialIcon d={instagramD} title="Instagram" />
                  <SocialIcon d={tiktokD} title="TikTok" />
                  <SocialIcon d={linkedinD} title="LinkedIn" />
                  <SocialIcon d={youtubeD} title="YouTube" />
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:max-w-[200px]">
              <p className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                BASED IN LEICESTER, UK
              </p>
              <p className='text-xs font-medium text-neutral-500 leading-relaxed'>Helping businesses across the UK grow with content that delivers results.</p>
            </div>
          </div>
        </div>

        {/* Powered By Section */}
        <div className="w-full text-center border-t border-neutral-900 pt-8">
          <p className="text-xs font-medium text-neutral-600 tracking-wide">
            © {new Date().getFullYear()} ShortWorks. All rights reserved. Powered by {' '}
            <a href="https://noirsageedge.vercel.app"
               target="_blank"
               rel="noopener noreferrer"
               className="text-neutral-500 hover:text-white font-semibold underline-offset-4 hover:underline transition-all duration-200">NoirSageEdge</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN HOMEPAGE COMPONENT
// ==========================================

export default function HomePage() {
  const [isYearly, setIsYearly] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    supabase.from('analytics_events').insert([{ event_type: 'page_view', page: 'home' }]);
  }, []);

  const pricingPlans = [
    {
      name: 'Starter',
      monthlyPrice: 350,
      yearlyPrice: 3500,
      description: 'Perfect for small businesses',
      features: ['8 short-form videos/month', 'Basic editing', 'Single platform posting', 'Email support', 'Monthly analytics'],
    },
    {
      name: 'Growth',
      monthlyPrice: 650,
      yearlyPrice: 6500,
      description: 'Most popular choice',
      featured: true,
      features: ['16 short-form videos/month', 'Advanced editing', 'Multi-platform posting', 'Priority support', 'Real-time analytics', 'Content calendar'],
    },
    {
      name: 'Authority',
      monthlyPrice: 1200,
      yearlyPrice: 12000,
      description: 'For large-scale operations',
      featured: false,
      features: ['Unlimited content', 'Custom strategies', 'Dedicated account manager', '24/7 support', 'Custom integrations', 'API access'],
    },
  ];

  // 10 Premium Client Reviews (with clean professional placeholder image URLs)
  const clientReviews = [
    { id: 1, name: "David K.", role: "Founder, Apex Construction", text: "ShortWorks transformed our social presence. We got 3 high-ticket leads in the first month from a single short-form video layout.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 2, name: "Sarah L.", role: "Principal, Bright Law", text: "Incredibly professional team. They turn complicated legal advisory topics into engaging content that our audience actually enjoys watching.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 3, name: "Marcus T.", role: "CEO, Scale Consulting", text: "Our organic pipelines grew exponentially. The strategy they mapped out during our initial call was executed flawlessly.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 4, name: "Emma R.", role: "Director, Elite Aesthetics", text: "The editing style is premium and scroll-stopping. Truly feels tailored to our brand aesthetic without looking like generic templates.", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 5, name: "James M.", role: "Owner, J&M Electrical", text: "As a tradesman, I don't have time for social media. These guys handle everything, letting me focus entirely on finishing jobs.", rating: 5, avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 6, name: "Chloe W.", role: "Co-Founder, Vanguard Fitness", text: "We went from 1k to over 25k engaged followers in less than 90 days. The real-time ROI tracking system keeps us perfectly informed.", rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 7, name: "Robert H.", role: "Managing Director, Oakwood Financial", text: "Compliance can make financial marketing a nightmare, but ShortWorks handles everything with deep precision and premium creative execution.", rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 8, name: "Nadia B.", role: "Executive Coach", text: "They completely changed how I position my masterminds online. My calendar is packed with qualified discovery calls.", rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 9, name: "Thomas S.", role: "Founder, GreenSpace Landscaping", text: "The video quality is spectacular. They highlight our physical craftsmanship beautifully, making our local conversions seamless.", rating: 5, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 10, name: "Elena V.", role: "Growth Lead, SaaS Product Studio", text: "Reliable, strategic, and fast. If you need to scale your B2B organic lead engines via short content, there's no better choice.", rating: 5, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80" },
  ];

  return (
    <>
      <Navbar />
      <div className={`pt-16 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
        <Hero3D />
        
        {/* SECTION 1: WHAT WE DO & HERO SPLIT */}
        <section className={`px-6 py-20 max-w-7xl mx-auto border-b ${isDark ? 'border-neutral-900' : 'border-neutral-200'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column - Capabilities */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <p className={`text-xs tracking-widest uppercase font-semibold mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>What We Do</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                  Content That Drives Real Results
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                {/* Pillar 1 */}
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                    <svg className={`w-5 h-5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 002-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold tracking-wider uppercase">Short-Form Video Content</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Scroll-stopping videos designed to attract, engage & convert.</p>
                </div>

                {/* Pillar 2 */}
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                    <svg className={`w-5 h-5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold tracking-wider uppercase">Social Media Growth</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Grow your audience with a consistent content strategy that works.</p>
                </div>

                {/* Pillar 3 */}
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                    <svg className={`w-5 h-5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold tracking-wider uppercase">Brand Building & Positioning</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Position your brand as the go-to expert in your industry.</p>
                </div>

                {/* Pillar 4 */}
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                    <svg className={`w-5 h-5 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold tracking-wider uppercase">Lead Generation & Conversions</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Content that attracts ideal clients and fills your pipeline.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Brand Statement & Image Split */}
            <div className={`lg:col-span-5 relative min-h-[400px] flex flex-col justify-end rounded-3xl p-8 border overflow-hidden group transition-all duration-300 ${
              isDark ? 'border-neutral-800' : 'border-neutral-200'
            }`}>
              
              <img 
                src="/assets/section.png" 
                alt="Section Graphic" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 w-full">
                <button className={`inline-flex items-center justify-between px-5 py-3 font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 active:scale-95 w-full sm:w-auto gap-4 shadow-xl ${
                  isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-black'
                }`}>
                  Book Strategy Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SWIPABLE CLIENT TESTIMONIALS CAROUSEL */}
        <section className={`px-6 py-20 max-w-7xl mx-auto border-b overflow-hidden ${isDark ? 'border-neutral-900' : 'border-neutral-200'}`}>
          <div className="mb-10">
            <p className={`text-xs tracking-widest uppercase font-semibold mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Client Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">What Our Partners Say</h2>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3.2 }
            }}
            className="pb-14 client-swiper"
          >
            {clientReviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className={`rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full border select-none transition-all duration-300 ${
                  isDark ? 'bg-neutral-950 border-neutral-900 hover:border-neutral-800' : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`}>
                  <div>
                    {/* Stars row */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(review.rating)].map((_, idx) => <StarIcon key={idx} />)}
                    </div>
                    {/* Review text content */}
                    <p className={`text-sm md:text-base font-medium leading-relaxed italic ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      "{review.text}"
                    </p>
                  </div>
                  {/* Author profile metadata with image layout */}
                  <div className="mt-8 border-t pt-4 border-neutral-900/10 dark:border-neutral-800/60 flex items-center gap-3">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-10 h-10 rounded-full object-cover grayscale border border-neutral-200 dark:border-neutral-800"
                    />
                    <div>
                      <h4 className="text-sm font-bold tracking-wide text-neutral-900 dark:text-white">{review.name}</h4>
                      <p className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{review.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* SECTION 2: INDUSTRIES WE SPECIALISE IN */}
        <section id="industries" className="px-6 py-20 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <p className={`text-xs tracking-widest uppercase font-semibold mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Industries We Specialise In</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className={`rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer border ${isDark ? 'bg-neutral-950 border-neutral-900 hover:border-neutral-800' : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-wider">Trades</h4>
                  </div>
                  <ul className={`text-xs space-y-2 pl-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <li>Builders</li>
                    <li>Electricians</li>
                    <li>Roofers</li>
                    <li>Landscapers</li>
                  </ul>
                </div>
                <div className="flex justify-end pt-4">
                  <svg className={`w-4 h-4 transition-colors transform group-hover:translate-x-1 ${isDark ? 'text-neutral-700 group-hover:text-white' : 'text-neutral-400 group-hover:text-neutral-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Card 2 */}
              <div className={`rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer border ${isDark ? 'bg-neutral-950 border-neutral-900 hover:border-neutral-800' : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-wider">Consultants</h4>
                  </div>
                  <ul className={`text-xs space-y-2 pl-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <li>Coaches</li>
                    <li>Trainers</li>
                    <li>Advisors</li>
                    <li>Mentors</li>
                  </ul>
                </div>
                <div className="flex justify-end pt-4">
                  <svg className={`w-4 h-4 transition-colors transform group-hover:translate-x-1 ${isDark ? 'text-neutral-700 group-hover:text-white' : 'text-neutral-400 group-hover:text-neutral-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Card 3 */}
              <div className={`rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer border ${isDark ? 'bg-neutral-950 border-neutral-900 hover:border-neutral-800' : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-wider">Professional Services</h4>
                  </div>
                  <ul className={`text-xs space-y-2 pl-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <li>Dentists</li>
                    <li>Accountants</li>
                    <li>Solicitors</li>
                    <li>Financial Advisers</li>
                  </ul>
                </div>
                <div className="flex justify-end pt-4">
                  <svg className={`w-4 h-4 transition-colors transform group-hover:translate-x-1 ${isDark ? 'text-neutral-700 group-hover:text-white' : 'text-neutral-400 group-hover:text-neutral-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Card 4 */}
              <div className={`rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer border ${isDark ? 'bg-neutral-950 border-neutral-900 hover:border-neutral-800' : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'}`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-wider">Service Businesses</h4>
                  </div>
                  <ul className={`text-xs space-y-2 pl-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <li>Local Businesses</li>
                    <li>Home Services</li>
                    <li>B2B Companies</li>
                    <li className={isDark ? 'italic text-neutral-500' : 'italic text-neutral-400'}>And More...</li>
                  </ul>
                </div>
                <div className="flex justify-end pt-4">
                  <svg className={`w-4 h-4 transition-colors transform group-hover:translate-x-1 ${isDark ? 'text-neutral-700 group-hover:text-white' : 'text-neutral-400 group-hover:text-neutral-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className={`py-24 px-6 transition-colors border-t ${
          isDark ? 'bg-black/90 border-neutral-900' : 'bg-neutral-50/50 border-neutral-200'
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className={`text-xs tracking-widest uppercase font-bold ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}>Simple Pricing</span>
              <h2 className={`text-4xl md:text-5xl font-black mt-2 tracking-tight uppercase ${
                isDark ? 'text-white' : 'text-black'
              }`}>Choose your plan</h2>
              <p className={`mt-4 text-sm font-medium ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                Scale as you grow. No long-term commitments. Change plans anytime.
              </p>

              <div className="flex items-center justify-center mt-10 gap-4">
                <span className={`text-xs uppercase font-bold tracking-wider ${!isYearly ? 'text-white font-black' : 'text-neutral-500'}`}>Monthly</span>
                <button 
                  onClick={() => setIsYearly(!isYearly)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`}
                  aria-label="Toggle billing cycle"
                >
                  <div className={`w-4 h-4 rounded-full transition-transform duration-300 bg-white ${isYearly ? 'translate-x-6 bg-neutral-100' : 'translate-x-0'}`} />
                </button>
                <span className={`text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 ${isYearly ? 'text-white font-black' : 'text-neutral-500'}`}>
                  Yearly <span className="text-[10px] bg-neutral-200 text-neutral-900 dark:bg-white dark:text-black px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide">Save 30%</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-start">
              {pricingPlans.map((plan) => {
                const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
                return (
                  <div 
                    key={plan.name}
                    className={`rounded-2xl p-8 border transition-all duration-300 relative ${
                      plan.featured 
                        ? isDark 
                          ? 'bg-neutral-900/50 border-white shadow-2xl scale-105 z-10' 
                          : 'bg-white border-neutral-900 shadow-2xl scale-105 z-10'
                        : isDark 
                          ? 'bg-neutral-950/40 border-neutral-900 hover:border-neutral-800' 
                          : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {plan.featured && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white dark:bg-white dark:text-black text-[10px] tracking-widest font-black uppercase py-1 px-3 rounded-full border border-neutral-800 shadow-md">
                        Most Popular
                      </span>
                    )}
                    <div className="mb-6">
                      <h3 className="text-xl font-black uppercase tracking-wide">{plan.name}</h3>
                      <p className={`text-xs mt-1 font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{plan.description}</p>
                    </div>
                    <div className="flex items-baseline gap-1 my-8">
                      <span className="text-4xl font-black tracking-tight">£{displayPrice.toLocaleString()}</span>
                      <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        /{isYearly ? 'yr' : 'mo'}
                      </span>
                    </div>
                    <button className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 active:scale-[0.98] ${
                      plan.featured
                        ? isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-black'
                        : isDark ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
                    }`}>
                      Get Started
                    </button>
                    <ul className="mt-8 space-y-4 border-t pt-8 border-neutral-900/10 dark:border-neutral-800/60">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start text-xs font-medium leading-tight">
                          <svg className="w-4 h-4 text-neutral-900 dark:text-neutral-100 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* INTEGRATED FOOTER COMPONENT */}
        <Footer />
        
        <FloatingChatbot />
        {/* <ThemeToggle /> */}
      </div>
    </>
  );
}