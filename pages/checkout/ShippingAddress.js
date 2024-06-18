import React, { useState, useEffect } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import FormItem from "shared/FormItem";
import Input from "shared/Input/Input";
import Radio from "shared/Radio/Radio";
import Select from "shared/Select/Select";
import { userService } from "services";

const AddressDetails = ({ address }) => (
  <>
    <span className="uppercase text-sm font-semibold">SHIPPING ADDRESS</span>
    <div className="mt-1 text-xs">
      {address[0]?.address_line1}, Apt {address[0]?.address_line2},{" "}
      {address[0]?.city}, {address[0]?.state}
    </div>
  </>
);

const ShippingAddress = () => {
  const [userId, setUserId] = useState(userService.userValue?.id || "");
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [first_name, setFirst_name] = useState(userService.userValue?.first_name || "");
  const [last_name, setLast_name] = useState(userService.userValue?.last_name || "");

  useEffect(() => {
    if (userId) {
      fetchAddresses(userId);
    }
  }, [userId]);

  const fetchAddresses = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/address/UserAddress?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to retrieve user addresses");
      }
      const data = await response.json();
      setAddress(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError("Failed to retrieve user addresses");
      setLoading(false);
    }
  };

  if (!userId) {
    return <p>Please provide a user ID.</p>;
  }

  return (
    <div className="">
      <div className="flex flex-col p-4 sm:flex-row items-center">
        <span className="hidden sm:block">
          <TbTruckDelivery className="text-3xl text-primary" />
        </span>
        <div className="flex w-full items-center justify-between sm:ml-4">
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <AddressDetails address={address} />
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4 border-t border-neutral-300 py-7 sm:space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="First name">
              <Input
                rounded="rounded"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-neutral-100 placeholder:text-neutral-100 focus:border-primary"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                type="text"
              />
            </FormItem>
          </div>
          <div>
            <FormItem label="Last name">
              <Input
                rounded="rounded-sm"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-neutral-100 placeholder:text-neutral-100 focus:border-primary"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                type="text"
              />
            </FormItem>
          </div>
        </div>
        <div className="space-y-4 sm:flex sm:space-x-3 sm:space-y-0">
          <div className="flex-1">
            <FormItem label="Address">
              <Input
                rounded="rounded-sm"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-neutral-100 placeholder:text-neutral-500 focus:border-primary"
                value={address[0]?.address_line1}
                type="text"
              />
            </FormItem>
          </div>
          <div className="w-1/4">
            <FormItem label="Apt, Suite *">
              <Input
                rounded="rounded-sm"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-neutral-100 placeholder:text-neutral-500 focus:border-primary"
                value={address[0]?.address_line2}
                type="text"
              />
            </FormItem>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="City">
              <Input
                rounded="rounded-sm"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-neutral-100 placeholder:text-neutral-500 focus:border-primary"
                value={address[0]?.city}
                type="text"
              />
            </FormItem>
          </div>
          <div>
            <FormItem label="Country">
              <Select
                sizeClass="h-9 px-3 py-1"
                className="rounded-sm border-neutral-300 border bg-neutral-100 placeholder:text-neutral-500 focus:border-primary"
              >
                <option value={address[0]?.country}>{address[0]?.country}</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="Israel">Israel</option>
                <option value="France">France</option>
                <option value="England">England</option>
                <option value="Laos">Laos</option>
                <option value="China">China</option>
              </Select>
            </FormItem>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="State/Province">
              <Input
                rounded="rounded-sm"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-neutral-100 placeholder:text-neutral-500 focus:border-primary"
                value={address[0]?.state}
                type="text"
              />
            </FormItem>
          </div>
          <div>
            <FormItem label="Postal code">
              <Input
                rounded="rounded-sm"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-neutral-100 placeholder:text-neutral-500 focus:border-primary"
                value={address[0]?.postal_code}
                type="text"
              />
            </FormItem>
          </div>
        </div>
      </div>
      <div className="px-4">
        <FormItem label="Address type">
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            <Radio
              label="Home (All Day Delivery)"
              id="Address-type-home"
              name="Address-type"
              defaultChecked
            />
            <Radio
              label="Office (Delivery 9 AM - 5 PM)"
              id="Address-type-office"
              name="Address-type"
            />
          </div>
        </FormItem>
      </div>
      <div className="flex flex-col py-6 sm:flex-row">
        <ButtonPrimary className="shadow-none sm:!px-7 my-0">
          Save and go to Payment
        </ButtonPrimary>
        <ButtonSecondary className="my-4 sm:ml-3 sm:mt-0 bg-neutral-300">
          Cancel
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default ShippingAddress;
