import React from 'react';
import Image from 'next/image';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import useDataFetch from 'hooks/useDataFetch';

const SectionCmsBannerThree = () => {
  const { fetchedData, error, loading } = useDataFetch("/api/product/Slides_banners?type=banner3");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <section className="flex flex-wrap lg:flex-row flex-col mb-10 gap-5">
      {fetchedData && fetchedData.map((banner) => (
        <div key={banner.id} className="w-full sm:w-[48%] md:w-[32.1%] ">
          <div className="relative rounded-md overflow-hidden">
            <Image 
              src={banner.image}
              alt={banner.title}
              width={516}
              height={250}
              className="object-cover rounded-md w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center lg:px-8 px-4">
              <div className='flex lg:gap-3 gap-2 flex-col w-full lg:w-[60%]'>
                <h2 className="lg:text-2xl text-lg font-semibold text-white">{banner.title}</h2>
                <span className="text-sm text-white">
                  From &nbsp;
                  <span className="font-semibold text-2xl text-primary-light">{banner.price}</span>
                </span>
                <div className="mt-4">
                  <ButtonSecondary className="bg-black text-white h-9">
                    Shop Now
                  </ButtonSecondary>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SectionCmsBannerThree;
