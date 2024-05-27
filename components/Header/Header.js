import React from "react";
import MainNav from "./MainNav";
import TopNav from "./TopNav";
import CategoryMenu from "./MenuItem";

const Header = () => {
  return (
    <div className="nc-Header relative z-50 w-full border-b border-neutral-300 ">
      <TopNav />
      <div className="sticky inset-x-0 top-0 bg-white ">
      <MainNav />
      </div>
      <CategoryMenu />
    </div>
  );
};

export default Header;
