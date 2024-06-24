import React from "react";
import { newsletter } from "data/content";
import ButtonSecondary from "../Button/ButtonSecondary";
import Input from "../Input/Input";
import { BsEnvelope } from 'react-icons/bs';
const Subscribe = () => {
  return (
    <div className="flex flex-col justify-evenly rounded-2xl p-5 lg:flex-row lg:space-x-5 bg-gray-500">
      <div className="flex flex-col gap-5 items-center lg:flex-row w-full lg:items-center lg:space-x-5 space-y-5 lg:space-y-0">
      <BsEnvelope className="text-white " size={60} /> {/* Style the icon */}
       
        <h3 className="text-2xl font-medium text-white w-full  ">{newsletter.heading}</h3>
        <Input
          type="text"
          sizeClass="h-12 px-4 py-3"
          rounded="rounded-md"
          className="w-full lg:w-72 border-2 border-transparent bg-white placeholder:text-sm placeholder:text-neutral-400 focus:border-blue-500"
          placeholder="Your email@email.com"
        />
        <ButtonSecondary
          className="bg-white text-black"
          onClick={() => {}}
          sizeClass="px-5 py-4"
        >
          Subscribe
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default Subscribe;
