// AnalyticsReport.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export const AnalyticsReport = ({ clientId }) => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    supabase.from('analytics_reports').select('*').eq('client_id', clientId).then(({ data }) => setReports(data || []));
  }, []);
  return (
    <div>
      {reports.map(r => <a key={r.id} href={r.pdf_url} className="block p-2 border rounded mb-2">Report for {r.month}</a>)}
    </div>
  );
};