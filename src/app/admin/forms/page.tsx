'use client';

import { useState, useEffect } from 'react';

interface Submission {
  _id: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventType?: string;
  eventDate?: string;
  guestCount?: number;
  message?: string;
  status: string;
  createdAt: string;
}

export default function FormSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/forms');
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 mt-20">
      <div>
        <h2 className="text-3xl md:text-4xl font-heading tracking-widest text-primary uppercase">FORM SUBMISSIONS</h2>
        <p className="text-white/50 mt-2 font-serif italic text-sm">Review and manage contact and booking requests.</p>
      </div>

      {loading ? (
        <div className="p-20 text-center text-primary animate-pulse tracking-widest text-xs uppercase">FETCHING SUBMISSIONS...</div>
      ) : submissions.length === 0 ? (
        <div className="p-20 text-center bg-white/5 border border-dashed border-white/10 text-white/40 tracking-widest uppercase text-xs italic">
          NO SUBMISSIONS FOUND.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Desktop Table View */}
          <div className="hidden xl:block bg-black/40 border border-white/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">DATE</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">TYPE</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">NAME</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">CONTACT</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">EVENT INFO</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {submissions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-xs text-white/60 font-mono">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6">
                      <span className={`text-[9px] px-3 py-1 border tracking-[0.2em] uppercase font-bold ${sub.type === 'BOOK_NOW' ? 'border-primary text-primary' : 'border-blue-500/50 text-blue-400'}`}>
                        {sub.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-6 text-sm font-heading tracking-widest text-white uppercase">
                      {sub.firstName} {sub.lastName}
                    </td>
                    <td className="p-6 text-xs space-y-1">
                      <div className="text-white/80">{sub.email}</div>
                      <div className="text-white/40">{sub.phone}</div>
                    </td>
                    <td className="p-6 text-xs space-y-1">
                      {sub.eventType && <div className="text-primary/70 uppercase tracking-widest font-bold">{sub.eventType}</div>}
                      {sub.eventDate && <div className="text-white/60">Date: {new Date(sub.eventDate).toLocaleDateString()}</div>}
                      {sub.guestCount && <div className="text-white/40">Guests: {sub.guestCount}</div>}
                    </td>
                    <td className="p-6">
                      <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">{sub.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {submissions.map((sub) => (
              <div key={sub._id} className="bg-black/40 border border-white/10 p-6 space-y-6">
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div>
                    <span className={`text-[9px] px-2 py-1 border tracking-[0.2em] uppercase font-bold ${sub.type === 'BOOK_NOW' ? 'border-primary text-primary' : 'border-blue-500/50 text-blue-400'}`}>
                      {sub.type.replace('_', ' ')}
                    </span>
                    <h3 className="text-lg font-heading tracking-widest text-white uppercase mt-3">{sub.firstName} {sub.lastName}</h3>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">{new Date(sub.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-primary/50 tracking-widest uppercase block">EMAIL</span>
                    <span className="text-xs text-white/80 break-all">{sub.email}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-primary/50 tracking-widest uppercase block">PHONE</span>
                    <span className="text-xs text-white/80">{sub.phone}</span>
                  </div>
                </div>

                {(sub.eventType || sub.eventDate || sub.guestCount) && (
                  <div className="bg-white/5 p-4 space-y-3">
                    <span className="text-[9px] text-white/30 tracking-widest uppercase block border-b border-white/5 pb-2">EVENT DETAILS</span>
                    <div className="grid grid-cols-2 gap-4">
                      {sub.eventType && (
                        <div>
                          <span className="text-[8px] text-white/40 uppercase block">TYPE</span>
                          <span className="text-xs text-primary/80 uppercase tracking-widest font-bold">{sub.eventType}</span>
                        </div>
                      )}
                      {sub.eventDate && (
                        <div>
                          <span className="text-[8px] text-white/40 uppercase block">DATE</span>
                          <span className="text-xs text-white/80">{new Date(sub.eventDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {sub.guestCount && (
                        <div>
                          <span className="text-[8px] text-white/40 uppercase block">GUESTS</span>
                          <span className="text-xs text-white/80">{sub.guestCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[9px] text-white/30 tracking-widest uppercase">STATUS: <span className="text-white/60">{sub.status}</span></span>
                  <button className="text-[9px] text-primary/60 hover:text-primary tracking-widest uppercase font-bold transition-colors">VIEW DETAILS</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
