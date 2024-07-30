"use client";
import React,{useState, useEffect} from "react";

import Filter from "components/Filter";
import ProductCard from "components/ProductCard";
import { productsSection } from "data/content";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Heading from "shared/Heading/Heading";

// import useDataFetch from "hooks/useDataFetch";
import Loading from "../Loading";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Link from "next/link";
const SectionBestProducts = ({ fetchedData, error, loading }) => {
  const data = fetchedData ? fetchedData.slice(0, 10) : [];

  const [windowWidth, setWindowWidth] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(10);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
   if (windowWidth < 768) {
      setItemsToShow(6); // If window width is less than 500px, show 2 items
    } else if (windowWidth < 1024) {
      setItemsToShow(8); // If window width is less than 1024px, show 3 items
    } else if (windowWidth < 1280) {
      setItemsToShow(10); // If window width is less than 1280px, show 4 items
    } else {
      setItemsToShow(10); // If window width is greater than or equal to 1280px, show 5 items
    }
  }, [windowWidth]);

  const best_product = data.slice(0, itemsToShow);


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className=" lg:bg-white lg:p-4 lg:rounded-lg lg:border">
      <Heading isCenter isMain desc={productsSection.description}>
        {productsSection.heading}
      </Heading>
      {/* <Filter /> */}

      <div className="flex flex-col gap-2 mb-4 ">
        <h3 className="text-xl font-bold ">Best Selling Products</h3>
        {/* <hr className="bg-gray-400  h-[0.5px] justify-start" /> */}
        <hr className="bg-primary  w-52 h-[4px] justify-start -mt-1" />
      </div>
      <div  className=" grid gap-x-6 gap-y-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
       
        {best_product.map((product) => (
        
        <ProductCard  
        key={product.id}
            product={product}
             />
      ))}
      </div>  
      

      <div className="mt-10 flex items-center justify-center">
      <Link href={`/productsCollection`}>
        <ButtonSecondary className=" bg-primary text-white px-5 ">
          View More
        </ButtonSecondary>
        </Link>
      </div>
    </section>
  );
};

export default SectionBestProducts;
