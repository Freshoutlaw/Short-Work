// Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Monitor Auth Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Monitor Scroll Event for Blur Transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '/services' }, 
    { label: 'Pricing', href: '#pricing' },
    { label: 'Industries', href: '#industries' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (e, href) => {
    // If it's an internal route path (like /services or /blog)
    if (href.startsWith('/')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      navigate(href);
      return;
    }

    // Handle Hash Scrolling anchors (#pricing, #contact, etc.)
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      
      const targetId = href.replace('#', '');
      
      // If we are not on the landing page, go home first, then scroll
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollToId: targetId } });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  // Supplement for scrolling if navigating back to root from an alternative path
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollToId) {
      const targetId = location.state.scrollToId;
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#0A0A0C]/85 backdrop-blur-md border-neutral-900 shadow-xl py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LOGO BRAND MARK */}
        <Link to="/" className="flex items-center flex-shrink-0 z-50">
          <img 
            src="/assets/logo.png" 
            alt="ShortWork" 
            className="h-8 md:h-9 object-contain hover:opacity-80 transition active:scale-95 duration-150"
          />
        </Link>

        {/* DESKTOP NAV LINKS LINK SELECTION */}
        <div className="hidden md:flex items-center gap-7 bg-neutral-900/40 border border-neutral-800/40 px-6 py-2 rounded-full backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors relative pb-0.5 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-white transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* DESKTOP CONTROL AREA */}
        <div className="hidden md:flex items-center gap-5">
          {/* Conditional Theme Toggle: Desktop */}
          {session && (
            <div className="p-1.5 rounded-xl hover:bg-neutral-900 transition-colors">
              <ThemeToggle />
            </div>
          )}

          {session ? (
            <div className="flex items-center gap-4">
              <Link
                to="/quiz"
                className="text-xs uppercase tracking-widest font-black text-neutral-400 hover:text-white transition-colors"
              >
                Quiz
              </Link>
              
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/');
                }}
                className="bg-white text-black px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.97] transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-black px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.97] transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE DRAWER HAMBURGER TRIGGER BUTTON */}
        <div className="flex md:hidden items-center gap-4 z-50">
          {/* Conditional Theme Toggle: Mobile Toolbar */}
          {session && <ThemeToggle />}
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none p-1"
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-[2px] bg-white rounded transition-transform duration-300 transform origin-left ${mobileMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''}`} />
              <span className={`w-full h-[2px] bg-white rounded transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-full h-[2px] bg-white rounded transition-transform duration-300 transform origin-left ${mobileMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION FULL OVERLAY COVERAGE */}
      <div 
        className={`fixed inset-0 bg-black/98 z-40 md:hidden flex flex-col transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-[-10px]'
        }`}
      >
        <div className="flex-1 flex flex-col justify-center px-8 space-y-6 pt-24">
          <span className="text-[10px] font-black tracking-widest text-neutral-600 uppercase border-b border-neutral-900 pb-2 mb-2">Navigation Framework</span>
          
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ transitionDelay: `${idx * 40}ms` }}
              className={`text-2xl font-black tracking-tight text-neutral-300 hover:text-white transition-all transform ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
            >
              {link.label}
            </a>
          ))}
          
          {session && (
            <Link
              to="/quiz"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-black tracking-tight text-neutral-300 hover:text-white transition-all transform ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${navLinks.length * 40}ms` }}
            >
              Quiz
            </Link>
          )}

          <div 
            className={`pt-12 mt-6 border-t border-neutral-900 transition-all duration-500 delay-200 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {session ? (
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="w-full bg-white text-black p-4 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-neutral-200 transition text-center shadow-lg"
              >
                Logout Account
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full bg-white text-black p-4 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-neutral-200 transition text-center shadow-lg"
              >
                Login Portal
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}