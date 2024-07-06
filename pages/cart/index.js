import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import { TbBrandPaypal } from 'react-icons/tb';
import LikeButton from 'components/LikeButton';
import InputNumber from 'shared/InputNumber/InputNumber';
import SectionNavigation from 'pages/products/SectionNavigation';
import CartProductCard from 'components/CartProductCard'; // Import CartProductCard component
import { useCart } from 'context/cartContext';

const CartPage = () => {
  const { cart, totalQuantity, totalPrice } = useCart();
  const [total, setTotal] = useState(0);

  const estimatedTaxes = totalPrice * 0.05; // Example tax amount 5%
  const estimatedDeliveryHandling = 0; // Example delivery & handling charge

  useEffect(() => {
    const totalAmount = totalPrice + estimatedTaxes + estimatedDeliveryHandling;
    setTotal(totalAmount);
  }, [totalPrice, estimatedTaxes, estimatedDeliveryHandling]);

  return (
    <div className="nc-CartPage">
      <main className="container py-4 lg:pb-10 lg:pt-10">
        <div className="mb-4">
          <h2 className="block text-2xl font-medium sm:text-xl lg:text-2xl">
            Your Cart
          </h2>
        </div>

        <hr className="my-1 border-neutral-300 lg:my-4 " />

        <div className="flex flex-col lg:flex-row bg-white rounded-lg lg:p-4">
          <div className="w-full divide-y divide-neutral-300 lg:w-[60%] xl:w-[55%]">
            {cart.length === 0 ? (
              <p className="text-center text-sm">
                <SectionNavigation />
                <span className="text-lg font-semibold">
                  Looks like it&rsquo;s empty! &nbsp;
                </span>
                Why not add something?
              </p>
            ) : (
              cart.map((item) => (
                <CartProductCard key={item.cart_item_id} product={item} />
              ))
            )}
          </div>
          <div className="my-6 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20" />
          <div className="flex-1">
            <div className="sticky top-28 bg-neutral-light p-4">
              <div className="flex items-end justify-between">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                <span className="text-sm text-primary">
                  ({totalQuantity} Items)
                </span>
              </div>
              <div className="mt-7 divide-y divide-neutral-300 text-sm">
                <div className="flex justify-between pb-4">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Estimated Delivery & Handling</span>
                  <span className="font-semibold">
                    {estimatedDeliveryHandling === 0 ? 'Free' : `$${estimatedDeliveryHandling}`}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Estimated taxes</span>
                  <span className="font-semibold">
                    ${estimatedTaxes.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-4 text-base font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-8 flex w-full justify-center items-center gap-1 py-3 rounded-md bg-primary text-white text-sm"
              >
                Checkout Now
              </Link>
              <Link
                className="mt-3 inline-flex w-full items-center gap-1 border-2 border-primary text-primary text-sm justify-center py-2 rounded-md"
                href="/checkout"
              >
                <TbBrandPaypal className="text-2xl" />
                PayPal
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
