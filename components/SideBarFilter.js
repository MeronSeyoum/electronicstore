import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import useDataFetch from "hooks/useDataFetch";

const brands = ["All", "Apple", "Samsung", "Motorola", "Accessories"];
const sizes = ["Small", "Medium", "Large"];
const storages = ["32GB", "64GB", "128GB", "256GB", "512GB"];
const PRICE_RANGE = [0, 1000];

const SideBarFilter = ({ applyFilters }) => {
  const { fetchedData: categories, error, loading } = useDataFetch('/api/category');
  
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStorages, setSelectedStorages] = useState([]);
  const [priceRange, setPriceRange] = useState(PRICE_RANGE);

  const handleApplyFilters = () => {
    applyFilters({
      selectedBrands,
      selectedCategory,
      selectedSizes,
      selectedStorages,
      priceRange,
    });
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error loading categories. Please try again later.</div>;
  }

  return (
    <div className="hidden lg:block border rounded-lg">
      <div className="bg-primary rounded-t">
        <h2 className="text-base font-semibold py-2 px-4 text-white">
          Filter
        </h2>
      </div>
      <div className="p-4">
      <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Category</h3>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center mb-2 text-xs">
              <input
                type="radio"
                id={category.id}
                name="category"
                value={category.category_name}
                checked={selectedCategory === category.category_name}
                onChange={() => setSelectedCategory(category.category_name)}
                className="mr-2"
              />
              <label htmlFor={category.id}>{category.category_name}</label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Brand</h3>
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
        
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Size</h3>
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
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Storage</h3>
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
                    setSelectedStorages(
                      selectedStorages.filter((s) => s !== storage)
                    );
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={storage}>{storage}</label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-xs font-semibold mb-2">Price Range</h3>
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
        <ButtonPrimary onClick={handleApplyFilters}>
          Apply Filters
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SideBarFilter;
