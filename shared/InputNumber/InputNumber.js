'use client'
import React, { useEffect, useState } from 'react';

const InputNumber = ({
  className = 'w-full',
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  label,
  desc,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue((state) => state - 1);
    onChange && onChange(value - 1);
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue((state) => state + 1);
    onChange && onChange(value + 1);
  };

  const renderLabel = () => {
    return (
      <div className="flex flex-col">
        <span className="font-medium">{label}</span>
        {desc && <span className="text-xs font-normal text-neutral-500">{desc}</span>}
      </div>
    );
  };

  return (
    <div className={`nc-InputNumber  space-x-5`}>
      {label && renderLabel()}
      <div className="nc-NcInputNumber__content flex justify-between sm:w-28">
       <div className={ `${className} flex flex-row items-center bg-white border border-neutral-300 rounded-md `}> 
       
        <button
          className="flex h-7 w-7 items-center justify-center 
          text-xl"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          +
        </button>
        <span className="block flex-1 select-none text-center leading-none mx-3  ">{value}</span>
     
         <button
          className="flex h-7 w-7 items-center justify-center  text-xl "
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          -
        </button>
      </div>
    </div>
    </div>
  );
};

export default InputNumber;
