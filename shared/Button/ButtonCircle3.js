import React from 'react';

const ButtonCircle3 = ({
  className = '',
  size = '',
  ...args
}) => {
  return (
    <button
      type="button"
      className={`ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none focus:ring-transparent disabled:bg-opacity-70 ${className} ${size}`}
      {...args}
    />
  );
};

export default ButtonCircle3;
