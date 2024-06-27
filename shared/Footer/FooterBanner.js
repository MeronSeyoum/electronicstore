import React from 'react';
import { useRouter } from 'next/router';
import { footerBannerData } from 'data/content';
import Heading from 'shared/Heading/Heading';
import ButtonSecondary from '../Button/ButtonSecondary';

const FooterBanner = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/products/sample-product');
  };

  return (
    <div
      className="flex flex-col items-center justify-between py-10 rounded-lg bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url("/bgProduct2.jpg")`, backgroundSize: '100% 100%', minHeight: '400px' }}
    >
      <Heading className="mb-0 text-black" isMain isCenter>
        {footerBannerData.heading}
      </Heading>
      <p className="mx-auto my-10 lg:w-[80%] text-center w-[50%]">
        {footerBannerData.description}
      </p>
      <div className="flex items-center justify-center">
        <ButtonSecondary className="text-white bg-black" sizeClass="px-5 py-4" onClick={handleButtonClick}>
          More About Us
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default FooterBanner;
