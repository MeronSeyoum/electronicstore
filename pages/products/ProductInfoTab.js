import React, { useState } from "react";
import ButtonCircle3 from "shared/Button/ButtonCircle3";
import Heading from "shared/Heading/Heading";
import { BsBoxFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { PiPercentFill } from "react-icons/pi";
import { MdStar } from "react-icons/md";
import ProgressBar from 'shared/ProgressBar/ProgressBar';

const ProductInfoTab = ({ overview, rating, reviews }) => {
  const [activeTab, setActiveTab] = useState("Product Information");

  const tabs = ["Product Information", "Shipment details", "Review"];
  const ratingDetails = [
    { title: 5, value: 100 },
    { title: 4, value: 56 },
    { title: 3, value: 22 },
    { title: 2, value: 14 },
    { title: 1, value: 2 },
  ];
  const shipmentDetails = [
    {
      icon: <PiPercentFill className="text-xl text-primary" />,
      title: "Discount",
      description: "More than $100 Discount 10%",
    },
    {
      icon: <FaCalendarAlt className="text-xl text-primary" />,
      title: "Delivery Time",
      description: "6 - 12 Working days",
    },
    {
      icon: <BsBoxFill className="text-xl text-primary" />,
      title: "Package",
      description: "Regular Premium Box",
    },
    {
      icon: <FaTruckFast className="text-xl text-primary" />,
      title: "Estimated Arrival",
      description: "10 - 12 October 23",
    },
  ];

  return (
    <div className="h-full ">
      <Heading>Product Info</Heading>
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-3 rounded-t-md font-semibold text-sm ${
              activeTab === tab ? "bg-black text-white" : "bg-neutral-light"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`p-6 rounded-b-md  bg-white ${
            activeTab === tab ? "block" : "hidden"
          }`}
        >
          {activeTab === "Product Information" && (
            <p className="product-desc">{overview}</p>
          )}
          {activeTab === "Shipment details" && (
            <div className="grid lg:gap-10 gap-4 my-3 grid-cols-2">
              {shipmentDetails.map((detail) => (
                <div key={detail.title} className="flex items-center">
                  <ButtonCircle3 size="w-10 h-10 mr-3" className="bg-neutral-light">
                    {detail.icon}
                  </ButtonCircle3>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {detail.title}
                    </p>
                    <p className="text-xs font-semibold">
                      {detail.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Review" && (
            <div className="flex items-center gap-5 bg-white p-7 rounded-md">
              <div className="space-y-1">
                <p className="lg:text-[101px] font-semibold text-[70px]">
                  {rating}
                  <span className="text-base text-secondary">/5</span>
                </p>
                <p className="text-neutral-500">{`(${reviews} Reviews)`}</p>
              </div>
              <div className="w-full space-y-2">
                {ratingDetails.map((ratingItem) => (
                  <div key={ratingItem.title} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 font-medium">
                      <MdStar className="text-yellow-400" />
                      {ratingItem.title}
                    </div>
                    <ProgressBar value={ratingItem.value} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductInfoTab;
