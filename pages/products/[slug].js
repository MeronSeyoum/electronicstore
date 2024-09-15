"use client"; 
import React from "react";
import { useRouter } from 'next/router';
import SectionMoreProducts from "./SectionMoreProducts";
import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";
import useDataFetch from 'hooks/useDataFetch';
import Loading from "../Loading";

const SingleProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Fetch product details by slug
  const { fetchedData, error, loading } = useDataFetch(`/api/product/productDetail?slug=${slug}`);
  
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(fetchedData)
  const selectedProduct = fetchedData?.products?.[0]; // Assuming the API returns an array of products and we need the first one
console.log(selectedProduct)
  if (selectedProduct) {
    return (
      <div className="container my-2 lg:my-10">
        {/* <SectionNavigation /> */}

        <div className="mb-10">
          <SectionProductHeader
            productId={selectedProduct.id}
            main_image={selectedProduct.main_image || '/placeholder_image.jpg'}
            productImages={selectedProduct.images || ['/placeholder_image.jpg']}
            productName={selectedProduct.product_name}
            categoryName={selectedProduct.category_name}
            productDesc={selectedProduct.description}
            prevPrice={selectedProduct.price}
            currentPrice={selectedProduct.price}
            rating={selectedProduct.rating}
            reviews={selectedProduct.reviews}
            color={selectedProduct.color || []}
          />
        </div>

        <div className="my-6">
          <SectionProductInfo
            productDesc={selectedProduct.description}
            features={selectedProduct.features}
            ratings={selectedProduct.rating}
            reviews={selectedProduct.reviews}
          />
        </div>

        <div className="mb-6">
          <SectionMoreProducts
            overview={selectedProduct.description}
            // fetchedData={fetchedData.products}
          />
        </div>
      </div>
    );
  }

  return null; // Return null if no product is found
};

export default SingleProductPage;
