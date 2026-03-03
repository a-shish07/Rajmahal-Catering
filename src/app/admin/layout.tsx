'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SessionProvider, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, pathname, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-primary text-2xl font-heading animate-pulse">LOADING...</div>
      </div>
    );
  }

  if (!session && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navLinks = [
    { name: 'DASHBOARD', href: '/admin/dashboard' },
    { name: 'GALLERY', href: '/admin/gallery' },
    { name: 'PDF ASSETS', href: '/admin/assets' },
    { name: 'FORM SUBMISSIONS', href: '/admin/forms' },
    { name: 'CAREERS', href: '/admin/careers' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-black border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-[60]">
        <h1 className="text-lg font-heading tracking-widest text-primary">ADMIN</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-0 z-50 bg-black border-r border-white/10 flex flex-col transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:w-64 md:h-screen
      `}>
        <div className="p-8 border-b border-white/10 hidden md:block">
          <h1 className="text-xl font-heading tracking-widest text-primary">ADMIN PANEL</h1>
        </div>
        
        <nav className="flex-1 p-6 md:p-4 space-y-2 mt-4 overflow-y-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsSidebarOpen(false)}
              className={`block p-4 rounded text-xs tracking-widest transition-all ${pathname === link.href ? 'bg-primary text-black font-bold' : 'hover:bg-white/5'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 md:p-4 border-t border-white/10">
          <button 
            onClick={() => signOut()}
            className="w-full p-4 text-left hover:bg-red-500/10 text-red-500 rounded text-xs tracking-widest transition-all"
          >
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}
