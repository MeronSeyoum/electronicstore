import React from "react";
import Image from "next/image";

const CategoryCard = ({category}) => {
  return (
    
       <div key={category.id} className="flex flex-col flex-grow  justify-center items-center  w-[120px] ">
        <div className="relative w-22 h-22 rounded-full  bg-neutral-200   ">
          <Image
            src={category.image_url}
            alt={category.category_name}
            width={50}
            height={50}
            className="w-24 h-24 object-contain p-1 rounded-full "
          />
        </div>
        <div className="  w-full  text-black pt-2">
          <p className="text-center text-xs">{category.category_name}</p>
        </div>
      </div>
   
  );
};

export default CategoryCard;
