import React from 'react';
import CountDownTimer from 'components/CountDownTimer';
import ProductSlider from 'components/ProductSlider';

const SectionBestDeals = ({ products, error, loading }) => {
  // Conditional rendering for loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="overflow-hidden lg:bg-white lg:p-4 lg:rounded-lg lg:border">
      <div className="items-center justify-between md:flex">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">Featured Product</h3>
          <hr className="bg-primary lg:w-42 w-44 h-[3px] justify-start -mt-1" />
        </div>
        <div className="hidden lg:block">
          <CountDownTimer />
        </div>
      </div>
      <div className="pt-4">
        {/* Pass products to ProductSlider */}
        <ProductSlider products={products} />
      </div>
    </section>
  );
};

export default SectionBestDeals;
