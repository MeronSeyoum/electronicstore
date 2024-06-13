import Link from "next/link";
import React, { useState } from "react";
import useDataFetch from "hooks/useDataFetch";

const MenuItem = () => {
  // Define an array of menu items
  const { fetchedData, error } = useDataFetch("/api/category");

  const menuLink = [
    // { label: "Home", href: "/" },
    { label: "Collections", href: "/productsCollection" },
   { label: "Shop", href: "/collections/all" },
     { label: "Gears", href: "/gears" },
    { label: "Accessories", href: "/accessories" },
    { label: "Blog", href: "/blogs/news" },
    { label: "Contact", href: "/pages/contact" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="container ms-menu-container  translate-x-0 hidden lg:block z-2">
      <div className="flex h-11">
        <button
          type="button"
          className="w-64 "
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <h3
            className=" flex justify-between items-center bg-primary
            text-white rounded-t-md shopCategory font-normal text-[14px] cursor-pointer"
          >
            <svg
              className="w-4 h-4 align-middle mr-2 text-white relative"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g data-name="menu">
                <path d="M29,6H3A1,1,0,0,0,3,8H29a1,1,0,0,0,0-2Z" fill="currentColor"></path>
                <path d="M3,17H16a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z" fill="currentColor"></path>
                <path d="M25,24H3a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z" fill="currentColor"></path>
              </g>
            </svg>

            SHOP BY CATEGORIES
            <svg
              aria-hidden="true"
              focusable="false"
              className="w-4 h-4"
              viewBox="0 0 10 6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                fill="currentColor"
              ></path>
            </svg>
          </h3>
        </button>
        <div
          id="dropdown-menu"
          className={`${isDropdownOpen ? "block" : "hidden"
            } absolute w-64 mt-2 origin-top-left
           bg-white 
            divide-gray-00 rounded-md shadow-lg ring-1
             ring-black ring-opacity-5 focus:outline-none`}
        >
          <ul
            className="
           absolute py-4 mt-12 bg-white w-full  rounded-b-md "
          >
            {fetchedData.map((item, index) => (
              <li key={index} className="">
                <Link
                  href={"#"}
                  className="text-gray-700 font-normal text-[14px] no-underline block py-1 px-3 leading-6 cursor-pointer "
                >
                  {item.category_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* link bars */}
        <ul className="flex flex-wrap justify-between items-center ">
          {menuLink.map((links, index) => (
            <li key={index}>
              <a
                href={links.href}
                className="px-3 py-3 font-semibold text-gray-700 no-underline text-[14px] focus-inset hidden lg:block"
              >
                {links.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuItem;
