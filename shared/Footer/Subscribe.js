import React from "react";
import { newsletter } from "data/content";
import ButtonSecondary from "../Button/ButtonSecondary";
import Input from "../Input/Input";

const Subscribe = () => {
  return (
    <div className="flex flex-row items-stretch justify-between space-y-10 rounded-2xl p-5 md:flex-row md:space-y-0 md:space-x-5 bg-gray-500">
      <div className="flex-1 space-y-5">
        <h3 className="text-2xl font-medium text-white">{newsletter.heading}</h3>
        <Input
          type="text"
          sizeClass="h-12 px-4 py-3"
          rounded="rounded-md"
          className="w-full border-2 border-transparent bg-white placeholder:text-sm placeholder:text-neutral-400 focus:border-blue-500"
          placeholder="Your email@email.com"
        />
      </div>
      <div className="flex-1 space-y-5 md:space-y-0 md:flex md:flex-col md:justify-between">
        <p className="text-xs text-neutral-400">{newsletter.description}</p>
        <ButtonSecondary
          className="bg-red-500 text-white mt-5 md:mt-0"
          onClick={() => {}}
          sizeClass="px-5 py-3"
        >
          Subscribe
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default Subscribe;
