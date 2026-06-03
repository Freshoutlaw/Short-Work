// PricingCards.jsx
import { PRICING_PLANS } from '../../../shared/constants/pricingPlans';
import Button from '../ui/Button';

export const PricingCards = () => {
  return (
    <section className="py-20 px-4 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Simple, Transparent Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-white bg-neutral-900 shadow-2xl scale-105'
                  : 'border border-neutral-800 bg-black hover:border-neutral-600'
              }`}
            >
              {plan.popular && (
                <div className="mb-4 inline-block bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">£{plan.price}</span>
                <span className="text-gray-400 ml-2">/{plan.billingPeriod}</span>
              </div>

              <Button className="w-full mb-8" variant={plan.popular ? 'primary' : 'secondary'}>
                Get Started
              </Button>

              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 mt-12">
          All plans include a free consultation. No credit card required.
        </p>
      </div>
    </section>
  );
};
