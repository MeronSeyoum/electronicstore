import React from "react";
import { headerSection } from "data/content";

import { promotionTag } from "data/content";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const PromoTag = () => {
  return (
    // <div className='relative h-full space-y-10 rounded-2xl  bg-[url("/bgPromo.png")] bg-contain bg-right-bottom bg-no-repeat p-5 text-white'>
    <div
      className=" items-start justify-start  rounded-2xl  px-4
       flex flex-col  bg-neutral-200 h-[272px] bg-no-repeat "   style={{
        backgroundImage: 'url("/subBanner2.jpg")',
        backgroundSize: "100% 90%",
        backgroundPosition: "right bottom",
      }}
    >
    <h4 className=" text-base font-semibold text-primary text-primary py-8">
            {headerSection.title}
          </h4>
       <div className=" flex flex-col gap-8 w-[50%] ">
        <h1
          className=" lg:text-3xl font-semibold  text-black "
          style={{ lineHeight: "1.4em" }}
        >
          {promotionTag.heading}
        </h1>
        {/* <p className="my-10 w-[90%] text-neutral-500">
            {headerSection.description}
          </p> */}
        <ButtonSecondary
          sizeClass="bg-black text-white w-[150px] "
          onClick={""}
        >
          View Product
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default PromoTag;
