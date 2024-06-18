import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  return (
    <div className="flex flex-col flex-grow justify-center items-center w-[120px]">
      <Link href={`/productsCollection?categoryId=${category.id}`}>
        <div className="relative w-22 h-22 rounded-full bg-neutral-200 cursor-pointer">
          <Image
            src={category.image_url}
            alt={`Image of ${category.category_name}`}
            width={50}
            height={50}
            className="w-24 h-24 object-contain p-1 rounded-full"
          />
        </div>
        <div className="w-full text-black pt-2">
          <p className="text-center text-xs">{category.category_name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
