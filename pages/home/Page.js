import React from "react";

import SectionBestDeals from "./SectionBestDeal";
import SectionBrands from "./SectionBrands";
import SectionHomeBanner from "./SectionHomeBanner";
import SectionBestProducts from "./SectionBestProducts";
import SectionNewProducts from "./SectionNewProducts.js";
import HeaderSlider from "components/HeaderSlider";
import SectionCategory from "./SectionCategory";
import ServicesSection from "pages/home/ServicesSection";
import useDataFetch from "hooks/useDataFetch";

import FooterBanner from "shared/Footer/FooterBanner";
import SectionCmsBannerThree from "./SectionCmsBannerThree";


// Client-Side Data Fetching: Fetch data once at the top-level component or container
// component and pass it down to child components via props. This way, child components
// can access the data without making additional API requests.
const HomePage = () => {
  const { fetchedData, error, loading } = useDataFetch("/api/product");

  return (
    <>
      <div className=" container ">
        <div className="lg:py-3 py-2  ">
          <SectionCategory />
        </div>
        <HeaderSlider/>
        <div className="mt-3">
          <ServicesSection />
        </div>
        <div className="my-10 ">
          <SectionBestDeals
            fetchedData={fetchedData}
            error={error}
            loading={loading}
          />
        </div>
        <div className=" mb-10 ">
          <SectionHomeBanner />
        </div>
        <div className="">
          <SectionNewProducts
            fetchedData={fetchedData}
            error={error}
            loading={loading}
          />
        </div>
        <div className="my-10">
          <SectionBrands />
        </div>
        <div className="">
        <SectionCmsBannerThree />
        </div>
        <div className="mb-10">
          <SectionBestProducts
            fetchedData={fetchedData}
            error={error}
            loading={loading}
          />
        </div>
        <div className=" mb-10">
          <FooterBanner />
        </div>
      </div>
    </>
  );
};

export default HomePage;
