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

import mainBanner1 from "images/main-banner-1.jpg";
import mainBanner2 from "images/main-banner-2.jpg";
import mainBanner3 from "images/main-banner-3.jpg";
import FooterBanner from "shared/Footer/FooterBanner";
import SectionCmsBannerThree from "./SectionCmsBannerThree";

const slides = [
  {
    text: "Oculus Rift with Touch Virtual Reality",
    discount: "50%",
    price: "$149.99",
    link: "#",
    image: mainBanner1,
    alt: "Slide 1",
  },
  {
    text: "Beat Rockers  Pro Wireless Headphone",
    discount: "30%",
    price: "$120.36",
    link: "#",
    image: mainBanner2,
    alt: "Slide 2",
  },
  {
    text: "Google Unveil Home Mini & Speaker",
    discount: "40%",
    price: "$99.86",
    link: "#",
    image: mainBanner3,
    alt: "Slide 3",
  },
];

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
        <HeaderSlider slides={slides} autoPlayInterval={5000} />
        <div className="mt-3">
          <ServicesSection />
        </div>
        <div className="my-12 ">
          <SectionBestDeals
            fetchedData={fetchedData}
            error={error}
            loading={loading}
          />
        </div>
        <div className=" mb-6 ">
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
        <SectionCmsBannerThree />
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
