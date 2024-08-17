"use client";
import React,{useState,useEffect} from "react";
import Slider from "shared/Slider/Slider";
import useDataFetch from "hooks/useDataFetch";
import Loading from "pages/Loading";
import CategoryCard from "./CategoryCard";
import { useWindowSize } from 'react-use';

const CategorySlider = () => {
  const windowWidth = useWindowSize().width;
 
  const { fetchedData, error, loading } = useDataFetch("/api/category");
  
  const [numberOfItems, setNumberOfItem] = useState(8);
 useEffect(() => {
const itemPerRow = 12;

  if (windowWidth < 500) {
    if (itemPerRow < 3) {
      return setNumberOfItem(1);
    }
    return setNumberOfItem(itemPerRow - 5 || 1);
  }

},[windowWidth]);


  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
//  const data = fetchedData ? fetchedData.slice(10, 34) : [];
  return (
    <div className="  lg:p-4">
      <Slider
        itemPerRow={numberOfItems}
        data={fetchedData}
        category={true}
        renderItem={(item) => {
          if (!item) {
            return null;
          }
          return <CategoryCard category={item} />;
        }}
      />
    </div>
  );
};

export default CategorySlider;
