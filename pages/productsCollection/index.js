import React, { useState } from 'react';

import ProductCard from 'components/ProductCard';
import SidebarFilters from 'components/SideBarFilter';

const Page = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Change this value as per your requirement

  const applyFilters = (filteredData) => {
    setFilteredData(filteredData);
    setCurrentPage(1); // Reset current page to 1 when filters are applied
  };

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container relative flex flex-col lg:flex-row" id="body">
      <div className="pr-2 py-10 lg:w-1/5">
        <SidebarFilters applyFilters={applyFilters} />
      </div>
      <div className="relative flex-1 top-6 z-10 mb-3">
        <div className="grid flex-1 gap-x-0 gap-y-0 sm:grid-cols-2 xl:grid-cols-4 ">
          {currentItems.map((item) => (
            <ProductCard showPrevPrice product={item} key={item.id} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                i + 1 === currentPage ? 'bg-red-500 text-white' : 'hover:bg-gray-200'
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
