import React from 'react';

import ProductInfoTab from './ProductInfoTab';
import Ratings from './Ratings';



const SectionProductInfo = ({
  productDesc,
  ratings,
  reviews,
}) => {

  return (
    <div className="grid gap-16 lg:grid-cols-2 ">
      <ProductInfoTab overview={productDesc}  />
      <Ratings rating={ratings} reviews={reviews} />
    </div>
  );
};

export default SectionProductInfo;
