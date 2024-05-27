"use client";
import { pathOr } from "ramda";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

// import { products } from 'data/content';

import SectionMoreProducts from "./SectionMoreProducts";
import SectionNavigation from "./SectionNavigation";
import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";
import useDataFetch from 'hooks/useDataFetch';
import Loading from "../Loading";

const SingleProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;


  const { fetchedData, error, loading } = useDataFetch('/api/product');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Wait for product data to be loaded
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

        // Find the selected product
        const filteredProduct = fetchedData.find((item) => item.slug === slug);
        setSelectedProduct(filteredProduct);
        setIsLoadingData(false); // Set loading state to false
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoadingData(false); // Set loading state to false
      }
    };

    fetchData(); // Call fetchData function
  }, [slug, fetchedData]);

  if (loading || isLoadingData) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedProduct) {
  return (
    <div className="container">
      <SectionNavigation />

      <div className="mb-20">
        <SectionProductHeader
          shots={pathOr([], ["main_image"], selectedProduct)}
          productName={pathOr("", ["product_name"], selectedProduct)}
          categoryName={pathOr("", ["category_name"], selectedProduct)}
          prevPrice={pathOr(0, ["price"], selectedProduct)}
          currentPrice={pathOr(0, ["price"], selectedProduct)}
          rating={pathOr(0, ["rating"], selectedProduct)}
          // pieces_sold={pathOr(0, ["pieces_sold"], selectedProduct)}
          reviews={pathOr(0, ["desc"], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionProductInfo
          overview={pathOr("", ["desc"], selectedProduct)}
          // shipment_details={shipment_details}
          ratings={pathOr(0, ["rating"], selectedProduct)}
          reviews={pathOr(0, ["reviews"], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionMoreProducts />
      </div>
    </div>
  );
}
};

export default SingleProductPage;
