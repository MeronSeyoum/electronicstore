"use client";
import React, { useState } from "react";
import Image from "next/image";
import LikeButton from "./LikeButton";
import { products } from "data/content";

const ImageShowCase = ({ productImage }) => {
   const [activeImageIndex, setActiveImageIndex] = useState(productImage);
  // Combine productImage with shots
 const productImages = [{ src: productImage }, ...products[0].shots];
 
  return (
    <div className="flex flex-row justify-between ">
      <div className="flex flex-col gap-y-3 ">
        {productImages.map((shot, index) => (
          <div
            key={shot.src}
            className={`${
              activeImageIndex === index ? "border-2 border-primary" : ""
            } h-20 w-20 overflow-hidden`}
          >
            <button
              className="h-full w-full"
              type="button"
              onClick={() => setActiveImageIndex(shot)}
            >
              <Image
                src={shot.src}
                alt={`image-${index}`}
                width={65}
                height={40}
                objectFit="cover"
                className=""
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex  h-[450px] w-[270px] lg:w-[350px]">
        <Image
          src={activeImageIndex}
          alt={`product-image-${activeImageIndex}`}
          height={400}
          width={350}
          objectFit="contain"
        />
        <LikeButton className="relative right-6" />
      </div>
    </div>
  );
};

export default ImageShowCase;
