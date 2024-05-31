import React from 'react';
import Link from 'next/link';
import { RiMicrosoftLoopFill } from 'react-icons/ri';

// const Logo = ({ className = 'hidden' }) => {
  const Logo = ({ className = '' }) => {
  return (
    <Link href="/"  className="flex cursor-pointer items-center lg:gap-2 gap-1 ">
        <RiMicrosoftLoopFill className="text-2xl text-primary" />{' '}
        <span className={`${className} lg:text-lg font-bold hidden lg:block w-64`}>Electronic Store     </span>
      
    </Link>
  );
};

export default Logo;
