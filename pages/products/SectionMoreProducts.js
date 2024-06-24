import React from "react";
import ProductCard from "components/ProductCard";
import useDataFetch from "hooks/useDataFetch";
import Heading from "shared/Heading/Heading";
import Loading from "pages/Loading";

const SectionMoreProducts = ({ overview }) => {
  const { fetchedData, error, loading } = useDataFetch("/api/product");
  const data = fetchedData.slice(3, 12);

  if (loading) {
    <div>
      <Loading />
    </div>;
  }

  return (
    <div>
      <Heading className=" ">Note</Heading>
      <div className="space-y-2  bg-white py-10 px-6 rounded-md w-full">
        <p className="text-neutral-500">{overview}</p>
      </div>

      <Heading className="mt-6">Explore more products</Heading>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5 bg-white p-6 rounded-md">
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
