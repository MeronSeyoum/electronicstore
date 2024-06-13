"use client";
import { pathOr } from "ramda";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';


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
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true)
      try {
        // Wait for product data to be loaded
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

        // Find the selected product
        const filteredProduct = fetchedData.find((item) => item.slug === slug);
        setSelectedProduct(filteredProduct);
        console.log(JSON.stringify(fetchedData))
      } catch (error) {
        console.error("Error fetching product data:", error);
      }finally{
        setIsLoadingData(false); // Set loading state to false

      }
    };

    fetchData(); // Call fetchData function
  }, [slug, fetchedData]);

  if (isLoadingData || loading ) {
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
      productId={pathOr(0,["id"],selectedProduct)}
          productImage={pathOr([], ["main_image"], selectedProduct)}
          productName={pathOr("", ["product_name"], selectedProduct)}
          categoryName={pathOr("", ["category_name"], selectedProduct)}
          productDesc={pathOr("", ["desc"], selectedProduct)}
          prevPrice={pathOr(0, ["price"], selectedProduct)}
          currentPrice={pathOr(0, ["price"], selectedProduct)}
          rating={pathOr(0, ["rating"], selectedProduct)}
          // pieces_sold={pathOr(0, ["pieces_sold"], selectedProduct)}
          reviews={pathOr(0, ["reviews"], selectedProduct)}
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
