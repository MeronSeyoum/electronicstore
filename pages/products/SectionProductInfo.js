import React from 'react';

import ProductInfoTab from './ProductInfoTab';
import Ratings from './Ratings';



const SectionProductInfo = ({
  overview,
  ratings,
  reviews,
}) => {

  return (
    <div className="grid gap-16 lg:grid-cols-2">
      <ProductInfoTab overview={overview}  />
      <Ratings rating={ratings} reviews={reviews} />
    </div>
  );
};

export default SectionProductInfo;