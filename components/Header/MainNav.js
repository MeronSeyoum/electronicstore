"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaRegBell, FaRegUser, FaLock  } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";

// import avatar from "images/Linkvatar.png";
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

  // only show nav when logged in
  // if (!user) return null;

  return (
    <div className="container ms-menu-container flex items-center justify-between py-2.5">
      <div className="flex-1 lg:hidden block">
        <MenuBar />
      </div>
      <div className="flex items-center pr-5 basis-[61%] ">
        <Logo />
        <div className="hidden w-full max-w-xl items-center gap-5 py-0
         rounded-full border border-neutral-300  lg:flex">
          <Input
            type="text"
            className=" border-white rounded-full border-0 bg-white
             placeholder:text-neutral-500 focus:border-transparent mx-0"
            placeholder="try 'Iphone 14 Max'"
          />
          <RiSearch2Line className="text- text-neutral-500 me-3 " />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-5">
        <div className="relative hidden lg:block">
          <span className="absolute -top-1/4 left-3/4 aspect-square w-3 rounded-full bg-red-600" />
          <FaRegBell className="text-lg" />
        </div>

        <div className="flex items-center divide-x divide-neutral-300">
          {user ? (
            // Render user account info if logged in
            <>
             <div className="relative inline-block text-left z-10">
                {/* Trigger */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full p-2 lg:px-4 lg:py-1
                   text-sm font-medium text-gray-700 bg-white 
                   rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:red-400
                    focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={() => {
                    const dropdown = document.getElementById("dropdown-menu");
                    dropdown.classList.toggle("hidden");
                  }}
                >
                  {/* User icon (replace with actual user icon) */}
                  <FaRegUser className="text-sm" />
                  {/* User name */}
                  <span className="pl-2">
                    {userService.userValue?.first_name 
                    //+" " + userService.userValue?.last_name
                    }
                  </span>
                  {/* Dropdown arrow icon */}
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

                {/* Dropdown menu */}
                <div
                  id="dropdown-menu"
                  className="hidden absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1">
                    {/* Dropdown items (replace with actual links/actions) */}
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </div>
                  <div className="py-1">
                    <Link
                      href="#"
                      onClick={userService.logout}
                      className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Render login/signup link if not logged in
            <div className="flex  items-center  text-sm">
            <Link href="/account/login"><FaRegUser className="text-lg" /></Link>
              <Link href="/account/login" className="account-icon hover:bg-primary">
                <span className="hidden  lg:block pb-0 ">
                  Sign In 
                </span>
                {/* <div className="flex flex-row gap-2">
                <span className="hidden text-sm font-semibold md:block flex-row ">
                  My account 
                </span>
               <FaLock  className=" hidden text-xs lg:block mt-1" />
               </div> */}
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

