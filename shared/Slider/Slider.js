"use client"; // This directive is used in Next.js to designate the file as a client component

import React, { useEffect, useState } from "react"; // Importing React and its hooks
import { AnimatePresence, motion, MotionConfig } from "framer-motion"; // Importing Framer Motion for animations
import { useSwipeable } from "react-swipeable"; // Importing useSwipeable for swipe handling
import { useWindowSize } from "react-use"; // Importing useWindowSize to get the current window size

import NextBtn from "shared/NextPrev/NextBtn"; // Importing custom Next button component
import PrevBtn from "shared/NextPrev/PrevBtn"; // Importing custom Previous button component
import { animationVariants } from "Utils/animationVariants"; // Importing animation variants for motion

// The main Slider component
export default function Slider({
  className , // Custom class names
  itemPerRow=5 , // Number of items to display per row
  data, // Data to be displayed
  category, // Category of items (if applicable)
  renderItem = () => <div />, // Function to render individual items
  arrowBtnClass = "top-1/2 -translate-y-1/2  text-whit", // Custom class for arrow buttons
  renderSectionHeading, // Function to render section heading
  hideNextPrev = false, // Flag to hide next/prev buttons
}) {
  const [currentIndex, setCurrentIndex] = useState(0); // State for the current index
  const [direction, setDirection] = useState(0); // State for animation direction
  const [numberOfItems, setNumberOfItem] = useState(0); // State for the number of items to display

  const windowWidth = useWindowSize().width; // Get the current window width
  // Effect to update the number of items based on window width
  useEffect(() => {
    if (windowWidth < 320) {
      // If window width is less than 320px, show 1 item
      return setNumberOfItem(1);
    }
    if (windowWidth < 500) {
      if (itemPerRow < 3) {
        // If window width is less than 500px and items per row are less than 3, show 1 item
        return setNumberOfItem(1);
      }
      // Otherwise, show itemPerRow - 3 items or 1 if itemPerRow - 3 is 0
      return setNumberOfItem(itemPerRow - 3 || 1);
    }
    if (windowWidth < 1024) {
      if (itemPerRow < 3) {
        // If window width is less than 1024px and items per row are less than 3, show 2 items
        return setNumberOfItem(2);
      }
      // Otherwise, show itemPerRow - 2 items or 1 if itemPerRow - 2 is 0
      return setNumberOfItem(itemPerRow - 2 || 1);
    }
    if (windowWidth < 1280) {
      // If window width is less than 1280px, show itemPerRow - 1 items
      return setNumberOfItem(itemPerRow - 1);
    }

    // If window width is greater than or equal to 1280px, show itemPerRow items
    setNumberOfItem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  // Function to change the current item index
  function changeItemId(newVal) {
    if (newVal > currentIndex) {
      setDirection(1); // Set direction to 1 for forward movement
    } else {
      setDirection(-1); // Set direction to -1 for backward movement
    }
    setCurrentIndex(newVal); // Update the current index
  }

  // Handlers for swipe events
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < data?.length - 1) {
        changeItemId(currentIndex + 2); // Move to the next item on swipe left
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 2); // Move to the previous item on swipe right
      }
    },
    trackMouse: true, // Enable tracking mouse events
  });

  // If there are no items to display, return an empty div
  if (!numberOfItems) {
    return <div />;
  }

  // Render the Slider component
  return (
    <div className={`nc-Slider ${className}`}>
      {renderSectionHeading &&
        renderSectionHeading({
          onClickPrev: () => changeItemId(currentIndex - 2),
          onClickNext: () => changeItemId(currentIndex + 2),
          showNext: data.length > currentIndex + numberOfItems,
          showPrev: !!currentIndex,
        })}

      <MotionConfig
        transition={{
          x: { type: "cubic-bezier", easing: [0.25, 1, 0.5, 1] },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative flow-root" {...handlers}>
          <div className="flow-root ">
            <motion.ul
              initial={false}
              className="relative flex whitespace-nowrap"
            >
              <AnimatePresence initial={false} custom={direction}>
                {data.map((item, indx) => (
                  <motion.li
                    className="flex  relative shrink-0 whitespace-normal justify-center "
                    custom={direction}
                    initial={{
                      x: `${currentIndex * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    animationVariants={animationVariants(200, 1)}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    {renderItem(item, indx)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex > 0 && !hideNextPrev && !category && (
            <PrevBtn
              onClick={() => changeItemId(currentIndex - 2)}
              className={`absolute -left-3 z-[1] h-10 w-10 text-lg xl:-left-6 xl:h-12 xl:w-12 ${arrowBtnClass}`}
            />
          )}
          {data.length > currentIndex + numberOfItems && !hideNextPrev && !category && (
            <NextBtn
              onClick={() => changeItemId(currentIndex + 2)}
              className={`absolute -right-3 z-[1] h-10 w-10 text-lg xl:-right-6 xl:h-12 xl:w-12 ${arrowBtnClass}`}
            />
          )}
        </div>
      </MotionConfig>
    </div>
  );
}
