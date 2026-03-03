'use client';

import React from 'react';
import PageHeader from '@/components/PageHeader';

export default function Team() {
  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-secondary text-white pb-16 sm:pb-24">
      <PageHeader 
        title="OUR TEAM" 
        subtitle="THE ARTISANS BEHIND THE JOURNEY"
      />
      
      <main className="container mx-auto px-6 sm:px-12 lg:px-20 py-12 sm:py-24 space-y-16 sm:space-y-32">
        {/* Executive Chef Section */}
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <div className="w-full lg:w-1/2">
            <img 
              src="https://static.wixstatic.com/media/058839_6ea795a18a00485b9614054f78f19a2d~mv2.jpg/v1/fill/w_683,h_1244,fp_0.46_0.25,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/mayank-2.jpg" 
              alt="Corporate Executive Chef Mayank" 
              className="w-full h-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 rounded-sm"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-primary tracking-[0.2em] sm:tracking-[0.3em] font-medium text-sm sm:text-lg uppercase">MUSAAFER CORPORATE EXECUTIVE CHEF</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading leading-tight uppercase tracking-widest">CHEF MAYANK</h3>
            </div>
            <div className="w-12 sm:w-16 h-0.5 bg-primary/50"></div>
            <div className="space-y-4 sm:space-y-6 text-white/80 font-light leading-relaxed text-sm sm:text-base md:text-lg font-serif">
              <p>
                Chef Mayank is available for speaking engagements, talking head TV appearances, filmed (TV) or live event culinary competition judging, South Asian leadership events, wedding menu planning and celebrity chef collaborations. He is a graduate of the Institute of Hotel Management of Guwahati, India.
              </p>
              <p>
                Chef Mayank combines his expertise, passion and encyclopedic knowledge of spices, ingredients and textures serving a neoteric Indian dining experience in a stunning, expertly curated setting within Musaafer (meaning “The Traveller”,) built within Houston’s luxurious Galleria at Westheimer and Sage.
              </p>
              <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
                <h4 className="text-primary font-heading text-xl sm:text-2xl uppercase tracking-widest leading-tight">RECENT PRESS, FIRSTS, AND ACCOLADES</h4>
                <p>
                  In February 2024, Musaafer was named among the “Top 15 Most Romantic Restaurants in the world” alongside such luminaries as NYC’s “Eleven Madison Park” by Blacklane, an international, award-winning VIP travel company.
                </p>
                <p>
                  January 2024 saw the unveiling of an avant-garde dinner collaboration with Bayou City Hemp and 8th Wonder Brewery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Owners Section */}
        <section className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-start pt-12 sm:pt-16 border-t border-primary/10">
          <div className="w-full lg:w-1/2">
            <img 
              src="https://static.wixstatic.com/media/058839_940db8bb8cae4821a46803632406e701~mv2.jpg/v1/fill/w_683,h_541,fp_0.47_0.44,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_1257-web.jpg" 
              alt="Shammi & Mithu Malik" 
              className="w-full h-auto shadow-2xl rounded-sm"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading leading-tight uppercase tracking-widest">THE OWNERS / SHAMMI & MITHU MALIK</h3>
            </div>
            <div className="w-12 sm:w-16 h-0.5 bg-primary/50"></div>
            <div className="space-y-4 sm:space-y-6 text-white/80 font-light leading-relaxed text-sm sm:text-base md:text-lg font-serif">
              <p>
                Never in a million years would Shammi and Mithu Malik have thought they&apos;d be opening a restaurant during a global pandemic. After almost two years of concepting and planning, the husband-wife duo opened the doors of Musaafer.
              </p>
              <p>
                Located at 5115 Westheimer Road, the expansive 10,000 square foot space features six distinct dining rooms plus an outdoor patio, each with a different look and feel and with items entirely custom-made and shipped from India.
              </p>
            </div>
          </div>
        </section>

        {/* Pastry Chef Section */}
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start pt-12 sm:pt-16 border-t border-primary/10">
          <div className="w-full lg:w-1/2">
            <img 
              src="https://static.wixstatic.com/media/058839_419af7395c024b2e93d0975e8888d3f6~mv2.jpg/v1/fill/w_683,h_1024,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/sumant%2Bsharma%2Bhead%2Bshot%2B.jpg" 
              alt="Executive Pastry Chef Sumant Sharma" 
              className="w-full h-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 rounded-sm"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-primary tracking-[0.2em] sm:tracking-[0.3em] font-medium text-sm sm:text-lg uppercase">EXECUTIVE PASTRY CHEF</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading leading-tight uppercase tracking-widest">SUMANT SHARMA</h3>
            </div>
            <div className="w-12 sm:w-16 h-0.5 bg-primary/50"></div>
            <div className="space-y-4 sm:space-y-6 text-white/80 font-light leading-relaxed text-sm sm:text-base md:text-lg font-serif">
              <p>
                With an extraordinary journey from the farming fields of India to becoming a celebrated innovator in the world of confectionery and desserts, Sumant Sharma leads the neoteric Indian pastry program at Musaafer Houston.
              </p>
              <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
                <h4 className="text-primary font-heading text-xl sm:text-2xl uppercase tracking-widest">ACCOLADES AND ACHIEVEMENTS</h4>
                <ul className="list-disc pl-5 space-y-3 sm:space-y-4 mt-2 sm:mt-4 text-sm sm:text-base">
                  <li>Winner of the Goan Chef Challenge during his initial days at Taj Fort Aguada.</li>
                  <li>Participation in the North America selection of the World Chocolate Masters 2024.</li>
                  <li>Recognition for his Christmas dessert masterpiece, The Snow, featured in Pastry Art magazine.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
