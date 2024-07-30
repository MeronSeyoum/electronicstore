import React from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const PromoTag = ({ backgroundUrl, headerTitle, heading, buttonLabel, buttonAction }) => (
  <div
    className="flex flex-col w-full items-start justify-start rounded-lg p-6 lg:gap-10 gap-6 bg-neutral-200 h-full lg:h-72 bg-no-repeat bg-cover bg-right-bottom"
    style={{
      backgroundImage: `url(${backgroundUrl})`,
    }}
  >
    <h4 className="text-base font-semibold text-primary">
      {headerTitle}
    </h4>
    <div className="flex flex-col w-full lg:w-3/5 gap-6 lg:gap-10">
      <h1 className="text-xl lg:text-2xl font-semibold text-white" style={{ lineHeight: "1.4em" }}>
        {heading}
      </h1>
      <ButtonSecondary sizeClass="text-black bg-white w-32 lg:w-40 lg:mb-0 mb-4" onClick={buttonAction}>
      {buttonLabel}
      </ButtonSecondary>
    </div>
  </div>
);

export default PromoTag;
