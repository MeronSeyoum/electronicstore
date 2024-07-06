import React from 'react';
import Heading from 'shared/Heading/Heading';
import BrandCard from 'components/BrandCard';
import Loading from 'pages/Loading';
import useDataFetch from 'hooks/useDataFetch';
// Replace with actual path

const SectionBrands = () => {
  const { fetchedData, error, loading } = useDataFetch("/api/product");

  if (loading) {
    return <Loading />; // Render loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error message if fetch fails
  }

  // Filter products by brand categories
  const appleProducts = fetchedData.filter(product => product.category_name === 'Apple');
  const samsungProducts = fetchedData.filter(product => product.category_name === 'Samsung');
  const gameConsoleProducts = fetchedData.filter(product => product.category_name === 'Game Console');

  // Brands section data
  const brandsSection = {
    heading: 'Shop by Brand',
    description: 'Discover our top brands and their latest products.',
    brands: [
      { brandName: 'Apple', products: appleProducts },
      { brandName: 'Samsung', products: samsungProducts },
      { brandName: 'Game Console', products: gameConsoleProducts },
    ],
  };

  return (
    <section className="lg:bg-white lg:p-4 lg:rounded-md lg:border">
      <Heading desc={brandsSection.description} isCenter isMain>
        {brandsSection.heading}
      </Heading>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">Shop by Brand</h3>
        <hr className="bg-primary w-36 h-[3px] justify-start -mt-1" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-3">
        {brandsSection.brands.map((brand) => (
          <BrandCard key={brand.brandName} {...brand} />
        ))}
      </div>
     
    </section>
  );
};

export default SectionBrands;
