import React from 'react';
import Link from 'next/link';
import { RiMicrosoftLoopFill } from 'react-icons/ri';
import Image from 'next/image';
import logo from 'images/logo.png'
// const Logo = ({ className = 'hidden' }) => {
const Logo = ({ className = '' }) => {
  return (
    <Link href="/" className="flex cursor-pointer items-center lg:gap-2 gap-1 ">
      <span className={`${className} ml-1 w-40 lg:w-56`}>
        <Image
          src={logo}
          alt={<RiMicrosoftLoopFill className="text-2xl text-primary w-10" />}
          width={120}
          height={20}
          className="w-96 h-auto" // Ensure the image is responsive
          
        />
      </span>

    </Link>
  );
};

export default Logo;
