import React, { useState,useEffect } from 'react';

import ProductCard from 'components/ProductCard';
import SidebarFilters from 'components/SideBarFilter';
import useDataFetch from 'hooks/useDataFetch';
import Loading from 'pages/Loading';

const Page = () => {

  const { fetchedData, error, loading } = useDataFetch('/api/product');

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Change this value as per your requirement
  
  
  useEffect(() => {
    if (fetchedData) {
      setFilteredData(fetchedData);
    }
  }, [fetchedData]);

  const applyFilters = (filters) => {
    const { selectedBrands, selectedCategory, selectedSizes, selectedStorages, selectedAvailability, priceRange } = filters;

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
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
//  delay the displaying result until result return
if (loading) {
  return <Loading />;
}
  return (
    <div className="container relative flex flex-col lg:flex-row" id="body">
      <div className="pr-2 py-10 lg:w-1/5">
      <SidebarFilters applyFilters={applyFilters} fetchedData={fetchedData} />
     </div>
      <div className="relative flex-1 top-6 z-10 my-4 ml-4">
        <div className="grid flex-1 gap-x-3 gap-y-5 grid-cols-2 xl:grid-cols-4 ">
          {currentItems.map((item) => (
            <ProductCard showPrevPrice product={item} key={item.id} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-end mt-4">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                i + 1 === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
