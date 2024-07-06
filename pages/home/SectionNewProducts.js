"use client";
import React from "react";
import ProductCard from "components/ProductCard";
import Loading from "../Loading";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Link from "next/link";

const SectionNewProducts = ({ fetchedData, error, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter the products where justIn is equal to 1
  const filteredData = fetchedData ? fetchedData.filter(product => product.justIn === 1) : [];

  // Sort the filtered data in descending order (assuming we use 'created_at' for sorting)
  const sortedData = filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Slice the sorted data to get the first 5 products
  const data = sortedData.slice(0, 5);

  return (
    <section className="lg:bg-white lg:p-4 lg:rounded-lg lg:border">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-xl font-bold">New Products</h3>
        <hr className="bg-primary w-52 h-[4px] justify-start -mt-1" />
      </div>
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 lg:grid-cols-5">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className=""
          />
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Link href={`/productsCollection`}>
          <ButtonSecondary className="bg-black text-white px-5">
            View More
          </ButtonSecondary>
        </Link>
      </div>
    </section>
  );
};

export default SectionNewProducts;
