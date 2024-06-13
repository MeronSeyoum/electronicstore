import StripeCheckoutButton from "components/StripeCheckoutButton";
import React, { useState } from "react";
import { FaPaypal, FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineCreditScore } from "react-icons/md";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import FormItem from "shared/FormItem";
import Input from "shared/Input/Input";
import Radio from "shared/Radio/Radio";

const PaymentMethod = ({ isActive, onCloseActive, onOpenActive }) => {
  const [methodActive, setMethodActive] = useState("Credit-Card");

  const renderDebitCredit = () => {
    const active = methodActive === "Credit-Card";
    return (
      <div className="flex items-start space-x-4 sm:space-x-6">
        <Radio
          className="pt-4"
          name="payment-method"
          id="Credit-Card"
          defaultChecked={active}
          onChange={(e) => setMethodActive("Credit-Card")}
        />
        <div className="flex-1">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div
              className={`rounded-xl border-2 p-2 ${
                active ? "border-primary" : "border-neutral-300"
              }`}
            >
              <FaRegCreditCard className="text-2xl" />
            </div>
            <p className="font-medium text-sm">Debit / Credit Card</p>
          </div>
          {/* <StripeCheckoutButton /> */}
          <div
            className={`mb-4 mt-6 space-y-3 sm:space-y-5 ${
              active ? "block" : "hidden"
            }`}
          >
            <div className="max-w-lg">
              <FormItem label="Card number">
                <Input
                  autoComplete="off"
                  rounded="rounded-lg"
                  sizeClass="h-9 px-3 py-3"
                  className="border-neutral-300 bg-transparent  placeholder:text-neutral-500 focus:border-primary"
                  type="text"
                />
              </FormItem>
            </div>
            <div className="max-w-lg">
              <FormItem label="Card holder name">
                <Input
                  autoComplete="off"
                  rounded="rounded-lg"
                  sizeClass="h-9 px-3 py-3"
                  className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                  type="text"
                />
              </FormItem>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 max-w-lg">
              <div className="sm:w-1/2">
                <FormItem label="Expiration date (MM/YY)">
                  <Input
                    autoComplete="off"
                    rounded="rounded-lg"
                    sizeClass="h-9 px-3 py-3"
                    className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                    placeholder="MM/YY"
                  />
                </FormItem>
              </div>
              <div className=" sm:w-1/2">
                <FormItem label="CVC">
                  <Input
                    autoComplete="off"
                    rounded="rounded-lg"
                    sizeClass="h-9 px-3 py-3"
                    className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                    placeholder="CVC"
                  />
                </FormItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWallet = () => {
    const active = methodActive === "Paypal";
    return (
      <div className="flex items-start space-x-4 sm:space-x-6">
        <Radio
          className="pt-4"
          name="payment-method"
          id="Paypal"
          defaultChecked={active}
          onChange={() => setMethodActive("Paypal")} // Change this line
        />
        <div className="flex-1">
          <div className="flex items-center space-x-4 sm:space-x-6 ">
            <div
              className={`rounded-xl border-2 p-2 ${
                active ? "border-primary" : "border-neutral-300"
              }`}
            >
              <FaPaypal className="text-3xl" />
            </div>
            <p className="font-medium">Paypal</p>
          </div>
          <div className={` mt-6 space-y-6 ${active ? "block" : "hidden"}`}>
            <div className="max-w-lg">
              <FormItem label="PayPal email">
                <Input
                  autoComplete="off"
                  rounded="rounded-lg"
                  sizeClass="h-9 px-3 py-3"
                  className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                  type="text"
                />
              </FormItem>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-neutral-300 ">
      <div className="flex flex-col items-start p-6 sm:flex-row">
        <span className="hidden sm:block">
          <MdOutlineCreditScore className="text-3xl text-primary" />
        </span>
        <div className="flex w-full items-center justify-between">
          <div className="sm:ml-8">
            <h3 className="uppercase text-sm font-semibold">
              PAYMENT METHOD
            </h3>
            <div className="mt-1 text-xs ">
              <span className="">{methodActive}</span>
              <span className="ml-3">xxx-xxx-xx55</span>
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
        className={`space-y-6 border-t border-neutral-300 px-6 py-7 ${
          isActive ? "block" : "hidden"
        }`}
      >
        {/* ==================== */}
        <div>{renderDebitCredit()}</div>

        {/* ==================== */}
        <div>{renderWallet()}</div>

        <div className="flex pt-6">
          <ButtonPrimary
            className="w-full max-w-[240px]"
            onClick={onCloseActive}
          >
            Confirm order
          </ButtonPrimary>
          <ButtonSecondary
            className="ml-3 bg-neutral-300"
            onClick={onCloseActive}
          >
            Cancel
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
