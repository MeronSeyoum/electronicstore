import React from 'react';
import { footerBannerData } from 'data/content';
import Heading from 'shared/Heading/Heading';
import ButtonSecondary from '../Button/ButtonSecondary';

const FooterBanner = () => {
  return (
    <div
      className="flex flex-col items-center justify-center  rounded-2xl bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url("/bgProduct.jpg")`, backgroundSize: '100% 100%', minHeight: '400px' }}
    >
      <Heading className="mb-0 " isMain isCenter>
        {footerBannerData.heading}
      </Heading>
      <p className="mx-auto my-10 w-[80%] text-center md:w-[50%]">
        {footerBannerData.description}
      </p>
      <div className="flex items-center justify-center">
        <ButtonSecondary className="bg-white text-black" onClick={''} sizeClass="px-5 py-4">
          More About Us
        </ButtonSecondary>
      </div>
    </div>
  );
};


export default FooterBanner;
