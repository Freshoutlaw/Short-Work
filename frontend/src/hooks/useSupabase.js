// useSupabase.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useSupabase = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    supabase.from('users').select('role').single().then(({ data }) => setRole(data?.role));
  }, []);
  return { user, role };
};