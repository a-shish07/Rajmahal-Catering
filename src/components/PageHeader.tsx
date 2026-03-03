import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  backgroundImage = "https://static.wixstatic.com/media/058839_60624d7a6eb742c7ab7fc8a97f4d73e1f000.jpg/v1/fill/w_1240,h_1080,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/058839_60624d7a6eb742c7ab7fc8a97f4d73e1f000.jpg" 
}) => {
  return (
    <section className="relative h-[30vh] sm:h-[40vh] min-h-[200px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt={title} 
          className="w-full h-full object-cover brightness-[0.3]"
        />
      </div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-primary mb-3 sm:mb-4 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-[10px] sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase italic px-4">
            {subtitle}
          </p>
        )}
        <div className="w-12 sm:w-20 h-[2px] bg-primary mx-auto mt-4 sm:mt-6"></div>
      </div>
    </section>
  );
};

export default PageHeader;
