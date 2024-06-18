import React from 'react';

import CountDownTimer from 'components/CountDownTimer';
import ProductSlider from 'components/ProductSlider';

const SectionBestDeals = ({ fetchedData, error, loading }) => {
  return (
    <section className=" overflow-hidden">
     
        <div className="items-center justify-between md:flex ">
         <div className="flex flex-col gap-2 ">
          <h3 className="text-xl font-bold ">Featured Product</h3>
         <hr className='bg-black w-screen h-[1px] justify-start'  />
         <hr className='bg-primary  w-40 h-[4px] justify-start -mt-3'  />
         </div>
         <div className="absolute transform right-8 mb-1 hidden lg:block">
          <CountDownTimer />
          </div>
        </div>
        <div className="pt-4">
        <ProductSlider fetchedData={fetchedData} error={error} loading={loading} />
        
        </div>
      
    </section>
  );
};

export default SectionBestDeals;
