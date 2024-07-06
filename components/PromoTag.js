import React from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const PromoTag = ({ backgroundUrl, headerTitle, heading, buttonLabel, buttonAction }) => (
  <div
    className="items-start justify-start rounded-lg p-6  lg:gap-10 gap-6 flex flex-col bg-neutral-200 lg:h-72 bg-no-repeat"
    style={{
      backgroundImage: `url(${backgroundUrl})`,
      backgroundSize: "100% 100%",
      backgroundPosition: "right bottom",
    }}
  >
    <h4 className="text-base font-semibold text-primary">
      {headerTitle}
    </h4>
    <div className="flex flex-col lg:w-[60%] l:gap-10 gap-6">
      <h1 className="lg:text-3xl text-2xl font-semibold text-white" style={{ lineHeight: "1.4em" }}>
        {heading}
      </h1>
      <ButtonSecondary sizeClass="text-black bg-white w-[150px] lg:mb-0 mb-4" onClick={buttonAction}>
        {buttonLabel}
      </ButtonSecondary>
    </div>
  </div>
);

export default PromoTag;
