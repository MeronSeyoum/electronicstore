// ViewProduct.js
import React from "react";
import Link from "next/link";
import { SlSizeFullscreen } from "react-icons/sl";

const ViewProduct = ({ slug, isVisible }) => {
  return (
    <div
      className={`absolute bottom-6 
    transform translate-y-1/2 right-0
     -translate-x-1/2 border border-1  p-2.5
     ml-5 rounded-full bg-white opacity-${
       isVisible ? "100" : "0"
     } transition-opacity duration-3 shadow-lg shadow-gray-300
     `}
    >
      <Link
        href={`/products/${slug}`}
        className="bg-white text-black text-sm  rounded-full   "
      >
        <SlSizeFullscreen className="text-black text-sm " />
      </Link>
    </div>
  );
};

export default ViewProduct;
