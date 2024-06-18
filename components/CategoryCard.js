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
    <div className="flex flex-col justify-center items-center lg:w-[120px] w-[100px]">
      <Link href={`/productsCollection?categoryId=${category.id}`}>
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-20 h-20 rounded-full bg-neutral-200 cursor-pointer">
            <Image
              src={category.image_url}
              alt={`Image of ${category.category_name}`}
              layout="fill"
              className="w-20 h-20 lg:p-1 object-contain p-2 rounded-full"
            />
          </div>
          <div className="w-full text-black pt-2">
            <p className="text-center lg:text-xs text-sm">
              {category.category_name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
