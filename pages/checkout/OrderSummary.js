import React, { useState, useEffect } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import CartProductCard from 'components/CartProductCard'; // Import CartProductCard component
import CheckoutButton from './CheckoutButton';

const OrderSummary = ({ cart, totalPrice, totalQuantity}) => {
  const [total, setTotal] = useState(0);
  const storedSessionId = sessionStorage.getItem('shoppingSession');

  const estimatedTaxes = totalPrice * 0.05; // Example tax amount 5%
  const estimatedDeliveryHandling = 0; // Example delivery & handling charge

  useEffect(() => {
    const totalAmount = totalPrice + estimatedTaxes + estimatedDeliveryHandling;
    setTotal(totalAmount);
  }, [totalPrice, estimatedTaxes, estimatedDeliveryHandling]);

  return (
    <div className="lg:border border-neutral-300 lg:px-4 py-1 mt-10 w-full bg-white">
      <div className="flex items-end justify-between">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <span className="text-sm text-primary">({totalQuantity} Items)</span>
      </div>
      <div className="mt-2 divide-y divide-neutral-300">
        {cart.map((item) => (
          <CartProductCard
            key={item.cart_item_id}
            product={item}
          />
        ))}
      </div>
      <div className="my-4 border-t border-neutral-300 pt-6 text-sm">
        <div className="text-sm">Discount code</div>
        <div className="mt-1.5 flex">
          <Input
            rounded="rounded"
            sizeClass="h-9 px-4 py-3"
            className="flex-1 border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
          />
          <button
            type="button"
            className="ml-3 flex w-24 items-center justify-center rounded border border-neutral-300 bg-neutral-light px-4 text-sm font-medium transition-colors hover:bg-neutral-light"
          >
            Apply
          </button>
        </div>
        <div className="mt-4 flex justify-between pb-4">
          <span>Subtotal</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-4">
          <span>Estimated Delivery & Handling</span>
          <span className="font-semibold">
            {estimatedDeliveryHandling === 0 ? 'Free' : `$${estimatedDeliveryHandling}`}
          </span>
        </div>
        <div className="flex justify-between py-4">
          <span>Estimated taxes</span>
          <span className="font-semibold">${estimatedTaxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-semibold">
          <span>Total</span>
          <span className="bg-gray-400 py-2 pl-10 border-l-4 border-green-500 text-xl">
            ${total.toFixed(2)}
          </span>
        </div>
        {/* <ButtonPrimary className="mt-8 w-full">
          Pay ${total.toFixed(2)}
        </ButtonPrimary> */}
        <CheckoutButton sessionId={storedSessionId} total={total} />
      </div>
    </div>
  );
};

export default OrderSummary;
