"use client";
import React from "react";
import Slider from "shared/Slider/Slider";
import ProductCard from "./ProductCard";

const ProductSlider = ({ fetchedData, error, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const data = fetchedData ? fetchedData.slice(1, 12) : [];

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
              className="bg-white justify-items-center"
            />
          );
        }}
      />
    </div>
  );
};

export default ProductSlider;
