import React from "react";
import { useRouter } from 'next/router';

import PromoTag from "components/PromoTag";
import { headerSection } from "data/content";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const SectionHomeBanner = () => {
  const router = useRouter();
 
  const handleButtonClick = () => {
    router.push('/products/playstation-2');
  };

  return (
    <div className=" items-stretch gap-y-5 py-0 lg:flex lg:gap-5  lg:gap-y-10 md:h-72  ">
      {/* header banner */}
      <div
        className="lg:w-1/2 items-center space-y-10 rounded-lg  p-4 
       lg:flex lg:space-y-10 lg:mb-4  mb-4  bg-[#506674] bg-no-repeat"
        style={{
          backgroundImage: 'url("/subBanner1.jpg")',
          backgroundSize: "80% 90% ",
          backgroundPosition: "right bottom",
        }}
      >
        <div className=" flex flex-col gap-8 basis-[63%] mt-3">
          <h4 className=" text-base font-semibold text-primary text-primary">
            {headerSection.title}
          </h4>
          <h1
            className=" lg:text-3xl md:text-2xl font-semibold text-white  "
            style={{ lineHeight: "1.4em" }}
          >
            {headerSection.heading}
          </h1>
          {/* <p className="my-10 w-[90%] text-neutral-500">
            {headerSection.description}
          </p> */}
          <ButtonSecondary
            sizeClass="px-5 py-3 bg-black text-white w-[150px]"
            onClick={handleButtonClick}
          >
            View Product
          </ButtonSecondary>
        </div>
      
      </div>

      <div className="lg:w-1/2 lg:mt-0 mt-2  rounded-lg border-2 border-neutral-200 h-[274px]">
        <PromoTag />
      </div>
    </div>
  );
};

export default SectionHomeBanner;
