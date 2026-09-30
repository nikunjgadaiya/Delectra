import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

// Fallback to a valid dummy URL if the user hasn't put in their keys yet, 
// to prevent createClient from throwing a synchronous Invalid URL error and crashing the whole app.
const isPlaceholder = envUrl === 'paste_your_url_here' || !envUrl;

const supabaseUrl = isPlaceholder ? 'https://placeholder.supabase.co' : envUrl;
const supabaseAnonKey = isPlaceholder ? 'placeholder-key' : envKey;

if (isPlaceholder) {
  console.warn('⚠️ Missing or placeholder Supabase environment variables. App will not connect to a real database.');
}

export const isSupabaseConfigured = !isPlaceholder;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
