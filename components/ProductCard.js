import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import AddToCart from "./AddToCart";
import ViewProduct from "./ViewProduct";

const ProductCard = ({ product, className = "", showPrevPrice = false }) => {
  const images = product.main_image.split(','); 
  const [isHovered, setIsHovered] = useState(false);
  const [mainImage, setMainImage] = useState(images[0] || '/placeholder_image.jpg'); // State to manage the main image

  return (
    <div
      className={`rounded-md ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[240px] w-full overflow-hidden rounded-base lg:h-[200px] 2xl:h-[300px] relative">
        {product.justIn === 1 && (
          <div className="absolute left-2 top-2 rounded-b-lg bg-primary-light px-3 py-1 text-xs font-semibold text-white shadow-md">
            Just In!
          </div>
        )}
        <Link href={`/products/${product.slug}`} passHref>
          
            <Image
              src={mainImage}
              alt={`${product.product_name} cover photo`}
              className="h-full w-full hover:bg-neutral-light lg:p-8 p-4 bg-neutral-light"
              loading="lazy"
              sizes="(max-width: 300px) 100vw, 300px"
              width={300}
              height={300}
            />
          
        </Link>
        {isHovered && (
          <div className="absolute inset-0 flex justify-center items-center">
            <LikeButton className="absolute right-2 top-2" />
            <ViewProduct isVisible={true} slug={product.slug} />
          </div>
        )}
      </div>

      <div className="text-sm space-y-0 py-2">
        <div className="flex flex-col items-start justify-between space-y-1">
          <h4 className="font-semibold text-[13px] lg:w-60 break-words">
            {product.product_name}
          </h4>
          <p className="text-[11px] text-neutral-500">{product.category_name}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-primary-light">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          <AddToCart productId={product.id} className="px-3 py-1.5" title='Add' />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
