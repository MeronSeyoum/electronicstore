import React, { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import OrderSummary from "./OrderSummary"; // Create this component for the right-side order summary
import { useCart } from "context/cartContext";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState("ContactInfo");

  const {
    cart,
    totalQuantity,
    totalPrice,
    updateCartQuantity,
    removeFromCart,
  } = useCart();



  const renderTabContent = () => {
    switch (activeTab) {
      case "ContactInfo":
        return <ContactInfo />;
      case "ShippingAddress":
        return <ShippingAddress />;
      case "PaymentMethod":
        return <PaymentMethod />;
      default:
        return null;
    }
  };

  return (
    <div className="container mb-10">
       <h2 className="text-xl font-semibold py-6">Checkout</h2>

      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col  lg:w-3/5 ">
      
          {/* Tabs */}
          <div className=" text-sm mb-0 border-b-2">
            <button
              className={`${
                activeTab === "ContactInfo" ? "bg-white font-semibold border-b-2 border-primary" : ""
              }  py-2 px-6 lg:px-8  text-left`}
              onClick={() => setActiveTab("ContactInfo")}
            >
              Contact 
            </button>
            <button
              className={`${
                activeTab === "ShippingAddress" ? "bg-white font-semibold border-b-2 border-primary" : ""
              } py-2 px-6 lg:px-8   text-left`}
              onClick={() => setActiveTab("ShippingAddress")}
            >
             Shipping 
            </button>
            <button
              className={`${
                activeTab === "PaymentMethod" ? "bg-white font-semibold border-b-2 border-primary" : ""
              } py-2 px-6 lg:px-8   text-left`}
              onClick={() => setActiveTab("PaymentMethod")}
            >
              Payment 
            </button>
          </div>
          {/* Render active tab content */}
          <div className=" bg-white lg:p-4 mt-6 lg:mt-0">{renderTabContent()}</div>
        </div>
        {/* Order summary */}
        <div className="lg:w-2/5 lg:ml-6 ">
          <OrderSummary
            cart={cart}
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
