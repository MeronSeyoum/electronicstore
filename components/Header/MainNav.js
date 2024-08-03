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
import UserAvatar from "components/UserAvatar";
const MainNav = ({ onSearchIconClick }) => {
  const [user, setUser] = useState(null);
  const userId = userService.id;
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="container flex items-center justify-between lg:py-2 ">
      <div className="flex-1 lg:hidden">
        <MenuBar />
      </div>
      <div className="flex items-center basis-[60%]">
        <Logo />
      </div>
      <div className="hidden lg:flex items-center justify-center flex-grow basis-[40%] me-10">
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
            <UserAvatar userService={userService} />

             </>
          ) : (
            <>
              <Link href="/account/login" className=" flex flex-row">
                <FaRegUser className="  border mx-3 text-lg rounded-full border-black " />
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
