import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductCard from "components/ProductCard";
import SidebarFilter from "components/SideBarFilter";
import Loading from "pages/Loading";
import useDataFetch from "hooks/useDataFetch";
import SearchResultHeader from "components/SearchResultHeader";
import Filter from "components/Filter";
import Heading from "shared/Heading/Heading";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const dataSource = categoryId
    ? `/api/category/productByCategory?id=${categoryId}`
    : "/api/product";

  const { fetchedData, error, loading } = useDataFetch(dataSource);
  const collectionData = categoryId ? fetchedData : fetchedData?.products || [];

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("bestMatch");

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = windowWidth < 768 ? 14 : 15;

  useEffect(() => {
    if (collectionData) {
      let sortedData = [...collectionData];
      switch (sortOption) {
        case "priceLowToHigh":
          sortedData.sort((a, b) => a.price - b.price);
          break;
        case "priceHighToLow":
          sortedData.sort((a, b) => b.price - a.price);
          break;
        case "highestRated":
          sortedData.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
      setFilteredData(sortedData);
    }
  }, [collectionData, sortOption]);

  const applyFilters = (filters) => {
    const {
      selectedBrands,
      selectedCategory,
      selectedSizes,
      selectedStorages,
      priceRange,
    } = filters;

    const data = collectionData.filter((item) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand))
        return false;
      if (selectedCategory !== "All" && selectedCategory === item.category_id)
        return false;
      if (selectedSizes.length > 0 && !selectedSizes.includes(item.size))
        return false;
      if (
        selectedStorages.length > 0 &&
        !selectedStorages.includes(item.storage)
      )
        return false;
      if (item.price < priceRange[0] || item.price > priceRange[1])
        return false;
      return true;
    });

    setFilteredData(data);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error loading products. Please try again later.</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container relative mb-6" id="body">
      <div className="flex flex-col justify-start">
        {categoryId && (
          <div className="page-title py-t lg:pt-3">
            <nav className="breadcrumb">
              <span>
                <Link href="/">Home</Link>
              </span>
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="5"
                viewBox="0 0 8 5"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M1.002.27L.29.982l3.712 3.712L7.714.982 7.002.27l-3 3z"
                ></path>
              </svg>
              <span className="pl-1">
                {" "}
                {categoryId
                  ? collectionData[0]?.category_name || "Category"
                  : "Product Collection"}
              </span>
            </nav>
          </div>
        )}
        <Heading className="my-2" isMain>
          {categoryId
            ? collectionData[0]?.category_name || "Category"
            : "Product Collection"}
        </Heading>
      </div>
      <div className="flex flex-col lg:flex-row lg:bg-white lg:p-6">
        <div className="relative flex-1 ">
          <SearchResultHeader
            productLength={currentItems.length}
            applyFilters={applyFilters}
            fetchedData={collectionData}
            onSortChange={setSortOption}
          />

          <div className="grid flex-1 gap-x-3 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {currentItems.map((item) => (
              <ProductCard showPrevPrice product={item} key={item.id} />
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-end mt-4">
            {Array.from(
              { length: Math.ceil(collectionData.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 border rounded ${
                    i + 1 === currentPage
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
