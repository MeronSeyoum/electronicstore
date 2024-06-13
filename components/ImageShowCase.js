"use client";
import React, { useState } from "react";
import Image from "next/image";
import LikeButton from "./LikeButton";
import { products } from "data/content";

const ImageShowCase = ({ productImage }) => {
  // Combine productImage with shots
  const productImages = [{ src: productImage }, ...products[0].shots];
  const [activeImageIndex, setActiveImageIndex] = useState(productImage);

  return (
    <div className="flex flex-row mt-2 gap-x-6">
      <div className="flex flex-col lg:gap-y-2">
        {productImages.map((shot, index) => (
          <div
            key={shot.src}
            className={`${
              activeImageIndex === index ? "border-2 border-primary" : ""
            } h-24 w-18 overflow-hidden`}
          >
            <button
              className="h-full w-full"
              type="button"
              onClick={() => setActiveImageIndex(shot)}
            >
              <Image
                src={shot.src}
                alt={`image-${index}`}
                width={70}
                height={50}
                objectFit="cover"
                className=""
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center rounded-2xl h-[500px] w-[500px]">
        <Image
          src={activeImageIndex}
          alt={`product-image-${activeImageIndex}`}
          height={500}
          width={500}
          objectFit="contain"
        />
        <LikeButton className="relative right-6" />
      </div>
    </div>
  );
};

export default ImageShowCase;
