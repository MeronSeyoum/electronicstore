import React from "react";

import PromoTag from "components/PromoTag";
import { headerSection } from "data/content";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const SectionHeader = () => {
  return (
    <div className="container items-stretch gap-y-5 py-0 lg:flex lg:gap-5  lg:gap-y-10 md:h-72  ">
      {/* header banner */}
      <div
        className="basis-[50%] items-center space-y-10 rounded-xl  p-4 
       md:flex md:space-y-10 mb:mb-4  bg-[#506674] bg-no-repeat"
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
            onClick={""}
          >
            View Product
          </ButtonSecondary>
        </div>
      
      </div>

      <div className=" basis-[50%] lg:mt-0 md:mt-2  rounded-xl">
        <PromoTag />
      </div>
    </div>
  );
};

export default SectionHeader;
