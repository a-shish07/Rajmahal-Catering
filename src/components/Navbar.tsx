'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 150) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    async function loadAssets() {
      try {
        const res = await fetch('/api/assets');
        const data = await res.json();
        setAssets(data);
      } catch (err) {
        console.error('Error fetching assets:', err);
      }
    }
    loadAssets();
  }, []);

  const getAssetUrl = (name: string) => assets.find(a => a.name === name)?.url || '#';

  const leftLinks = [
    { name: 'GALLERY', href: '/gallery' },
    { name: 'MIXOLOGY PROGRAM', href: '/mixology-program' },
    { name: 'TRAYS', href: getAssetUrl('TRAYS'), external: true },
    { name: 'MENU', href: getAssetUrl('MENU'), external: true },
  ];

  const rightLinks = [
    { name: 'ABOUT', href: '/#about' },
    { name: 'TEAM', href: '/team' },
    { name: 'FAQ', href: '/faq' },
    { name: 'CAREERS', href: '/careers' },
    { name: 'BOOK NOW', href: '/contact' },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: showNavbar ? 0 : -90 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed top-0 left-0 w-full z-[100] bg-transparent"
    >
      {/* Container with dynamic height/padding */}
      <div className="flex items-center justify-between px-6 lg:px-16 h-20 md:h-24 bg-black transition-all duration-300">

        {/* Desktop Left */}
        <div className="hidden lg:flex flex-1 justify-end space-x-6 xl:space-x-12 text-[10px] xl:text-[11px] tracking-[0.28em] text-white uppercase">
          {leftLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              className="hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <div className="mx-4 md:mx-6 xl:mx-12 shrink-0">
          <Link href="/" className="block hover:scale-105 transition-transform duration-300">
            <Image
              src="https://rajmahal-hqx7.vercel.app/_next/image?url=%2Flogo.PNG&w=384&q=75"
              alt="Rajmahal Logo"
              width={140}
              height={40}
              className="w-24 md:w-32 lg:w-40 h-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex flex-1 justify-start space-x-6 xl:space-x-12 text-[10px] xl:text-[11px] tracking-[0.28em] text-white uppercase">
          {rightLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'w-6 translate-y-2 -rotate-45' : 'w-6'}`}></span>
              <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -translate-y-2 rotate-45' : 'w-6'}`}></span>
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-[105] flex flex-col pt-24 px-8 overflow-y-auto"
          >
            {/* Close Button Inside Overlay */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {allLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-light tracking-[0.2em] text-white hover:text-primary uppercase block py-2 border-b border-white/10"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;