"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';

import LikeButton from 'components/LikeButton';
// import { products } from 'data/content';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import InputNumber from 'shared/InputNumber/InputNumber';

import ContactInfo from './ContactInfo';
import PaymentMethod from './PaymentMethod';
import ShippingAddress from './ShippingAddress';
import useRetrieveProductInCartItem from 'hooks/useRetrieveProductInCartItem';

const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState('ShippingAddress');
  const { products, loading, error } = useRetrieveProductInCartItem();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
const [quantity, setQuantity] =useState(1);
const [productPrice, setProductPrice]=useState(0)
 
const estimatedTaxes = subtotal * 0.05; // Example tax amount 5%
  const estimatedDeliveryHandling = 0; // Example delivery & handling charge
  useEffect(() => {
    if (!loading && !error) {
      // Calculate subtotal when products are fetched successfully
      const subtotalAmount = products.reduce((acc, product) => {
        // Calculate price for each product based on its quantity
        const totalQuantity = quantity[product.cart_item_id] || 1; // Corrected
        return acc + parseFloat(product.price * totalQuantity);
      }, 0);
      setSubtotal(subtotalAmount);

      const totalAmount = subtotalAmount + estimatedTaxes + estimatedDeliveryHandling;
      setTotal(totalAmount);
    }
  }, [products, loading, error, quantity]);

  const handleQuantityChange = (cart_item_id, newValue) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [cart_item_id]: newValue,
    }));
  };

  const handleScrollToEl = (id) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const renderProduct = (item) => {
    const {  cart_item_id, product_name, description, main_image, price, slug, rating, category_name } = item;
// Update the product price based on quantity
const totalQuantity = quantity[cart_item_id] || 1;
const productPrice = price * totalQuantity;

    return (
      <div key={product_name} className="flex  py-4 last:pb-0">
      {/* Product Image */}
      <div className="relative border h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-28 md:w-28">
             <Link href={`/products/${slug}`} >    
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
              <span className="my-1 text-xs text-neutral-500">{category_name}</span>
              <div className="flex items-center gap-1">
                <MdStar className="text-yellow-400" />
                <span className="text-xs">{rating}</span>
              </div>
              {/* <span className="my-2 text-xs text-neutral-500">{description}</span> */}
            </div>
            <span className="font-medium md:text-sm text-primary">${productPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex w-full items-end justify-between text-sm">
          <div className="flex items-center gap-3">
            <LikeButton />
            <AiOutlineDelete className="text-xl" />
          </div>
          <div>
            <InputNumber
            defaultValue={1}
          min={1}
          max={99}
          onChange={(newValue) => handleQuantityChange(cart_item_id, newValue)}
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
            isActive={tabActive === 'ContactInfo'}
            onOpenActive={() => {
              setTabActive('ContactInfo');
              handleScrollToEl('ContactInfo');
            }}
            onCloseActive={() => {
              setTabActive('ShippingAddress');
              handleScrollToEl('ShippingAddress');
            }}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === 'ShippingAddress'}
            onOpenActive={() => {
              setTabActive('ShippingAddress');
              handleScrollToEl('ShippingAddress');
            }}
            onCloseActive={() => {
              setTabActive('PaymentMethod');
              handleScrollToEl('PaymentMethod');
            }}
          />
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === 'PaymentMethod'}
            onOpenActive={() => {
              setTabActive('PaymentMethod');
              handleScrollToEl('PaymentMethod');
            }}
            onCloseActive={() => setTabActive('PaymentMethod')}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-10 ">
        <div className="mb-10">
          <h2 className="block text-2xl font-semibold sm:text-xl lg:text-2xl ">
            Checkout
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:lg:mx-14 2xl:mx-16 " />

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-neutral-300">
            {products.map((item) => renderProduct(item))}
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
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
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
              <div className="flex justify-between pt-4 text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
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
