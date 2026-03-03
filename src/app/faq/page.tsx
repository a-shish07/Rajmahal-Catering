'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';

const faqs = [
  {
    question: "What type of events do you cater to?",
    answer: "We cater to a variety of events, ranging from small gatherings like tasting menus at your home to special occasions such as corporate parties, birthdays, and weddings at hotels or outdoor venues."
  },
  {
    question: "What is the booking process for catering services?",
    answer: "To inquire about a booking, visit our website or contact us at 281.806.6167 or via email at reservation@musaaferhouston.com."
  },
  {
    question: "How much in advance should I book your catering services?",
    answer: "Booking timelines depend on the event size: Up to 100 guests can be booked 1 week prior, 100-500 guests require 3 to 4 weeks' notice, and bookings over 500 guests need about 6-8 weeks' notice."
  },
  {
    question: "Can you accommodate dietary restrictions and special requests?",
    answer: "We accommodate all dietary restrictions and special requests, including offering special Jain menus."
  },
  {
    question: "What is the minimum or maximum guest count for your catering services?",
    answer: "Our catering services cater to events ranging from as few as 15 guests to 500+."
  },
  {
    question: "Do you provide tasting sessions for the menu?",
    answer: "After finalizing a tentative menu, the host plus two guests will be invited to the restaurant for a tasting. Additional guests are at the discretion of the catering manager."
  },
  {
    question: "Can you assist with event planning and coordination?",
    answer: "The Rajmahal team is delighted to assist in coordinating event needs and collaborating closely with event planners. We can also introduce the host to our contacts for live florals, entertainment, etc. (if required)."
  },
  {
    question: "What is your cancellation or rescheduling policy?",
    answer: "Rescheduling or canceling is permitted up to 1 month prior to the event, with exceptions possible."
  },
  {
    question: "How do I get a price quote for my event?",
    answer: "Once an inquiry is submitted, one of our team members will schedule a call/meeting with you. After discussing your needs with the chef, a price will be quoted."
  },
  {
    question: "Can you provide references or customer testimonials?",
    answer: "Yes, we have hosts talking about previously catered events as well as photos and videos from past events."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept payments made via ACH, checks, or credit/debit cards."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-secondary text-white pb-16 sm:pb-24">
      <PageHeader 
        title="FAQ" 
        subtitle="FREQUENTLY ASKED QUESTIONS"
      />
      
      <main className="container mx-auto px-6 max-w-4xl mt-12 sm:mt-24">
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-primary/20">
              <button 
                className="w-full py-4 sm:py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-base sm:text-lg md:text-xl font-heading transition-colors duration-300 pr-4 ${openIndex === index ? 'text-primary' : 'text-white group-hover:text-primary/80'}`}>
                  {faq.question}
                </span>
                <span className={`text-xl sm:text-2xl transition-transform duration-500 shrink-0 ${openIndex === index ? 'rotate-45 text-primary' : 'text-primary/60'}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100 pb-6 sm:pb-8' : 'max-h-0 opacity-0'}`}>
                <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base md:text-lg font-serif">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
