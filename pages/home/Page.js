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
import Loading from "pages/Loading";

const HomePage = () => {
  const { fetchedData, error, loading } = useDataFetch("/api/product");
  const fetchDataProps = { fetchedData, error, loading };

  if (loading) return <p><Loading /></p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="container">
      <section className="lg:py-3 pt-2">
        <SectionCategory />
      </section>
      <section className="">
        <HeaderSlider />
      </section>
      <section className="mt-3">
        <ServicesSection />
      </section>
      <section className="my-10">
        <SectionBestDeals {...fetchDataProps} />
      </section>
      <section className="mb-10">
        <SectionHomeBanner />
      </section>
      <section>
        <SectionNewProducts {...fetchDataProps} />
      </section>
      <section className="my-10">
        <SectionBrands />
      </section>
      <section>
        <SectionCmsBannerThree />
      </section>
      <section className="mb-10">
        <SectionBestProducts {...fetchDataProps} />
      </section>
      <section className="mb-10">
        <FooterBanner />
      </section>
    </div>
  );
};

export default HomePage;
