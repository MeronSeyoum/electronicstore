import CategorySlider from "components/CategorySlider";
import React from "react";

const SectionCategory = () => {
  return (
    <section className=" bg-white p-4 rounded-lg border ">
      <div className="overflow-hidden ">
        <CategorySlider />
      </div>
    </section>
  );
};

export default SectionCategory;
