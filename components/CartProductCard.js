import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import LikeButton from 'components/LikeButton';
import InputNumber from 'shared/InputNumber/InputNumber';
import { useCart } from 'context/cartContext';

const CartProductCard = ({ product }) => {
  const { updateCartQuantity, removeFromCart } = useCart();
  const { cart_item_id, product_name, main_image, price, quantity, slug, category_name } = product;

  const productPrice = price *1;
  //  quantity;
  const formattedPrice = typeof productPrice === 'number' ? `$${productPrice.toFixed(2)}` : '';

  const handleQuantityChange = (cart_item_id, newValue) => {
    updateCartQuantity(cart_item_id, newValue);
  };

  return (
    <div className="flex py-2  border-b border-gray-200">
      <div className="relative h-24 w-24 lg:h-28 lg:w-28 overflow-hidden rounded-lg mr-3  border">
        <Link href={`/products/${slug}`}>
          <Image
            src={main_image}
            alt={product_name}
            className="h-full w-full hover:bg-neutral-light p-3 bg-neutral-light"
            loading="lazy"
            sizes="(max-width: 100px) 100vw, 100px"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-sm lg:text-base">
                <Link href={`/products/${slug}`} className="text-black hover:text-gray-800 transition-colors">
                  {product_name}
                </Link>
              </h3>
              <p className="text-xs text-gray-600">{category_name}</p>
              {/* <div className=" items-center space-x-1 mt-1 hidden lg:flex">
                <MdStar className="text-yellow-400 text-xs md:text-sm" />
                <span className="text-xs md:text-sm">4.5</span>
               <LikeButton  />
               </div> */}
             
            </div>
            <AiOutlineDelete
              className=" cursor-pointer text-red-500 hover:text-red-500 transition-colors"
              onClick={() => removeFromCart(cart_item_id)}
            />
            {/* <span className="font-semibold text-sm md:text-base text-gray-800 ">{formattedPrice}</span> */}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
          <span className=" font-semibold text-sm md:text-base text-primary ">{formattedPrice}</span>
          

            {/* <LikeButton /> */}
            {/* <AiOutlineDelete
              className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => removeFromCart(cart_item_id)}
            /> */}
          </div>
          <div>
            <InputNumber
              defaultValue={quantity}
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

export default CartProductCard;
