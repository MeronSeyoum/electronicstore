
import React, { useState, useEffect } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import FormItem from 'shared/FormItem';
import Input from 'shared/Input/Input';
import Radio from 'shared/Radio/Radio';
import Select from 'shared/Select/Select';
import { userService } from "services";

// Separate AddressDetails component for displaying address information
const AddressDetails = ({ address }) => (
  <>
    <span className="uppercase text-sm font-semibold">SHIPPING ADDRESS</span>
    <div className="mt-1 text-xs ">
      <p>{address.address_line1}, Apt {address.address_line2}, {address.city}, {address.state}</p>
    </div>
  </>
);

const ShippingAddress = ({ isActive, onCloseActive, onOpenActive }) => {
  const [userId, setUserId] = useState(userService.userValue?.id || '');
  const [addresses, setAddresses] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [first_name, setFirst_name] = useState(userService.userValue?.first_name || '');
  const [last_name, setLast_name] = useState(userService.userValue?.last_name || '');
 
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
        throw new Error('Failed to retrieve user addresses');
      }
      const data = await response.json();
      
      setAddresses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setError('Failed to retrieve user addresses');
      setLoading(false);
    }
  };

  if (!userId) {
    return <p>Please provide a user ID.</p>;
  }

  return (
    <div className="rounded-xl border border-neutral-300 ">
      <div className="flex flex-col items-start p-6 sm:flex-row">
        <span className="hidden sm:block">
          <TbTruckDelivery className="text-3xl text-primary" />
        </span>

        <div className="flex w-full items-center justify-between">
          <div className="sm:ml-8">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <AddressDetails address={addresses[0]} />
            )}
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
        {/* ============ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="First name">
              <Input
                rounded="rounded-lg"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300  bg-transparent placeholder:text-neutral-100 focus:border-primary"
                value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              type='text'
              />
            </FormItem>
          </div>
          <div>
            <FormItem label="Last name">
              <Input
                rounded="rounded-lg"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-transparent placeholder:text-neutral-100 focus:border-primary"
                value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              type='text'
              />
            </FormItem>
          </div>
        </div>

        {/* ============ */}
        <div className="space-y-4 sm:flex sm:space-x-3 sm:space-y-0">
          <div className="flex-1">
            <FormItem label="Address">
              <Input
                rounded="rounded-lg"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                placeholder=""
                value={addresses[0]?.address_line1}
                // onChange={(e) => setStreetAddress(e.target.value)}
                type="text"
              />
            </FormItem>
          </div>
          <div className="sm:w-1/3">
            <FormItem label="Apt, Suite *">
              <Input
                rounded="rounded-lg"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                value={addresses[0]?.address_line2}
                // onChange={(e) => setStreetAddress(e.target.value)}
                type="text"
              />
            </FormItem>
          </div>
        </div>

        {/* ============ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="City">
              <Input
                rounded="rounded-lg"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                value={addresses[0]?.city}
                // onChange={(e) => setStreetAddress(e.target.value)}
                type="text"
              />
            </FormItem>
          </div>
          <div>
            <FormItem label="Country">
              <Select
                sizeClass="h-9 px-3 py-1"
                className="rounded-lg border-neutral-300 border  bg-transparent placeholder:text-neutral-500 focus:border-primary"
               
              >
             <option value="United States"> {addresses[0]?.country}</option>
                <option value="United States">United States</option>
                <option value="United States">Canada</option>
                <option value="United States">Mexico</option>
                <option value="United States">Israel</option>
                <option value="United States">France</option>
                <option value="United States">England</option>
                <option value="United States">Laos</option>
                <option value="United States">China</option>
              </Select>
            </FormItem>
          </div>
        </div>

        {/* ============ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
          <div>
            <FormItem label="State/Province">
              <Input
                rounded="rounded-lg"
                sizeClass="h-9 px-3 py-3"
                className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                value={addresses[0]?.state}
                // onChange={(e) => setStreetAddress(e.target.value)}
                type="text"
              />
            </FormItem>
          </div>
       
        <div>
          <FormItem label="Postal code">
            <Input
              rounded="rounded-lg"
              sizeClass="h-9 px-3 py-3"
              className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
              value={addresses[0]?.postal_code}
                // onChange={(e) => setStreetAddress(e.target.value)}
                type="text"
            />
          </FormItem>
        </div>
      </div>
 </div>
      {/* ============ */}
      <div className="px-6">
        <FormItem label="Address type">
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            <Radio
              label="Home(All Day Delivery)"
              id="Address-type-home"
              name="Address-type"
              defaultChecked
            />
            <Radio
              label="Office(Delivery 9 AM - 5 PM)"
              id="Address-type-office"
              name="Address-type"
            />
          </div>
        </FormItem>
      </div>

      {/* ============ */}
      <div className="flex flex-col p-6 sm:flex-row">
        <ButtonPrimary className="shadow-none sm:!px-7 my-0" onClick={onCloseActive}>
          Save and go to Payment
        </ButtonPrimary>
        <ButtonSecondary
          className="my-4 sm:ml-3 sm:mt-0 bg-neutral-300 "
          onClick={onCloseActive}
        >
          Cancel
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default ShippingAddress;
