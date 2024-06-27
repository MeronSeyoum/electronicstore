import React from 'react';

import ProductInfoTab from './ProductInfoTab';
import Ratings from './Ratings';



const SectionProductInfo = ({
  productDesc,
  ratings,
  reviews,
}) => {

  return (
    <div className="flex lg:flex-row flex-col  ">
      <ProductInfoTab overview={productDesc}  />
      <Ratings rating={ratings} reviews={reviews} />
    </div>
  );
};

export default SectionProductInfo;
