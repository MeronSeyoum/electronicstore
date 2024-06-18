import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from 'components/ProductCard';
import SidebarFilter from 'components/SideBarFilter';
import Loading from 'pages/Loading';
import useDataFetch from 'hooks/useDataFetch';
import SearchResultHeader from 'components/SearchResultHeader';
import Filter from 'components/Filter';
import Heading from 'shared/Heading/Heading';

const Page = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const dataSource = categoryId ? `/api/category/productByCategory?id=${categoryId}` : '/api/product';
  
  const { fetchedData, error, loading } = useDataFetch(dataSource);

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this value as per your requirement

  useEffect(() => {
    if (fetchedData) {
      setFilteredData(fetchedData);
    }
  }, [fetchedData]);

  const applyFilters = (filters) => {
    const { selectedBrands, selectedCategory, selectedSizes, selectedStorages, selectedAvailability, priceRange } = filters;

    const data = fetchedData.filter((item) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) return false;
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error loading products. Please try again later.</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container relative " id="body">
    <div className='flex'>
    <Heading className="my-2  " isMain isCenter>
      {categoryId ? (fetchedData[0]?.category_name || 'Category'):('Product Collection')}
      </Heading>

    </div> 
    <div className='flex flex-col lg:flex-row'>
     <div className="pr-2  lg:w-1/5">
        <SidebarFilter applyFilters={applyFilters} fetchedData={filteredData} />
      </div>
      <div className="relative flex-1 z-10  lg:ml-4">
      
      {categoryId ? (<SearchResultHeader productLength={currentItems.length} />):(<Filter />)}
        
        <div className="grid flex-1 gap-x-3 gap-y-5 grid-cols-2 lg:grid-cols-4">
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
    </div>
  );
};

export default Page;
