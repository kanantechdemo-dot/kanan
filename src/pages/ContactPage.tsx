import React, { useState } from 'react';
import { HOTEL_DETAILS } from '../data/hotelData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('General Sanctuary Inquiries');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Editorial Header */}
      <section className="relative -mt-20 pt-36 pb-20 w-full bg-[#0d3320] text-[#ffffff] overflow-hidden">
        <div className="relative w-full px-5 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff]/10 backdrop-blur-md rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-widest">
              Private Concierge &amp; Logistics
            </span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl text-[#ffffff] tracking-tight max-w-3xl mb-4 font-normal">
            Contact &amp; Concierge
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-normal opacity-90 mb-4">
            “Direct assistance for pre-arrival itineraries, portico valet, and private charters.”
          </p>
        </div>
      </section>

      {/* Contact Matrix */}
      <section className="w-full py-16 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block mb-1">
                Sanctuary Address
              </span>
              <h2 className="font-serif text-3xl text-[#001d0e]">
                Seaside Enclave
              </h2>
              <p className="font-sans text-xs text-[#414843] mt-2 leading-relaxed">
                {HOTEL_DETAILS.address}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#ffffff] p-5 border border-[#e5e2dc] shadow-sm flex items-start gap-4">
                <span className="material-symbols-outlined text-[#775a19] text-2xl mt-0.5">
                  call
                </span>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-[#001d0e] uppercase tracking-wider">
                    Concierge Desk (24/7)
                  </h4>
                  <a
                    href={`tel:${HOTEL_DETAILS.phone}`}
                    className="font-serif text-lg text-[#001d0e] hover:text-[#775a19] transition-colors block mt-0.5"
                  >
                    {HOTEL_DETAILS.phone}
                  </a>
                  <span className="font-sans text-[11px] text-[#727972]">
                    Direct line for resident chamber requests
                  </span>
                </div>
              </div>

              <div className="bg-[#ffffff] p-5 border border-[#e5e2dc] shadow-sm flex items-start gap-4">
                <span className="material-symbols-outlined text-[#775a19] text-2xl mt-0.5">
                  mail
                </span>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-[#001d0e] uppercase tracking-wider">
                    Written Inquiries
                  </h4>
                  <a
                    href={`mailto:${HOTEL_DETAILS.email}`}
                    className="font-sans text-xs font-semibold text-[#001d0e] hover:text-[#775a19] transition-colors block mt-1"
                  >
                    {HOTEL_DETAILS.email}
                  </a>
                  <span className="font-sans text-[11px] text-[#727972]">
                    Dedicated Butler Desk: concierge@founthanthotel.com
                  </span>
                </div>
              </div>

              <div className="bg-[#ffffff] p-5 border border-[#e5e2dc] shadow-sm flex items-start gap-4">
                <span className="material-symbols-outlined text-[#775a19] text-2xl mt-0.5">
                  flight_land
                </span>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-[#001d0e] uppercase tracking-wider">
                    Arrival Coordinates
                  </h4>
                  <p className="font-sans text-xs text-[#001d0e] mt-1 font-medium">
                    Valet: {HOTEL_DETAILS.valetArrival}
                  </p>
                  <p className="font-sans text-xs text-[#775a19] font-mono">
                    Helipad: {HOTEL_DETAILS.helipad}
                  </p>
                </div>
              </div>
            </div>

            {/* Architectural Map Card */}
            <div className="bg-[#f0eee8] p-6 border border-[#e5e2dc] space-y-3">
              <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider block">
                Arrival Logistics
              </span>
              <h4 className="font-serif text-lg text-[#001d0e]">
                Portico Gate Security
              </h4>
              <p className="font-sans text-xs text-[#414843] leading-relaxed">
                Private vehicle registration is confirmed via automated gate scanner upon entering Royal Palm Boulevard. Valet captains escort your luggage directly to your suite while you are greeted in the reception salon.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#ffffff] p-8 lg:p-10 border border-[#e5e2dc] shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#c3ecd0]/40 text-[#416650] flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-3xl">send</span>
                </div>
                <span className="font-label-caps text-xs text-[#775a19] uppercase tracking-widest block font-semibold">
                  Transmission Received
                </span>
                <h3 className="font-serif text-3xl text-[#001d0e]">
                  Message Logged with Concierge
                </h3>
                <p className="font-sans text-xs text-[#414843] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#001d0e]">{name}</strong>. Your dispatch has been transmitted directly to our Chief Concierge. A personalized response will be delivered to <strong className="text-[#001d0e]">{email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#775a19] transition-colors cursor-pointer"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#e5e2dc] pb-4 mb-6">
                  <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block">
                    Direct Inquiry
                  </span>
                  <h3 className="font-serif text-2xl text-[#001d0e]">
                    Transmit a Message to the Concierge Desk
                  </h3>
                  <p className="font-sans text-xs text-[#727972] mt-1">
                    Guaranteed response within two hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Julian Vane"
                      className="w-full bg-[#f6f3ed] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="resident@estate.com"
                      className="w-full bg-[#f6f3ed] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7911 000000"
                      className="w-full bg-[#f6f3ed] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                      Inquiry Category
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-[#f6f3ed] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc] cursor-pointer"
                    >
                      <option value="General Sanctuary Inquiries">General Sanctuary Inquiries</option>
                      <option value="Private Helipad / Portico Logistics">Private Helipad / Portico Logistics</option>
                      <option value="Private Pavilion / Wing Buyout">Private Pavilion / Wing Buyout</option>
                      <option value="Dining & Private Cellar Bookings">Dining & Private Cellar Bookings</option>
                      <option value="Thermal Spa & Wellness Treatments">Thermal Spa & Wellness Treatments</option>
                      <option value="Media & Architectural Filming">Media & Architectural Filming</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                    Message / Special Requirements *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Kindly describe dates, chamber preferences, or private logistics requirements."
                    className="w-full bg-[#f6f3ed] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <span className="font-sans text-[11px] text-[#727972]">
                    Encrypted Concierge Channel
                  </span>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#001d0e] transition-colors cursor-pointer shadow-sm"
                  >
                    Dispatch Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
