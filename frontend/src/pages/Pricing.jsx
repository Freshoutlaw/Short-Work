export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$499',
      features: ['Basic content strategy', 'Social media planning', 'Monthly review'],
    },
    {
      name: 'Growth',
      price: '$999',
      features: ['Everything in Starter', 'Content calendar management', 'Video production', 'Analytics dashboard'],
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Everything in Growth', 'Dedicated account manager', 'Custom integrations', '24/7 support'],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-black mb-4 text-center">Simple, Transparent Pricing</h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Choose the plan that works for your business.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 ${
                plan.featured
                  ? 'bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-400 transform scale-105'
                  : 'bg-gray-900 border border-gray-800'
              }`}
            >
              <h2 className="text-2xl font-black mb-2">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-green-400 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full p-3 rounded-lg font-bold transition ${
                  plan.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
