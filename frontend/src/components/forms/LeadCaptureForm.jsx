// LeadCaptureForm.jsx
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { validateEmail } from '../../lib/validators';

export const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    try {
      const { error: dbError } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          business_type: formData.company,
          source: 'form',
          status: 'new',
        });

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-neutral-800 text-white placeholder-gray-400 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition"
        />
        
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-neutral-800 text-white placeholder-gray-400 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-neutral-800 text-white placeholder-gray-400 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition"
        />

        <input
          type="text"
          name="company"
          placeholder="Company/Business Type"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-neutral-800 text-white placeholder-gray-400 rounded-lg border border-neutral-700 focus:border-white focus:outline-none transition"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">✓ Thanks! We'll be in touch soon.</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 transition"
        >
          {loading ? 'Sending...' : 'Get Free Audit'}
        </button>
      </form>
    </div>
  );
};
