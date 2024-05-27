'use client';

import React from 'react';

// import { products } from 'data/content';
import Slider from 'shared/Slider/Slider';

import ProductCard from './ProductCard';

import useDataFetch  from 'hooks/useDataFetch';


const ProductSlider = () => {
  
const { fetchedData, error } = useDataFetch('/api/product');
const data = fetchedData.slice(3, 12);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="">
      <Slider
        itemPerRow={5}
        data={data}
        renderItem={(item) => {
          if (!item) {
            return null;
          }
          return (
            <ProductCard showPrevPrice product={item} className="bg-white justify-items-center" />
          );
        }}
      />
    </div>
  );
};

export default ProductSlider;
