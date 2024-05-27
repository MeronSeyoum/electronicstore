'use client'
import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const NextPrev = ({
  className = '',
  onClickNext = () => {},
  onClickPrev = () => {},
  btnClassName = 'w-12 h-12',
  disableNext,
  disablePrev,
}) => {
  const [focus, setFocus] = useState('right');

  return (
    <div className={`nc-NextPrev relative flex items-center ${className}`}>
      <button
        type="button"
        className={`${btnClassName} mr-2 flex items-center justify-center rounded-full border ${
          focus === 'left'
            ? 'border-primary bg-primary text-white'
            : 'border-slate-700'
        }`}
        onClick={(e) => {
          e.preventDefault();
          onClickPrev();
        }}
        title="Prev"
        disabled={disablePrev}
        onMouseEnter={() => setFocus('left')}
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        className={`${btnClassName} flex items-center justify-center rounded-full border ${
          focus === 'right'
            ? 'border-primary bg-primary text-white'
            : 'border-slate-700'
        }`}
        onClick={(e) => {
          e.preventDefault();
          onClickNext();
        }}
        title="Next"
        disabled={disableNext}
        onMouseEnter={() => setFocus('right')}
      >
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NextPrev;
