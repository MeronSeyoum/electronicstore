import React from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import ProductSearch from 'components/ProductSearch';

export const NavMobileSearchBar = ({ onBackClick }) => {
  return (
    <div className="flex items-center justify-between py-1 gap-x-2 mx-6 bg-white border-b-2 ">
      <button className="text-xl " onClick={onBackClick}>
        <RiArrowLeftLine />
      </button>
      <ProductSearch />
    </div>
  );
};
