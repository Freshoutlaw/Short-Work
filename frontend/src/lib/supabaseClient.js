// supabaseClient.js
// Supabase is intentionally disabled for the frontend render path.
// The app still needs safe no-op accessors so it can render without null crashes.

const emptyResult = { data: null, error: null };
const emptyListResult = { data: [], error: null };

const createSafeQuery = () => {
  const query = {
    select: () => query,
    eq: () => query,
    order: () => query,
    single: async () => emptyResult,
    insert: () => query,
    update: () => query,
    upsert: () => query,
    then: (onFulfilled, onRejected) => Promise.resolve(emptyListResult).then(onFulfilled, onRejected),
  };

  return query;
};

export const isSupabaseConfigured = false;

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
    signOut: async () => ({ error: null }),
    signInWithPassword: async () => ({ data: { session: null, user: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
  },
  from: () => createSafeQuery(),
  channel: () => ({
    on: () => ({
      subscribe: () => ({ unsubscribe: () => {} }),
    }),
    subscribe: () => ({ unsubscribe: () => {} }),
  }),
};