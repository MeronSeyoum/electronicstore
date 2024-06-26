import { useRouter } from "next/router";
import { useEffect, useState, useCallback, useMemo } from "react";
import ProductCard from "components/ProductCard";
import SidebarFilter from "components/SideBarFilter";
import Link from "next/link";
import Loading from "pages/Loading";
import SearchResultHeader from "components/SearchResultHeader";
import useDataFetch from "hooks/useDataFetch";

export default function ProductSearchResult() {
  const { fetchedData, error, loading } = useDataFetch("/api/category");

  const [searchProduct, setSearchProduct] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/product?q=${q}`);
        const data = await res.json();
        setSearchProduct(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchProduct([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (q) {
      fetchProducts();
    }
  }, [q]);

  const applyFilters = useCallback(
    (filters) => {
      const {
        selectedBrands,
        selectedCategory,
        selectedSizes,
        selectedStorages,
        priceRange,
      } = filters;

      const data = searchProduct.filter((item) => {
        if (selectedBrands.length > 0 && !selectedBrands.includes(item.category_name)) return false;
        if (selectedCategory !== 'All' && selectedCategory !== item.category) return false;
        if (selectedSizes.length > 0 && !selectedSizes.includes(item.size)) return false;
        if (selectedStorages.length > 0 && !selectedStorages.includes(item.storage)) return false;
        if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
        return true;
      });

      setFilteredData(data);
      setCurrentPage(1);
    },
    [searchProduct]
  );

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return Array.isArray(filteredData) ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : [];
  }, [currentPage, filteredData]);

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  if (loading) {
    return <Loading />;
  }
  if(error){
    return <div error={error} />
  }

  return (
    <div className="container relative " id="body">
      <div className="flex">
        <div className="page-title py-2">
          <nav className="breadcrumb">
            <span>
              <Link href="/">Home</Link>
            </span>{" "}
            {" "}
            <span>
              <Link href="/productCollection">Shop</Link>
            </span>{" "}
            / <span>Search results for “{q}”</span>
          </nav>
          <h3 className="entry-title-main">Search results: “{q}”</h3>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row bg-white rounded-lg lg:p-4">
        <div className="pr-2 py-1 ">
         
        </div>
        <div className="relative flex-1 top-4 z-10 mb-3">
          {q && <SearchResultHeader productLength={currentItems.length} applyFilters={applyFilters} fetchedData={fetchedData}  />
         }
          {currentItems.length > 0 ? (
            <>
              <div className="grid flex-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
                {currentItems.map((item) => (
                  <ProductCard showPrevPrice product={item} key={item.id} />
                ))}
              </div>
              <div className="flex justify-end my-4">
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-3 py-1 border rounded ${
                      i + 1 === currentPage ? "bg-primary text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
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
