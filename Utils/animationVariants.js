export const animationVariants = (x = 1000, opacity = 0) => ({
    enter: (direction) => {
      return {
        x: direction > 0 ? x : -x,
        opacity,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? x : -x,
        opacity,
      };
    },
  });
  