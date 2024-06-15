import React from 'react';
import ProductCard from 'components/ProductCard';
import useDataFetch from 'hooks/useDataFetch';
import Heading from 'shared/Heading/Heading';
import Loading from 'pages/Loading';

const SectionMoreProducts = () => {
const { fetchedData, error, loading } = useDataFetch('/api/product');
const data = fetchedData.slice(3, 12);

if(loading){
  <div>
  <Loading />
  </div>
  }
  
  return (
    <div>
      <Heading className="mb-2">Explore more products</Heading>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
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
