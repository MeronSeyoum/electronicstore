import React from 'react';
import Link from 'next/link';
import { RiMicrosoftLoopFill } from 'react-icons/ri';

// const Logo = ({ className = 'hidden' }) => {
  const Logo = ({ className = '' }) => {
  return (
    <Link href="/"  className="flex cursor-pointer items-center gap-2  w-64">
        <RiMicrosoftLoopFill className="text-2xl text-primary" />{' '}
        <span className={`${className} text-lg font-bold`}>Electronic Store     .</span>
      
    </Link>
  );
};

export default Logo;
