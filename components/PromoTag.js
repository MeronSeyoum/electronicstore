import React from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const PromoTag = ({ backgroundUrl, headerTitle, heading, banner_desc, buttonLabel, buttonAction, className, classNameText }) => (
  <div
    className={`flex flex-col justify-between p-6 bg-neutral-200 bg-no-repeat rounded-lg ${className}`}
    style={{ backgroundImage: `url(${backgroundUrl})` }}
  >
   
    <h4 className="text-base font-semibold text-primary ">
      {headerTitle}
    </h4>
    <span>
      <h1 className={` lg:w-3/4 font-semibold text-white  ${classNameText}`}>
        {heading}
      </h1>
      <p className="text-white">{banner_desc}</p>
</span>
      <ButtonSecondary sizeClass="text-white bg-primary w-32 h-[42px]" onClick={buttonAction}>
        {buttonLabel}
      </ButtonSecondary>
    </div>
);

export default PromoTag;
