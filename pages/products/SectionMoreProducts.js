import React from 'react';

import ProductCard from 'components/ProductCard';
// import { products } from 'data/content';
import useDataFetch from 'hooks/useDataFetch';

import Heading from 'shared/Heading/Heading';

const SectionMoreProducts = () => {
  const { fetchedData, error, loading } = useDataFetch('/api/product');

const data = fetchedData.slice(3, 12);
  return (
    <div>
      <Heading className="mb-0">Explore more products</Heading>

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
        {data.slice(4, 13).map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            className="border-neutral-300"
          />
        ))}
      </div>
    </div>
  );
};

export default SectionMoreProducts;
