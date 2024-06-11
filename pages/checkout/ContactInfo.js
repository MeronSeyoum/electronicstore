import React, {useState} from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';

import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import Checkbox from 'shared/Checkbox/Checkbox';
import FormItem from 'shared/FormItem';
import Input from 'shared/Input/Input';
import { userService } from "services";

const ContactInfo = ({ isActive, onCloseActive, onOpenActive }) => {
  const [phone, setPhone] = useState(userService.userValue?.telephone || '');
  const [email, setEmail] = useState(userService.userValue?.email || '');

  const handleSave = () => {
    // Here you can add logic to save the updated information
    // Example: userService.updateUser({ phone, email });
    onCloseActive();
  };
  return (
    <div className="z-0 overflow-hidden rounded-xl border border-neutral-300">
      <div className="flex flex-col items-start p-4 sm:flex-row ">
        <span className="hidden sm:block">
          <FaRegCircleUser className="text-2xl text-primary" />
        </span>
        <div className="flex w-full items-center justify-between">
          <div className="sm:ml-8">
            <div className="uppercase text-sm font-semibold ">CONTACT INFORMATION</div>
            <div className="mt-1 text-xs ">           
             
              <span className="">  {userService.userValue?.first_name + " " + userService.userValue?.last_name}</span>
              <span className="ml-3 tracking-tighter">+1 {userService.userValue?.telephone}</span>
            </div>
          </div>
          <ButtonSecondary
            sizeClass="py-2 px-4"
            className="border-2 border-primary text-primary"
            onClick={onOpenActive}
          >
            Edit
          </ButtonSecondary>
        </div>
      </div>
      <div
        className={`space-y-4 border-t border-neutral-300 px-6 py-7 sm:space-y-6 ${
          isActive ? 'block' : 'hidden'
        }`}
      >
        <h3 className="text-lg font-semibold">Contact information</h3>
        <div className="max-w-lg">
          <FormItem label="Your phone number">
            <Input
              rounded="rounded-lg"
              sizeClass="h-9 px-4 py-3"
              className="border-neutral-300  bg-transparent placeholder:text-neutral-500 focus:border-primary"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
                type="tel"
            />
          </FormItem>
        </div>
        <div className="max-w-lg">
          <FormItem label="Email address">
            <Input
              rounded="rounded-lg"
              sizeClass="h-9 px-4 py-3"
              className="border-neutral-300  bg-transparent placeholder:text-neutral-500 focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </FormItem>
        </div>
        <div>
          <Checkbox
            className="!text-sm "
            name="uudai"
            label="Email me news and offers"
            defaultChecked
          />
        </div>

        {/* ============ */}
        <div className="flex flex-col py-0 sm:flex-row">
          <ButtonPrimary
            className=" shadow-none sm:!px-7"
            onClick={() => onCloseActive()}
          >
            Save and go to Shipping
          </ButtonPrimary>
          <ButtonSecondary
            className="my-4 sm:ml-3 sm:mt-0 bg-neutral-300"
            onClick={() => onCloseActive()}
          >
            Cancel
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
