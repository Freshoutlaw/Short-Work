import React from 'react';

export default function LandingPage() {
  return (
    <div className="bg-black text-white font-sans min-h-screen selection:bg-neutral-800 selection:text-white">
      
      {/* SECTION 1: WHAT WE DO & HERO */}
      <section className="px-6 py-16 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Capabilities */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs tracking-widest text-neutral-400 uppercase font-semibold mb-2">What We Do</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                Content That Drives Real Results
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {/* Pillar 1 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 002-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">Short-Form Video Content</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Scroll-stopping videos designed to attract, engage & convert.</p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">Social Media Growth</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Grow your audience with a consistent content strategy that works.</p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">Brand Building & Positioning</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Position your brand as the go-to expert in your industry.</p>
              </div>

              {/* Pillar 4 */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">Lead Generation & Conversions</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Content that attracts ideal clients and fills your pipeline.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Brand Statement & Image Split */}
          <div className="lg:col-span-5 relative min-h-[400px] flex flex-col justify-center bg-gradient-to-r from-neutral-950 to-neutral-900 rounded-3xl p-8 border border-neutral-800 overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none mix-blend-luminosity bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
            
            {/* Geometric Accent Line */}
            <div className="absolute top-0 left-1/3 w-[2px] h-full bg-gradient-to-b from-transparent via-neutral-700 to-transparent transform -skew-x-12" />

            <div className="relative z-10 max-w-sm space-y-6">
              <h3 className="text-3xl font-black tracking-tight text-neutral-400 uppercase leading-none">
                Strategy.<br />
                Creation.<br />
                <span className="text-white">Growth.</span>
              </h3>
              <p className="text-xs tracking-wider text-neutral-400 uppercase font-medium leading-relaxed">
                We don't just create content, we build your business.
              </p>
              <button className="inline-flex items-center justify-between px-5 py-3 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-neutral-200 active:scale-95 w-full sm:w-auto gap-4 shadow-xl">
                Book Strategy Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: INDUSTRIES WE SPECIALISE IN */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-widest text-neutral-400 uppercase font-semibold mb-2">Industries We Specialise In</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1 */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-800 transition-all duration-300 group cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-wider">Trades</h4>
                </div>
                <ul className="text-xs text-neutral-400 space-y-2 pl-1">
                  <li>Builders</li>
                  <li>Electricians</li>
                  <li>Roofers</li>
                  <li>Landscapers</li>
                </ul>
              </div>
              <div className="flex justify-end pt-4">
                <svg className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-800 transition-all duration-300 group cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-wider">Consultants</h4>
                </div>
                <ul className="text-xs text-neutral-400 space-y-2 pl-1">
                  <li>Coaches</li>
                  <li>Trainers</li>
                  <li>Advisors</li>
                  <li>Mentors</li>
                </ul>
              </div>
              <div className="flex justify-end pt-4">
                <svg className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-800 transition-all duration-300 group cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-wider">Professional Services</h4>
                </div>
                <ul className="text-xs text-neutral-400 space-y-2 pl-1">
                  <li>Dentists</li>
                  <li>Accountants</li>
                  <li>Solicitors</li>
                  <li>Financial Advisers</li>
                </ul>
              </div>
              <div className="flex justify-end pt-4">
                <svg className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-800 transition-all duration-300 group cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-wider">Service Businesses</h4>
                </div>
                <ul className="text-xs text-neutral-400 space-y-2 pl-1">
                  <li>Local Businesses</li>
                  <li>Home Services</li>
                  <li>B2B Companies</li>
                  <li className="italic text-neutral-500">And More...</li>
                </ul>
              </div>
              <div className="flex justify-end pt-4">
                <svg className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: TESTIMONIALS */}
      <section className="px-6 py-16 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block - Google Score */}
          <div className="lg:col-span-3 space-y-4 py-2">
            <h3 className="text-2xl font-black tracking-tight uppercase leading-none">
              Real Results.<br />
              Real Businesses.<br />
              <span className="text-neutral-500">Real Growth.</span>
            </h3>
            
            <div className="space-y-1 pt-2">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
                {/* Google Simple Icon Shape */}
                <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.29 1.414 15.56 0 12.24 0 5.48 0 0 5.48 0 12s5.48 12 12.24 12c7.06 0 11.75-4.97 11.75-11.95 0-.806-.08-1.42-.18-1.765H12.24z"/>
                </svg>
                5.0 Rating on Google
              </div>
            </div>
          </div>

          {/* Right Block - Testimonials Scrolling/Grid Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Testimonial 1 */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 flex flex-col justify-between space-y-6">
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "ShortWorks completely transformed our online presence. We now get enquiries every single week."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="James Bennett" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-200">James Bennett</h5>
                    <p className="text-[10px] text-neutral-500">Bennett Building Services</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 flex flex-col justify-between space-y-6">
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "Our social media went from dead to 10x growth in 90 days. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Sarah Mitchell" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-200">Sarah Mitchell</h5>
                    <p className="text-[10px] text-neutral-500">Evolve Coaching</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 flex flex-col justify-between space-y-6">
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "The content ShortWorks creates positions us as the experts in our field."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Dr. Arjun Patel" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-200">Dr. Arjun Patel</h5>
                    <p className="text-[10px] text-neutral-500">Manchester Dental Care</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 flex flex-col justify-between space-y-6">
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "Professional, strategic and results-driven. A game changer for our business."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Tom Reynolds" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-200">Tom Reynolds</h5>
                    <p className="text-[10px] text-neutral-500">Apex Roofing</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Pagination/Carousel Indicator dots */}
            <div className="flex justify-center lg:justify-start gap-1.5 pt-2 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white block" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 block" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 block" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: OUR SIMPLE 4 STEP PROCESS */}
      <section className="px-6 py-16 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-widest text-neutral-400 uppercase font-semibold mb-2">Our Simple 4 Step Process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-neutral-900">
            
            {/* Step 1 */}
            <div className="p-6 space-y-4 hover:bg-neutral-900/40 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-black">
                  1
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-200">Discover</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">We learn about your business, audience, and goals.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 space-y-4 hover:bg-neutral-900/40 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-black">
                  2
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-200">Strategise</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">We craft a content strategy designed for growth.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 space-y-4 hover:bg-neutral-900/40 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-black">
                  3
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-200">Create</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">We produce high-quality, scroll-stopping content.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 space-y-4 hover:bg-neutral-900/40 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-black">
                  4
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-200">Grow</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">We post, optimise & scale what works.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}