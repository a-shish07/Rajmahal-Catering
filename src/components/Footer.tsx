import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black py-20 text-center">
      <div className="container mx-auto px-4">
        
        {/* Contact Info */}
        <div className="space-y-6">
          <p className="text-white text-lg tracking-wide font-serif">
            281.806.6167
          </p>

          <p className="font-serif text-white/70 underline underline-offset-4 decoration-white/40 hover:text-white transition">
            reservation@musaaferhouston.com
          </p>

          <p className="text-white/80 text-base font-serif">
            © 2023-2026 by Rajmahal Catering.
          </p>

          {/* <p className="text-white/60 text-sm font-serif">
            Website by{" "}
            <Link
              href="http://www.raydoncreative.com"
              className="underline underline-offset-4 hover:text-white transition"
            >
              Raydon Creative
            </Link>
          </p> */}
        </div>

      </div>
    </footer>
  );
};

export default Footer;