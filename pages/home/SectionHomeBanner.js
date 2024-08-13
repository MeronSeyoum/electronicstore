import React from "react";
import { useRouter } from 'next/router';
import PromoTag from "components/PromoTag";
import useDataFetch from "hooks/useDataFetch";

const SectionHomeBanner = () => {
  const { fetchedData, error, loading } = useDataFetch("/api/product/Slides_banners?type=banner");
  const router = useRouter();

  const handleButtonClick = (link) => {
    router.push(link);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="lg:flex lg:gap-5 lg:h-72">
      {fetchedData && fetchedData.length > 0 && (
        <>
          {fetchedData.slice(0, 2).map((banner, index) => (
            <div
              key={index}
              className="lg:w-1/2 items-center rounded-lg lg:flex lg:mb-0 mb-10 bg-no-repeat"
            >
              <PromoTag
                backgroundUrl={banner.image}
                headerTitle="New Arrival"
                heading={banner.title }
                buttonLabel="View Product"
                buttonAction={() => handleButtonClick(banner.link)} 
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SectionHomeBanner;
