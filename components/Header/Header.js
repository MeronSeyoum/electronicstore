import React, { useState } from 'react';
import MainNav from './MainNav';
import TopNav from './TopNav';
import CategoryMenu from './MenuItem';
import { NavMobileSearchBar } from './NavMobileSearchBar';

const Header = () => {
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(false);

  const toggleMobileSearchBar = () => {
    setShowMobileSearchBar(!showMobileSearchBar);
  };

  return (
    <div className="nc-Header relative z-50 w-full border-b border-neutral-300 ">
      <TopNav />
      <div className="sticky top-8 bg-white ">
        {showMobileSearchBar ? (
         
          <NavMobileSearchBar onBackClick={toggleMobileSearchBar} />
        ) : (
          <MainNav onSearchIconClick={toggleMobileSearchBar} />
        )}
      </div>
      {/* <CategoryMenu /> */}
    </div>
  );
};

export default Header;
