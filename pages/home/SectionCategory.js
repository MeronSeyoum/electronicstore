import CategorySlider from "components/CategorySlider";
import React from "react";

const SectionCategory = () => {
  return (
    <section className=" bg-white p-4 rounded-md ">
      <div className="overflow-hidden ">
        <CategorySlider />
      </div>
    </section>
  );
};

export default SectionCategory;
