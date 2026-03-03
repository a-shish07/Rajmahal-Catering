'use client';

import { useState, FormEvent } from 'react';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    email: '',
    phone: '',
    position: '',
    startDate: '',
    resume: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 109 }, (_, i) => 2026 - i);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('middleName', formData.middleName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('birthMonth', formData.birthMonth);
    formDataToSend.append('birthDay', formData.birthDay);
    formDataToSend.append('birthYear', formData.birthYear);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('position', formData.position);
    formDataToSend.append('startDate', formData.startDate);
    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          birthMonth: '',
          birthDay: '',
          birthYear: '',
          email: '',
          phone: '',
          position: '',
          startDate: '',
          resume: null
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-28 sm:pt-40 pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white/[0.04] backdrop-blur-sm border border-primary/20 shadow-2xl overflow-hidden rounded-sm">
          <div className="bg-primary/10 border-b border-primary/20 text-white py-8 sm:py-12 px-4 sm:px-6 text-center">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-heading uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              CAREER OPPORTUNITIES
            </h1>
            <p className="text-primary/70 tracking-widest text-[10px] sm:text-xs uppercase font-medium italic">Join the Rajmahal Family</p>
          </div>

          <div className="p-6 sm:p-12 md:p-16">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12" suppressHydrationWarning>
                <div>
                  <label className="block text-primary font-heading text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 sm:mb-6">
                    Full Name *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 text-white pl-1 sm:pl-2 text-sm sm:text-base"
                        suppressHydrationWarning
                      />
                      <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest mt-2">First Name</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Middle Name"
                        value={formData.middleName}
                        onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 text-white pl-1 sm:pl-2 text-sm sm:text-base"
                      />
                      <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest mt-2">Middle Name</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 text-white pl-1 sm:pl-2 text-sm sm:text-base"
                      />
                      <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest mt-2">Last Name</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-primary font-heading text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 sm:mb-6">
                    Birth Date *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                    <div className="relative">
                      <select
                        required
                        value={formData.birthMonth}
                        onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all text-white appearance-none pl-1 sm:pl-2 text-sm sm:text-base"
                      >
                        <option value="" className="bg-black">Month</option>
                        {months.map((month) => (
                          <option key={month} value={month} className="bg-black">{month}</option>
                        ))}
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 sm:hidden">▼</div>
                    </div>
                    <div className="relative">
                      <select
                        required
                        value={formData.birthDay}
                        onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all text-white appearance-none pl-1 sm:pl-2 text-sm sm:text-base"
                      >
                        <option value="" className="bg-black">Day</option>
                        {days.map((day) => (
                          <option key={day} value={day} className="bg-black">{day}</option>
                        ))}
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 sm:hidden">▼</div>
                    </div>
                    <div className="relative">
                      <select
                        required
                        value={formData.birthYear}
                        onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all text-white appearance-none pl-1 sm:pl-2 text-sm sm:text-base"
                      >
                        <option value="" className="bg-black">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year} className="bg-black">{year}</option>
                        ))}
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 sm:hidden">▼</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                  <div className="space-y-3 sm:space-y-4">
                    <label className="block text-primary font-heading text-xs sm:text-sm uppercase tracking-[0.2em]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="example@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 text-white pl-1 sm:pl-2 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <label className="block text-primary font-heading text-xs sm:text-sm uppercase tracking-[0.2em]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="(000) 000-0000"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all duration-300 text-white pl-1 sm:pl-2 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                  <div className="space-y-3 sm:space-y-4">
                    <label className="block text-primary font-heading text-xs sm:text-sm uppercase tracking-[0.2em]">
                      Job Applying For *
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all appearance-none text-white pl-1 sm:pl-2 text-sm sm:text-base"
                      >
                        <option value="" className="bg-black">Please Select</option>
                        <option value="server" className="bg-black">Server</option>
                        <option value="server assistant" className="bg-black">Server Assistant</option>
                        <option value="bar" className="bg-black">Bar</option>
                        <option value="host" className="bg-black">Host</option>
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">▼</div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <label className="block text-primary font-heading text-xs sm:text-sm uppercase tracking-[0.2em]">
                      Available Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 py-2 sm:py-3 focus:border-primary outline-none transition-all text-white pl-1 sm:pl-2 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-primary font-heading text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 sm:mb-6">
                    Resume Upload *
                  </label>
                  <div className="border border-dashed border-white/20 p-6 sm:p-10 text-center hover:border-primary transition-all group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                      className="w-full text-xs sm:text-sm cursor-pointer text-white/50 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] sm:file:text-xs file:uppercase file:tracking-widest file:bg-primary file:text-black file:font-bold hover:file:bg-white transition-all"
                    />
                    <p className="mt-4 text-[9px] sm:text-[10px] text-white/30 uppercase tracking-[0.2em]">Accepted formats: PDF, DOC, DOCX</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-black py-4 sm:py-6 px-6 sm:px-8 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:bg-white hover:tracking-[0.4em] sm:hover:tracking-[0.5em] transition-all duration-500 shadow-xl"
                >
                  Submit Application
                </button>
              </form>
            ) : (
              <div className="text-center py-10 sm:py-20">
                <div className="inline-block p-6 sm:p-12 border border-primary/20 bg-primary/5">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-primary mb-6 sm:mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-xl sm:text-2xl font-heading text-white uppercase tracking-widest mb-3 sm:mb-4">Application Received</h3>
                  <p className="text-sm sm:text-base text-white/60 font-serif italic">Thank you for your interest in Rajmahal. We will review your application and contact you shortly.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
