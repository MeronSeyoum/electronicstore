import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeaderSlider = ({ slides, autoPlayInterval = 6000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, slides.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    setIsPaused(true);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
    setIsPaused(true);
  };

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  return (
    <div
      className="relative w-full  bg-[#f2eeeb] h-[380px] lg:border-2 rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex  justify-center items-center h-full relative overflow-hidden">
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
            className="relative bg-contain bg-center lg:w-full lg:h-full h-96"
          />
        </motion.div>
        <div className="absolute top-0 left-0 h-full w-full flex items-center px-4 md:px-10">
          <AnimatePresence initial={false} custom={currentSlide} mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start justify-center text-center lg:text-left space-y-10 lg:space-y-8"
            >
              <h2 className="text-primary text-sm md:text-base lg:text-lg font-medium">
                Flat {slides[currentSlide].discount} Discount
              </h2>
              <h1 className="text-black font-medium text-2xl md:text-3xl lg:text-4xl leading-tight text-start">
                {slides[currentSlide].text}
              </h1>
              <h3 className="text-lg md:text-xl lg:text-2xl text-primary font-medium">
                <span className="text-black">From </span> {slides[currentSlide].price}
              </h3>
              <ButtonPrimary onClick={nextSlide} className="w-32  lg:w-36">
                Shop Now
              </ButtonPrimary>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {showButtons && (
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <button
            onClick={prevSlide}
            className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex space-x-1">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-black' : 'bg-gray-400'}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderSlider;
