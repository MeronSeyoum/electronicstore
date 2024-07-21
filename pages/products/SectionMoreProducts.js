import React ,{useState, useEffect} from "react";
import ProductCard from "components/ProductCard";
import useDataFetch from "hooks/useDataFetch";
import Heading from "shared/Heading/Heading";
import Loading from "pages/Loading";

const SectionMoreProducts = ({ overview }) => {
  const { fetchedData, error, loading } = useDataFetch("/api/product");
  
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Determine how many items to slice based on screen size
  const itemsToShow = windowWidth < 768 ? 13 : 12; // Assuming mobile width is less than 768px
  const data = fetchedData.slice(3, itemsToShow);

  if (loading) {
    <div>
      <Loading />
    </div>;
  }

  return (
    <div>
      {/* <Heading className=" ">Note</Heading>
      <div className="space-y-2  lg:bg-white lg:py-10 py-4 lg:px-6 rounded-md w-full">
        <p className="text-neutral-500">{overview}</p>
      </div> */}

      <Heading className="mt-10">Explore more products</Heading>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5 bg-white lg:p-6 rounded-md">
        {data.slice(4, 13).map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            className="border-neutral-300"
          />
        ))}
      </div>
    </div>
  );
};

export default SectionMoreProducts;
