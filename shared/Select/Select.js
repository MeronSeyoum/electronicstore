import React from 'react';

const Select = ({
  className = '',
  sizeClass = 'h-11',
  children,
  ...args
}) => {
  return (
    <select
      className={`nc-Select ${sizeClass} ${className} block w-full rounded-full border bg-neutral-light text-sm
       focus:border-transparent focus:ring focus:ring-transparent focus:ring-opacity-50`}
      {...args}
    >
      {children}
    </select>
  );
};

export default Select;
