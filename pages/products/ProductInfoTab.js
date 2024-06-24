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
      description: "> $100 Disc 10%",
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
    <div className="">
      <Heading className="mb-0">Product Info</Heading>

      <div className=" flex items-center gap-2 border-b-2 border-black rounded-t-md bg-white ">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-3 rounded-t-md font-semibold text-sm ${
              activeTab === tab
                ? "bg-primary text-white border-b-2 border-black"
                : " bg-neutral-200 border-2 border-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab}
          className={`p-6 h-40  rounded-b-md -mt-[0.5px] bg-white ${
            activeTab === tab ? "block" : "hidden"
          }`}
        >
          {activeTab === "Overview" ? (
            <p className="product-desc">{overview}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {shipment_details.map((detail) => (
                <div key={detail.title} className="flex items-center gap-2">
                  <ButtonCircle3 size="w-10 h-10" className="bg-neutral-300">
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
        </div>
      ))}
      
    </div>
  );
};

export default ProductInfoTab;
