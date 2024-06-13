import React from "react";

import { NavLinks } from "data/content";

import Language from "../Language";
import NavigationItem from "../NavItem";

const TopNav = () => {
  return (
    <div className="hidden bg-black py-2 lg:block">
      <div className="container flex items-center justify-between text-xs text-white">
        <div className="flex items-center divide-x divide-neutral-100">
          {NavLinks.map((item) => (
            <NavigationItem menuItem={item} key={item.id} />
          ))}
        </div>
<p>Save upto 20% in all accessories and products on sale</p>
        <Language />
      </div>
    </div>
  );
};

export default TopNav;
