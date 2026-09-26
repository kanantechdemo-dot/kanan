import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const STORAGE_KEY = 'fountant_supabase_config';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// 1. Resolve configuration from localStorage override or Vite environment variables
export function getStoredSupabaseConfig(): SupabaseConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed reading stored supabase config', e);
  }

  // Fallback to Vite env variables
  const envUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

  return {
    url: envUrl.trim(),
    anonKey: envKey.trim(),
  };
}

export function saveStoredSupabaseConfig(url: string, anonKey: string): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
    );
    // Re-initialize client
    initClient();
  } catch (e) {
    console.error('Failed saving supabase config', e);
  }
}

export function resetStoredSupabaseConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    initClient();
  } catch (e) {
    console.error('Failed resetting supabase config', e);
  }
}

// 2. Validate if credentials look like a legitimate Supabase project
export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getStoredSupabaseConfig();
  if (!url || !anonKey) return false;
  if (url === 'https://your-project-id.supabase.co' || anonKey === 'your-anon-key') {
    return false;
  }
  return url.startsWith('http') && anonKey.length > 20;
}

let supabaseInstance: SupabaseClient<any> | null = null;

function initClient(): SupabaseClient<any> | null {
  const { url, anonKey } = getStoredSupabaseConfig();

  if (!url || !anonKey || url === 'https://your-project-id.supabase.co') {
    supabaseInstance = null;
    return null;
  }

  try {
    supabaseInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return supabaseInstance;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    supabaseInstance = null;
    return null;
  }
}

// Initialize on module load
initClient();

export function getSupabase(): SupabaseClient<any> | null {
  if (!supabaseInstance) {
    initClient();
  }
  return supabaseInstance;
}

// Helper to test active connection
export async function testSupabaseConnection(
  testUrl?: string,
  testKey?: string
): Promise<{ success: boolean; latencyMs?: number; message: string }> {
  const url = testUrl || getStoredSupabaseConfig().url;
  const key = testKey || getStoredSupabaseConfig().anonKey;

  if (!url || !key) {
    return {
      success: false,
      message: 'Supabase URL and Anon Key are required.',
    };
  }

  if (url === 'https://your-project-id.supabase.co' || key === 'your-anon-key') {
    return {
      success: false,
      message: 'Please replace placeholder credentials with your real Supabase project URL and anon key.',
    };
  }

  const start = performance.now();
  try {
    const tempClient = createClient(url, key);
    // Ping by checking table or auth health
    const { error } = await tempClient.from('rooms').select('count', { count: 'exact', head: true });
    const latency = Math.round(performance.now() - start);

    if (error) {
      // If table 'rooms' doesn't exist yet, it still contacted Supabase!
      if (error.code === 'PGRST204' || error.message?.includes('relation "public.rooms" does not exist')) {
        return {
          success: true,
          latencyMs: latency,
          message: 'Connected to Supabase! The database schema has not been created yet. Run the SQL schema script in Supabase SQL Editor.',
        };
      }
      return {
        success: false,
        latencyMs: latency,
        message: `Connection error: ${error.message}`,
      };
    }

    return {
      success: true,
      latencyMs: latency,
      message: 'Successfully connected to Supabase database!',
    };
  } catch (e: any) {
    return {
      success: false,
      message: e.message || 'Network request failed when contacting Supabase endpoint.',
    };
  }
}
