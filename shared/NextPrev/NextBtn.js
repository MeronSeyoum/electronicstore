import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const NextBtn = ({ className = 'w-10 h-10 text-lg', ...args }) => {
  return (
    <button
      type="button"
      className={`NextBtn ${className} inline-flex items-center justify-center rounded-full border
       border-neutral-light bg-primary-light hover:border-neutral-dark`}
      {...args}
    >
      <MdKeyboardArrowRight className="text-2xl" />
    </button>
  );
};

export default NextBtn;
