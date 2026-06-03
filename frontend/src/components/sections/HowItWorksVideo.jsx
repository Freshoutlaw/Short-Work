// HowItWorksVideo.jsx
export const HowItWorksVideo = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: 1, title: 'Take Our Quiz', desc: 'Answer 5 quick questions about your business' },
            { step: 2, title: 'Get AI Audit', desc: 'Receive a personalized audit powered by AI' },
            { step: 3, title: 'Book a Call', desc: 'Discuss strategy with our social experts' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4 text-2xl">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 aspect-video rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <p className="text-gray-400">Video Demo Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  );
};
