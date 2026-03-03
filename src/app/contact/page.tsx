'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Calendar from '@/components/Calendar';

export default function Contact() {
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    guestCount: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          eventDate,
          type: 'BOOK_NOW',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-32 min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center space-y-6 sm:space-y-8 p-8 sm:p-12 border border-primary/20 bg-white/5 w-full max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-heading tracking-widest text-primary">THANK YOU</h2>
          <p className="text-white/60 font-serif italic text-sm sm:text-base">Your inquiry has been received. Our team will contact you shortly to discuss your event.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary hover:text-white transition-colors"
          >
            BACK TO FORM
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-black text-white pb-20 sm:pb-32">

      <PageHeader 
        title="BOOK NOW" 
        subtitle="LET'S CREATE SOMETHING EXTRAORDINARY"
      />

      <main className="container mx-auto px-6 max-w-7xl mt-16 sm:mt-28">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-24 items-start">

          {/* Left Section */}
          <div className="space-y-6 sm:space-y-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading uppercase tracking-widest leading-tight">
              REACH OUT <br className="hidden sm:block" /> TODAY
            </h2>

            <div className="w-16 sm:w-20 h-[1px] bg-primary/60"></div>

            <div className="space-y-4 sm:space-y-6 text-white/70 font-light text-base sm:text-lg max-w-md font-serif">
              <p>Need catering? We&apos;d love to hear from you.</p>

              <div className="space-y-4 sm:space-y-6 pt-2">
                <a 
                  href="tel:2818066167" 
                  className="block text-primary hover:text-white transition-all text-2xl sm:text-3xl font-heading tracking-[0.15em] sm:tracking-[0.2em]"
                >
                  281.806.6167
                </a>

                <a 
                  href="mailto:reservation@musaaferhouston.com" 
                  className="block text-white/50 hover:text-primary transition-all underline underline-offset-8 font-serif text-sm sm:text-base break-words"
                >
                  reservation@musaaferhouston.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-12 md:p-16 border border-primary/20 rounded-sm">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                  First Name *
                </label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 pl-1 sm:pl-2 text-sm sm:text-base"
                  required 
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                  Last Name *
                </label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 pl-1 sm:pl-2 text-sm sm:text-base"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                Email *
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 pl-1 sm:pl-2 text-sm sm:text-base"
                required 
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                Phone *
              </label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 pl-1 sm:pl-2 text-sm sm:text-base"
                required 
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                Type of Event *
              </label>
              <div className="relative">
                <select 
                  value={formData.eventType}
                  onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all appearance-none text-sm sm:text-base"
                >
                  <option className="bg-black">Wedding</option>
                  <option className="bg-black">Corporate</option>
                  <option className="bg-black">Private Party</option>
                  <option className="bg-black">Other</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">▼</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              <div className="space-y-2 sm:space-y-3">
                <Calendar 
                  selectedDate={eventDate}
                  onDateChange={setEventDate}
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary">
                  Approx. Guest Count *
                </label>
                <input 
                  type="number" 
                  value={formData.guestCount}
                  onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 text-sm sm:text-base"
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-black py-4 sm:py-5 font-medium tracking-[0.3em] sm:tracking-[0.4em] hover:bg-white hover:tracking-[0.4em] sm:hover:tracking-[0.5em] transition-all duration-500 uppercase text-xs sm:text-sm mt-6 sm:mt-10 disabled:opacity-50"
            >
              {loading ? 'SUBMITTING...' : 'SUBMIT'}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}