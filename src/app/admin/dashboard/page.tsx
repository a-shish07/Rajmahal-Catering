'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Stats {
  images: number;
  submissions: number;
  careers: number;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({ images: 0, submissions: 0, careers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [galleryRes, formsRes, careersRes] = await Promise.all([
          fetch('/api/gallery'),
          fetch('/api/forms'),
          fetch('/api/careers')
        ]);
        
        const gallery = await galleryRes.json();
        const forms = await formsRes.json();
        const careers = await careersRes.json();
        
        setStats({
          images: gallery.length || 0,
          submissions: forms.length || 0,
          careers: careers.length || 0
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-12 mt-20">
      <div>
        <h2 className="text-4xl font-heading tracking-widest text-primary uppercase">WELCOME, {session?.user?.name}</h2>
        <p className="text-white/50 mt-2 font-serif italic tracking-wider uppercase text-[10px]">Overview of Rajmahal Catering administration.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/5 border border-white/10 h-48 animate-pulse rounded-sm"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black/40 border border-white/10 p-10 hover:border-primary/40 transition-all group">
            <h3 className="text-[10px] text-primary tracking-[0.3em] uppercase mb-4">GALLERY ASSETS</h3>
            <div className="text-6xl font-heading tracking-tighter text-white mb-2">{stats.images}</div>
            <p className="text-[10px] text-white/40 tracking-widest uppercase">Total images uploaded</p>
          </div>
          <div className="bg-black/40 border border-white/10 p-10 hover:border-primary/40 transition-all group">
            <h3 className="text-[10px] text-primary tracking-[0.3em] uppercase mb-4">FORM SUBMISSIONS</h3>
            <div className="text-6xl font-heading tracking-tighter text-white mb-2">{stats.submissions}</div>
            <p className="text-[10px] text-white/40 tracking-widest uppercase">Booking and contact requests</p>
          </div>
          <div className="bg-black/40 border border-white/10 p-10 hover:border-primary/40 transition-all group">
            <h3 className="text-[10px] text-primary tracking-[0.3em] uppercase mb-4">JOB APPLICATIONS</h3>
            <div className="text-6xl font-heading tracking-tighter text-white mb-2">{stats.careers}</div>
            <p className="text-[10px] text-white/40 tracking-widest uppercase">Total career applications</p>
          </div>
        </div>
      )}

      <div className="bg-primary/5 border border-primary/20 p-8 rounded-sm">
        <h4 className="text-sm font-heading tracking-widest text-white uppercase mb-4">QUICK ACTIONS</h4>
        <div className="flex gap-4">
          <button className="bg-primary text-black px-6 py-3 text-xs font-bold tracking-widest hover:bg-white transition-all uppercase">UPLOAD NEW IMAGE</button>
          <button className="bg-white/5 text-white px-6 py-3 text-xs font-bold tracking-widest hover:bg-white/10 transition-all uppercase">VIEW SUBMISSIONS</button>
        </div>
      </div>
    </div>
  );
}
