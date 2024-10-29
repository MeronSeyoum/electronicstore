import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import useDataFetch from 'hooks/useDataFetch';
import Link from 'next/link';

const SectionCmsBannerThree = ({banners}) => {
  
  const router = useRouter();

  const handleButtonClick = (link) => {
    router.push(link);
  };
 
  return (
    <section className="flex flex-wrap lg:flex-row flex-col mb-10 gap-5">
      {banners && banners.map((banner) => (
        <div key={banner.id} className="w-full sm:w-[48%] md:w-[32%] ">
          <div className="relative rounded-md overflow-hidden">
            <Image 
              src={banner.image}
              alt={banner.title}
              width={516}
              height={250}
              className="object-cover rounded-md w-full h-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center lg:px-8 px-4">
              <div className='flex lg:gap-3 gap-2 flex-col w-full lg:w-[70%] '>
                <h2 className=" banner-title font-semibold text-white">{banner.title}</h2>
                <span className="text-sm text-white">
                  From &nbsp;
                  <span className="font-semibold  banner-price text-primary-light">{banner.price}</span>
                </span>
                <div className="mt-4">
                <Link href={banner.link}>
                  <ButtonSecondary className="bg-black text-white h-9"  onClick={() => handleButtonClick(banner.link)}  >
                    Shop Now
                  </ButtonSecondary>
                  </Link>
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
