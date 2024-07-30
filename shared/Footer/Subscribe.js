import React from "react";
import { newsletter } from "data/content";
import ButtonSecondary from "../Button/ButtonSecondary";
import Input from "../Input/Input";
import { BsEnvelope } from 'react-icons/bs';

const Subscribe = () => {
  return (
    <div className="flex flex-col justify-evenly rounded-2xl lg:p-5 lg:flex-row lg:space-x-5 bg-gray-500">
      <div className="flex flex-col lg:gap-5 items-center lg:flex-row w-full lg:items-center lg:space-x-5 space-y-5 lg:space-y-0">
        <div className="flex items-center w-full lg:w-auto">
          <BsEnvelope className="text-white text-2xl lg:text-4xl mr-3" />
          <h3 className="lg:text-4xl text-lg font-medium text-white">{newsletter.heading}</h3>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-3 lg:gap-3 w-full">
          <Input
            type="text"
            sizeClass="h-12 px-4 py-3"
            rounded="rounded-md"
            className="w-full lg:w-72 border-2 border-transparent bg-white placeholder:text-sm placeholder:text-neutral-400 focus:border-blue-500"
            placeholder="Your email@email.com"
          />
          <ButtonSecondary
            className="bg-white text-black mt-3 lg:mt-0"
            onClick={() => {}}
            sizeClass="px-5 py-4"
          >
            Subscribe
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
