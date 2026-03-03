'use client';

import { useState, useEffect } from 'react';

interface Career {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  startDate: string;
  resumeUrl: string;
  status: string;
  createdAt: string;
}

export default function CareerSubmissions() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await fetch('/api/careers');
      const data = await res.json();
      setCareers(data);
    } catch (err) {
      console.error('Error fetching careers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 mt-20">
      <div>
        <h2 className="text-3xl md:text-4xl font-heading tracking-widest text-primary uppercase">CAREER APPLICATIONS</h2>
        <p className="text-white/50 mt-2 font-serif italic text-sm">Review candidate applications and resumes.</p>
      </div>

      {loading ? (
        <div className="p-20 text-center text-primary animate-pulse tracking-widest text-xs uppercase">FETCHING APPLICATIONS...</div>
      ) : careers.length === 0 ? (
        <div className="p-20 text-center bg-white/5 border border-dashed border-white/10 text-white/40 tracking-widest uppercase text-xs italic">
          NO APPLICATIONS FOUND.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Desktop Table View */}
          <div className="hidden xl:block bg-black/40 border border-white/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">DATE</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">POSITION</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">NAME</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">CONTACT</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">RESUME</th>
                  <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {careers.map((career) => (
                  <tr key={career._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-xs text-white/60 font-mono">
                      {new Date(career.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-6">
                      <span className="text-[9px] px-3 py-1 border border-primary/50 text-primary tracking-[0.2em] uppercase font-bold">
                        {career.position}
                      </span>
                    </td>
                    <td className="p-6 text-sm font-heading tracking-widest text-white uppercase">
                      {career.firstName} {career.lastName}
                    </td>
                    <td className="p-6 text-xs space-y-1">
                      <div className="text-white/80">{career.email}</div>
                      <div className="text-white/40">{career.phone}</div>
                    </td>
                    <td className="p-6">
                      <a 
                        href={career.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-white transition-colors underline underline-offset-4 tracking-[0.2em] uppercase text-[9px] font-bold"
                      >
                        VIEW RESUME
                      </a>
                    </td>
                    <td className="p-6 text-[9px] text-white/40 tracking-widest uppercase font-bold">
                      {career.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {careers.map((career) => (
              <div key={career._id} className="bg-black/40 border border-white/10 p-6 space-y-6">
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[9px] px-2 py-1 border border-primary/50 text-primary tracking-[0.2em] uppercase font-bold">
                      {career.position}
                    </span>
                    <h3 className="text-lg font-heading tracking-widest text-white uppercase mt-3">{career.firstName} {career.lastName}</h3>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">{new Date(career.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-primary/50 tracking-widest uppercase block">EMAIL</span>
                    <span className="text-xs text-white/80 break-all">{career.email}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-primary/50 tracking-widest uppercase block">PHONE</span>
                    <span className="text-xs text-white/80">{career.phone}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 flex items-center justify-between">
                  <span className="text-[9px] text-white/30 tracking-widest uppercase font-bold">DOCUMENTATION</span>
                  <a 
                    href={career.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-primary hover:text-white transition-all uppercase tracking-[0.2em] font-bold underline underline-offset-4"
                  >
                    VIEW RESUME
                  </a>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[9px] text-white/30 tracking-widest uppercase">STATUS: <span className="text-white/60 font-bold">{career.status}</span></span>
                  <div className="flex gap-4">
                    <button className="text-[9px] text-primary/60 hover:text-primary tracking-widest uppercase font-bold transition-colors">UPDATE</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
