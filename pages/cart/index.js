import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { MdStar } from "react-icons/md";
import { TbBrandPaypal } from "react-icons/tb";
import LikeButton from "components/LikeButton";
// import useRetrieveProductInCartItem from 'hooks/useRetrieveProductInCartItem';
import InputNumber from "shared/InputNumber/InputNumber";
import SectionNavigation from "pages/products/SectionNavigation";
import { useCart } from "context/cartContext";

const CartPage = () => {
  // const { carts, loading, error } = useRetrieveProductInCartItem();
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
    // fetchCart(sessionStorage.getItem('shoppingSession')); // Fetch cart when opening

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
      <div key={product_name} className="flex py-4 last:pb-0">
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
                <h3 className="font-medium md:text-base">
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
              <span className="font-medium md:text-base text-primary">
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

  return (
    <div className="nc-CartPage">
      <main className="container py-14 lg:pb-10 lg:pt-10">
        <div className="mb-4">
          <h2 className="block text-2xl font-medium sm:text-xl lg:text-2xl">
            Your Cart
          </h2>
        </div>

        <hr className="my-10 border-neutral-300 xl:my-4" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full divide-y divide-neutral-300 lg:w-[60%] xl:w-[55%]">
            {cart.length === 0 ? (
              <p className="text-center text-sm">
                {" "}
                <SectionNavigation />
                <span className="text-lg font-semibold">Looks like it&rsquo;s empty! &nbsp;</span>
                 Why not add something?
              </p>
            ) : (
              cart.map((item) => renderProduct(item))
            )}
          </div>
          <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20" />
          <div className="flex-1">
            <div className="sticky top-28">
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-semibold">Summary</h3>
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
                <div className="flex justify-between pt-4 text-base font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-8 flex w-full justify-center items-center gap-1 t py-3 rounded-md bg-primary text-white text-sm"
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
        <hr className="my-10 border-neutral-300 xl:my-4" />

      </main>
    </div>
  );
};

export default CartPage;
