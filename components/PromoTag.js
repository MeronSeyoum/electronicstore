import React from "react";
import { headerSection } from "data/content";
import { useRouter } from 'next/router';

import { promotionTag } from "data/content";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const PromoTag = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/products/samsung1');
  };

  return (
    // <div className='relative h-full space-y-10 rounded-2xl  bg-[url("/bgPromo.png")] bg-contain bg-right-bottom bg-no-repeat p-5 text-white'>
    <div
      className=" items-start justify-start  rounded-lg  px-4
       flex flex-col  bg-{neutral-200} h-[272px] bg-no-repeat "   style={{
        backgroundImage: 'url("/subBanner2.jpg")',
        backgroundSize: "100% 100%",
        backgroundPosition: "right bottom",
      }}
    >
    <h4 className=" text-base font-semibold text-primary text-primary py-10">
            {headerSection.title}
          </h4>
       <div className=" flex flex-col gap-8 w-[50%] ">
        <h1
          className=" lg:text-2xl font-semibold  text-white "
          style={{ lineHeight: "1.4em" }}
        >
          {promotionTag.heading}
        </h1>
        {/* <p className="my-10 w-[90%] text-neutral-500">
            {headerSection.description}
          </p> */}
        <ButtonSecondary
          sizeClass="text-black bg-white w-[150px] "
          onClick={handleButtonClick}
        >
          View Product
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default PromoTag;
