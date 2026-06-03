// ROICalculator.jsx
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export const ROICalculator = () => {
  const [revenue, setRevenue] = useState(50000);
  const [followers, setFollowers] = useState(1000);
  const [loss, setLoss] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const calculateLoss = () => {
    // Example formula: loss = 12% of revenue + £0.03 per follower short of 10k
    const followerGap = Math.max(0, 10000 - followers);
    const estimatedLoss = (revenue * 0.12) + (followerGap * 0.03);
    setLoss(estimatedLoss.toFixed(0));
  };

  const handleSubmit = async () => {
    if (!loss) calculateLoss();
    await supabase.from('roi_calculations').insert({
      monthly_revenue: revenue,
      followers,
      estimated_loss: parseFloat(loss),
      opportunity_gain: parseFloat(loss) * 3.2, // example multiplier
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-white/5 border border-white/20 rounded-2xl p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4">How much are you losing?</h3>
      <div className="mb-4">
        <label className="block text-sm text-white/60 mb-1">Monthly Revenue (£)</label>
        <input type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2" />
      </div>
      <div className="mb-6">
        <label className="block text-sm text-white/60 mb-1">Current Followers</label>
        <input type="number" value={followers} onChange={(e) => setFollowers(Number(e.target.value))} className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2" />
      </div>
      <button onClick={calculateLoss} className="bg-white text-black px-6 py-2 rounded-full font-bold w-full">Calculate My Loss</button>
      {loss && !submitted && (
        <div className="mt-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-center">
          <div className="text-sm text-red-300">Estimated monthly loss</div>
          <div className="text-3xl font-black">£{parseInt(loss).toLocaleString()}</div>
          <button onClick={handleSubmit} className="mt-4 bg-white text-black px-4 py-2 rounded-full text-sm">Get Free Growth Plan →</button>
        </div>
      )}
      {submitted && <div className="mt-6 text-green-400 text-center">We'll contact you with a custom plan.</div>}
    </div>
  );
};