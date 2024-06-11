"use client";
import React, { useState, useEffect } from "react";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import Logo from "shared/Logo/Logo";
import CartSideBar from "../CartSideBar";
import MenuBar from "./MenuBar";
import ProductSearch from "components/ProductSearch";
import Link from "next/link";
import { userService } from "services";
const MainNav = ({ onSearchIconClick }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="container flex items-center justify-between lg:py-2.5 ">
      <div className="flex-1 lg:hidden">
        <MenuBar />
      </div>
      <div className="flex items-center basis-[60%]">
        <Logo />
      </div>
      <div className="hidden lg:flex items-center justify-center flex-grow basis-[61%] me-10">
          <ProductSearch />
        </div>
      <div className="flex flex-1 items-center justify-end lg:gap-5 gap-2 me-3">  
       <div className="relative hidden lg:block">
          <span className="absolute -top-1/4 left-3/4 aspect-square w-3 rounded-full bg-red-600" />
          <FaRegBell className="text-lg" />
        </div>
        <div className="flex items-center lg:divide-x divide-neutral-300 ">
        <div className="relative lg:hidden" onClick={onSearchIconClick}>
        <RiSearch2Line className="text-xl mx-2 cursor-pointer" />
      </div>
          {user ? (
            <>
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
                <FaRegUser className="text-lg  " />
                <span className="pl-1 ">
                  {userService.userValue?.first_name + " "}
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
                className="hidden absolute right-0 w-48 mt-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
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
            </>
          ) : (
            <>
              <Link href="/account/login" className=" flex flex-row">
                <FaRegUser className="  border mx-2 text-lg rounded-full border-black " />
                <span className="hidden font-normal lg:block  lg:text-sm pe-2 account-icon">Account</span>
              </Link>
            </>
          )}
          <CartSideBar />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
