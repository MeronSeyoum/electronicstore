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

      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoadingData(false); // Set loading state to false

      }
    };

    fetchData(); // Call fetchData function
  }, [slug, fetchedData]);

  if (isLoadingData || loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedProduct) {
    return (
      <div className="container my-10">
        <SectionNavigation />

        <div className="mb-10">
          <SectionProductHeader
            productId={pathOr(0, ["id"], selectedProduct)}
            productImage={pathOr([], ["main_image"], selectedProduct || '/placeholder_image.jpg')}
            productName={pathOr("", ["product_name"], selectedProduct)}
            categoryName={pathOr("", ["category_name"], selectedProduct)}
            productDesc={pathOr("", ["description"], selectedProduct)}
            prevPrice={pathOr(0, ["price"], selectedProduct)}
            currentPrice={pathOr(0, ["price"], selectedProduct)}
            rating={pathOr(0, ["rating"], selectedProduct)}
            // pieces_sold={pathOr(0, ["pieces_sold"], selectedProduct)}
            reviews={pathOr(0, ["reviews"], selectedProduct)}

          />
        </div>

        <div className="my-6">
          <SectionProductInfo
            productDesc={pathOr("", ["description"], selectedProduct)}
            features={pathOr("", ["features"], selectedProduct)}
            ratings={pathOr(0, ["rating"], selectedProduct)}
            reviews={pathOr(0, ["reviews"], selectedProduct)}
          />

        </div>

        <div className="mb-6">
          <SectionMoreProducts
            // note for customer about product
            overview={pathOr("", ["description"], selectedProduct)}
          />
        </div>
      </div>
    );
  }
};

export default SingleProductPage;
