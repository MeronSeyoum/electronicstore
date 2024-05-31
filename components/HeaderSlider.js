import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons

const HeaderSlider = ({ slides, autoPlayInterval = 6000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  return (
    <div className="relative w-full bg-[#f2eeeb]" style={{ height: '450px' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex justify-center items-center h-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full w-full flex items-center"
          key={currentSlide}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            layout="fill"
            // objectFit="fit"
            className="relative bg-cover bg-center lg:w-full w-1/2 h-screen"
          />
        </motion.div>
        <div className="absolute top-0 left-0 h-full w-full flex items-center">
          <AnimatePresence initial={false} custom={currentSlide} mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: "80%", y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.5 }}
              className=" lg:px-20 px-10 "
            >
              <div className="flex flex-col justify-start lg:gap-14  gap-8 px-auto  header-banner-content">
                <h2 className=" lg:text-lg text-base font-[500]" >Flat {slides[currentSlide].discount} Discount</h2>
                <h1 className="capitalize text-black whitespace-normal text-left lg:text-4xl lg:leading-[52px] 
                tracking-normal font-medium filter-none transform-none origin-center opacity-100 
                translate-x-0 translate-y-0 visible
                text-[30px] leading-[46px] ">
                {slides[currentSlide].text}
                </h1>
                <h3 className=" text-lg text-primary font-[500]"><span className='text-black'>From </span> {slides[currentSlide].price}</h3>
                <ButtonPrimary onClick={nextSlide} className=" w-36 ">Shop Now</ButtonPrimary>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {showButtons && (
        <div className="absolute  right-0 left-0 flex justify-between mx-1 -mt-60">
          <button onClick={prevSlide} className="bg-white text-black px-3 py-3 rounded-3xl">
            <FaChevronLeft className="w-4 h-4 font-normal" />
          </button>
          <button onClick={nextSlide} className="bg-white text-black px-3 py-3 rounded-3xl">
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderSlider;
