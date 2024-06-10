"use client";
// ProductCard.js
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import AddToCart from "./AddToCart";
import ViewProduct from "./ViewProduct";

const ProductCard = ({ product, className = "", showPrevPrice = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mainImage, setMainImage] = useState(product.main_image); // State to manage the main image

  return (
    <div
      className={` ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[240px] w-full overflow-hidden rounded-base lg:h-[200px] 2xl:h-[300px] relative ">
        {product.justIn == 1 && (
          <div className="absolute left-4 top-4 rounded-b-lg bg-black px-3 py-2 text-xs font-bold text-white shadow-md">
            Just In!
          </div>
        )}
        {/* <Link href={`/products/${product.slug}`} className="h-[250px] w-full lg:h-[220px]"> */}
        <Image
          src={mainImage}
          alt={`${product.product_name} cover photo`}
          className="h-full w-full border rounded-lg
           hover:bg-neutral-100 p-10 bg-transparent"
          loading="lazy"
          sizes="(max-width: 300px) 100vw, 300px"
          width={300}
          height={300}
        />
        {/* </Link> */}
        {isHovered && (
          <div className="absolute inset-0 flex justify-center items-center">
            <LikeButton className="absolute right-4 top-4" />

            <ViewProduct isVisible={true} slug={product.slug} />
          </div>
        )}
      </div>

      <div className="mt-2 ">
        <div className="flex flex-col items-start justify-between ">
          <h2 className="font-semibold text-[13px] lg:w-60 break-words">
            {product.product_name}
          </h2>
          <p className="text-xs text-neutral-500">{product.category_name}</p>

          {/* <p className={`text-neutral-500 ${showPrevPrice ? 'block' : 'hidden'} text-sm line-through`}>
            ${product.price}
          </p> */}
        </div>
        <div className="flex items-center justify-between mt-2 ">
          <p className="text-base font-bold ">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          <AddToCart productId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
