import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className="flex overflow-x-auto ">
      <Link
        href={`/productsCollection?categoryId=${category.id}`}
        className="flex flex-col items-center relative group"
      >
        <div
          className="relative flex flex-col justify-center items-center rounded-full  overflow-hidden 
        p-2 lg:size-24 size-16 "
        >
          <div
            className=" rounded-full border  transition-transform duration-500 
            ease-in-out scale-100 group-hover:scale-110 w-full h-full z-20  "
            style={{
              boxShadow: "0px 0px 0px 15px rgba(255,255,255, 0.3", // Custom shadow color
            }}
          />
          <Image
            src={category.image_url}
            alt={`Image of ${category.category_name}`}
            fill
            className="rounded-full transition-transform duration-500 ease-in-out scale-110 group-hover:scale-125"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Adjust sizes based on your layout
          />
        </div>
        <span className="flex mt-2 text-center lg:text-xs text-[10px] lg:font-semibold items-center">
          <span className="transition-all duration-300 ease-in-out">
            {truncateText(category.category_name, 20)}
          </span>
          <svg
            className=" w-3.5 h-3.5 ml-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 hidden lg:block"
            viewBox="0 0 24 24"
            role="img"
            aria-label={`Arrow icon indicating link to ${category.category_name}`}
          >
            <path
              fill="currentColor"
              d="M22.707 11.293L15 3.586 13.586 5l6 6H2c-.553 0-1 .448-1 1s.447 1 1 1h17.586l-6 6L15 20.414l7.707-7.707c.391-.391.391-1.023 0-1.414z"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
};

export default CategoryCard;
