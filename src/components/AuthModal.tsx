import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FountantLogo } from './FountantLogo';
import { X, Lock, Mail, User as UserIcon, Phone, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const { signIn, signUp, signInDemo, isConfigured } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Welcome back to the Sanctuary.');
          setTimeout(() => {
            onClose();
          }, 800);
        }
      } else {
        if (!firstName || !lastName) {
          setErrorMsg('Please provide your full title and name.');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, {
          firstName,
          lastName,
          phone,
        });
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Account registered in Supabase. Check your inbox to confirm your email.');
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDemo = async () => {
    setLoading(true);
    await signInDemo();
    setSuccessMsg('Signed in as Resident Julian Sterling (Enclave Sovereign Member).');
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#fcf9f3] text-[#1c1c18] border border-[#d6cfbe] shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Ribbon */}
        <div className="bg-[#002613] text-[#fcf9f3] px-6 py-5 flex items-center justify-between border-b border-[#fed488]/30">
          <div className="flex items-center gap-3">
            <FountantLogo variant="compact" theme="gold" />
            <div className="h-4 w-px bg-white/20" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#fed488]">
              Resident Portal Auth
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Supabase Notice Banner */}
        <div className="bg-[#f2ede2] px-6 py-2 border-b border-[#e2dcd0] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#5e594d]">
            <ShieldCheck className="w-4 h-4 text-[#002613]" />
            <span>
              Backend: {isConfigured ? 'Connected to Supabase Auth & RLS' : 'Demo Auth / Supabase Ready'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleInstantDemo}
            className="text-[#002613] hover:text-[#8c4f00] font-semibold underline flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#8c4f00]" />
            Instant Demo Sign In
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#e2dcd0] bg-[#f7f3ea]">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs uppercase tracking-[0.18em] font-semibold text-center transition-colors border-b-2 ${
              mode === 'signin'
                ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
            }`}
          >
            Resident Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs uppercase tracking-[0.18em] font-semibold text-center transition-colors border-b-2 ${
              mode === 'signup'
                ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
            }`}
          >
            Enclave Membership Registration
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Authentication Notice</p>
                <p className="mt-0.5">{errorMsg}</p>
                {!isConfigured && (
                  <p className="mt-1 text-[11px] text-red-700">
                    Tip: You can use the <strong>Instant Demo Sign In</strong> button above, or configure your Supabase URL & Key via the Supabase tool in the navigation.
                  </p>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5e594d] mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-[#9a9486]" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Julian"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#d6cfbe] rounded-sm focus:outline-none focus:border-[#002613]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5e594d] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sterling"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#d6cfbe] rounded-sm focus:outline-none focus:border-[#002613]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5e594d] mb-1">
                Sanctuary Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#9a9486]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="resident@estate.com"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#d6cfbe] rounded-sm focus:outline-none focus:border-[#002613]"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5e594d] mb-1">
                  Private Mobile / Concierge Line (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-[#9a9486]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#d6cfbe] rounded-sm focus:outline-none focus:border-[#002613]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-[#5e594d] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[#9a9486]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#d6cfbe] rounded-sm focus:outline-none focus:border-[#002613]"
                />
              </div>
              <p className="text-[10px] text-[#7a7466] mt-1">Minimum 6 characters with letters and numbers.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-[#002613] hover:bg-[#00381d] text-[#fcf9f3] text-xs uppercase tracking-[0.2em] font-medium rounded-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : mode === 'signin' ? (
                <>
                  <span>Sign In to Sanctuary Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Create Enclave Sovereign Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Membership Benefits Reminder */}
          <div className="mt-6 pt-5 border-t border-[#e2dcd0] space-y-2">
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#8c4f00]">
              Sovereign Privileges
            </h4>
            <ul className="text-xs text-[#5e594d] space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#002613]" />
                Automated chamber preferences & subfloor climate synchronization
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#002613]" />
                Direct priority access to The Orangery table bookings
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#002613]" />
                Immediate digital room ledger & encrypted contactless check-in
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
