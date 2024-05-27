'use client';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const productSizeButton = ({ disabled, size }) => {
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [selected, setSelected] = useState(false);

  // random for demo
  useEffect(() => {
    setIsDisabled(Math.random() > 0.5);
  }, []);

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => setSelected(!selected)}
      className={`relative w-full rounded-xl py-10 font-medium disabled:bg-neutral-300 disabled:text-neutral-500 ${
        selected ? 'bg-primary text-white' : 'bg-neutral-200 text-black'
      }`}
    >
      <FaCheckCircle
        className={`absolute right-2 top-2 text-white ${
          selected ? 'block' : 'hidden'
        }`}
      />
      {size}
    </button>
  );
};

export default productSizeButton;