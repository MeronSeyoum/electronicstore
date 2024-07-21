"use client";
import React, { useState } from "react";
import Image from "next/image";
import LikeButton from "./LikeButton";

const ImageShowCase = ({ productImage }) => {
  const images = productImage.split(','); // Convert the comma-separated string to an array
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Initialize with the first image

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-between">
      <div className="flex lg:flex-col flex-row lg:gap-3 gap-1 lg:m-0 m-1">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              activeImageIndex === index ? "border border-primary rounded-md" : ""
            } h-20 w-20 overflow-hidden border rounded-md lg:p-1 p-1.5 lg:bg-neutral-50  bg-neutral-light`}
          >
            <button
              className="h-full w-full"
              type="button"
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={image}
                alt={`image-${index}`}
                width={80}
                height={100}
                objectFit="cover"
                className=""
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex h-[450px] w-[326px] lg:w-[500px] justify-center lg:rounded-r-lg 
        bg-neutral-light">
        <Image
          src={images[activeImageIndex]}
          alt={`product-image-${activeImageIndex}`}
          height={400}
          width={400}
          objectFit="contain"
          className="lg:p-2"
        />
        <LikeButton className="lg:relative absolute
         lg:-right-5 right-8 mt-3  p-2 border" />
      </div>
    </div>
  );
};

export default ImageShowCase;
