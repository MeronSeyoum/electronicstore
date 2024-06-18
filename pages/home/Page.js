import React from "react";

import SectionBestDeals from "./SectionBestDeal";
import SectionBrands from "./SectionBrands";
import SectionHomeBanner from "./SectionHomeBanner";
import SectionProducts from "./SectionProducts";
import HeaderSlider from "components/HeaderSlider";
import SectionCategory from "./SectionCategory";
import ServicesSection from "pages/home/ServicesSection";
import useDataFetch from "hooks/useDataFetch";

import mainBanner1 from "images/main-banner-1.jpg";
import mainBanner2 from "images/main-banner-2.jpg";
import mainBanner3 from "images/main-banner-3.jpg";
import FooterBanner from "shared/Footer/FooterBanner";

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
    <div className="bg-main container ">
      <div className="my-4 ">
        <SectionCategory />
      </div>
        <HeaderSlider slides={slides} autoPlayInterval={5000} />
      <div className="mt-4">
        <ServicesSection />
      </div>
      <div className="my-12 ">
        <SectionBestDeals
          fetchedData={fetchedData}
          error={error}
          loading={loading}
        />
      </div>
      <div className=" lg:mb-8 ">
        <SectionHomeBanner />
      </div>
      <div className="mb-10">
        <SectionProducts
          fetchedData={fetchedData}
          error={error}
          loading={loading}
        />
      </div>

        <SectionBrands />
  
      <div className=" mb-4">
        <FooterBanner />
      </div>
    </div>
  );
};

export default HomePage;
