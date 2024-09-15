import SectionBestDeals from "./SectionBestDeal";
import SectionBrands from "./SectionBrands";
import SectionHomeBanner from "./SectionHomeBanner";
import SectionBestProducts from "./SectionBestProducts";
import SectionNewProducts from "./SectionNewProducts";
import HeaderSlider from "components/HeaderSlider";
import SectionCategory from "./SectionCategory";
import ServicesSection from "pages/home/ServicesSection";
import useDataFetch from "hooks/useDataFetch";
import FooterBanner from "shared/Footer/FooterBanner";
import SectionCmsBannerThree from "./SectionCmsBannerThree";
import Loading from "pages/Loading";

const HomePage = () => {
  // Fetch both products and slides/banners from a single API
  const { fetchedData, error, loading } =  useDataFetch("/api/product");
  if (loading) return <Loading />;
  if (error) return <p>Error loading data.</p>;

  const { products, slidesAndBanners } = fetchedData;

  // Filter slides and banners
  const slidesData = slidesAndBanners?.filter(item => item.type === 'slide');
  const homeBannerData = slidesAndBanners?.filter(item => item.type === 'banner');
  const homeBannerCMSData = slidesAndBanners?.filter(item => item.type === 'banner3');

  return (
    <div className="container">
      <section className="lg:py-3 pt-2">
        <SectionCategory />
      </section>
      <section>
        <HeaderSlider slides={slidesData} />
      </section>
      <section className="mt-3">
        <ServicesSection />
      </section>
      <section className="my-10">
        <SectionBestDeals products={products} />
      </section>
      <section className="mb-10">
        <SectionHomeBanner banners={homeBannerData} />
      </section>
      <section>
        <SectionNewProducts products={products} />
      </section>
      <section className="my-10">
        <SectionBrands products={products} />
      </section>
      <section>
        <SectionCmsBannerThree banners={homeBannerCMSData} />
      </section>
      <section className="mb-10">
        <SectionBestProducts products={products} />
      </section>
      <section className="mb-10">
        <FooterBanner  />
      </section>
    </div>
  );
};

export default HomePage;
