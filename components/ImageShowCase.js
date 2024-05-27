'use client';
import React, { useState } from 'react';

import LikeButton from './LikeButton';

import { products } from 'data/content';
import Image from 'next/image';
const ImageShowCase = ({ shots }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-300 p-2">
      <div className="relative overflow-hidden rounded-2xl md:h-[400px]">
        <LikeButton className="absolute right-5 top-5" />
      
        <Image
          src={shots}
          alt="product image"
          layout="fill"
          objectFit="contain"
        />
      
      </div>
      <div className="grid grid-cols-8 gap-2">
        {products[0].shots.map((shot, index) => (
          <div
            key={shot.src}
            className={`${
              activeImageIndex === index ? 'border-2 border-primary' : ''
            } h-[100px] overflow-hidden rounded-lg`}
          >
            <button
              className="h-full w-full"
              type="button"
              onClick={() => setActiveImageIndex(index)}
            >
              <Image
                src={shot.src}
                alt={`image-${index}`}
                width={100}
                height={100}
                objectFit="contain"
              /> </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageShowCase;
