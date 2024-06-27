import React, { useState } from "react";
import ButtonCircle3 from "shared/Button/ButtonCircle3";
import Heading from "shared/Heading/Heading";
import { BsBoxFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

import { PiPercentFill } from "react-icons/pi";
import { from } from "rxjs";

const ProductInfoTab = ({ overview }) => {
  const [activeTab, setActiveTab] = useState("Shipment details");

  const tabs = ["Overview", "Shipment details"];

  const shipment_details = [
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
    <div className="lg:basis-[45%] lg:mr-20">
      <Heading className="">Product Info</Heading>

      <div className=" flex items-center gap-1   ">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-3 rounded-t-md font-semibold text-sm ${
              activeTab === tab
                ? "bg-primary text-white "
                : " bg-neutral-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab}
          className={`p-6   rounded-b-md h-48 bg-white ${
            activeTab === tab ? "block" : "hidden"
          }`}
        >
          {activeTab === "Overview" ? (
            <p className="product-desc">{overview}</p>
          ) : (
            <div className="grid lg:gap-10 gap-4 my-3 grid-cols-2 ">
              {shipment_details.map((detail) => (
                <div key={detail.title} className="flex items-center  ">
                  <ButtonCircle3 size="w-10 h-10 mr-3" className="bg-neutral-300">
                    {detail.icon}
                  </ButtonCircle3>

                  <div className="">
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
        </div>
      ))}
      
    </div>
  );
};

export default ProductInfoTab;
