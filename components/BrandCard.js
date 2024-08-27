import React from 'react';
import Image from 'next/image';
import { MdStar } from 'react-icons/md';
import { PiSealCheckFill } from 'react-icons/pi';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import apple from 'images/apple.png';

const BrandCard = ({
  brandName,
  rating = 4.5,
  reviews = 10,
  followers = '2 M',
  visitLink,
  logo = apple,
  products,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-300 p-6 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 overflow-hidden rounded-lg bg-white flex items-center justify-center">
            <Image src={logo} alt={`${brandName} logo`} className="object-contain" />
          </div>
          <div>
            <h3 className="flex items-center gap-1 text-base font-medium">
              {brandName} <PiSealCheckFill className="text-blue-600" />
            </h3>
            <div className="flex items-center gap-1 text-sm text-neutral-500">
              <MdStar className="text-yellow-400" />
              <span>{rating}</span>
              <span>{`(${reviews} Reviews)`}</span>
            </div>
            <p className="text-sm text-neutral-500">{`${followers} Followers`}</p>
          </div>
        </div>

        <ButtonSecondary to={visitLink} className="border border-black px-4 py-2">
          Visit
        </ButtonSecondary>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {products.map((product, index) => (
          <div key={index} className="h-[120px] overflow-hidden rounded-lg border p-2 bg-neutral-light">
            <Image
              src={product.main_image}
              alt={`${product.name} image`}
              className="h-full w-full object-contain object-center rounded-md"
              width={80}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCard;
