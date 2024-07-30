import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userService } from "services";
import Loading from "pages/Loading";
import Image from "next/image";

const OrderDetail = () => {
  const userId = userService.userValue?.id;
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id && userId) {
      fetchOrderDetails(id, userId);
    }
  }, [id, userId]);

  const fetchOrderDetails = async (id, userId) => {
    try {
      const response = await fetch(`/api/order/${id}?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const formatPrice = (price) => {
    const number = parseFloat(price);
    return isNaN(number) ? price : number.toFixed(2);
  };

  if (!order) {
    return (
      <div className="text-center text-gray-600">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto  py-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-start mb-8 text-gray-800">
        Order #{order.order_id}
      </h1>
      <div className="flex flex-col lg:flex-row lg:gap-8">
      {/* Order Details */}
      <div className="bg-white shadow-lg rounded-lg lg:p-6 p-4  mb-8 flex-2">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Order Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center font-medium text-gray-800">Date:</div>
          <div className="text-gray-600">{formatDate(order.order_date)}</div>
          <div className="flex items-center font-medium text-gray-800">Total:</div>
          <div className="text-gray-600">${formatPrice(order.total_price)}</div>
          <div className="flex items-center font-medium text-gray-800">Status:</div>
          <div className="text-gray-600">{order.status}</div>
          <div className="flex items-center font-medium text-gray-800">Payment Status:</div>
          <div className="text-gray-600">{order.payment_status}</div>
          <div className="flex items-center font-medium text-gray-800">Transaction ID:</div>
          <div className="text-gray-600">{order.transaction_id}</div>
        </div>
      </div>

      {/* Products */}
      <div className="bg-white shadow-lg rounded-lg lg:p-6 p-4 mb-8 flex-1">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Products
        </h2>
        <div className="space-y-4">
          {order.products && order.products.length > 0 ? (
            order.products.map((product, index) => (
              <div key={index} className="flex justify-between items-center py-1 border-b text-sm">
                <span className="text-gray-800">{product.name}</span>
                <span className="text-gray-600">${formatPrice(product.price)}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-600 py-2">No products available</div>
          )}
        </div>
      </div>
</div>
      {/* Shipping Information */}
      <div className="bg-white shadow-lg rounded-lg lg:p-6 p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Shipping Information
        </h2>
        <div className="flex items-start gap-4 lg:flex-row flex-col">
          <Image
            src={order.shipping_icon}
            alt="Shipping Icon"
            className="lg:w-56 w-full h-24 "
            width={300}
            height={100}
          />
           <div className="grid grid-cols-2 lg:gap-3 lg:text-base text-s">
            <div className="flex items-center font-medium text-gray-800">Carrier:</div>
            <div className="text-gray-600">{order.shipping_title}</div>
            <div className="flex items-center font-medium text-gray-800">Tracking Number:</div>
            <div className="text-gray-600">{order.tracking_number}</div>
            <div className="flex items-center font-medium text-gray-800">Description:</div>
            <div className="text-gray-600">{order.shipping_description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
