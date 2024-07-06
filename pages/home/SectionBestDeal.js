import React from 'react';

import CountDownTimer from 'components/CountDownTimer';
import ProductSlider from 'components/ProductSlider';

const SectionBestDeals = ({ fetchedData, error, loading }) => {
  return (
    <section className=" overflow-hidden lg:bg-white lg:p-4 lg:rounded-lg lg:border">
     
        <div className="items-center justify-between md:flex ">
         <div className="flex flex-col gap-2 ">
          <h3 className="text-xl font-bold ">Featured Product</h3>
         {/* <hr className='bg-black w-screen h-[1px] justify-start'  /> */}
         <hr className='bg-primary  w-42 h-[3px] justify-start -mt-1'  />
         </div>
         <div className="  hidden lg:block">
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
