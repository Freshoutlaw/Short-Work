// IndustryTiles.jsx
import { INDUSTRIES } from '../../../shared/constants/industryKeywords';
import { Link } from 'react-router-dom';

export const IndustryTiles = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          We Help Every Industry
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Whether you're in trades, food service, beauty, or professional services—we've got the social media strategy that works
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry) => (
            <Link 
              key={industry.id} 
              to={`/industry/${industry.slug}`}
              className="group p-6 rounded-lg border border-neutral-800 bg-neutral-950 hover:border-white hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="text-4xl mb-4">
                {industry.id === 'trades' && '🔧'}
                {industry.id === 'restaurant' && '🍽️'}
                {industry.id === 'salon' && '✨'}
                {industry.id === 'professional' && '💼'}
                {industry.id === 'fitness' && '💪'}
                {industry.id === 'ecommerce' && '🛍️'}
                {industry.id === 'real-estate' && '🏠'}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white transition">
                {industry.name}
              </h3>
              <p className="text-gray-400 text-sm">{industry.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
