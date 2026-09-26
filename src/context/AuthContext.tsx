import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { Database } from '../lib/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

interface GuestPreferences {
  preferredPillow?: string;
  preferredAromatherapy?: string;
  preferredNewspaper?: string;
  preferredTemperature?: number;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    metadata: { firstName: string; lastName: string; phone?: string }
  ) => Promise<{ error: Error | null }>;
  signInDemo: () => Promise<void>;
  signOut: () => Promise<void>;
  updatePreferences: (prefs: GuestPreferences) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo profile for testing without live Supabase
const DEMO_USER_ID = 'demo-resident-89240';
const DEFAULT_DEMO_PROFILE: Profile = {
  id: DEMO_USER_ID,
  first_name: 'Julian',
  last_name: 'Sterling',
  email: 'j.sterling@sterling-holdings.co.uk',
  phone: '+44 20 7946 0912',
  membership_tier: 'Enclave Sovereign Member',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  preferred_pillow: 'Natural Goose Down (Medium-Firm)',
  preferred_aromatherapy: 'Organic Tuscan Bergamot & Cedrat',
  preferred_newspaper: 'Financial Times & Architectural Digest',
  preferred_temperature: 20.5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isConfigured, setIsConfigured] = useState<boolean>(isSupabaseConfigured());

  // Listen to Supabase auth state changes and restore stored session
  useEffect(() => {
    const supabase = getSupabase();
    setIsConfigured(isSupabaseConfigured());

    if (!supabase) {
      // Check if demo user was active
      const savedDemo = localStorage.getItem('fountant_demo_user');
      if (savedDemo === 'true') {
        const savedProfile = localStorage.getItem('fountant_demo_profile');
        setProfile(savedProfile ? JSON.parse(savedProfile) : DEFAULT_DEMO_PROFILE);
        setUser({
          id: DEMO_USER_ID,
          email: DEFAULT_DEMO_PROFILE.email || '',
          app_metadata: {},
          user_metadata: {
            first_name: DEFAULT_DEMO_PROFILE.first_name,
            last_name: DEFAULT_DEMO_PROFILE.last_name,
          },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as User);
      }
      setLoading(false);
      return;
    }

    // Supabase is available
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        // Fallback demo check if explicitly set
        const savedDemo = localStorage.getItem('fountant_demo_user');
        if (savedDemo === 'true') {
          setProfile(DEFAULT_DEMO_PROFILE);
        }
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        localStorage.removeItem('fountant_demo_user');
        await fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Error fetching profile from Supabase:', error);
      }

      if (data) {
        setProfile(data as Profile);
      } else if (user) {
        // Auto-create initial profile record if trigger didn't fire
        const newProf: Profile = {
          id: userId,
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          email: user.email || '',
          phone: user.user_metadata?.phone || '',
          membership_tier: 'Enclave Sovereign',
          avatar_url: null,
          preferred_pillow: 'Natural Goose Down (Medium-Firm)',
          preferred_aromatherapy: 'Organic Tuscan Bergamot & Cedrat',
          preferred_newspaper: 'Financial Times & Architectural Digest',
          preferred_temperature: 20.5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await supabase.from('profiles').insert(newProf);
        setProfile(newProf);
      }
    } catch (e) {
      console.error('Failed to load profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      return {
        error: new Error('Supabase is not configured. Please enter your Supabase project credentials.'),
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error ? new Error(error.message) : null };
  };

  const signUp = async (
    email: string,
    password: string,
    metadata: { firstName: string; lastName: string; phone?: string }
  ) => {
    const supabase = getSupabase();
    if (!supabase) {
      return {
        error: new Error('Supabase is not configured. Please enter your Supabase project credentials.'),
      };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          phone: metadata.phone || '',
        },
      },
    });

    return { error: error ? new Error(error.message) : null };
  };

  const signInDemo = async () => {
    localStorage.setItem('fountant_demo_user', 'true');
    localStorage.setItem('fountant_demo_profile', JSON.stringify(DEFAULT_DEMO_PROFILE));
    setProfile(DEFAULT_DEMO_PROFILE);
    setUser({
      id: DEMO_USER_ID,
      email: DEFAULT_DEMO_PROFILE.email || '',
      app_metadata: {},
      user_metadata: {
        first_name: DEFAULT_DEMO_PROFILE.first_name,
        last_name: DEFAULT_DEMO_PROFILE.last_name,
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as User);
    setLoading(false);
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('fountant_demo_user');
    localStorage.removeItem('fountant_demo_profile');
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updatePreferences = async (prefs: GuestPreferences) => {
    if (!user) {
      return { error: new Error('User is not signed in') };
    }

    const updatedProfile: Profile = {
      ...(profile || DEFAULT_DEMO_PROFILE),
      preferred_pillow: prefs.preferredPillow ?? profile?.preferred_pillow ?? 'Natural Goose Down (Medium-Firm)',
      preferred_aromatherapy: prefs.preferredAromatherapy ?? profile?.preferred_aromatherapy ?? 'Organic Tuscan Bergamot & Cedrat',
      preferred_newspaper: prefs.preferredNewspaper ?? profile?.preferred_newspaper ?? 'Financial Times & Architectural Digest',
      preferred_temperature: prefs.preferredTemperature ?? profile?.preferred_temperature ?? 20.5,
      updated_at: new Date().toISOString(),
    };

    setProfile(updatedProfile);

    // Save locally
    if (user.id === DEMO_USER_ID) {
      localStorage.setItem('fountant_demo_profile', JSON.stringify(updatedProfile));
      return { error: null };
    }

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            preferred_pillow: updatedProfile.preferred_pillow,
            preferred_aromatherapy: updatedProfile.preferred_aromatherapy,
            preferred_newspaper: updatedProfile.preferred_newspaper,
            preferred_temperature: updatedProfile.preferred_temperature,
            updated_at: updatedProfile.updated_at,
          })
          .eq('id', user.id);

        if (error) {
          console.warn('Could not update Supabase profile:', error);
          return { error: new Error(error.message) };
        }
      } catch (err: any) {
        return { error: new Error(err.message) };
      }
    }

    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isConfigured,
        signIn,
        signUp,
        signInDemo,
        signOut,
        updatePreferences,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
