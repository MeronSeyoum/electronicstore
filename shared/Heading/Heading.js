import React from 'react';
import NextPrev from '../NextPrev/NextPrev';

const Heading = ({
  children,
  desc = '',
  title = '',
  className = 'my-4',
  isCenter = false,
  isMain,
  hasNextPrev,
  ...args
}) => {
  return (
    <div
      className={` relative flex flex-col justify-between sm:flex-row sm:items-end ${className}`}
      style={{ textAlign: isCenter ? 'center' : 'left' }} // Center text if isCenter is true
    >
      <div
        className={
          isCenter ? 'mx-auto  w-full max-w-3xl text-center ' : 'max-w-4xl'
        }
      >
        {title && (
          <p className="text-4xl font-medium uppercase text-primary">{title}</p>
        )}
        <h5
          style={{
            lineHeight: '1.75em',
            fontSize: isMain ? ' 1.25rem' : '1rem' // Adjust font size based on isMain prop
          }}
          className={`${isMain ? 'lineHeight text-xl lg:text-[30px]' : 'text-2xl'
            } my-2 font-bold ${isCenter ? 'mx-auto' : ''}`} // Center the h2 if isCenter is true
          {...args}
        >
          {children}
        </h5>
        {desc && <p className=" text-neutral-500 text-sm font-semibold" >{desc}</p>}
      </div>
      {hasNextPrev && !isCenter && (
        <div className="mt-4 flex shrink-0 justify-end sm:ml-2 sm:mt-0">
          <NextPrev {...args} />
        </div>
      )}
    </div>
  );

};

export default Heading;
