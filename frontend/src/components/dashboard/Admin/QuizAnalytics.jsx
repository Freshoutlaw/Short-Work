// QuizAnalytics.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export const QuizAnalytics = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    supabase.from('audit_reports').select('*, leads(name, email)').then(({ data }) => setReports(data || []));
  }, []);
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Audit Reports</h3>
      <table className="w-full text-sm">
        <thead><tr><th>Lead</th><th>Performance %</th><th>AI Report Snippet</th></tr></thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.leads?.name || 'Anonymous'}</td>
              <td>{r.performance_percent}%</td>
              <td className="max-w-xs truncate">{r.ai_report?.slice(0, 80)}…</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};