import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createSanctuaryInquiry } from '../services/inquiryService';
import { Database, ShieldCheck } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  roomName?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'Bespoke Sanctuary Arrangement',
  roomName,
}) => {
  const { user, profile, isConfigured } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState(initialTopic);
  const [message, setMessage] = useState(
    roomName
      ? `Regarding ${roomName}: We would like to coordinate custom arrival timings and interconnecting chambers.`
      : ''
  );
  const [submitted, setSubmitted] = useState(false);
  const [issuedCode, setIssuedCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTopic(initialTopic);
      if (roomName) {
        setMessage(`Regarding ${roomName}: We would like to coordinate custom arrival timings and interconnecting chambers.`);
      }
      if (profile?.first_name) {
        setName(`${profile.first_name} ${profile.last_name || ''}`.trim());
      }
      if (user?.email) {
        setEmail(user.email);
      }
      if (profile?.phone) {
        setPhone(profile.phone);
      }
    }
  }, [isOpen, initialTopic, roomName, profile, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await createSanctuaryInquiry({
      topic,
      chamberInterest: roomName,
      guestName: name || 'Sanctuary Guest',
      email: email || 'resident@estate.com',
      phone,
      specialRequests: message,
      userId: user?.id,
    });

    setIssuedCode(result.refCode);
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#001d0e]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fcf9f3] max-w-xl w-full p-8 lg:p-10 border border-[#e5e2dc] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#414843] hover:text-[#001d0e] cursor-pointer"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto bg-[#c3ecd0]/40 text-[#416650] flex items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-3xl">done_all</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-label-caps text-xs text-[#775a19] uppercase tracking-widest font-semibold">
                Concierge Dispatch Confirmed
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <Database className="w-2.5 h-2.5" />
                {isConfigured ? 'Supabase Synced' : 'Sanctuary Ledger'}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#001d0e]">
              Your Inquiry Has Been Received
            </h3>
            <p className="font-sans text-xs text-[#414843] leading-relaxed max-w-md mx-auto">
              Head Concierge Lord Julian has received your dispatch{' '}
              <strong className="text-[#001d0e] font-mono">#{issuedCode}</strong>. We will contact
              you directly at <strong className="text-[#001d0e]">{email}</strong> within two
              hours.
            </p>
            <div className="bg-[#f6f3ed] p-4 text-xs font-sans text-left space-y-1 border border-[#e5e2dc]">
              <div className="flex justify-between">
                <span className="text-[#727972]">Dossier Ref:</span>
                <span className="font-mono font-semibold text-[#001d0e]">#{issuedCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#727972]">Subject:</span>
                <span className="font-medium text-[#001d0e]">{topic}</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#1b1714] transition-colors cursor-pointer"
            >
              Return to Sanctuary
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-[#e5e2dc] pb-3 mb-4">
              <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block">
                Direct Guild Dispatch
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#001d0e]">
                Head Concierge Inquiry
              </h3>
              <p className="font-sans text-xs text-[#727972] mt-1">
                For private floor buyouts, helicopter transfers, and custom arrangements.
              </p>
            </div>

            <div>
              <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                Inquiry Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#f6f3ed] p-2.5 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
              >
                <option value="Bespoke Sanctuary Arrangement">Bespoke Sanctuary Arrangement</option>
                <option value="Private Floor Buyout">Private Floor Buyout (Full Enclave)</option>
                <option value="Helicopter Transfer Coordination">Helicopter Transfer (Grid B-4)</option>
                <option value="Bespoke Dining & Sommelier Tasting">Bespoke Dining &amp; Sommelier Tasting</option>
                <option value="Architectural & Heritage Fellowship">Architectural &amp; Heritage Fellowship</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Resident Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Julian Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2.5 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Sanctuary Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="julian@estate.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2.5 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                Private Mobile / Telegram (Optional)
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 019-2834"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#f6f3ed] p-2.5 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                Bespoke Specifications &amp; Chamber Preferences
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail preferred suites, guest party size, discrete dietary protocols, or transfer arrival schedules..."
                className="w-full bg-[#f6f3ed] p-2.5 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#775a19] transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : null}
              <span>{submitting ? 'DISPATCHING...' : 'DISPATCH TO HEAD CONCIERGE'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
