import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// ==========================================
// INLINE VECTOR GRAPHICS & ACCENT ICONS
// ==========================================
const SWLogo = () => (
  <div className="flex items-center gap-3 px-2 py-1">
    <div className="text-2xl font-black border-r border-neutral-700 pr-3 text-white tracking-tighter">S/W</div>
    <div>
      <div className="text-xs font-bold tracking-wider text-white">SHORTWORKS</div>
      <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">Content That Works</div>
    </div>
  </div>
);

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [dateRangeDropdown, setDateRangeDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isThemeDark, setIsThemeDark] = useState(true);
  const [dragActive, setDragActive] = useState(false);

  // Core Data States for Interactive Toggles
  const [approvals, setApprovals] = useState([
    { id: 1, title: 'How We Completed This Extension In Just 3 Weeks', platform: 'TikTok', date: '14 May 2026', duration: '0:45', status: 'pending', thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=120&q=80' },
    { id: 2, title: 'Full Roof Replacement Process Start to Finish', platform: 'Instagram', date: '13 May 2026', duration: '0:52', status: 'pending', thumbnail: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=120&q=80' },
    { id: 3, title: 'Client Testimonial – Why They Chose Bennett Building', platform: 'Facebook', date: '12 May 2026', duration: '0:38', status: 'pending', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=120&q=80' },
  ]);

  // Check Auth State on Mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Structural Handlers
  const handleApprovalAction = (id, action) => {
    setApprovals(prev => prev.map(item => item.id === id ? { ...item, status: action } : item).filter(item => item.status === 'pending'));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      alert(`Successfully staged: ${e.dataTransfer.files[0].name} for asset injection pipeline.`);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-neutral-950 flex flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-t-white border-neutral-800 rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">Initializing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0A0C] font-sans text-neutral-200 antialiased flex selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      
      {/* ==========================================
          LEFT GLOBAL APPLICATION SIDEBAR
         ========================================== */}
      <aside className="w-64 bg-[#111115] border-r border-neutral-900 flex flex-col justify-between p-5 flex-shrink-0 sticky top-0 h-screen hidden lg:flex">
        <div className="space-y-8">
          <SWLogo />
          
          {/* Main Content Actions Matrix */}
          <nav className="space-y-1">
            {[
              { name: 'Dashboard', icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z' },
              { name: 'Projects', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm2-.5a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v10a.5.5 0 01-.5.5H5.5a.5.5 0 01-.5-.5V6.5z' },
              { name: 'Content Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { name: 'Content Approval', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', badge: approvals.length },
              { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { name: 'Asset Vault', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
              { name: 'Messages', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', badge: 2 },
              { name: 'Invoices', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { name: 'Reports', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium tracking-wide rounded-lg transition-all duration-150 ${
                  activeMenu === item.name 
                    ? 'bg-[#1A1A22] text-white font-bold border border-neutral-800/60 shadow-inner' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {item.name}
                </div>
                {item.badge > 0 && (
                  <span className="bg-red-500/10 text-red-500 font-extrabold px-1.5 py-0.5 rounded text-[10px]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Support Panel & CTA Block */}
        <div className="space-y-4 pt-4 border-t border-neutral-900">
          <div className="space-y-1">
            {['Profile Settings', 'Help & Support'].map((item) => (
              <button key={item} className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg transition">
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item === 'Profile Settings' ? 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' : 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'} />
                </svg>
                {item}
              </button>
            ))}
          </div>

          <div className="bg-[#16161D] rounded-xl p-4 border border-neutral-800/40 relative overflow-hidden">
            <h4 className="text-xs font-black uppercase text-white tracking-wide mb-1">Need Something?</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">Book a quick execution call with our dedicated creative team.</p>
            <button className="w-full bg-neutral-900 border border-neutral-800 hover:bg-black transition-all text-white py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-between group">
              <span>Book a Call</span>
              <svg className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT WORKSPACE
         ========================================== */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* UPPER NAVIGATION BAR HEADER */}
        <header className="h-16 border-b border-neutral-900 bg-[#0C0C0F] px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Welcome back,</span>
            <h1 className="text-base font-black text-white flex items-center gap-2 tracking-tight">
              James Bennett <span className="text-base animate-pulse">👋</span>
              <span className="text-xs font-medium text-neutral-500 pl-1 border-l border-neutral-800 hidden sm:inline">Bennett Building Services</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Embedded Mini Switch Theme Controller */}
            <div className="flex items-center bg-[#111116] border border-neutral-800 p-0.5 rounded-full">
              <button onClick={() => setIsThemeDark(false)} className={`p-1.5 rounded-full transition ${!isThemeDark ? 'bg-neutral-800 text-white' : 'text-neutral-500'}`} title="Light Theme System">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
              </button>
              <button onClick={() => setIsThemeDark(true)} className={`p-1.5 rounded-full transition ${isThemeDark ? 'bg-neutral-800 text-white' : 'text-neutral-500'}`} title="Dark Theme System">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              </button>
            </div>

            {/* Notification Ring Stack */}
            <button className="p-2 text-neutral-400 hover:text-white bg-[#111116] border border-neutral-800 rounded-lg relative transition">
              <svg className="w-4 h-4 animate-hover" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0C0C0F]" />
            </button>

            {/* Global Calendar Range Filter Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDateRangeDropdown(!dateRangeDropdown)}
                className="bg-[#111116] border border-neutral-800 px-3 py-2 rounded-lg text-xs font-bold text-neutral-300 flex items-center gap-2.5 hover:text-white transition"
              >
                <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                1 – 31 May 2026
                <svg className="w-3 h-3 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {dateRangeDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#121218] border border-neutral-800 rounded-xl shadow-2xl p-1.5 space-y-0.5 z-50">
                  {['Last 7 Days', 'This Month', 'Last Month', 'Custom Range...'].map((range) => (
                    <button key={range} onClick={() => setDateRangeDropdown(false)} className="w-full text-left px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition">{range}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown Component */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-3 pl-2 py-1 pr-1 border border-neutral-800 bg-[#111116] rounded-full hover:border-neutral-700 transition text-left"
              >
                <img className="w-7 h-7 rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Client Avatar" />
                <div className="hidden md:block leading-tight pr-1">
                  <div className="text-[11px] font-bold text-white tracking-wide">James Bennett</div>
                  <div className="text-[9px] text-neutral-500 uppercase font-bold tracking-wider">Client Account</div>
                </div>
                <svg className="w-3 h-3 text-neutral-500 pr-1 hidden md:block" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-[#121218] border border-neutral-800 rounded-xl shadow-2xl p-1.5 space-y-0.5 z-50">
                  <div className="px-3 py-2 border-b border-neutral-900 mb-1">
                    <p className="text-xs text-neutral-400 font-medium">Logged in as</p>
                    <p className="text-xs text-white font-bold truncate">james@bennettbuilders.co.uk</p>
                  </div>
                  <button className="w-full text-left px-3 py-2 text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> Profile Matrix
                  </button>
                  <button 
                    onClick={async () => {
                      await supabase.auth.signOut();
                      navigate('/');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition font-medium flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg> Logout Session
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* ==========================================
            METRIC CANVAS VIEWPORT OVERVIEW
           ========================================== */}
        <div className="p-6 lg:p-8 space-y-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          
          {/* SECTION ROW 1: KEY METRIC SCORECARDS GRID */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500">This Month Overview</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { title: 'Total Views', value: '1.2M', delta: '+ 28.5%', color: 'text-purple-400', graph: [20, 45, 28, 60, 35, 70, 45, 90], stroke: '#A855F7' },
                { title: 'Followers Gained', value: '+4,260', delta: '+ 34.2%', color: 'text-green-400', graph: [10, 25, 45, 30, 65, 50, 85, 95], stroke: '#22C55E' },
                { title: 'Leads Generated', value: '31', delta: '+ 19.0%', color: 'text-blue-400', graph: [40, 20, 60, 45, 50, 30, 75, 80], stroke: '#3B82F6' },
                { title: 'Engagement Rate', value: '14.8%', delta: '+ 3.6%', color: 'text-amber-400', graph: [30, 40, 35, 55, 45, 60, 50, 65], stroke: '#F59E0B' }
              ].map((card, idx) => (
                <div key={idx} className="bg-[#111115] border border-neutral-900 p-5 rounded-2xl flex flex-col justify-between group hover:border-neutral-800 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide">{card.title}</span>
                    <span className={`text-[10px] font-black ${card.color} bg-white/5 px-2 py-0.5 rounded-full`}>{card.delta} <span className="text-[9px] text-neutral-500 font-medium">vs last month</span></span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-black text-white tracking-tight leading-none">{card.value}</span>
                    {/* Inline Responsive Sparkline SVG System */}
                    <div className="w-24 h-10 overflow-hidden opacity-80 group-hover:opacity-100 transition">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                          d={`M ${card.graph.map((val, i) => `${(i / (card.graph.length - 1)) * 100} ${100 - val}`).join(' L ')}`}
                          fill="none"
                          stroke={card.stroke}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION ROW 2: SPLIT MATRIX (APPROVALS, CALENDAR & TASK FEEDS) */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* CONTENT APPROVAL LIST PANEL */}
            <div className="col-span-12 xl:col-span-5 bg-[#111115] border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-900/60 mb-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Content Awaiting Approval</h3>
                  <button className="text-[10px] uppercase font-bold text-neutral-500 hover:text-white transition">View All ({approvals.length})</button>
                </div>
                {approvals.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-xs text-neutral-500 font-medium">🎉 All content cleared and scheduled!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {approvals.map((item) => (
                      <div key={item.id} className="flex gap-4 p-2 hover:bg-neutral-900/30 rounded-xl transition group">
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0 border border-neutral-800">
                          <img src={item.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm text-[9px] font-black tracking-wider text-white px-1 py-0.2 rounded">
                            {item.duration}
                          </span>
                        </div>
                        <div className="flex-grow flex flex-col justify-between min-w-0">
                          <div>
                            <h4 className="text-xs font-bold text-white tracking-wide leading-snug line-clamp-1 group-hover:text-neutral-200 transition">{item.title}</h4>
                            <p className="text-[10px] text-neutral-500 font-medium mt-0.5 flex items-center gap-2">
                              <span className="text-neutral-400 font-bold">{item.platform}</span> • {item.date}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => handleApprovalAction(item.id, 'approved')} className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-sm">Approve</button>
                            <button onClick={() => handleApprovalAction(item.id, 'changes')} className="bg-neutral-900 border border-neutral-800 hover:bg-black text-neutral-400 hover:text-white transition text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg">Request Changes</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* INTEGRATED CONTENT CALENDAR TRACK */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-[#111115] border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-900/60 mb-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Content Calendar</h3>
                  <button className="text-[10px] uppercase font-bold text-neutral-500 hover:text-white transition">View Calendar</button>
                </div>
                
                {/* Horizontal Calendar Ribbon Day Framework */}
                <div className="grid grid-cols-7 gap-1 text-center mb-4 bg-neutral-950/40 p-1.5 border border-neutral-900 rounded-xl">
                  {['Mon 18', 'Tue 19', 'Wed 20', 'Thu 21', 'Fri 22', 'Sat 23', 'Sun 24'].map((day, idx) => {
                    const isToday = idx === 2; // Wed 20 is highlighted today
                    return (
                      <div key={idx} className={`p-1.5 rounded-lg transition ${isToday ? 'bg-[#1D1D26] border border-neutral-800 text-white font-black scale-105 shadow-md' : 'text-neutral-500'}`}>
                        <div className="text-[8px] uppercase tracking-wider font-bold">{day.split(' ')[0]}</div>
                        <div className="text-xs mt-0.5">{day.split(' ')[1]}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Day Slot Scheduling Stack */}
                <div className="space-y-2.5">
                  {[
                    { time: '10:00 AM', platform: 'TikTok Video', label: 'Scheduled', dot: 'bg-emerald-500' },
                    { time: '12:30 PM', platform: 'Instagram Reel', label: 'Scheduled', dot: 'bg-emerald-500' },
                    { time: '04:00 PM', platform: 'Facebook Post', label: 'Scheduled', dot: 'bg-emerald-500' }
                  ].map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#16161D] rounded-xl border border-neutral-800/30">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-neutral-400">{slot.time}</span>
                        <span className="text-xs font-bold text-white tracking-wide">{slot.platform}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10">
                        <span className={`w-1 h-1 rounded-full ${slot.dot}`} /> {slot.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-neutral-500 font-medium pt-3 mt-3 border-t border-neutral-900 text-center tracking-wide">+ 2 more items scheduled later this cycle</p>
            </div>

            {/* WHAT NEEDS YOUR ATTENTION PANEL */}
            <div className="col-span-12 md:col-span-6 xl:col-span-3 bg-[#111115] border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="pb-4 border-b border-neutral-900/60 mb-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">What Needs Your Attention</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { text: '3 videos awaiting approval', sub: 'Review and approve content', count: 3, alert: true },
                    { text: 'New message from ShortWorks', sub: 'Your next batch is ready', count: 2, alert: false },
                    { text: 'Provide feedback', sub: 'On 2 recent videos', count: 2, alert: false }
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 rounded-xl bg-neutral-950/40 border border-neutral-900/50 hover:border-neutral-800 transition cursor-pointer group">
                      <div className="flex gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${task.alert ? 'bg-amber-500' : 'bg-neutral-700'}`} />
                        <div>
                          <h4 className="text-xs font-bold text-white tracking-wide group-hover:text-neutral-200 transition">{task.text}</h4>
                          <p className="text-[10px] text-neutral-500 mt-0.5 font-medium">{task.sub}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-extrabold bg-neutral-900 text-neutral-400 w-4 h-4 rounded-full flex items-center justify-center border border-neutral-800">{task.count}</span>
                        <svg className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400 transition" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full bg-[#16161D] hover:bg-neutral-900 text-neutral-300 hover:text-white transition py-2.5 px-3 rounded-xl text-xs font-bold border border-neutral-800/40 mt-4 text-center">View All Tasks</button>
            </div>

          </div>

          {/* SECTION ROW 3: FOOTER ROW CONFIG (UPLOADERS, HISTORIC CHAT & ANALYTICS EXTENSIONS) */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* DRAG AND DROP FOOTAGE DROPCANVAS BUTTON */}
            <div className="col-span-12 xl:col-span-5 bg-[#111115] border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="pb-4 border-b border-neutral-900/60 mb-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Upload New Footage</h3>
                </div>
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[160px] ${
                    dragActive ? 'border-purple-500 bg-purple-500/5' : 'border-neutral-800 bg-neutral-950/30 hover:border-neutral-700'
                  }`}
                >
                  <svg className="w-8 h-8 text-neutral-600 mb-2.5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  <p className="text-xs font-bold text-neutral-300 tracking-wide">Drag & drop your files here</p>
                  <p className="text-[10px] text-neutral-500 font-medium mt-1">or click to browse local folders</p>
                </div>
              </div>
              
              {/* Media Categories Staging Footnotes */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-900/40 text-center">
                {[
                  { label: 'Upload Videos', formats: 'MP4, MOV, AVI', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
                  { label: 'Upload Images', formats: 'JPG, PNG, WEBP', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                  { label: 'Upload Assets', formats: 'PDF, DOC, ZIP', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
                ].map((media, key) => (
                  <div key={key} className="p-2 bg-neutral-950/60 rounded-xl border border-neutral-900 flex flex-col items-center justify-center hover:bg-neutral-900/20 transition cursor-pointer">
                    <svg className="w-4 h-4 text-neutral-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={media.icon} /></svg>
                    <span className="text-[10px] font-bold text-white block truncate">{media.label}</span>
                    <span className="text-[8px] text-neutral-500 uppercase tracking-tight block mt-0.5">{media.formats}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PERFORMANCE PLATFORM FEEDS SNAPSHOT CONTAINER */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-[#111115] border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-900/60 mb-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Performance Snapshot</h3>
                  <button className="text-[10px] uppercase font-bold text-neutral-500 hover:text-white transition">View Full Analytics</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { platform: 'Instagram', followers: '2,845', growth: '↑ 12.5%', fill: '#E1306C', stroke: '#EF4444', series: [10, 30, 20, 50, 40, 75] },
                    { platform: 'TikTok', followers: '5,687', growth: '↑ 28.4%', fill: '#00F2FE', stroke: '#06B6D4', series: [20, 15, 45, 35, 60, 80] },
                    { platform: 'Facebook', followers: '1,342', growth: '↑ 8.1%', fill: '#1877F2', stroke: '#3B82F6', series: [40, 35, 50, 45, 60, 55] },
                    { platform: 'LinkedIn', followers: '896', growth: '↑ 6.3%', fill: '#0A66C2', stroke: '#2563EB', series: [15, 25, 20, 40, 35, 50] }
                  ].map((feed, key) => (
                    <div key={key} className="bg-[#16161D] p-3.5 rounded-xl border border-neutral-800/30 flex flex-col justify-between relative group hover:border-neutral-800 transition">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-black text-white tracking-wide">{feed.platform}</span>
                          <span className="text-[9px] font-black text-emerald-400">{feed.growth}</span>
                        </div>
                        <span className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider block">Followers</span>
                        <span className="text-xl font-black text-white tracking-tight block mt-1">{feed.followers}</span>
                      </div>
                      
                      {/* Nested Micro Sparklines */}
                      <div className="w-full h-6 mt-3 overflow-hidden opacity-60 group-hover:opacity-100 transition">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path
                            d={`M ${feed.series.map((val, i) => `${(i / (feed.series.length - 1)) * 100} ${100 - val}`).join(' L ')}`}
                            fill="none"
                            stroke={feed.stroke}
                            strokeWidth="5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COMMUNICATIONS FEED & DIRECT ACCOUNT MANAGER ROW */}
            <div className="col-span-12 md:col-span-6 xl:col-span-3 bg-[#111115] border border-neutral-900 rounded-2xl p-5 flex flex-col justify-between space-y-6">
              
              {/* Recent Internal Communications Thread */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-900/60 mb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">Recent Messages</h3>
                  <button className="text-[10px] uppercase font-bold text-neutral-500 hover:text-white transition">View All</button>
                </div>
                <div className="space-y-3">
                  {[
                    { sender: 'ShortWorks Team', text: 'Your next batch is ready for review.', time: '5m ago', active: true },
                    { sender: 'Project Manager', text: 'Can you approve these by tomorrow please?', time: '2h ago', active: true },
                    { sender: 'ShortWorks Team', text: 'Monthly report is now available.', time: '1d ago', active: false }
                  ].map((msg, index) => (
                    <div key={index} className="text-left text-xs relative pl-3 border-l border-neutral-800/80 hover:border-neutral-600 transition cursor-pointer">
                      {msg.active && <span className="absolute top-1 left-[-3.5px] w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                      <div className="flex items-center justify-between font-bold text-white tracking-wide">
                        <span>{msg.sender}</span>
                        <span className="text-[9px] text-neutral-500 font-medium">{msg.time}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{msg.text}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-neutral-950/40 border border-neutral-900 hover:bg-black transition text-neutral-400 hover:text-white py-2 px-3 rounded-xl text-[11px] font-bold mt-4 text-center">Go to Messages</button>
              </div>

              {/* Dedicated Account Support Framework */}
              <div className="pt-4 border-t border-neutral-900">
                <span className="text-[9px] uppercase font-bold text-neutral-500 tracking-wider block mb-3">Your Account Manager</span>
                <div className="flex items-center justify-between p-2.5 bg-neutral-950/40 border border-neutral-900 rounded-xl mb-3">
                  <div className="flex items-center gap-3">
                    <img className="w-9 h-9 rounded-xl object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Alex Thompson Account Manager" />
                    <div>
                      <h4 className="text-xs font-black text-white tracking-wide">Alex Thompson</h4>
                      <p className="text-[10px] text-neutral-500 font-medium">Account Manager</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {/* Mail Vector Button */}
                    <a href="mailto:alex@shortworks.media" className="p-1.5 bg-[#16161D] hover:bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </a>
                    {/* Phone Vector Button */}
                    <a href="tel:01161234567" className="p-1.5 bg-[#16161D] hover:bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </a>
                  </div>
                </div>
                <button className="w-full bg-white text-black hover:bg-neutral-200 transition py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-center">Book a Call</button>
              </div>

            </div>

          </div>

          {/* LOWER RUNNING FOOTER CAPTION QUOTE */}
          <footer className="w-full text-center pt-8 border-t border-neutral-950 flex flex-col items-center justify-center gap-1">
            <div className="text-xl font-black text-neutral-800 tracking-tighter">S/W</div>
            <p className="text-[11px] font-bold text-neutral-600 italic tracking-wide">"We don't just create content. We build your business."</p>
          </footer>

        </div>
      </main>
    </div>
  );
}