// pricingPlans.ts

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 299,
    billingPeriod: 'month',
    description: 'Perfect for small businesses just starting with social media',
    features: [
      'Content strategy consultation',
      '4 videos per month',
      'Basic analytics reporting',
      'WhatsApp support',
      'Social media posting',
    ],
    color: 'blue',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 599,
    billingPeriod: 'month',
    description: 'For growing businesses looking to scale their social presence',
    features: [
      'Everything in Starter',
      '8 videos per month',
      'Advanced analytics with ROI tracking',
      'Weekly strategy calls',
      'Competitor analysis',
      'Lead capture optimization',
      'Email support + WhatsApp',
    ],
    color: 'purple',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    billingPeriod: 'month',
    description: 'For established brands needing comprehensive content management',
    features: [
      'Everything in Growth',
      '16 videos per month',
      'Custom content calendar',
      'Dedicated account manager',
      'Weekly strategy & optimization calls',
      'Full content creation (script to posting)',
      'CRM integration',
      'Priority support 24/7',
    ],
    color: 'gold',
  },
];

export const getPricingPlan = (id: string) => {
  return PRICING_PLANS.find((plan) => plan.id === id);
};

export const getPopularPlan = () => {
  return PRICING_PLANS.find((plan) => plan.popular);
};
