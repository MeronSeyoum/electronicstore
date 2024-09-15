"use client";
import React from "react";
import Slider from "shared/Slider/Slider";
import ProductCard from "./ProductCard";

const ProductSlider = ({ products }) => {

  const data = products ? products.slice(1, 24) : [];

  return (
    <div className="">
      <Slider
        itemPerRow={5}
        data={data}
        category={false}
        renderItem={(item) => {
          if (!item) {
            return null;
          }
          return (
            <ProductCard
              showPrevPrice
              product={item}
              className="justify-items-center"
            />
          );
        }}
      />
    </div>
  );
};

export default ProductSlider;
