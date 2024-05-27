import React from 'react';
import Image from 'next/image';
import { BsBag } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { LuInfo } from 'react-icons/lu';
import { MdStar } from 'react-icons/md';
import { PiSealCheckFill } from 'react-icons/pi';

import ImageShowCase from 'components/ImageShowCase';
import { productAttributes } from 'data/content';
import samsung_profile from 'images/samsung_profile.png';
import ButtonCircle3 from 'shared/Button/ButtonCircle3';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import Heading from 'shared/Heading/Heading';
import InputNumber from 'shared/InputNumber/InputNumber';

const SectionProductHeader = ({
  shots,
  productName,
  categoryName,
  prevPrice,
  currentPrice,
  rating,
  reviews,
}) => {
  return (
    <div className="items-stretch justify-between space-y-10 lg:flex lg:space-y-0">
      <div className="basis-[50%]">
        <ImageShowCase shots={shots} />
      </div>

      <div className="basis-[45%]">
        <Heading className="mb-2" isMain title="new arrival!">
          {productName}
        </Heading>

        <div className="mb-6 flex items-center">
          <div className="flex items-center gap-1">
            <ButtonCircle3
              className="overflow-hidden border border-neutral-400"
              size="w-11 h-11"
            >
              <Image
                src={samsung_profile}
                alt="_profile"
                className="h-full w-full object-cover"
              />
            </ButtonCircle3>
            <span className="font-medium">{categoryName}</span>
            <PiSealCheckFill className="text-blue-600" />
          </div>
          <GoDotFill className="mx-3 text-neutral-500" />
          <div className="flex items-center gap-1">
            <MdStar className="text-yellow-400" />
            <p className="text-sm">
              {rating}{' '}
              <span className="text-neutral-500">{`(${reviews} Reviews)`}</span>
            </p>
          </div>
          <GoDotFill className="mx-3 text-neutral-500" />
          <p className="text-neutral-500">{`10 items sold`}</p>
        </div>

        <div className="mb-3 space-y-1">
          <p className="text-neutral-500 line-through">${prevPrice}</p>
          <h1 className="text-3xl font-medium text-primary">${currentPrice}</h1>
        </div>

        <div className="mb-4 flex items-end justify-between">
          <p className="text-lg font-semibold">Available specs</p>
          <p className="flex items-center gap-1 text-sm text-neutral-500">
            Specs guide <LuInfo />
          </p>
        </div>

        <div className='flex flex-col gap-3'>
      {/* Display color options */}
      <h2  className="text-sm font-semibold ">Color</h2>
      <div className="flex flex-wrap gap-2">
        {productAttributes.color.map((color) => (
          <ProductAttributeButton key={color} attribute={color} />
        ))}
      </div>

      {/* Display RAM options */}
      <h2  className="text-sm font-semibold ">RAM</h2>

      <div className="flex flex-wrap gap-2">
        {productAttributes.RAM.map((ram) => (
          <ProductAttributeButton key={ram} attribute={ram} />
        ))}
      </div>

      {/* Display internal storage options */}
      <h2  className="text-sm font-semibold ">internalStorage</h2>

      <div className="flex flex-wrap gap-2">
        {productAttributes.internalStorage.map((storage) => (
          <ProductAttributeButton key={storage} attribute={storage} />
        ))}
      </div>
    </div>

        <div className="mt-3 flex items-center gap-5">
        <InputNumber />
          
          <ButtonPrimary className="w-full">Buy Now</ButtonPrimary>
          <ButtonSecondary className="flex w-full items-center gap-1 border-2 border-primary text-primary">
            <BsBag /> Add to cart
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};
const ProductAttributeButton = ({ attribute }) => {
  return (
    <button className="border-2 border-gray-200 text-black text-sm  px-3 py-1">
      {attribute}
    </button>
  );
};

export default SectionProductHeader;
