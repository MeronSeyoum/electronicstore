import React, { useState } from "react";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { LuInfo } from "react-icons/lu";
import { MdStar } from "react-icons/md";
import { PiSealCheckFill } from "react-icons/pi";

import ImageShowCase from "components/ImageShowCase";
import AddToCart from "components/AddToCart";
import ButtonPrimary from "shared/Button/ButtonPrimary";
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
  const [selectedColor, setSelectedColor] = useState(
    productAttributes.color[0]
  );
  const [selectedRAM, setSelectedRAM] = useState(productAttributes.RAM[0]);
  const [selectedStorage, setSelectedStorage] = useState(
    productAttributes.internalStorage[0]
  );

  return (
    <div className="items-stretch justify-between space-y-10 lg:flex lg:space-y-0">
      
      <div className="lg:basis-[35%]">
        <ImageShowCase productImage={productImage} />
      </div>

      <div className="lg:basis-[55%]">
        <ProductHeading
          productName={productName}
          categoryName={categoryName}
          rating={rating}
          reviews={reviews}
          currentPrice={currentPrice}
          prevPrice={prevPrice}
        />


        <div className="flex gap-3 mb-3 items-center font-medium">
          <h1 className="text-primary text-[20px]">
            ${parseFloat(currentPrice).toFixed(2)}
          </h1>
          <p className="text-neutral-500 line-through text-sm">
            ${parseFloat(prevPrice).toFixed(2)}
          </p>
          <p className="text-green-500 text-sm font-bold">55% Off</p>
        </div>
        <div className="mb-6">
          <span className="font-semibold text-[13px]">Description:</span>
          <p className="product-desc">{productDesc}</p>
        </div>
        <div className="flex lg:flex-row  flex-col justify-between">
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
        <div className="my-">
          <InputNumber />
        </div>

        <div className="my-4 flex items-center gap-x-5">
          <ButtonSecondary className="border-2 text-black border-primary">
            Buy Now
          </ButtonSecondary>
          <AddToCart
            productId={productId}
            className="px-6 py-3.5 rounded-md"
            title="Add To Cart"
          />
        </div>

        <div className="mb-4 flex items-end justify-between">
          <p className="text-sm font-semibold">Available specs:</p>
          <p className="flex items-center gap-1 text-sm text-neutral-500">
            Specs guide <LuInfo />
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductHeading = ({
  rating,
  reviews,
  productName,
  categoryName
}) => (
  <Heading isMain className="gap-y-3">
    <div className="flex flex-row items-center gap-1 mb-1 text-neutral-500 font-normal text-xs">
      <MdStar className="text-yellow-400 text-sm" />
      <div className="flex flex-row gap-3">
        <p className="border-r-2 pr-3">{rating}</p>
        <p className="border-r-2 pr-3">{`${reviews} Reviews`}</p>
        <p>10 items sold</p>
      </div>
      <PiSealCheckFill className="text-green-600" />
    </div>
    <div className="text-xl font-semibold">{productName}</div>
    <div className="">
      <span className="font-medium text-neutral-500 text-sm">
        {categoryName}
      </span>
    </div>
  </Heading>
);

const ColorOptions = ({ colors, selectedColor, setSelectedColor }) => (
  <div className="mb-4">
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
            <div className="w-full h-full rounded-full border-2 border-black" />
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
          className={`text-xs px-2 py-1 border ${
            selectedSize === size ? "border-primary" : "border-gray-300"
          } rounded`}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);

const StorageOptions = ({
  storageOptions,
  selectedStorage,
  setSelectedStorage,
}) => (
  <div className="mb-4">
    <h3 className="text-sm font-medium mb-2">
      Internal Storage: {selectedStorage}
    </h3>
    <div className="flex gap-2">
      {storageOptions.map((storage) => (
        <button
          key={storage}
          className={`text-xs px-2 py-1 border ${
            selectedStorage === storage ? "border-primary" : "border-gray-300"
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
