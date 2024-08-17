import CategorySlider from "components/CategorySlider";
import React from "react";

const SectionCategory = () => {
  return (
    <section className=" lg:bg-white lg:rounded-lg lg:border ">
      <div className="overflow-hidden ">
        <CategorySlider />
      </div>
    </section>
  );
};

export default SectionCategory;
