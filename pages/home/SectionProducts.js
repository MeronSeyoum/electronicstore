"use client";
import React from "react";

import Filter from "components/Filter";
import ProductCard from "components/ProductCard";
import { productsSection } from "data/content";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Heading from "shared/Heading/Heading";

// import useDataFetch from "hooks/useDataFetch";
import Loading from "../Loading";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Link from "next/link";
const SectionProducts = ({ fetchedData, error, loading }) => {
  const data = fetchedData ? fetchedData.slice(0, 10) : [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className=" bg-white p-6 rounded-md">
      <Heading isCenter isMain desc={productsSection.description}>
        {productsSection.heading}
      </Heading>
      {/* <Filter /> */}

      <div className="flex flex-col gap-2 mb-4 ">
        <h3 className="text-xl font-bold ">Best Selling Products</h3>
        <hr className="bg-gray-400  h-[0.5px] justify-start" />
        <hr className="bg-primary  w-52 h-[4px] justify-start -mt-3" />
      </div>
      <div className="grid gap-x-6 gap-y-8  grid-cols-2 lg:grid-cols-5 ">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className=""
            // border-neutral-300 border
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center">
      <Link href={`/productsCollection`}>
        <ButtonSecondary className=" bg-black text-white px-5 ">
          View More
        </ButtonSecondary>
        </Link>
      </div>
    </section>
  );
};

export default SectionProducts;
