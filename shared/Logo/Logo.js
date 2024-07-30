import React from 'react';
import Link from 'next/link';
import { RiMicrosoftLoopFill } from 'react-icons/ri';
import Image from 'next/image';
import logo from 'images/logo.png'
// const Logo = ({ className = 'hidden' }) => {
const Logo = ({ className = '' }) => {
  return (
    <Link href="/" className="flex cursor-pointer items-center lg:gap-2 gap-1 ">
      <span className={`${className} ml-1 lg:w-56`}>
        <Image
          src={logo}
          alt={<RiMicrosoftLoopFill className="text-2xl text-primary" />}
          width={150}
          height={10}
        />
      </span>

    </Link>
  );
};

export default Logo;
