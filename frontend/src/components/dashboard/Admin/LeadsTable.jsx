// LeadsTable.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    supabase.from('leads').select('*').order('created_at', { ascending: false }).then(({ data }) => setLeads(data || []));
  }, []);
  return (
    <table className="w-full text-sm">
      <thead><tr><th>Name</th><th>Email</th><th>Source</th><th>Status</th></tr></thead>
      <tbody>
        {leads.map(lead => (
          <tr key={lead.id}><td>{lead.name}</td><td>{lead.email}</td><td>{lead.source}</td><td>{lead.status}</td></tr>
        ))}
      </tbody>
    </table>
  );
};