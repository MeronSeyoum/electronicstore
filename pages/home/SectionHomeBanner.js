import React from "react";
import { useRouter } from 'next/router';
import PromoTag from "components/PromoTag";
import { headerSection,promotionTag } from "data/content";

const SectionHomeBanner = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/products/playstation-2');
  };

  return (
    <div className=" lg:flex lg:gap-5  lg:h-72">
      <div
        className="lg:w-1/2 items-center  rounded-lg  lg:flex lg:mb-0 mb-10 bg-[#506674] bg-no-repeat"
      >
        <PromoTag
          backgroundUrl="/subBanner1.jpg"
          headerTitle={headerSection.title}
          heading={headerSection.heading}
          buttonLabel="View Product"
          buttonAction={handleButtonClick}
        />
      </div>
      <div className="lg:w-1/2 lg:mt-0 mt-2 rounded-lg h-72">
        <PromoTag 
           backgroundUrl="/subBanner2.jpg"
          headerTitle={promotionTag.title}
          heading={promotionTag.heading}
          buttonLabel="View Product"
          buttonAction={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default SectionHomeBanner;
