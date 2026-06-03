// OnboardingForm.jsx
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export const OnboardingForm = ({ clientId }) => {
  const [form, setForm] = useState({ goals: '', audience: '', brandColors: '', postingSchedule: '' });

  const submit = async () => {
    await supabase.from('client_onboarding').upsert({ client_id: clientId, ...form });
    alert('Saved!');
  };

  return (
    <div className="space-y-4">
      <input placeholder="Goals" className="w-full bg-black/50 p-2 rounded" onChange={e => setForm({...form, goals: e.target.value})} />
      <input placeholder="Target audience" className="w-full bg-black/50 p-2 rounded" onChange={e => setForm({...form, audience: e.target.value})} />
      <input placeholder="Brand colours" className="w-full bg-black/50 p-2 rounded" onChange={e => setForm({...form, brandColors: e.target.value})} />
      <input placeholder="Preferred posting schedule" className="w-full bg-black/50 p-2 rounded" onChange={e => setForm({...form, postingSchedule: e.target.value})} />
      <button onClick={submit} className="bg-white text-black px-4 py-2 rounded">Save</button>
    </div>
  );
};