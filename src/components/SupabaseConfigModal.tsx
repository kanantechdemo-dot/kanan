import React, { useState, useEffect } from 'react';
import {
  getStoredSupabaseConfig,
  saveStoredSupabaseConfig,
  resetStoredSupabaseConfig,
  testSupabaseConnection,
  isSupabaseConfigured,
  getSupabase,
} from '../lib/supabase';
import { SUPABASE_SQL_SCHEMA } from '../lib/schemaSql';
import { seedRoomsToSupabase } from '../services/roomService';
import {
  Database as DatabaseIcon,
  X,
  Check,
  Copy,
  Zap,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Server,
  Layers,
  Sparkles,
} from 'lucide-react';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success?: boolean;
    latencyMs?: number;
    message?: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'config' | 'sql' | 'inspector'>('config');
  const [copied, setCopied] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  // Inspector stats
  const [tableCounts, setTableCounts] = useState<{
    rooms?: number;
    reservations?: number;
    profiles?: number;
    dining?: number;
  }>({});
  const [loadingCounts, setLoadingCounts] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = getStoredSupabaseConfig();
      setUrl(config.url);
      setAnonKey(config.anonKey);
      setTestResult(null);
      setSeedResult(null);

      if (isSupabaseConfigured()) {
        runCountCheck();
      }
    }
  }, [isOpen]);

  const runCountCheck = async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setLoadingCounts(true);
    try {
      const [roomsRes, resRes, profRes, dinRes] = await Promise.all([
        supabase.from('rooms').select('count', { count: 'exact', head: true }),
        supabase.from('reservations').select('count', { count: 'exact', head: true }),
        supabase.from('profiles').select('count', { count: 'exact', head: true }),
        supabase.from('dining_reservations').select('count', { count: 'exact', head: true }),
      ]);
      setTableCounts({
        rooms: roomsRes.count ?? undefined,
        reservations: resRes.count ?? undefined,
        profiles: profRes.count ?? undefined,
        dining: dinRes.count ?? undefined,
      });
    } catch (e) {
      console.warn('Count check error', e);
    } finally {
      setLoadingCounts(false);
    }
  };

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    const result = await testSupabaseConnection(url, anonKey);
    setTestResult(result);
    setTesting(false);
    if (result.success) {
      runCountCheck();
    }
  };

  const handleSaveConfig = () => {
    saveStoredSupabaseConfig(url, anonKey);
    handleTestConnection();
  };

  const handleResetToEnv = () => {
    resetStoredSupabaseConfig();
    const config = getStoredSupabaseConfig();
    setUrl(config.url);
    setAnonKey(config.anonKey);
    setTestResult({
      success: true,
      message: 'Reset credentials to default environment variables.',
    });
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSeedRooms = async () => {
    setSeeding(true);
    setSeedResult(null);
    const res = await seedRoomsToSupabase();
    setSeedResult(res.message);
    setSeeding(false);
    if (res.success) {
      runCountCheck();
    }
  };

  const isConfigValid = isSupabaseConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#fcf9f3] text-[#1c1c18] border border-[#d6cfbe] shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="bg-[#002613] text-[#fcf9f3] px-6 py-4 flex items-center justify-between border-b border-[#fed488]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#fed488]/10 border border-[#fed488]/30 flex items-center justify-center text-[#fed488]">
              <DatabaseIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg tracking-wide text-[#fed488]">
                  Supabase Cloud Backend
                </h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                    isConfigValid
                      ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-900/60 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {isConfigValid ? 'ACTIVE' : 'SETUP REQUIRED'}
                </span>
              </div>
              <p className="text-[11px] text-[#fed488]/70">
                PostgreSQL • Auth • Row Level Security (RLS) • Realtime CRUD
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#e2dcd0] bg-[#f7f3ea] px-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'config'
                ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            Connection & Credentials
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sql')}
            className={`py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'sql'
                ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            SQL Schema & DDL
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('inspector');
              runCountCheck();
            }}
            className={`py-3 px-4 text-xs uppercase tracking-[0.16em] font-semibold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'inspector'
                ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Live Database Inspector
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'config' && (
            <div className="space-y-6">
              {/* Status Box */}
              <div className="p-4 bg-[#f4eee2] border border-[#e2dcd0] rounded-sm flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#002613]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#002613]">
                      Connection Status
                    </span>
                  </div>
                  <p className="text-xs text-[#5e594d] mt-1">
                    {isConfigValid
                      ? 'Client configured with Supabase credentials. All reservations, dining bookings, inquiries, and user profiles sync to your PostgreSQL instance with local resilience fallback.'
                      : 'You can test the app right now with built-in instant local storage & demo login, or connect your real Supabase project below in 30 seconds.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="px-3.5 py-1.5 bg-[#002613] hover:bg-[#00381d] text-[#fcf9f3] text-xs font-medium uppercase tracking-wider rounded-sm flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap shadow-sm"
                >
                  {testing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 text-[#fed488]" />
                  )}
                  <span>Test Connection</span>
                </button>
              </div>

              {testResult && (
                <div
                  className={`p-3.5 text-xs rounded-sm border flex items-start gap-2.5 ${
                    testResult.success
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  {testResult.success ? (
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {testResult.success ? 'Connection Valid' : 'Connection Failed'}
                      {testResult.latencyMs && (
                        <span className="font-mono ml-2 text-[11px] font-normal text-emerald-700">
                          ({testResult.latencyMs} ms latency)
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5">{testResult.message}</p>
                  </div>
                </div>
              )}

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1c1c18] mb-1.5">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://xyzabcdefg.supabase.co"
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-[#d6cfbe] rounded-sm focus:outline-none focus:border-[#002613]"
                  />
                  <p className="text-[11px] text-[#7a7466] mt-1">
                    Found in your Supabase Dashboard under <strong>Project Settings &gt; API &gt; Project URL</strong>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1c1c18] mb-1.5">
                    Supabase Anon Public Key (anon key)
                  </label>
                  <textarea
                    rows={2}
                    value={anonKey}
                    onChange={(e) => setAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white border border-[#d6cfbe] rounded-sm focus:outline-none focus:border-[#002613]"
                  />
                  <p className="text-[11px] text-[#7a7466] mt-1">
                    The public anonymous client key. Safe for browser/client-side applications.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSaveConfig}
                    className="px-5 py-2.5 bg-[#002613] hover:bg-[#00381d] text-[#fcf9f3] text-xs uppercase tracking-widest font-medium rounded-sm shadow-md transition-colors"
                  >
                    Save &amp; Connect Project
                  </button>
                  <button
                    type="button"
                    onClick={handleResetToEnv}
                    className="px-4 py-2.5 bg-transparent hover:bg-[#efe9dc] text-[#5e594d] border border-[#d6cfbe] text-xs uppercase tracking-wider font-medium rounded-sm transition-colors"
                  >
                    Reset to Default Env
                  </button>
                </div>
              </div>

              {/* Quick Instructions */}
              <div className="pt-4 border-t border-[#e2dcd0]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8c4f00] mb-2">
                  Quick 3-Step Supabase Setup
                </h4>
                <ol className="text-xs text-[#5e594d] space-y-1.5 list-decimal list-inside">
                  <li>
                    Create a free project at{' '}
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#002613] underline font-medium inline-flex items-center gap-1"
                    >
                      supabase.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    Go to <strong>SQL Editor</strong>, open a new query, and paste the script from the{' '}
                    <strong>SQL Schema &amp; DDL</strong> tab.
                  </li>
                  <li>
                    Copy your <strong>Project URL</strong> and <strong>Anon Key</strong> into the fields above and click{' '}
                    <strong>Save &amp; Connect</strong>!
                  </li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#002613]">
                    Automated Supabase Migration Script
                  </h4>
                  <p className="text-xs text-[#5e594d]">
                    Creates all 6 tables, foreign keys, triggers for user profiles, and Row Level Security (RLS) policies.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="px-4 py-2 bg-[#002613] hover:bg-[#00381d] text-[#fcf9f3] text-xs uppercase tracking-wider font-medium rounded-sm shadow-sm flex items-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#fed488]" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full SQL Script</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative border border-[#d6cfbe] rounded-sm bg-[#1c1c18] text-[#fcf9f3]">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#262622] border-b border-[#3b3b34] text-[11px] font-mono text-[#a39f94]">
                  <span>supabase_sanctuary_schema.sql</span>
                  <span>PostgreSQL 15+ compatible</span>
                </div>
                <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[380px] leading-relaxed text-[#e5e1d5] selection:bg-[#fed488] selection:text-[#1c1c18]">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'inspector' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#002613]">
                    Live Cloud Database Tables
                  </h4>
                  <p className="text-xs text-[#5e594d]">
                    Current row counts in your remote Supabase PostgreSQL database.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={runCountCheck}
                  disabled={loadingCounts || !isConfigValid}
                  className="px-3.5 py-1.5 bg-[#efe9dc] hover:bg-[#e2dcd0] text-[#1c1c18] border border-[#d6cfbe] text-xs font-medium rounded-sm flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingCounts ? 'animate-spin' : ''}`} />
                  <span>Refresh Counts</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#d6cfbe] rounded-sm text-center">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[#7a7466]">
                    Rooms &amp; Suites
                  </p>
                  <p className="text-2xl font-serif text-[#002613] mt-1 font-semibold">
                    {tableCounts.rooms !== undefined ? tableCounts.rooms : '—'}
                  </p>
                  <p className="text-[10px] text-[#7a7466] mt-0.5">table: rooms</p>
                </div>

                <div className="p-4 bg-white border border-[#d6cfbe] rounded-sm text-center">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[#7a7466]">
                    Reservations
                  </p>
                  <p className="text-2xl font-serif text-[#002613] mt-1 font-semibold">
                    {tableCounts.reservations !== undefined ? tableCounts.reservations : '—'}
                  </p>
                  <p className="text-[10px] text-[#7a7466] mt-0.5">table: reservations</p>
                </div>

                <div className="p-4 bg-white border border-[#d6cfbe] rounded-sm text-center">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[#7a7466]">
                    Profiles (Users)
                  </p>
                  <p className="text-2xl font-serif text-[#002613] mt-1 font-semibold">
                    {tableCounts.profiles !== undefined ? tableCounts.profiles : '—'}
                  </p>
                  <p className="text-[10px] text-[#7a7466] mt-0.5">table: profiles</p>
                </div>

                <div className="p-4 bg-white border border-[#d6cfbe] rounded-sm text-center">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[#7a7466]">
                    Dining Tables
                  </p>
                  <p className="text-2xl font-serif text-[#002613] mt-1 font-semibold">
                    {tableCounts.dining !== undefined ? tableCounts.dining : '—'}
                  </p>
                  <p className="text-[10px] text-[#7a7466] mt-0.5">table: dining_reservations</p>
                </div>
              </div>

              {/* Seed Button */}
              <div className="p-5 bg-[#f4eee2] border border-[#e2dcd0] rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs uppercase tracking-wider font-bold text-[#002613]">
                      Auto-Seed Hotel Rooms to Supabase
                    </h5>
                    <p className="text-xs text-[#5e594d] mt-0.5">
                      Pushes all 5 curated hotel chambers &amp; suites directly into your Supabase `rooms` table.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSeedRooms}
                    disabled={seeding || !isConfigValid}
                    className="px-4 py-2 bg-[#8c4f00] hover:bg-[#6e3e00] text-white text-xs uppercase tracking-wider font-medium rounded-sm flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {seeding ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#fed488]" />
                    )}
                    <span>Seed Chambers Now</span>
                  </button>
                </div>
                {seedResult && (
                  <p className="text-xs text-[#002613] font-medium bg-white/70 p-2 border border-[#d6cfbe] rounded-sm">
                    {seedResult}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
