import React from 'react';
import Image from 'next/image';
import { MdStar } from 'react-icons/md';
import { PiSealCheckFill } from 'react-icons/pi';

import ButtonSecondary from 'shared/Button/ButtonSecondary';

const BrandCard = ({
  brandName,
  rating,
  reviews,
  followers,
  visitLink,
  logo,
  products,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-300 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-20 w-20 overflow-hidden rounded-lg">
            <Image
              src={logo}
              alt="logo"
              className="h-full w-full object-contain object-center p-2"
              
            />
          </div>
          <div>
            <h3 className="flex items-center gap-1 text-lg font-medium">
              {brandName} <PiSealCheckFill className="text-blue-600" />
            </h3>
            <div className="flex items-center gap-1">
              <MdStar className="text-yellow-400" />
              <p className="text-sm">
                {rating}{' '}
                <span className="text-neutral-500">{`(${reviews} Reviews)`}</span>
              </p>
            </div>
            <p className="text-sm text-neutral-500">{followers}M Followers</p>
          </div>
        </div>

        <ButtonSecondary
          className="border border-black "
          to={visitLink}
        onClick={''}
        >
          Visit
        </ButtonSecondary>
        {/* <button className="rounded-full bg-white text-black hover:bg-primary/80 disabled:bg-opacity-70 px-5 py-3"> Event details</button> */}

      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {products.map((product, index) => (
          <div
            key={index}
            className="h-[150px] overflow-hidden rounded-lg border p-4"
          >
            <Image
              src={product}
              alt="product Image"
              className="h-full w-full object-contain object-bottom"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCard;
