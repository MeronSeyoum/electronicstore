import Link from 'next/link';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { RiSearch2Line } from "react-icons/ri";

import Logo from 'shared/Logo/Logo';
import Input from 'shared/Input/Input';

const menuLink = [
  // { label: "Home", href: "/" },
  { label: "Collections", href: "/productsCollection" },
 { label: "Shop", href: "/collections/all" },
   { label: "Gears", href: "/gears" },
  { label: "Accessories", href: "/accessories" },
  { label: "About", href: "/pages/about" },
  { label: "Contact", href: "/pages/contact" },
  { label: "Blog", href: "/blogs/news" },
  { label: "FAQ", href: "/pages/faq" },
];
 const NavMobile = ({ onClickClose }) => {
  return (
    <div className="h-screen w-full divide-y divide-neutral-300 overflow-y-auto bg-white py-2 shadow-lg ring-1 transition">
    <div className="px-5 py-2">
      <Logo className="block" />
      {/* eslint-disable */}
      <span className="absolute right-2 top-2 p-1" onClick={onClickClose}>
        {/* eslint-disable */}
        <MdClose />
      </span>
    </div>
    
      
    <ul className="flex flex-col space-y-5 px-5 py-4">
    <div className="items-center  py-0
         rounded-full border border-neutral-300  flex">
          <Input
            type="text"
            className=" border-white rounded-full border-0 bg-white
             placeholder:text-neutral-500 focus:border-transparent mx-0"
            placeholder="try 'Iphone 14 Max'"
          />
          <RiSearch2Line className="text- text-neutral-500 me-3 " />
        </div>

   {menuLink.map((item) => (
        <Link href={item.href} onClick={onClickClose} key={item.label} className="capitalize">
          {item.label}
        </Link>
      ))}  
      

     
    </ul>
  </div>
  )
}

export default NavMobile; 