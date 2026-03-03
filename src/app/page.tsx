'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover brightness-[0.4]"
          >
            <source src="https://video.wixstatic.com/video/058839_60624d7a6eb742c7ab7fc8a97f4d73e1/1080p/mp4/file.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-6 sm:mb-8 tracking-wider uppercase leading-tight animate-fade-in-up">
            CELEBRATIONS ARE ELEVATED <br className="hidden sm:block" /> WHEN YOU CHOOSE RAJMAHAL
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
          <Link href="/contact" className="inline-block bg-primary text-secondary px-8 sm:px-10 py-3 sm:py-4 font-medium tracking-widest hover:bg-white transition-all text-xs sm:text-sm uppercase">
            BOOK NOW
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="bg-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-secondary font-heading text-3xl md:text-4xl mb-6 uppercase tracking-widest">SUBSCRIBE TO OUR NEWSLETTER</h2>
          <p className="text-secondary/70 mb-10 max-w-2xl mx-auto italic">Stay updated with our latest offerings, event news, and culinary inspirations.</p>
          <form className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <input 
              type="email" 
              placeholder="Email*" 
              className="w-full md:w-96 px-4 py-3 border-b-2 border-secondary/20 focus:border-primary outline-none text-secondary bg-transparent placeholder:text-secondary/50"
              required
            />
            <button className="bg-secondary text-white px-8 py-3 hover:bg-primary transition-colors uppercase tracking-widest text-sm font-medium">
              Submit
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <input type="checkbox" id="subscribe" className="accent-secondary" />
            <label htmlFor="subscribe" className="text-xs text-secondary/60 uppercase tracking-widest">Yes, subscribe me to your newsletter.</label>
          </div>
        </div>
      </section> */}

      {/* About/Story Section */}
      <section id="about" className="py-16 md:py-24 px-6 bg-secondary overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-1/2 relative">
               <div className="relative z-10">
                 <img 
                    src="https://static.wixstatic.com/media/058839_d35b6c70a664461893405132c88d0a76~mv2.jpg/v1/fill/w_1011,h_1080,fp_0.34_0.52,q_85,enc_avif,quality_auto/tales-2.jpg" 
                    alt="Catering Setup" 
                    className="w-full h-auto shadow-2xl border border-primary/20 grayscale hover:grayscale-0 transition-all duration-700"
                 />
               </div>
               {/* Accent elements */}
               <div className="absolute -top-6 -left-6 w-20 h-20 sm:w-40 sm:h-40 border-t-2 border-l-2 border-primary/30 z-0"></div>
               <div className="absolute -bottom-6 -right-6 w-20 h-20 sm:w-40 sm:h-40 border-b-2 border-r-2 border-primary/30 z-0"></div>
               <img 
                 src="https://static.wixstatic.com/media/058839_8a93e4a018264f039aecf0444d01b2ea~mv2.png/v1/crop/x_0,y_0,w_557,h_1080/fill/w_193,h_373,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/gold%20musaafer.png" 
                 alt="Gold Accent" 
                 className="absolute -right-10 sm:-right-20 top-1/2 transform -translate-y-1/2 h-40 sm:h-80 w-auto opacity-30 z-20 pointer-events-none"
               />
            </div>
            
            <div className="w-full lg:w-1/2 text-white/90 space-y-6 lg:space-y-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-primary leading-tight uppercase tracking-widest">
                WELCOME TO RAJMAHAL CATERING, WHERE WE TRANSFORM YOUR SPECIAL OCCASIONS INTO UNFORGETTABLE CULINARY EXPERIENCES.
              </h2>
              <div className="w-12 sm:w-16 h-0.5 bg-primary/50"></div>
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light font-serif tracking-wider">
                <p>
                  JUST AS OUR NAME &apos;RAJMAHAL&apos; EMBODIES THE SPIRIT OF A PALACE, RAJMAHAL CATERING INVITES YOU ON A JOURNEY FILLED WITH FLAVORS, TRADITIONS, AND CHERISHED MEMORIES. WITH OUR EXPERTISE AND DEDICATION TO CULINARY INNOVATION, WE CUSTOMIZE EVERY ASPECT OF YOUR EVENT, ENSURING THAT EACH DETAIL REFLECTS YOUR UNIQUE VISION. WE BELIEVE THAT YOUR SPECIAL DAY DESERVES A SPECIAL MENU, TAILORED TO ELEVATE YOUR CELEBRATION WITH EVOLVED AND PERSONALIZED CATERING SERVICE.
                </p>
                <p>
                  FROM WEDDINGS TO PRIVATE EVENTS, DROP-OFF CATERING TO SPECIAL OCCASIONS, WE CATER TO EVENTS IN HOUSTON, DALLAS, AUSTIN OR ANYWHERE ELSE IN THE WORLD. WITH A FOUNDATION ESTABLISHED IN HOUSTON, WE TAKE PRIDE IN OUR REPUTATION FOR HOSPITALITY, SERVICE STANDARDS, AND INNOVATION. OUR TEAM WORKS CLOSELY WITH YOU TO CRAFT ELEVATED MENUS THAT YOUR GUESTS WILL REMEMBER FOR YEARS TO COME. WE ACCOMMODATE ALL DIETARY PREFERENCES, WITH OUR CHEFS HAPPY TO CRAFT INSPIRING, DIET-FRIENDLY MENUS.
                </p>
              </div>
              <div className="pt-4 lg:pt-8">
                <Link href="/about" className="text-primary hover:text-white transition-colors tracking-widest text-sm sm:text-base font-medium uppercase underline underline-offset-8 font-serif">
                  a story to remember...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview / CTA Section */}
      <section className="bg-black py-20 md:py-32 px-6 text-center">
        <div className="container mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-12 uppercase tracking-[0.2em] leading-tight text-white">
            DEFINE WHAT <br className="hidden sm:block" /> TALES MEANS
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <Link href="/menu" className="w-full sm:w-auto text-white px-8 sm:px-12 py-4 sm:py-5 font-medium tracking-[0.3em] bg-gray-600 hover:bg-primary transition-all text-xs sm:text-sm uppercase min-w-[200px] sm:min-w-[300px]">
              CATERING MENU
            </Link>
            <Link href="/gallery" className="w-full sm:w-auto border-2 border-gray-600 px-8 sm:px-12 py-4 sm:py-5 font-medium tracking-[0.3em] hover:bg-primary hover:text-white transition-all text-xs sm:text-sm uppercase min-w-[200px] sm:min-w-[300px] text-white">
              VIEW GALLERY
            </Link>
          </div>
        </div>
      </section>
      
      {/* Arabic Calligraphy GIF section (matches Musaafer) */}
      {/* <section className="bg-secondary py-16 flex justify-center">
         <img 
            src="https://static.wixstatic.com/media/058839_46639c0e64614c5f99b05b16cfa343ed~mv2.gif/v1/fill/w_147,h_34,al_c,usm_0.66_1.00_0.01,blur_2,pstr/musaafer-arabic-text-GIF_gif.gif" 
            alt="Calligraphy" 
            className="h-12 w-auto opacity-50 grayscale invert"
         />
      </section> */}
    </div>
  );
}
