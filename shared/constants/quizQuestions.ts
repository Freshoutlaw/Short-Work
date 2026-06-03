// quizQuestions.ts

export const QUIZ_QUESTIONS = [
  {
    id: 'platform',
    text: 'Which platforms do you currently use?',
    category: 'presence',
    options: [
      { label: 'TikTok only', value: 'tiktok_only' },
      { label: 'Instagram only', value: 'instagram_only' },
      { label: 'Both TikTok & Instagram', value: 'both' },
      { label: 'None yet', value: 'none' },
    ],
  },
  {
    id: 'frequency',
    text: 'How often do you post?',
    category: 'engagement',
    options: [
      { label: 'Daily', value: 'daily' },
      { label: 'Few times a week', value: 'few_times' },
      { label: 'Once a week', value: 'weekly' },
      { label: 'Rarely', value: 'rarely' },
    ],
  },
  {
    id: 'engagement',
    text: 'What is your current engagement rate?',
    category: 'performance',
    options: [
      { label: 'Less than 1%', value: 'less_than_1' },
      { label: '1-3%', value: '1_to_3' },
      { label: '3-5%', value: '3_to_5' },
      { label: 'More than 5%', value: 'more_than_5' },
      { label: "I don't know", value: 'unknown' },
    ],
  },
  {
    id: 'industry',
    text: 'What industry are you in?',
    category: 'business',
    options: [
      { label: 'Trades (Plumbing, Electrical, etc)', value: 'trades' },
      { label: 'Restaurant / Food Service', value: 'restaurant' },
      { label: 'Salon / Beauty', value: 'salon' },
      { label: 'Professional Service (Lawyer, Accountant)', value: 'professional' },
      { label: 'E-commerce', value: 'ecommerce' },
      { label: 'Fitness / Wellness', value: 'fitness' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'size',
    text: 'How many employees does your business have?',
    category: 'business',
    options: [
      { label: '1-5 employees', value: '1_to_5' },
      { label: '6-20 employees', value: '6_to_20' },
      { label: '21-50 employees', value: '21_to_50' },
      { label: '50+ employees', value: '50_plus' },
    ],
  },
];

export const QUIZ_CATEGORIES = ['presence', 'engagement', 'performance', 'business'];

export const getQuestionById = (id: string) => {
  return QUIZ_QUESTIONS.find((q) => q.id === id);
};

export const getQuestionsByCategory = (category: string) => {
  return QUIZ_QUESTIONS.filter((q) => q.category === category);
};
