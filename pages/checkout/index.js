"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdStar } from "react-icons/md";

import LikeButton from "components/LikeButton";
// import { products } from 'data/content';
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import InputNumber from "shared/InputNumber/InputNumber";

import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import { useCart } from "context/cartContext";

const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState("ShippingAddress");
  const {
    cart,
    totalQuantity,
    totalPrice,
    updateCartQuantity,
    removeFromCart,
    fetchCart,
  } = useCart();

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

  const handleScrollToEl = (id) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
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
      <div key={product_name} className="flex  py-4 last:pb-0">
        {/* Product Image */}
        <div className="relative border h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-28 md:w-28">
          <Link href={`/products/${slug}`}>
            <Image
              src={main_image}
              alt={product_name}
              width={60} // Set custom width
              height={60} // Set custom height
              className="h-28 w-28 object-contain object-center"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="ml-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium md:text-sm">
                  <Link href={`/products/${slug}`}>{product_name}</Link>
                </h3>
                <span className="my-1 text-xs text-neutral-500">
                  {category_name}
                </span>
                <div className="flex items-center gap-1">
                  <MdStar className="text-yellow-400" />
                  <span className="text-xs">{rating}</span>
                </div>
                {/* <span className="my-2 text-xs text-neutral-500">{description}</span> */}
              </div>
              <span className="font-medium md:text-sm text-primary">
                ${productPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex w-full items-end justify-between text-sm">
            <div className="flex items-center gap-3">
              <LikeButton />
              <AiOutlineDelete
                className="text-xl deleteColor"
                onClick={() => removeFromCart(cart_item_id)}
              />
            </div>
            <div>
              <InputNumber
                defaultValue={quantity}
                min={1}
                max={99}
                onChange={(newValue) =>
                  handleQuantityChange(cart_item_id, newValue)
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-6">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
          />
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            onCloseActive={() => setTabActive("PaymentMethod")}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16  lg:pt-8 ">
          <h2 className="block text-xl font-semibold sm:text-xl lg:text-2xl ">
            Checkout
          </h2>
        <hr className="my-8 border-neutral-300" />

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:lg:mx-14 2xl:mx-16 " />

          <div className="w-full lg:w-[36%] ">
          <div className="flex items-end justify-between">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <span className="text-sm text-primary">
                  ({totalQuantity} Items)
                </span>
              </div>
            <div className="mt-8 divide-y divide-neutral-300">
              {cart.map((item) => renderProduct(item))}
            </div>

            <div className="mt-10 border-t border-neutral-300 pt-6 text-sm">
              <div>
                <div className="text-sm">Discount code</div>
                <div className="mt-1.5 flex">
                  <Input
                    rounded="rounded-lg"
                    sizeClass="h-12 px-4 py-3"
                    className="flex-1 border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                  />
                  <button
                    type="button"
                    className="ml-3 flex w-24 items-center justify-center rounded-2xl border border-neutral-300 bg-neutral-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-100"
                  >
                    Apply
                  </button>
                </div>
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
                <span className="font-semibold">
                  ${estimatedTaxes.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold ">
                <span>Total</span>
                <span className="bg-gray-400 py-2 pl-10 border-l-4 border-green-500 text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
            <ButtonPrimary className="mt-8 w-full">Confirm order</ButtonPrimary>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
