import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';

export const CTASection = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isVerified } = useAuthStore();

  const handleActionClick = (route) => {
    // If not authenticated, redirect to register
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }

    // If authenticated but not verified, redirect to OTP
    if (!isVerified) {
      navigate('/verify-otp');
      return;
    }

    // If verified, navigate to the requested route
    navigate(route);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-neutral-950">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Ready to Scale Your Business?
        </h2>
        
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Get a free social media audit and discover how much revenue you're leaving on the table.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => handleActionClick('/quiz')}
            className="inline-block"
          >
            <Button size="lg" variant="primary">
              Get Your Free Audit
            </Button>
          </button>
          
          <a 
            href="https://wa.me/1234567890?text=I%20want%20to%20learn%20about%20ShortWork"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="secondary">
              Chat on WhatsApp
            </Button>
          </a>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          No credit card required. Takes 2 minutes.
        </p>
      </div>
    </section>
  );
};
