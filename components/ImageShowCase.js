"use client";
import React, { useState } from "react";
import Image from "next/image";
import LikeButton from "./LikeButton";

const ImageShowCase = ({ productImage }) => {
  const images = productImage.split(','); // Convert the comma-separated string to an array
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Initialize with the first image

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-y-3 ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`${
              activeImageIndex === index ? "border border-primary rounded-md" : ""
            } h-20 w-20 overflow-hidden border rounded-md p-1`}
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
      <div className="flex h-[450px] w-[270px] lg:w-[490px] justify-center rounded-lg  bg-neutral-200">
        <Image
          src={images[activeImageIndex]}
          alt={`product-image-${activeImageIndex}`}
          height={400}
          width={350}
          objectFit="cover"
        />
        <LikeButton className="relative -right-5 top-5 p-2 border" />
      </div>
    </div>
  );
};

export default ImageShowCase;
