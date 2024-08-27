"use client";
import React, { useState } from "react";
import Image from "next/image";
import LikeButton from "./LikeButton";

// Helper function to check if a string is a base64 encoded image
const isBase64 = (str) => {
  const base64Pattern = /^data:image\/(png|jpg|jpeg|gif);base64,/;
  return base64Pattern.test(str);
};

const ImageShowCase = ({ productImages, main_image }) => {
  let images = [];

  if (productImages && Array.isArray(productImages)) {
    // Extract image sources from the array
    images = productImages.map(image =>
      image.src // Extract the image source
    );
  }

  // Default to the main_image if available
  const [activeImageIndex, setActiveImageIndex] = useState(
    images.indexOf(main_image) !== -1 ? images.indexOf(main_image) : 0
  );

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-between">
      <div className="flex lg:flex-col flex-row lg:gap-3 gap-1 lg:m-0 m-1 lg:pr-3">
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
                src={image || '/placeholder_image.jpg'}
                alt={`image-${index}`}
                width={80}
                height={100}
                style={{
        objectFit: 'cover',
      }}
                className=""
              />
            </button>
          </div>
        ))}
      </div>
      <div className="flex h-[350px] w-[326px] lg:h-[440px] lg:w-[500px] justify-center lg:rounded-r-lg 
        bg-neutral-light">
        <Image
          src={images[activeImageIndex] || '/placeholder_image.jpg'}
          alt={`product-image-${activeImageIndex}`}
          height={400}
          width={400}
          style={{  objectFit: "contain"}}
          className="p-2 rounded-xl"
        />
        <LikeButton className="lg:relative absolute
         lg:-right-5 right-8 mt-3 p-2 border" />
      </div>
    </div>
  );
};

export default ImageShowCase;
