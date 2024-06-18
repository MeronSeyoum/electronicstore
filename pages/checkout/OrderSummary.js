import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdStar } from "react-icons/md";
import LikeButton from "components/LikeButton";
import InputNumber from "shared/InputNumber/InputNumber";
import Link from "next/link";
import Image from "next/image";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";

const OrderSummary = ({
  cart,
  totalPrice,
  totalQuantity,
  updateCartQuantity,
  removeFromCart,
}) => {
  const [total, setTotal] = useState(0);

  const estimatedTaxes = totalPrice * 0.05; // Example tax amount 5%
  const estimatedDeliveryHandling = 0; // Example delivery & handling charge
  useEffect(() => {
    const totalAmount = totalPrice + estimatedTaxes + estimatedDeliveryHandling;
    setTotal(totalAmount);
  }, [totalPrice]);

  const handleQuantityChange = (cart_item_id, newValue) => {
    updateCartQuantity(cart_item_id, newValue);
  };
  const renderProduct = (item) => {
    const {
      cart_item_id,
      product_name,
      quantity,
      main_image,
      price,
      slug,
      rating,
      category_name,
    } = item;
    // Update the product price based on quantity
    const productPrice = price * quantity;

    return (
      <div key={product_name} className="flex  py-3 last:pb-0 ">
        {/* Product Image */}
        <div className="relative border h-20 w-20 shrink-0 overflow-hidden rounded-xl lg:h-20 md:w-24 ">
          <Link href={`/products/${slug}`}>
            <Image
              src={main_image}
              alt={product_name}
              width={50} // Set custom width
              height={50} // Set custom height
              className="h-16 w-24 mt-1 object-contain object-center"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col justify-between ml-3">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-sm">
                  <Link href={`/products/${slug}`}>{product_name}</Link>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="my-1 text-xs text-neutral-500">
                    {category_name}
                  </span>
                  <MdStar className="text-yellow-400" />
                  <span className="text-xs">{rating}</span>
                </div>
                {/* <span className="my-2 text-xs text-neutral-500">{description}</span> */}
              </div>
              <AiOutlineDelete
                className="text-xl deleteColor"
                onClick={() => removeFromCart(cart_item_id)}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <InputNumber
                defaultValue={quantity}
                min={1}
                max={99}
                onChange={(newValue) =>
                  handleQuantityChange(cart_item_id, newValue)
                }
              />
            </div>
            <div>
              <span className="font-medium md:text-sm ">
                ${productPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className=" border border-neutral-300 px-4 py-1  w-full bg-neutral-100 h-full">
      <div className="flex items-end justify-between">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <span className="text-sm text-primary">({totalQuantity} Items)</span>
      </div>
      <div className="mt-2 divide-y divide-neutral-300">
        {/* Iterate over cart items */}
        {cart.map((item) => renderProduct(item))}
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
            className="ml-3 flex w-24 items-center justify-center rounded border border-neutral-300 bg-neutral-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-100"
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
            {estimatedDeliveryHandling === 0
              ? "Free"
              : `$${estimatedDeliveryHandling}`}
          </span>
        </div>
        <div className="flex justify-between py-4">
          <span>Estimated taxes</span>
          <span className="font-semibold">${estimatedTaxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 text-base font-semibold ">
          <span>Total</span>
          <span className="bg-gray-400 py-2 pl-10 border-l-4 border-green-500 text-xl">
            ${total.toFixed(2)}
          </span>
        </div>
        <ButtonPrimary className="mt-8 w-full">
          Pay ${total.toFixed(2)}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default OrderSummary;
