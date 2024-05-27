'use client'
// ProductCard.js
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from './LikeButton';
import AddToCart from './AddToCart';
import ViewProduct from './ViewProduct';

const ProductCard = ({ product, className = '', showPrevPrice = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mainImage, setMainImage] = useState(product.main_image); // State to manage the main image

  return (
    <div
      className={`relative rounded-2xl p-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[250px] w-full overflow-hidden rounded-base lg:h-[200px] 2xl:h-[300px] relative">
        {product.justIn == 1 && (
          <div className="absolute left-4 top-4 rounded-b-lg bg-black px-3 py-2 text-xs font-bold text-white shadow-md">
            Just In!
          </div>
        )}
        {/* <Link href={`/products/${product.slug}`} className="h-[250px] w-full lg:h-[220px]"> */}
        <Image
          src={mainImage}
          alt={`${product.product_name} cover photo`}
          className="h-full w-full object-contain object-bottom border rounded-lg hover:bg-neutral-100 p-3 bg-neutral-100"
          width={200}
          height={200}
        />
        {/* </Link> */}
        {isHovered && (

          <div className='absolute inset-0 flex justify-center items-center'>
            <LikeButton className="absolute right-4 top-4" />

            <ViewProduct isVisible={true} slug={product.slug} />
          </div>
        )}
      </div>

      <div className="mt-2 ">
        <div className="flex flex-col items-start justify-between ">
          <h2 className="font-semibold text-[13px] w-60">{product.product_name}</h2>
          <p className="text-xs text-neutral-500">{product.category_name}</p>

          {/* <p className={`text-neutral-500 ${showPrevPrice ? 'block' : 'hidden'} text-sm line-through`}>
            ${product.price}
          </p> */}
        </div>
        <div className="flex items-center justify-between mt-2 ">
        <p className="text-base font-bold ">${parseFloat(product.price).toFixed(2)}</p>
          <AddToCart productId={product.id} />
        </div>

      </div>

    </div>
  );
};

export default ProductCard;




{/* Four small images */ }
{/* <div className="grid grid-cols-8 gap-1 mt-3 ">
        {products.shots.map((smallImage, index) => (
          <div key={index}>
            <Image
              src={smallImage}
              alt={`Small image ${index}`}
              width={40}
              height={40}
              className="cursor-pointer border border-gray-300 rounded"
              onMouseEnter={() => setMainImage(smallImage)} // Update the main image on mouse hover
            />
          </div>
        ))}
      </div> */}

{/* <div className="mt-5 flex items-center">
        <InputNumber />
        <ButtonSecondary className="w-full rounded-full bg-primary text-white text-xs" onClick={''}>
          <BsBag className='me-2'/> Add to cart
        </ButtonSecondary>
      </div> */}