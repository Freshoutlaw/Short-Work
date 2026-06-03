// ContentCalendar.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export const ContentCalendar = ({ clientId }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    supabase.from('content_calendar').select('*').eq('client_id', clientId).then(({ data }) => setEvents(data || []));
  }, []);
  return (
    <div className="space-y-2">
      {events.map(e => <div key={e.id} className="border p-2 rounded">{e.scheduled_date}: {e.caption}</div>)}
    </div>
  );
};