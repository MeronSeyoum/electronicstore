"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import ButtonCircle3 from "shared/Button/ButtonCircle3";
import Input from "shared/Input/Input";
import Logo from "shared/Logo/Logo";
import CartSideBar from "../CartSideBar";
import MenuBar from "./MenuBar";
import { userService } from "services";

const MainNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="container flex items-center justify-between lg:py-2.5 py-1">
      <div className="flex-1 lg:hidden">
        <MenuBar />
      </div>
      <div className="flex items-center pr-5 basis-[61%]">
        <Logo />
        <div className="hidden w-full max-w-xl items-center gap-5 py-0 rounded-full border border-neutral-300 lg:flex">
          <Input
            type="text"
            className="border-white rounded-full bg-white placeholder:text-neutral-500 focus:border-transparent mx-0"
            placeholder="try 'Iphone 14 Max'"
          />
          <RiSearch2Line className="text-lg text-neutral-500 me-3" />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end lg:gap-5 gap-2">
        <div className="relative hidden lg:block">
          <span className="absolute -top-1/4 left-3/4 aspect-square w-3 rounded-full bg-red-600" />
          <FaRegBell className="text-lg" />
        </div>
        <div className="flex items-center divide- divide-neutral-300">
          <div className="relative lg:hidden">
            <RiSearch2Line className="text-xl mx-4" />
          </div>
          {user ? (
            <div className="">
              <button
                type="button"
                className="inline-flex items-center justify-center w-full
                 px-2 lg:px-4  
                 
                 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => {
                  const dropdown = document.getElementById("dropdown-menu");
                  dropdown.classList.toggle("hidden");
                }}
              >
                <FaRegUser className="text-lg mx-2 " />
                <span className="pl-2 ">
                  {userService.userValue?.first_name}
                </span>
                <span className="lg:pe-2 hidden lg:block">
                {userService.userValue?.last_name}
                </span>
                <svg
                  className="w-4 h-4 ml-1 -mr-1 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4l3.3 3.29 3.3-3.3a1 1 0 111.4 1.42l-4 4a1 1 0 01-.7.28z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                id="dropdown-menu"
                className="hidden absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                </div>
                <div className="py-1">
                  <Link href="#" onClick={userService.logout} className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100">
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center text-sm">
              <Link href="/account/login">
                <FaRegUser className="text-lg" />
              </Link>
              <Link href="/account/login" className="account-icon hover:bg-primary">
                <span className="hidden lg:block pb-0">Sign In</span>
              </Link>
            </div>
          )}
          <CartSideBar />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
