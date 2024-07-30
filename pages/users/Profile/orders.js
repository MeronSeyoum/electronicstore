import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { userService } from "services";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId =userService.userValue?.id;

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId]);

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`/api/order/user_order?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const formatPrice = (price) => {
    const number = parseFloat(price);
    return isNaN(number) ? price : number.toFixed(2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <h1 className="text-lg font-semibold mb-4">My Orders / Order History</h1>
      <div className="bg-white  rounded-lg py-4">
        <ul>
          <li className="flex justify-between font-semibold border-b-2 border-gray-300 pb-2 mb-2">
            <span>Order Id</span>
            <span>Date</span>
            <span  className="text-right">Total</span>
            <span>Status</span>
          </li>
          {orders.map((order) => (
            <li key={order.order_id} className="flex justify-between py-2 border-b border-gray-200 lg:text-base text-sm ">
              <Link href={`/orders/${order.order_id}`} passHref className="flex w-full justify-between hover:bg-gray-100 py-2 rounded-lg">
                  <span>Order #{order.order_id}</span>
                  <span>{formatDate(order.order_date)}</span>
                    <span className="text-right">${formatPrice(order.total_price)}</span>
                  <span>{order.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;
