'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';

const imageVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function MixologyProgram() {
  const images = [
    "https://static.wixstatic.com/media/058839_60624d7a6eb742c7ab7fc8a97f4d73e1f000.jpg/v1/fill/w_1240,h_1080,al_c,q_85,usm_0.33_1.00_0.01,enc_avif,quality_auto/058839_60624d7a6eb742c7ab7fc8a97f4d73e1f000.jpg",
    "https://static.wixstatic.com/media/058839_60624d7a6eb742c7ab7fc8a97f4d73e1f000.jpg/v1/fill/w_1240,h_1080,al_c,q_85,usm_0.33_1.00_0.01,enc_avif,quality_auto/058839_60624d7a6eb742c7ab7fc8a97f4d73e1f000.jpg",
    "https://static.wixstatic.com/media/058839_60624d7a6eb742c7ab7fc8a97f4d73e1f000.jpg/v1/fill/w_1240,h_1080,al_c,q_85,usm_0.33_1.00_0.01,enc_avif,quality_auto/058839_60624d7a6eb742c7ab7fc8a97f4d73e1f000.jpg",
  ];

  return (
    <div className="pt-24 min-h-screen bg-black text-white pb-16 sm:pb-24">

      {/* Header */}
      <PageHeader 
        title="MIXOLOGY PROGRAM" 
        subtitle="A JOURNEY THROUGH CRAFTED LIBATIONS"
      />

      {/* Premium Image Section */}
      <section className="mt-12 sm:mt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-16">

            {images.map((src, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
                className="overflow-hidden group rounded-sm"
              >
                <motion.img
                  src={src}
                  alt="Cocktail"
                  className="w-full h-[350px] sm:h-[520px] object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </motion.div>
            ))}

          </div>

          {/* Luxury Section Title */}
          <div className="mt-16 sm:mt-28 text-center px-4">
            <h2 className="text-primary text-3xl sm:text-5xl tracking-[0.3em] sm:tracking-[0.6em] font-heading uppercase leading-tight">
              Mixology Program
            </h2>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="container mx-auto px-6 max-w-5xl mt-12 sm:mt-20 space-y-12 sm:space-y-20">

        <div className="space-y-4 sm:space-y-6 text-white/80 font-light leading-relaxed text-sm sm:text-base font-serif italic">
          <p>
            Embarking on a culinary adventure, Rajmahal stands as a testament to the harmonious flow on the flavors, cultures, and compelling narratives. The beverage menu, thoughtfully divided into five captivating sections—Signature Cocktails, The Beekeeper, Classic, Gin & Tonics, and Spirits Selection—unveils a rich tapestry of stories and libations that extend beyond conventional boundaries.
          </p>
          <p>
            Each section serves as a portal into a world of flavors, where the Signature Cocktails pay homage to India's storied history, The Beekeeper celebrates local honey, and the Classic section reimagines timeless cocktails with an Indian twist. The Gin & Tonics section offers a curated selection of Gins paired with botanicals, while the Spirits Selection showcases a diverse array of spirits from around the world. Together, these sections create an unforgettable culinary experience that transcends borders and invites guests to savor the essence of Rajmahal's mixology program.
          </p>
        </div>

        {/* Sections */}

        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-primary tracking-[0.2em] sm:tracking-[0.3em] font-medium text-xl sm:text-2xl uppercase">SIGNATURE COCKTAILS</h2>
          <h3 className="text-lg sm:text-xl uppercase font-heading tracking-widest">UNVEILING CULTURAL GEMS</h3>
          <div className="w-12 sm:w-16 h-0.5 bg-primary/50 my-3 sm:my-4"></div>
          <div className="space-y-4 text-white/70 font-light leading-relaxed font-serif text-sm sm:text-base">
            <p>
              Rajmahal's Signature Cocktails serve as a vibrant celebration of India's storied history, intricately woven with captivating narratives and flavours. A prime example is the Kohinoor a tribute to the world largest cut diamond. This cocktail artfully combines the richness of saffron-infused vodka, the sweetness of rose syrup, and the tanginess of fresh lemon juice, creating a harmonious blend that pays homage to the opulence and allure of the Kohinoor diamond.
            </p>
            <p>
              The Paan Negroni seamlessly merges the essence of India's paan culture with the bitterness of a Negroni. Sous vide-infused Tanqueray Rangpur, Ketel One vodka, Campari, and a blend of dry sherry and sweet vermouth create a symphony of flavours. The cocktail is garnished with a paan leaf and a sprinkle of fennel seeds, offering a unique twist on the classic Negroni while paying homage to India's rich culinary heritage.
            </p>
          </div>
        </section>

        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-primary tracking-[0.2em] sm:tracking-[0.3em] font-medium text-xl sm:text-2xl uppercase">THE BEEKEEPER</h2>
          <h3 className="text-lg sm:text-xl font-heading uppercase tracking-widest">LOCAL HONEY, GLOBAL FLAVORS</h3>
          <div className="w-12 sm:w-16 h-0.5 bg-primary/50 my-3 sm:my-4"></div>
          <p className="text-white/70 font-light leading-relaxed font-serif text-sm sm:text-base">
            Dedicated to the art of honey cocktails, The Beekeeper collaborates with local beekeepers, using honey sourced within miles of the restaurant. This section celebrates the rich diversity of honey, showcasing its unique flavors and characteristics. Each cocktail in The Beekeeper section is crafted to highlight the distinct qualities of the honey, creating a harmonious blend of local ingredients and global flavors that pay homage to the importance of bees in our ecosystem.
          </p>
        </section>

        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-primary tracking-[0.2em] sm:tracking-[0.3em] font-medium text-xl sm:text-2xl uppercase">ULTIMATE GIN TONIC</h2>
          <h3 className="text-lg sm:text-xl font-heading uppercase tracking-widest">A NOD TO HISTORY</h3>
          <div className="w-12 sm:w-16 h-0.5 bg-primary/50 my-3 sm:my-4"></div>
          <div className="space-y-4 text-white/70 font-light leading-relaxed font-serif text-sm sm:text-base">
            <p>
              This section pays homage to the origins of Gin & Tonics in India. Our expert curation showcases the finest Gins paired with the right tonics, herbs, spices, botanicals, juices, and bitters. Each combination is thoughtfully crafted to create a symphony of flavors that transport guests to the heart of India's colonial past, where the Gin & Tonic was born as a refreshing remedy against tropical diseases. The Ultimate Gin & Tonic section invites guests to savor the rich history and vibrant flavors that define this iconic cocktail.
            </p>
          </div>
        </section>

        <section className="pt-8 sm:pt-12 text-center sm:text-left">
          <Link 
            href="https://static.wixstatic.com/media/058839_694087359e1544388cf27fbfe164644a.pdf" 
            className="w-full sm:w-auto inline-block bg-primary text-black px-8 sm:px-12 py-4 sm:py-5 font-medium tracking-[0.2em] sm:tracking-[0.3em] hover:bg-white transition-all text-xs sm:text-sm uppercase"
          >
            CATERING COCKTAIL MENU
          </Link>
        </section>

      </main>

    </div>
  );
}