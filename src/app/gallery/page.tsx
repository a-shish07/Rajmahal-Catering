'use client';

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

const dummyImages = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1920",
];

const SECTIONS = ["WEDDINGS", "PRIVATE EVENTS", "HIGH TEAS", "LIFESTYLE"];

// Individual Section Gallery Component
const SectionGallery = ({ sectionTitle, images, openFullscreen }: { sectionTitle: string, images: string[], openFullscreen: (images: string[], index: number) => void }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const displayImages = images.length > 0 ? images : dummyImages;

  const next = () => setActiveIdx((prev) => (prev + 1) % displayImages.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + displayImages.length) % displayImages.length);

  return (
    <div className="mb-12 sm:mb-20">
      <div className="flex flex-col items-center mb-8 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6 text-center px-4">
          {sectionTitle}
        </h2>
        <div className="w-16 sm:w-20 h-[1px] bg-primary/60"></div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Main Display Area */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden group border border-white/10 rounded-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              src={displayImages[activeIdx]}
              alt={`${sectionTitle} featured`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openFullscreen(displayImages, activeIdx)}
            />
          </AnimatePresence>

          {/* Navigation Overlay - Visible on mobile/touch */}
          <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="p-2 sm:p-4 text-white/50 hover:text-white pointer-events-auto transition-colors bg-black/20 sm:bg-transparent rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="p-2 sm:p-4 text-white/50 hover:text-white pointer-events-auto transition-colors bg-black/20 sm:bg-transparent rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Initial Thumbnails Strip */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-4 pt-2 px-1">
          {displayImages.map((img: string, idx: number) => (
            <div 
              key={idx}
              className={`relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 cursor-pointer transition-all duration-300 border-2 overflow-hidden rounded-sm
                ${activeIdx === idx ? 'border-primary opacity-100 scale-105' : 'border-transparent opacity-40 hover:opacity-70 hover:scale-102'}`}
              onClick={() => setActiveIdx(idx)}
            >
              <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);
  const [fullscreenImages, setFullscreenImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  const openFullscreen = (images: string[], index: number) => {
    setFullscreenImages(images);
    setFullscreenIdx(index);
  };

  const closeFullscreen = () => setFullscreenIdx(null);

  const nextFS = () => setFullscreenIdx((prev) => (prev !== null ? (prev + 1) % fullscreenImages.length : null));
  const prevFS = () => setFullscreenIdx((prev) => (prev !== null ? (prev - 1 + fullscreenImages.length) % fullscreenImages.length : null));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (fullscreenIdx === null) return;
      if (e.key === 'ArrowRight') nextFS();
      if (e.key === 'ArrowLeft') prevFS();
      if (e.key === 'Escape') closeFullscreen();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fullscreenIdx]);

  const getSectionImages = (section: string) => {
    return images.filter(img => img.section === section).map(img => img.imageUrl);
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white pb-20 sm:pb-32">
      <PageHeader 
        title="GALLERY" 
        subtitle="MOMENTS CAPTURED IN TIME"
      />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 mt-16 sm:mt-32">
        {loading ? (
          <div className="text-center p-20 text-primary animate-pulse tracking-widest font-heading">LOADING GALLERY...</div>
        ) : (
          SECTIONS.map((section, index) => (
            <SectionGallery 
              key={index} 
              sectionTitle={section} 
              images={getSectionImages(section)}
              openFullscreen={openFullscreen} 
            />
          ))
        )}
      </main>

      {/* Lightbox / Full-screen View */}
      <AnimatePresence>
        {fullscreenIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
            onClick={closeFullscreen}
          >
            <button className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white hover:text-primary z-[110] text-2xl sm:text-3xl font-light" onClick={closeFullscreen}>✕</button>
            
            <button className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white z-[110] text-4xl sm:text-5xl font-light p-4" onClick={(e) => { e.stopPropagation(); prevFS(); }}>‹</button>
            <button className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white z-[110] text-4xl sm:text-5xl font-light p-4" onClick={(e) => { e.stopPropagation(); nextFS(); }}>›</button>

            <div className="relative w-full h-[80vh] sm:h-[85vh] flex items-center justify-center px-4 md:px-12">
              <motion.img 
                key={fullscreenIdx}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={fullscreenImages[fullscreenIdx]} 
                alt="Full" 
                className="max-w-full max-h-full object-contain shadow-2xl shadow-black/50"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
