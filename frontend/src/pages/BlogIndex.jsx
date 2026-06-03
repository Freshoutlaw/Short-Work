import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// 15 Deeply Articulated Production & Strategy Insights
const ENG_STRATEGY_LEDGER = [
  {
    id: 'st-01',
    title: 'The Algorithmic Distribution Blueprint: Engineering Velocity Patterns on Modern Video Engines',
    excerpt: 'An exhaustive technical evaluation explaining how metadata anchor patterns, frame-one velocity variations, and recursive retention metrics trigger wide-scale distribution vectors.',
    slug: 'algorithmic-distribution-blueprint-velocity-patterns',
    created_at: '2026-05-28T09:00:00.000Z'
  },
  {
    id: 'st-02',
    title: 'The Architectural Mechanics of Frame-One Retention: Eliminating Friction in Short-Form Sequences',
    excerpt: 'Analyzing real viewer drop-off points down to the millisecond. How to structure visual focal configurations and narrative entry hooks to hold viewers past the drop-off line.',
    slug: 'mechanics-frame-one-retention-short-form',
    created_at: '2026-05-24T14:15:00.000Z'
  },
  {
    id: 'st-03',
    title: 'Kinetic Typography & Sound Design: Driving Cognitive Tracking via High-End Audio-Visual Systems',
    excerpt: 'A masterclass on using velocity graphs, sound layered profiles, and clean layout patterns to maximize clarity and viewer attention on saturated mobile timelines.',
    slug: 'kinetic-typography-sound-design-cognitive-tracking',
    created_at: '2026-05-20T11:40:00.000Z'
  },
  {
    id: 'st-04',
    title: 'Optimizing Consumer Device Camera Matrices for High-End Cinematic Post-Production Workflows',
    excerpt: 'Ditch the heavy gear. A blueprint on native spatial setups, precise lighting values, and exact exposure metrics that turn mobile phone raw files into high-end brand assets.',
    slug: 'optimizing-consumer-device-camera-matrices',
    created_at: '2026-05-15T08:20:00.000Z'
  },
  {
    id: 'st-05',
    title: 'The Cross-Platform Native Asset Adaptation Protocol: Tailoring Content to Platform Tendencies',
    excerpt: 'Why generic cross-posting kills your reach. How to carefully re-engineer rhythm layouts, dynamic text elements, and file bitrates across platform-specific formats.',
    slug: 'cross-platform-native-asset-adaptation-protocol',
    created_at: '2026-05-11T16:45:00.000Z'
  },
  {
    id: 'st-06',
    title: 'The Organic Inbound Pipeline: Transforming Volatile Viewer Reach into High-Ticket Client Pipeline Traction',
    excerpt: 'Views without conversions are just vanity metrics. Here is how to create smooth transition paths that pull casual viewers down into your permanent client booking ecosystem.',
    slug: 'organic-inbound-pipeline-high-ticket-conversion',
    created_at: '2026-05-06T10:30:00.000Z'
  },
  {
    id: 'st-07',
    title: 'Modernizing Founder Brand Communication Frameworks: Asserting Unshakeable Industry Authority',
    excerpt: 'A script structure and pacing guide detailing exactly how executives should speak, frame concepts, and project authority to command respect from high-value prospects.',
    slug: 'founder-brand-communication-frameworks-authority',
    created_at: '2026-05-02T13:10:00.000Z'
  },
  {
    id: 'st-08',
    title: 'Asynchronous Cloud Video Operations: Scaling Remote Post-Production Without Dropping Asset Control',
    excerpt: 'A modern technical guide to setting up remote storage networks, fast proxy files, and smooth feedback tools to edit vast amounts of content simultaneously.',
    slug: 'asynchronous-cloud-video-operations-scaling',
    created_at: '2026-04-28T07:55:00.000Z'
  },
  {
    id: 'st-09',
    title: 'The Psychology of Dynamic Pacing: Keeping Viewers Hooked Through Intentional Editorial Rhythms',
    excerpt: 'An edit breakdown showcasing how varied sequence lengths, pattern resets, and focused soundscapes prevent viewer boredom and extend active watch times.',
    slug: 'psychology-dynamic-pacing-editorial-rhythms',
    created_at: '2026-04-24T12:00:00.000Z'
  },
  {
    id: 'st-10',
    title: 'The Narrative Anchor System: Structuring Educational Short-Form Media for Maximum Information Retention',
    excerpt: 'How to unpack complex ideas without losing your audience. This method balances fast-paced visual interest with real, high-value technical learning.',
    slug: 'narrative-anchor-system-short-form-retention',
    created_at: '2026-04-19T09:45:00.000Z'
  },
  {
    id: 'st-11',
    title: 'Engineering the Micro-Conversion: Building Bulletproof Direct Response Systems in Video Biographies',
    excerpt: 'Turn your profile traffic into real leads. A deep dive into tweaking landing page interfaces, profile layouts, and user choices to skyrocket discovery-to-lead transformations.',
    slug: 'engineering-micro-conversion-direct-response',
    created_at: '2026-04-15T15:20:00.000Z'
  },
  {
    id: 'st-12',
    title: 'Algorithmic Content Categorization: Aligning Content Pillars to Niche Audience Segments',
    excerpt: 'Stop confusing platform indexing engines. Learn how to map out consistent style frameworks and vocabulary scripts so your content always lands with the exact target demographic.',
    slug: 'algorithmic-content-categorization-indexing',
    created_at: '2026-04-10T11:15:00.000Z'
  },
  {
    id: 'st-13',
    title: 'The High-Output Batch Engine: Organizing Content Sessions to Capture Six Weeks of Assets in One Take',
    excerpt: 'A structured blueprint covering studio planning, teleprompter workflows, and performance routines that let founders film premium content without burning out.',
    slug: 'high-output-batch-engine-asset-capture',
    created_at: '2026-04-05T14:30:00.000Z'
  },
  {
    id: 'st-14',
    title: 'Advanced Color Grading Pipelines: Crafting a Cohesive, Luxury Identity for Corporate Media Projects',
    excerpt: 'Step-by-step guidance on color workspaces, custom utility curves, and skin-tone balance to give your short-form videos a distinctly premium, cinematic finish.',
    slug: 'advanced-color-grading-pipelines-luxury-identity',
    created_at: '2026-04-01T08:00:00.000Z'
  },
  {
    id: 'st-15',
    title: 'The Inbound Validation Matrix: A Systematic Approach to Measuring Content Impact on Deal Closing Velocity',
    excerpt: 'Forget about simple likes and comments. This framework details how to track multi-touch video views and correlate organic touchpoints with shortened sales cycles.',
    slug: 'inbound-validation-matrix-deal-closing-velocity',
    created_at: '2026-03-27T16:50:00.000Z'
  }
];

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showAuthGate, setShowAuthGate] = useState(false);

  // Theme tracking: 'light' | 'dark' | 'system'
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('blog-theme-mode') || 'system';
    return 'system';
  });
  const [activeTheme, setActiveTheme] = useState('dark');

  // Verify Session Profiles & Initialize Asset Repository Logs
  useEffect(() => {
    const initializePage = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);

        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data && data.length > 0 ? data : ENG_STRATEGY_LEDGER);
      } catch (err) {
        console.error('Initializing sequence handled gracefully via structural fallback:', err);
        setPosts(ENG_STRATEGY_LEDGER);
      } finally {
        setLoading(false);
      }
    };

    initializePage();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync Global Theme States Natively
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const targetTheme = themeMode === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : themeMode;
      setActiveTheme(targetTheme);
      if (targetTheme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
    };

    applyTheme();
    localStorage.setItem('blog-theme-mode', themeMode);

    const listener = () => { if (themeMode === 'system') applyTheme(); };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [themeMode]);

  // Intercept viewing attempts if user profile is missing
  const handleReadAttempt = (e, slug) => {
    if (!user) {
      e.preventDefault();
      setShowAuthGate(true);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Minimalist Header Navigation */}
        <nav className="flex items-center justify-between mb-16 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <a href="/" className="inline-flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors group">
            <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return</span>
          </a>

          {/* Absolute Brand Logo Location */}
          <img src="/assets/logo.png" alt="Brand Logo" className="h-6 w-auto object-contain dark:dark transition-all duration-300" />
        </nav>

        {/* Master Identity Statement Row */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Core Operations</h1>
            <p className="mt-2 text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium">
              Strategy &middot; Creation &middot; Growth
            </p>
          </div>

          {/* Responsive Segmented Theme Selection Mechanism */}
          <div className="flex items-center gap-1 bg-neutral-200/60 dark:bg-neutral-900 p-1 rounded-xl border border-neutral-300/40 dark:border-neutral-800/80 text-[11px] font-bold tracking-wider uppercase">
            {['light', 'system', 'dark'].map((mode) => (
              <button
                key={mode}
                onClick={() => setThemeMode(mode)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  themeMode === mode
                    ? 'bg-white text-black dark:bg-neutral-800 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </header>

        {/* Main Interface Content Delivery State Mapping */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 tracking-widest uppercase font-semibold text-xs animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-ping" />
              Syncing Core Pipelines...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="group relative flex flex-col justify-between rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.01] bg-white border-neutral-200/70 hover:border-neutral-400 shadow-sm hover:shadow-xl hover:shadow-neutral-200/40 dark:bg-neutral-900/40 dark:border-neutral-800/60 dark:hover:border-neutral-700 dark:hover:shadow-black/50"
              >
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-4 text-neutral-400 dark:text-neutral-500">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-lg font-black tracking-tight mb-3 line-clamp-3 group-hover:text-neutral-700 dark:group-hover:text-white transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-xs leading-relaxed mb-6 text-neutral-500 dark:text-neutral-400 line-clamp-4">
                    {post.excerpt}
                  </p>
                </div>

                <a 
                  href={`/blog/${post.slug}`}
                  onClick={(e) => handleReadAttempt(e, post.slug)}
                  className="inline-flex items-center justify-between pt-4 border-t w-full text-xs font-bold tracking-wider uppercase text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-800/60 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 transition-colors duration-300"
                >
                  <span className="flex items-center gap-1.5">
                    Analyze Blueprint
                    {!user && (
                      <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </span>
                  <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Glassmorphism Authentication Shield Modal */}
      {showAuthGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm p-8 rounded-2xl border text-center relative bg-white border-neutral-200 shadow-2xl dark:bg-neutral-900 dark:border-neutral-800">
            
            <button onClick={() => setShowAuthGate(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Operational Protocol</h3>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400 mb-6">
              Our advanced performance audits, behavioral analytics, and system configurations are locked behind an active operator profile.
            </p>

            <div className="flex flex-col gap-2.5">
              <a href="/login" className="w-full py-3 text-xs font-bold tracking-wider uppercase rounded-xl transition-all active:scale-95 bg-neutral-950 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-md">
                Verify Identity
              </a>
              <a href="/register" className="w-full py-3 text-xs font-bold tracking-wider uppercase rounded-xl transition-all border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                Establish Operator Credentials
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}