import React from "react";
import { LuFilter } from "react-icons/lu";

import { filters } from "data/content";
import Button from "shared/Button/Button";
import Select from "shared/Select/Select";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

const Filter = () => {
  return (
    <div className="mx-auto my-4 max-w-4xl items-center justify-between space-y-4
     rounded-md border border-neutral-300 p-2 md:flex md:space-y-0 md:rounded-md">
      <div className="grid basis-[75%] gap-3 md:grid-cols-4">
        {filters.map((filter) => (
          <Select sizeClass="h-10 px-3 rounded-md" key={filter[0]}>
            {filter.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        ))}
      </div>

      <div className="hidden h-5 w-px bg-neutral-300 md:block " />

      <ButtonSecondary className="space-y-3 gap-2 h-9 py-3 border-2 border-black bg-black text-white ">
        More Filter
        <LuFilter />
      </ButtonSecondary>
    </div>
  );
};

export default Filter;
