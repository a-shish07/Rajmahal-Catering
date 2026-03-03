'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid credentials. Please try again.');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 mt-20">
      <div className="w-full max-w-md bg-white/[0.04] backdrop-blur-sm border border-primary/20 p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-heading tracking-[0.3em] text-white uppercase mb-4">
            ADMIN LOGIN
          </h1>
          <div className="w-20 h-[1px] bg-primary/60 mx-auto"></div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 mb-8 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[12px] uppercase tracking-[0.3em] text-primary">
              USERNAME
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-3 focus:border-primary outline-none transition-all duration-300 text-white pl-2"
              required 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[12px] uppercase tracking-[0.3em] text-primary">
              PASSWORD
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-3 focus:border-primary outline-none transition-all duration-300 text-white pl-2"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-black py-5 font-medium tracking-[0.4em] hover:bg-white hover:tracking-[0.5em] transition-all duration-500 uppercase text-sm mt-10 disabled:opacity-50"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
