import React from 'react';

import ProductInfoTab from './ProductInfoTab';
import Ratings from './Ratings';



const SectionProductInfo = ({
  productDesc,
  ratings,
  reviews,
}) => {

  return (
    <div className=" ">
      <ProductInfoTab overview={productDesc}  rating={ratings} reviews={reviews} />
      {/* <Ratings rating={ratings} reviews={reviews} /> */}
    </div>
  );
};

export default SectionProductInfo;
