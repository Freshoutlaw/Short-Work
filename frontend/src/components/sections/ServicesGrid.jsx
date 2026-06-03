// ServicesGrid.jsx
export const ServicesGrid = () => {
  const services = [
    {
      icon: '🎬',
      title: 'Content Creation',
      desc: 'High-quality videos designed to convert viewers into customers',
    },
    {
      icon: '📊',
      title: 'Strategy & Analytics',
      desc: 'Data-driven strategies tailored to your industry and goals',
    },
    {
      icon: '📅',
      title: 'Content Calendar',
      desc: 'Consistent posting schedule optimized for engagement',
    },
    {
      icon: '💬',
      title: 'Community Management',
      desc: 'Real conversations that build loyal customer relationships',
    },
    {
      icon: '🎯',
      title: 'Lead Generation',
      desc: 'Convert social followers into qualified business opportunities',
    },
    {
      icon: '📈',
      title: 'Growth Optimization',
      desc: 'Proven tactics to grow followers and boost your ROI',
    },
  ];

  return (
    <section className="py-20 px-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl border border-neutral-800 hover:border-white bg-black hover:bg-neutral-900 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
