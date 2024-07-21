import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="flex flex-col justify-center items-center lg:w-[120px] w-[100px] -ml-3">
      <Link href={`/productsCollection?categoryId=${category.id}`}>
        <div className="flex flex-col justify-center items-center">
          <div className="relative lg:w-20 lg:h-20 w-16 h-16 rounded-full bg-neutral-light cursor-pointer">
            <Image
              src={category.image_url}
              alt={`Image of ${category.category_name}`}
              layout="fill"
              className="lg:w-20 lg:h-20 w-16 h-16 lg:p-1 object-contain p-2 rounded-full"
            />
          </div>
          <div className="w-full text-black pt-2">
            <p className="text-center lg:text-xs text-xs">
              {category.category_name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
