import { useState } from "react";
import SideBarFilter from "./SideBarFilter";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { LuFilter } from "react-icons/lu";

const SearchResultHeader = ({ productLength, applyFilters, fetchedData, onSortChange }) => {
  const [inStock, setInStock] = useState(false);
  const [storeOnly, setStoreOnly] = useState(false);

  const handleInStockToggle = () => setInStock(!inStock);
  const handleStoreOnlyToggle = () => setStoreOnly(!storeOnly);

  return (
    <section className="mx-auto mb-3 lg:p-3 py-3 bg-neutral-light ">
      <div className="flex justify-between items-center text-sm lg:flex-row flex-col ">
        <div className="hidden lg:block">{productLength} results</div>
        <div className="flex items-center lg:space-x-4  lg:space-y-0 space-y-2 lg:gap-0 gap-4">
          <div className=" items-center lg:block hidden">
            <label className="flex items-center cursor-pointer ">
              <input
                type="checkbox"
                className="hidden"
                checked={inStock}
                onChange={handleInStockToggle}
              />
              <span
                className={`relative w-10 h-3 bg-gray-300 rounded-full shadow-inner ${
                  inStock ? "bg-neutral-400 " : ""
                }`}
              >
                <span
                  className={`absolute w-5 h-5 -mt-1 bg-primary rounded-full shadow transform transition-transform ${
                    inStock ? "translate-x-5 " : ""
                  }`}
                ></span>
              </span>{" "}
              <span className="ml-2">In Stock</span>
            </label>
          </div>
          <div className="lg:block hidden items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={storeOnly}
                onChange={handleStoreOnlyToggle}
              />
              <span className="relative w-10 h-3 bg-gray-300 rounded-full shadow-inner">
                <span
                  className={`absolute w-5 h-5 -mt-1 bg-primary rounded-full shadow transform transition-transform ${
                    storeOnly ? "translate-x-5" : ""
                  }`}
                ></span>
              </span>
              <span className="ml-2">In Store Only</span>
            </label>
          </div>
          <div className="relative flex items-center">
            <label htmlFor="Sort" className="mr-2 hidden lg:block">
              Sort
            </label>
            <select
              id="Sort"
              name="Sort"
              className="appearance-none bg-white border border-gray-300 py-2 px-4
            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="bestMatch">Best Match</option>
              <option value="priceLowToHigh">Price Low-High</option>
              <option value="priceHighToLow">Price High-Low</option>
              <option value="highestRated">Highest Rated</option>
            </select>
            <svg
              className="w-4 h-4 text-gray-500 absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none"
              viewBox="0 0 32 32"
            >
              <path d="M19.5,16.71l-5.59,5.59a1,1,0,0,1-1.71-.71V10.41a1,1,0,0,1,1.71-.71l5.59,5.59A1,1,0,0,1,19.5,16.71Z"></path>
            </svg>
          </div>
          <ButtonSecondary className="space-y-1 gap-2 h-9 py-3 white-black bg-white px-1 lg:px-4 ">
            <SideBarFilter
              applyFilters={applyFilters}
              fetchedData={fetchedData}
            />
            <LuFilter />
          </ButtonSecondary>
        </div>
      </div>
    </section>
  );
};

export default SearchResultHeader;
