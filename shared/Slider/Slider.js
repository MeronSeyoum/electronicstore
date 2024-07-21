"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useWindowSize } from "react-use";

import NextBtn from "shared/NextPrev/NextBtn";
import PrevBtn from "shared/NextPrev/PrevBtn";
import { animationVariants } from "Utils/animationVariants";

export default function Slider({
  className = "",
  itemPerRow = 5,
  data,
  category,
  renderItem = () => <div />,
  arrowBtnClass = "top-1/2 -translate-y-1/2  text-whit",
  renderSectionHeading,
  hideNextPrev = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfItem] = useState(0);

  const windowWidth = useWindowSize().width;

  useEffect(() => {
    if (windowWidth < 320) {
      return setNumberOfItem(1);
    }
    if (windowWidth < 500) {
      if (itemPerRow < 3) {
        return setNumberOfItem(1);
      }
      return setNumberOfItem(itemPerRow - 3 || 1);
    }
    if (windowWidth < 1024) {
      if (itemPerRow < 3) {
        return setNumberOfItem(2);
      }
      return setNumberOfItem(itemPerRow - 2 || 1);
    }
    if (windowWidth < 1280) {
      return setNumberOfItem(itemPerRow - 1);
    }

    setNumberOfItem(itemPerRow);
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < data?.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  if (!numberOfItems) {
    return <div />;
  }

  return (
    <div className={`nc-Slider ${className}`}>
      {renderSectionHeading &&
        renderSectionHeading({
          onClickPrev: () => changeItemId(currentIndex - 1),
          onClickNext: () => changeItemId(currentIndex + 1),
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
          <div className="flow-root rounded-xl">
            <motion.ul
              initial={false}
              className="relative  flex whitespace-nowrap  "
            >
              <AnimatePresence initial={false} custom={direction}>
                {data.map((item, indx) => (
                  <motion.li
                    className="relative inline-block shrink-0 whitespace-normal pr-3"
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
              onClick={() => changeItemId(currentIndex - 1)}
              className={`absolute -left-3 z-[1] h-9 w-9 xl:-left-6 xl:h-12 xl:w-12 ${arrowBtnClass}`}
            />
          )}
          {data.length > currentIndex + numberOfItems && !hideNextPrev && !category &&(
            <NextBtn
              onClick={() => changeItemId(currentIndex + 1)}
              className={`absolute -right-3 z-[1] h-9 w-9 xl:h-12 lg:w-12 ${arrowBtnClass}`}
            />
          )}
        </div>
      </MotionConfig>
    </div>
  );
}
