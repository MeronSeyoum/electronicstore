import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const PrevBtn = ({ className = 'w-10 h-10 text-lg', ...args }) => {
  return (
    <button
      type="button"
      className={`PrevBtn ${className} inline-flex items-center bg-primary-light justify-center rounded-full border border-neutral-200 text-right hover:border-neutral-300`}
      {...args}
    >
      <MdKeyboardArrowLeft className="text-2xl" />
    </button>
  );
};

export default PrevBtn;
