"use client";
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useDataFetch from "hooks/useDataFetch";

const brands = ["All", "Apple", "Samsung", "Motorola", "Accessories"];
const sizes = ["Small", "Medium", "Large"];
const storages = ["32GB", "64GB", "128GB", "256GB", "512GB"];
const PRICE_RANGE = [0, 2000];
const SideBarFilter = ({ applyFilters, fetchedData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStorages, setSelectedStorages] = useState([]);
  const [priceRange, setPriceRange] = useState(PRICE_RANGE);
  const [openSections, setOpenSections] = useState({
    category: true,
    brand: false,
    size: false,
    storage: false,
    price: false,
  });

  const handleToggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((cat) => cat !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const handleApplyFilters = () => {
    applyFilters({
      selectedBrands,
      selectedCategory,
      selectedSizes,
      selectedStorages,
      priceRange,
    });
  };

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  return (
    <>
      <button type="button" onClick={handleOpenMenu} className="flex gap-x-3">
        <span className="text-sm ml-2 ">More Filter</span>
      </button>

      <Transition appear show={isVisible} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={handleCloseMenu}>
          <div className="z-max fixed inset-y-0 right-0 w-full h-full max-w-md outline-none focus:outline-none lg:max-w-md">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-full"
            >
              <div className="relative z-20">
                <div className="overflow-hidden shadow-lg ring-1 ring-black/5">
                  <div className="relative h-screen bg-white">
                    <div className="hiddenScrollbar h-full overflow-y-auto p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Filter</h3>
                        <button onClick={handleCloseMenu} className="text-2xl">
                          <MdClose />
                        </button>
                      </div>

                      <div className="divide-y divide-neutral-300 ">
                        <div>
                          <h3
                            className="text-sm font-semibold mb-2 cursor-pointer"
                            onClick={() => handleToggleSection("category")}
                          >
                            Category
                          </h3>
                          {openSections.category && (
                            <div className="mb-4">
                              {fetchedData.map((category) => (
                                <div key={category.id} className="flex items-center mb-2 text-xs">
                                  <input
                                    type="checkbox"
                                    id={category.id}
                                    value={category.category_name}
                                    checked={selectedCategory.includes(category.category_name)}
                                    onChange={() => handleCategoryChange(category.category_name)} 
                                    className="mr-2"
                                  />
                                  <label htmlFor={category.id}>{category.category_name}</label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <h3
                            className="text-sm font-semibold mb-2 cursor-pointer"
                            onClick={() => handleToggleSection("brand")}
                          >
                            Brand
                          </h3>
                          {openSections.brand && (
                            <div className="mb-4">
                              {brands.map((brand) => (
                                <div key={brand} className="flex items-center mb-2 text-xs">
                                  <input
                                    type="checkbox"
                                    id={brand}
                                    value={brand}
                                    checked={selectedBrands.includes(brand)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedBrands([...selectedBrands, brand]);
                                      } else {
                                        setSelectedBrands(
                                          selectedBrands.filter((b) => b !== brand)
                                        );
                                      }
                                    }}
                                    className="mr-2"
                                  />
                                  <label htmlFor={brand}>{brand}</label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <h3
                            className="text-sm font-semibold mb-2 cursor-pointer"
                            onClick={() => handleToggleSection("size")}
                          >
                            Size
                          </h3>
                          {openSections.size && (
                            <div className="mb-4">
                              {sizes.map((size) => (
                                <div key={size} className="flex items-center mb-2 text-xs">
                                  <input
                                    type="checkbox"
                                    id={size}
                                    value={size}
                                    checked={selectedSizes.includes(size)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedSizes([...selectedSizes, size]);
                                      } else {
                                        setSelectedSizes(selectedSizes.filter((s) => s !== size));
                                      }
                                    }}
                                    className="mr-2"
                                  />
                                  <label htmlFor={size}>{size}</label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <h3
                            className="text-sm font-semibold mb-2 cursor-pointer"
                            onClick={() => handleToggleSection("storage")}
                          >
                            Storage
                          </h3>
                          {openSections.storage && (
                            <div className="mb-4">
                              {storages.map((storage) => (
                                <div key={storage} className="flex items-center mb-2 text-xs">
                                  <input
                                    type="checkbox"
                                    id={storage}
                                    value={storage}
                                    checked={selectedStorages.includes(storage)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedStorages([...selectedStorages, storage]);
                                      } else {
                                        setSelectedStorages(selectedStorages.filter((s) => s !== storage));
                                      }
                                    }}
                                    className="mr-2"
                                  />
                                  <label htmlFor={storage}>{storage}</label>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <h3
                            className="text-sm font-semibold mb-2 cursor-pointer"
                            onClick={() => handleToggleSection("price")}
                          >
                            Price Range
                          </h3>
                          {openSections.price && (
                            <div className="mb-4">
                              <Slider
                                min={PRICE_RANGE[0]}
                                max={PRICE_RANGE[1]}
                                defaultValue={PRICE_RANGE}
                                onChange={(value) => setPriceRange(value)}
                                range
                              />
                              <div className="flex justify-between text-xs">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <ButtonPrimary onClick={handleApplyFilters}>
                          Apply Filters
                        </ButtonPrimary>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter=" duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900/60" />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SideBarFilter;
