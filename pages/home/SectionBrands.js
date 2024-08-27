import React from 'react';
import Heading from 'shared/Heading/Heading';
import BrandCard from 'components/BrandCard';
import Loading from 'pages/Loading';
import useDataFetch from 'hooks/useDataFetch';

const SectionBrands = () => {
  const { fetchedData, error, loading } = useDataFetch("/api/product");

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const filterProductsByCategory = (category) => 
    fetchedData.filter(product => product.category_name === category).slice(0, 4);

  const brandsSection = {
    heading: 'Shop by Brand',
    description: 'Discover our top brands and their latest products.',
    brands: [
      { brandName: 'Phone & Watch', products: filterProductsByCategory('Phone & Watch') },
      { brandName: 'Headphones & Speaker', products: filterProductsByCategory('Headphones & Speaker') },
      { brandName: 'Video Game & VR', products: filterProductsByCategory('Video Game & VR') },
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
