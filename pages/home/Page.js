import React from "react";

import SectionBestDeals from "./SectionBestDeal";
import SectionBrands from "./SectionBrands";
import SectionHeader from "./SectionHeader";
import SectionProducts from "./SectionProducts";
import HeaderSlider from "components/HeaderSlider";

import mainBanner1 from "images/main-banner-1.jpg";
import mainBanner2 from "images/main-banner-2.jpg";
import mainBanner3 from "images/main-banner-3.jpg";
import FooterBanner from "shared/Footer/FooterBanner";
import ServicesSection from "pages/home/ServicesSection";

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

const HomePage = () => {
  return (
    <div className="bg-main">
      <div className="">
        <HeaderSlider slides={slides} autoPlayInterval={5000} />
      </div>
      <div className="mt-10">
        <ServicesSection />
      </div>
      <div className="my-16 ">
        <SectionBestDeals />
      </div>
      <div className=" lg:mb-10 ">
        <SectionHeader />
      </div>
      <div className="mb-10">
        <SectionProducts />
      </div>

      <div className="mb-10 ">
        <SectionBrands />
      </div>
      <div className="container mb-10">
        <FooterBanner />
      </div>
    </div>
  );
};

export default HomePage;
