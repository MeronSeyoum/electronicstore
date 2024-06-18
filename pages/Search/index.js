import { useRouter } from "next/router";
import { useEffect, useState, useCallback, useMemo } from "react";
import ProductCard from "components/ProductCard";
import SidebarFilter from "components/SideBarFilter";
import Link from "next/link";
import Loading from "pages/Loading";
import SearchResultHeader from "components/SearchResultHeader";
export default function ProductSearchResult() {
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Static value for items per page
  const router = useRouter();
  const { q } = router.query;

  // Fetch products based on the query
  useEffect(() => {
    setIsLoading(true);
    if (q) {
      const fetchProducts = async () => {
        try {
          const res = await fetch(`/api/product?q=${q}`);
          const data = await res.json();
          setFetchedData(data);
          setFilteredData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setFetchedData([]);
          setFilteredData([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [q]);

  // Apply filters and reset current page to 1
  const applyFilters = (filters) => {
    const {
      selectedBrands,
      selectedCategory,
      selectedSizes,
      selectedStorages,
      selectedAvailability,
      priceRange,
    } = filters;

    const data = fetchedData.filter((item) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.category_name)) return false;
      if (selectedCategory !== 'All' && selectedCategory !== item.category) return false;
      if (selectedSizes.length > 0 && !selectedSizes.includes(item.size)) return false;
      if (selectedStorages.length > 0 && !selectedStorages.includes(item.storage)) return false;
      if (selectedAvailability.length > 0 && !selectedAvailability.includes(item.availability)) return false;
      if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
      return true;
    });

    setFilteredData(data);
    setCurrentPage(1); // Reset current page to 1 when filters are applied
  };

  // Calculate current items based on pagination
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredData]);

  // Change page
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);
 
//  delay the displaying result until result return
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container relative " id="body">
      <div className="flex ">
      <div className="page-title py-2">
          <nav className="breadcrumb">
            <span>
              <Link href="/">Home</Link>
            </span>{" "}
            {" "}
            <span>
              <Link href="/productCollection">Shop</Link>
            </span>{" "}
            / <span>Search results for “{q}”  </span>
          </nav> 
             <h3 className="entry-title-main">Search results: “{q}”</h3>
   
        </div>
        
          </div> 
       <div className="flex flex-col lg:flex-row">
      <div className="pr-2 py-4 lg:w-1/5">
        <SidebarFilter applyFilters={applyFilters} />
      </div>
      <div className="relative flex-1 top-4 z-10 mb-3">

      {q ? (<SearchResultHeader productLength={currentItems.length} />):('')}
     
        {currentItems.length > 0 ? (
          <>
            <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {currentItems.map((item) => (
                <ProductCard showPrevPrice product={item} key={item.id} />
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-end my-4">
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
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
          </>
        ) : (
          <p className="product-info">No products were found matching your selection.</p>
        )}
      </div>
    </div>
    </div>
  );
}
