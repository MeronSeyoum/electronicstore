"use client";
import React from "react";

import Filter from "components/Filter";
import ProductCard from "components/ProductCard";
import { productsSection } from "data/content";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Heading from "shared/Heading/Heading";

import useDataFetch from "hooks/useDataFetch";
import Loading from "../Loading";
import ButtonSecondary from "shared/Button/ButtonSecondary";
const SectionProducts = () => {
  const { fetchedData, loading, error } = useDataFetch("/api/product");

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container">
      <Heading isCenter isMain desc={productsSection.description}>
        {productsSection.heading}
      </Heading>
      <Filter />


      <div className="flex flex-col gap-2 mb-4 ">
          <h3 className="text-xl font-bold ">Best Selling Products</h3>
         <hr className='bg-black  h-[1px] justify-start'  />
         <hr className='bg-primary  w-20 h-[4px] justify-start -mt-2'  />
         </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {fetchedData.map((product) => (
          <ProductCard
            key={product.product_name}
            product={product}
            className=""
            // border-neutral-300 border
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <ButtonSecondary className=" bg-black text-white px-5 ">
          View More
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default SectionProducts;
