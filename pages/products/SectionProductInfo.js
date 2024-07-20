import React from 'react';

import ProductInfoTab from './ProductInfoTab';
import Ratings from './Ratings';



const SectionProductInfo = ({
  productDesc,
  features,
  ratings,
  reviews,
}) => {

  return (
    <div className=" ">
      <ProductInfoTab productDesc={productDesc} features={features} rating={ratings} reviews={reviews} />
      {/* <Ratings rating={ratings} reviews={reviews} /> */}
    </div>
  );
};

export default SectionProductInfo;
