import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Input from "shared/Input/Input";
import { RiSearch2Line } from "react-icons/ri";

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // const handleInputChange = (e) => {
  //   setQuery(e.target.value);
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/Search?q=${query}`); // Route to the ProductSearchResult component
   
  
    }
  };

  return (
    <form onSubmit={handleSearch} className="hidden w-full max-w-xl items-center gap-5 py-0 rounded-md border border-neutral-300 lg:flex">
      <Input
        type="text"
        className="border-white rounded-md bg-neutral-200 placeholder:text-neutral-500 focus:border-transparent mx-0"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="hidden"></button>
      <button type="submit" className="p-0 m-0 border-none bg-transparent cursor-pointer">
        <RiSearch2Line className="text-lg text-neutral-500 me-3" />
      </button>
      {/* <button type="submit">Search</button> */}
    </form>
  );
};

export default ProductSearch;
