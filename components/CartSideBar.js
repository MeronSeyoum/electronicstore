"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { MdClose, MdStar } from "react-icons/md";
import ButtonCircle3 from "shared/Button/ButtonCircle3";
import InputNumber from "shared/InputNumber/InputNumber";
import LikeButton from "./LikeButton";
import { BsCart2 } from "react-icons/bs";
import { useCart } from "context/cartContext";
import { useRouter } from "next/router";
import ButtonPrimary from "shared/Button/ButtonPrimary";

const CartSideBar = () => {
  const router = useRouter();
  const {
    cart,
    totalQuantity,
    totalPrice,
    updateCartQuantity,
    removeFromCart,
    fetchCart,
  } = useCart();

  const [isVisible, setIsVisible] = useState(false);

  const handleOpenMenu = () => {
    setIsVisible(true);
    fetchCart(sessionStorage.getItem("shoppingSession")); // Fetch cart when opening
  };

  const handleCloseMenu = () => setIsVisible(false);

  const handleQuantityChange = (cart_item_id, newValue) => {
    updateCartQuantity(cart_item_id, newValue);
  };

  const renderProduct = (item) => {
    const {
      cart_item_id,
      product_name,
      main_image,
      price,
      slug,
      rating,
      category_name,
      quantity,
    } = item;

    const productPrice = price * 1;
    // quantity;

    const handleRemoveCart = () => {
      removeFromCart(cart_item_id);
      fetchCart(sessionStorage.getItem("shoppingSession")); // Fetch cart after remove
    };
    return (
      <div key={cart_item_id} className="flex py-3 last:pb-0">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ">
          <Image
            fill
            src={main_image}
            alt={product_name}
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="ml-2 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-sm">
                  <Link onClick={handleCloseMenu} href={`/products/${slug}`}>
                    {product_name}
                  </Link>
                </h3>
                <span className=" text-xs text-neutral-500">
                  {category_name}
                </span>
                {/* <div className="flex items-center gap-1">
                  <MdStar className="text-yellow-400 text-sm" />
                  <span className="text-xs">{rating}</span>
              <LikeButton />

                </div> */}
              </div>
              <AiOutlineDelete
                className="text-xl cursor-pointer deleteColor"
                onClick={() => handleRemoveCart(cart_item_id)}
              />
             
            </div>
          </div>
          <div className="flex w-full items-end justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className=" font-medium  text-sm text-primary ">
                ${productPrice.toFixed(2)}
              </span>
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

  const renderContent = () => {
    return (
      <Transition appear show={isVisible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto "
          onClose={handleCloseMenu}
        >
          <div className="z-max fixed inset-y-0 right-0 w-full h-full  max-w-md outline-none focus:outline-none lg:max-w-md">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <div className="relative z-20">
                <div className="overflow-hidden shadow-lg ring-1 ring-black/5">
                  <div className="relative h-screen bg-[#f5f5f5]">
                    <div className="hiddenScrollbar h-full overflow-y-0 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Shopping Cart</h3>
                        <ButtonCircle3 onClick={handleCloseMenu}>
                          <MdClose className="text-2xl" />
                        </ButtonCircle3>
                      </div>
                      <div className="divide-y divide-neutral-300 pt-3">
                        {cart.length === 0 ? (
                          <p className=" py-10 ">
                            {" "}
                            <span className="font-semibold text-lg">Looks like it&rsquo;s empty! </span>
                           <p className="text-sm">
                            Why not add something?
                            </p>
                            
                          </p>
                        ) : (
                          cart.map((item) => renderProduct(item))
                        )}
                      </div>
                    </div>
                    <div className="absolute  lg:bottom-0 bottom-10 left-0 w-full bg-neutral-light p-4">
                      <p className="flex justify-between">
                        <span>
                          <span className="font-medium">Subtotal</span>
                          <span className="block lg:text-sm text-xs text-neutral-500">
                            Shipping and taxes calculated at checkout.
                          </span>
                        </span>
                        <span className="text-xl font-medium">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </p>

                      <div className="mt-4 flex items-center  gap-5">
                        <ButtonPrimary
                          onClick={() => {
                            handleCloseMenu(); // Close the menu
                            router.push("/checkout"); // Navigate to the cart component
                          }}
                          className="w-full px-2.5"
                        >
                          Checkout
                        </ButtonPrimary>

                        <ButtonPrimary
                          onClick={() => {
                            handleCloseMenu(); // Close the menu
                            router.push("/cart"); // Navigate to the checkout component
                          }}
                          className="w-full px-2.5 "
                        >
                          Cart
                        </ButtonPrimary>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter=" duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900/60" />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button type="button" onClick={handleOpenMenu} className="flex gap-x-3 ">
        <BsCart2 className="text-lg ml-2 text-black " />
        <div className="counter">{totalQuantity}</div>
        <span className="hidden  lg:block text-sm  text-black">Cart</span>
      </button>

      {renderContent()}
    </>
  );
};

export default CartSideBar;
