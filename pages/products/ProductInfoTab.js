import React, { useState } from 'react';
import ButtonCircle3 from 'shared/Button/ButtonCircle3';
import Heading from 'shared/Heading/Heading';
import { BsBoxFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

import { PiPercentFill } from "react-icons/pi";
import { from } from 'rxjs';

const ProductInfoTab = ({ overview }) => {
  const [activeTab, setActiveTab] = useState('Shipment details');

  const tabs = ['Overview', 'Shipment details'];


  const shipment_details =
  [
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
    <div>
      <Heading className="mb-0">Product Info</Heading>

      <div className="mb-10 flex items-center gap-5">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 ${
              activeTab === tab
                ? 'border-b-2 border-primary'
                : 'text-neutral-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab}
          className={`mb-10 text-sm ${activeTab === tab ? 'block' : 'hidden'}`}
        >
          {activeTab === 'Overview' ? (
            <p>{overview}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {shipment_details.map((detail) => (
                <div key={detail.title} className="flex items-center gap-2">
                  <ButtonCircle3 size="w-12 h-12" className="bg-neutral-300">
                    {detail.icon}
                  </ButtonCircle3>

                  <div>
                    <p className="product-desc">{detail.title}</p>
                    <p>{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="space-y-2">
        <h3 className="text-xl font-medium">Note</h3>
        {/* <p className="text-neutral-500">{note}</p> */}
      </div>
    </div>
  );
};

export default ProductInfoTab;
