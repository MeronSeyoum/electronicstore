import React, { useState } from "react";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { LuInfo } from "react-icons/lu";
import { MdStar } from "react-icons/md";
import { PiSealCheckFill } from "react-icons/pi";

import ImageShowCase from "components/ImageShowCase";
import AddToCart from "components/AddToCart";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Heading from "shared/Heading/Heading";
import InputNumber from "shared/InputNumber/InputNumber";

const productAttributes = {
  color: ["Navy", "Black", "Gray"],
  RAM: ["4GB", "8GB", "16GB"],
  internalStorage: ["128GB", "256GB", "512GB"],
};

const SectionProductHeader = ({
  productId,
  productImage,
  productName,
  categoryName,
  productDesc,
  prevPrice,
  currentPrice,
  rating,
  reviews,
}) => {
  const [selectedColor, setSelectedColor] = useState(productAttributes.color[0]);
  const [selectedRAM, setSelectedRAM] = useState(productAttributes.RAM[0]);
  const [selectedStorage, setSelectedStorage] = useState(productAttributes.internalStorage[0]);
  const [quantity, setQuantity] = useState(1); // Manage quantity state
  
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between ">
      <div className="lg:hidden">
      {/* for mobile screen */}
        <ProductHeading
          productName={productName}
          categoryName={categoryName}
          rating={rating}
          reviews={reviews}
          currentPrice={currentPrice}
          prevPrice={prevPrice}
        />
      </div>

      <div className="lg:basis-[45%] lg:bg-white lg:p-3 rounded-lg border shadow-md">
        <ImageShowCase productImage={productImage} />
      </div>


      <div className="lg:basis-[50%] flex flex-col">
        <div className="hidden lg:block">
        {/* for large screen */}
          <ProductHeading
            productName={productName}
            categoryName={categoryName}
            rating={rating}
            reviews={reviews}
            currentPrice={currentPrice}
            prevPrice={prevPrice}
          />
        </div>


        <div className="lg:my-2 mt-4  flex  items-end justify-between">
          <p className="text-sm font-semibold">Available specs:</p>
          <p className="flex items-center gap-1 text-sm text-neutral-500">
            Specs guide <LuInfo />
          </p>
        </div>  
        
        <div className="flex flex-col gap-3 justify-between lg:pt-2 lg:mt-0 mt-4">
          <ColorOptions
            colors={productAttributes.color}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <SizeOptions
            sizes={productAttributes.RAM}
            selectedSize={selectedRAM}
            setSelectedSize={setSelectedRAM}
            title="RAM"
          />
          <StorageOptions
            storageOptions={productAttributes.internalStorage}
            selectedStorage={selectedStorage}
            setSelectedStorage={setSelectedStorage}
          />
        </div>
        <div className="flex flex-col flex-nowrap lg:gap-0 gap-2 mt-4">
          <div className="flex flex-row gap-2 lg:mb-2">
            <span>
            <InputNumber
              className="py-1.5 px-4"
              value={quantity}
              onChange={handleQuantityChange}
            />
            </span>
            <AddToCart
              productId={productId}
              quantity={quantity}
              price={currentPrice}
              className="lg:px-7  px-12 py-2.5 border border-black rounded-md"
              title="Add To Cart"
            />
          </div>
          {/* <div className="flex flex-grow items-center w-full">
            <ButtonSecondary className="text-white bg-red-500 w-72">
              Buy Now
            </ButtonSecondary>
          </div> */}
        </div>

       
      </div>
    </div>
  );
};

const ProductHeading = ({ rating, reviews, productName, categoryName, currentPrice, prevPrice }) => (
  <Heading isMain className="lg:pb-0 pb-2">
    <div className="flex flex-row items-center gap-1 text-neutral-500 font-normal text-xs">
      <MdStar className="text-yellow-400 text-sm" />
      <div className="flex flex-row gap-3">
        <p className="border-r-2 pr-3">{rating}</p>
        <p className="border-r-2 pr-3">{`${reviews} Reviews`}</p>
        <p>10 items sold</p>
      </div>
      <PiSealCheckFill className="text-green-600" />
    </div>
    <div className="py-1">
    <h1 className="product-title">{productName}</h1>
    <p className="font-medium text-neutral-500 text-xs">{categoryName}</p>
    </div>
    <div className="flex gap-3  items-center font-medium lg:mt-2">
      <h1 className="text-primary lg:text-2xl ">
        ${parseFloat(currentPrice).toFixed(2)}
      </h1>
      <p className="text-neutral-500 line-through text-base">
        ${parseFloat(prevPrice).toFixed(2)}
      </p>
      <p className="text-green-500 text-sm font-bold">55% Off</p>
    </div>

  </Heading>
);

const ColorOptions = ({ colors, selectedColor, setSelectedColor }) => (
  <div className="">
    <h3 className="text-sm font-medium mb-2">Color: {selectedColor}</h3>
    <div className="flex gap-2">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-6 h-6 rounded-full cursor-pointer`}
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
        >
          {selectedColor === color && (
            <div className="w-full h-full rounded-full border border-primary" />
          )}
        </div>
      ))}
    </div>
  </div>
);

const SizeOptions = ({ sizes, selectedSize, setSelectedSize, title }) => (
  <div className="mb-4">
    <h3 className="text-sm font-medium mb-2">
      {title}: {selectedSize}
    </h3>
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          className={`text-xs px-2 py-1 border ${selectedSize === size ? "border-primary" : "border-gray-300"
            } rounded`}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);

const StorageOptions = ({ storageOptions, selectedStorage, setSelectedStorage }) => (
  <div className="mb-4">
    <h3 className="text-sm font-medium mb-2">
      Internal Storage: {selectedStorage}
    </h3>
    <div className="flex gap-2">
      {storageOptions.map((storage) => (
        <button
          key={storage}
          className={`text-xs px-2 py-1 border ${selectedStorage === storage ? "border-primary" : "border-gray-300"
            } rounded`}
          onClick={() => setSelectedStorage(storage)}
        >
          {storage}
        </button>
      ))}
    </div>
  </div>
);

export default SectionProductHeader;
