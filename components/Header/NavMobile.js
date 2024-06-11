import Link from "next/link";
import React from "react";
import { MdClose } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";

import Logo from "shared/Logo/Logo";
import Input from "shared/Input/Input";

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
      <div className="px-5 py-2 flex flex-row gap-x-3 ">
        <Logo className=" " />
        {/* eslint-disable */}
        <span className={`text-lg font-bold `}>
        Electronic Store 
         </span>
        <span className="absolute right-2 top-4 p-1" onClick={onClickClose}>
          {/* eslint-disable */}
          <MdClose className="text-xl" />
        </span>
      </div>

      <ul className="flex flex-col  px-5 py-2">
       
        {menuLink.map((item) => (
         <li className="border-b-2 p-2 ">

          <Link
            href={item.href}
            onClick={onClickClose}
            key={item.label}
            className="capitalize font-semibold text-[16px]"
          >
            {item.label}
          </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMobile;
