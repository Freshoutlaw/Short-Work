// industryKeywords.ts

export const INDUSTRIES = [
  {
    id: 'trades',
    name: 'Trades',
    slug: 'trades',
    keywords: ['plumbing', 'electrical', 'carpentry', 'roofing', 'hvac', 'painting'],
    description: 'Handyman and skilled trade services',
    icon: 'wrench',
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Food',
    slug: 'restaurant',
    keywords: ['restaurant', 'cafe', 'bar', 'bakery', 'food delivery', 'catering'],
    description: 'Food service and hospitality',
    icon: 'utensils',
  },
  {
    id: 'salon',
    name: 'Salon & Beauty',
    slug: 'salon',
    keywords: ['salon', 'barber', 'spa', 'beauty', 'cosmetics', 'nails', 'hair'],
    description: 'Beauty and personal care services',
    icon: 'sparkles',
  },
  {
    id: 'professional',
    name: 'Professional Services',
    slug: 'professional',
    keywords: ['law', 'accounting', 'consulting', 'finance', 'attorney', 'cpa'],
    description: 'B2B professional services',
    icon: 'briefcase',
  },
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    slug: 'fitness',
    keywords: ['gym', 'fitness', 'yoga', 'wellness', 'personal training', 'health'],
    description: 'Health and wellness services',
    icon: 'dumbbell',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    slug: 'ecommerce',
    keywords: ['shopify', 'online store', 'retail', 'products', 'dropshipping'],
    description: 'Online retail and digital products',
    icon: 'shopping-cart',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    keywords: ['real estate', 'property', 'broker', 'agent', 'realty'],
    description: 'Property sales and rentals',
    icon: 'home',
  },
];

export const getIndustryBySlug = (slug: string) => {
  return INDUSTRIES.find((ind) => ind.slug === slug);
};

export const getIndustryById = (id: string) => {
  return INDUSTRIES.find((ind) => ind.id === id);
};

export const getIndustriesByKeyword = (keyword: string) => {
  return INDUSTRIES.filter((ind) =>
    ind.keywords.some((k) => k.toLowerCase().includes(keyword.toLowerCase()))
  );
};
