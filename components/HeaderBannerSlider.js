'use client'
import React, { useEffect } from 'react';
import { headerSection } from 'data/content';
import whiteEarPhone from 'images/whiteEarPhone.png';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import Image from 'next/image';

export const HeaderBannerSlider = () => {
  useEffect(() => {
    const carousel = document.getElementById('default-carousel');
    const carouselItems = carousel.querySelectorAll('[data-carousel-item]');
    let currentItemIndex = 0;

    const moveCarousel = () => {
      currentItemIndex = (currentItemIndex + 1) % carouselItems.length;
      carouselItems.forEach((item, index) => {
        if (index === currentItemIndex) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    };

    const intervalId = setInterval(moveCarousel, 5000); // Adjust slide duration as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="default-carousel" className="relative " data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative overflow-hidden rounded-lg">
        {headerSection.map((section, index) => (
          <motion.div 
            key={index} 
            className=" ease-in-out hidden" 
            data-carousel-item
            initial={{ opacity: 0, x: -100, y: 100 }} // Initial animation state
            animate={{ opacity: 1, x: 0, y: 0 }} // Animation to full opacity and position
            transition={{ duration: 0.5 }} // Transition duration
          >
            <div className="basis-[68%] items-center space-y-10 rounded-2xl p-5 md:flex md:space-y-0 bg-neutral-200">
              <div className="basis-[63%]">
                <h4 className="mb-5 text-lg font-semibold text-primary text-primary">{section.title}</h4>
                <h1 className="text-[50px] font-medium tracking-tight uppercase" style={{ lineHeight: '1.2em' }}>{section.heading}</h1>
                <p className="my-10 w-[90%] text-neutral-500">{section.description}</p>
                <ButtonSecondary sizeClass="px-5 py-4 bg-black text-white" onClick={() => console.log('View Product')}>View Product</ButtonSecondary>
              </div>
              <motion.div 
                className="basis-[37%]"
                initial={{ opacity: 0, y: 100 }} // Initial animation state
                animate={{ opacity: 1, y: 0 }} // Animation to full opacity and position
                transition={{ duration: 0.5 }} // Transition duration
              >
                <Image src={section.BannerImage} alt=" box" width={500} height={500} className="w-full" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {headerSection.map((_, index) => (
          <button key={index} type="button" className="w-3 h-3 rounded-full" aria-current={index === 0} aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index}></button>
        ))}
      </div>

      {/* Slider controls */}
      <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};
