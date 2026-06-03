// DashboardRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function DashboardRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.from('users').select('role').single().then(({ data }) => {
      if (data?.role === 'owner') navigate('/admin');
      else navigate('/client');
    });
  }, []);
  return null;
}