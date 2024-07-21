import React, { useState } from "react";
import ButtonCircle3 from "shared/Button/ButtonCircle3";
import Heading from "shared/Heading/Heading";
import { BsBoxFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { PiPercentFill } from "react-icons/pi";
import { MdStar } from "react-icons/md";
import ProgressBar from 'shared/ProgressBar/ProgressBar';

const ProductInfoTab = ({ productDesc, features, rating, reviews }) => {
  const [activeTab, setActiveTab] = useState("Description");


  const tabs = ["Description", "Shipment details", "Review"];
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
      {/* <Heading>Product Info</Heading> */}
     
      <div className="flex border-b border-neutral-300 gap-5 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 border-b-2 font-semibold text-sm ${activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-neutral-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab}
          className={`lg:p-6 py-4 rounded-b-md  bg-white ${activeTab === tab ? "block" : "hidden"
            }`}
        >
          {activeTab === "Description" && (
            <>
              <p className="product-desc">{productDesc}</p>
              {features && (
              <ul className="list-disc pl-5 mt-4 space-y-2">
                {features.split('; ').map((feature, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">{feature}</span>
                  </li>
                ))}
              </ul>
              )}
            </>
          )}
         
          {activeTab === "Shipment details" && (
            <div className="lg:p-4 py-4 bg-white rounded-b-md grid lg:grid-cols-2 gap-6">
              {shipmentDetails.map((detail) => (
                <div key={detail.title} className="flex items-center space-x-4">
                  <ButtonCircle3 size="w-12 h-12" className="bg-neutral-light">
                    {detail.icon}
                  </ButtonCircle3>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{detail.title}</p>
                    <p className="text-xs text-gray-500">{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "Review" && (
            <div className="flex items-center gap-12 bg-white  rounded-md">
            
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
              <div className="space-y-2">
                <p className="lg:text-[100px] font-semibold text-[70px]">
                  {rating}
                  <span className="text-base text-secondary">/5</span>
                </p>
                <p className="text-neutral-500">{`(${reviews} Reviews)`}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductInfoTab;
