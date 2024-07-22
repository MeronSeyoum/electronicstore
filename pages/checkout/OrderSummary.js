import React, { useState, useEffect } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import CartProductCard from 'components/CartProductCard';
import CheckoutButton from './CheckoutButton';

const OrderSummary = ({ cart, totalPrice, totalQuantity }) => {
  const [total, setTotal] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const storedSessionId = sessionStorage.getItem('shoppingSession');

  const estimatedTaxes = totalPrice * 0.05; // Example tax amount 5%
  const estimatedDeliveryHandling = 0; // Example delivery & handling charge

  useEffect(() => {
    const totalAmount = totalPrice + estimatedTaxes + estimatedDeliveryHandling;
    setTotal(totalAmount);
  }, [totalPrice, estimatedTaxes, estimatedDeliveryHandling]);

  return (
    <div className="lg:border border-neutral-300 lg:px-4 py-1 mt-10 w-full bg-gray-100 rounded-md">
      <div className="flex items-end justify-between">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <span className="text-sm text-primary">({totalQuantity} Items)</span>
      </div>
      <div className="mt-2 divide-y divide-neutral-300">
        {cart.length > 1 ? (
          <>
            <button
              className="w-full text-left py-2 flex justify-between items-center"
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              <span className="font-semibold">View Products</span>
              <svg
                className={`w-5 h-5 transition-transform transform ${
                  isAccordionOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isAccordionOpen && (
              <div className="mt-2 space-y-4">
                {cart.map((item) => (
                  <CartProductCard key={item.cart_item_id} product={item} />
                ))}
              </div>
            )}
          </>
        ) : (
          cart.map((item) => (
            <CartProductCard key={item.cart_item_id} product={item} />
          ))
        )}
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
            className="ml-3 flex w-24 items-center justify-center rounded border border-neutral-300 bg-gray-100 px-4 text-sm font-medium transition-colors hover:bg-gray-200"
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
          <span className="bg-gray-200 py-2 pl-10 border-l-4 border-green-500 text-xl">
            ${total.toFixed(2)}
          </span>
        </div>
        <CheckoutButton sessionId={storedSessionId} total={total} />
      </div>
    </div>
  );
};

export default OrderSummary;
