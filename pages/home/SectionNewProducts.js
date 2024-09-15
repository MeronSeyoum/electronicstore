"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "components/ProductCard";
import Loading from "../Loading";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Link from "next/link";

const SectionNewProducts = ({ products, error, loading }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(6);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 1024) {
      setItemsToShow(6); // If window width is less than 1024px, show 3 items
    } else if (windowWidth < 1280) {
      setItemsToShow(8); // If window width is less than 1280px, show 4 items
    } else {
      setItemsToShow(5); // If window width is greater than or equal to 1280px, show 5 items
    }
  }, [windowWidth]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter the products where justIn is equal to 1
  const filteredData = products ? products.filter(product => product.justIn === 1) : [];

  // Sort the filtered data in descending order (assuming we use 'created_at' for sorting)
  const sortedData = filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const data = sortedData.slice(0, itemsToShow);

  return (
    <section className="lg:bg-white lg:p-4 lg:rounded-lg lg:border">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-xl font-bold">New Products</h3>
        <hr className="bg-primary w-52 h-[4px] justify-start -mt-1" />
      </div>
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
          <ButtonSecondary className="bg-primary text-white px-5">
            View More
          </ButtonSecondary>
        </Link>
      </div>
    </section>
  );
};

export default SectionNewProducts;
