import React from 'react';

import BrandCard from 'components/BrandCard';
import { brandsSection } from 'data/content';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Heading from 'shared/Heading/Heading';

const SectionBrands = () => {
  return (
    <section className="lg:bg-white lg:p-4 lg:rounded-lg lg:border ">
    
      <Heading desc={brandsSection.description} isCenter isMain>
        {brandsSection.heading}
      </Heading>
      <div className="flex flex-col gap-2  ">
          <h3 className="text-xl font-bold ">Shop by Brand</h3>
         {/* <hr className=' h-[1px] justify-start bg-neutral-200'  /> */}
         <hr className='bg-primary  w-36 h-[3px] justify-start -mt-1 '  />
         </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-3 ">
        {brandsSection.brands.map((brand) => (
          <BrandCard key={brand.brandName} {...brand} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center">
      {/* <button className="rounded-full bg-black text-white hover:bg-primary/80 disabled:bg-opacity-70 px-5 py-3">View More</button> */}
      
      </div>
    </section>
  );
};

export default SectionBrands;
