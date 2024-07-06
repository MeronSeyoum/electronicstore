import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Input from "shared/Input/Input";
import { RiSearch2Line } from "react-icons/ri";

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/Search?q=${query}`); // Route to the ProductSearchResult component
    }
  };

  return (
    <form onSubmit={handleSearch} className="  w-full max-w-xl items-center rounded-md border border-neutral-300 flex">
    <div className='flex flex-grow gap-x-3'>
      <Input
        type="text"
        className="border-white rounded-md bg-neutral-light placeholder:text-neutral-500 focus:border-transparent mx-0"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <button type="submit" className="p-0 m-0 border-none bg-transparent cursor-pointer"> 
        <RiSearch2Line className="text-lg text-neutral-500 me-3" />
      </button>
      </div>
    </form>
  );
};

export default ProductSearch;
