import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { userService, alertService } from "services";
import Image from "next/image";
import Input from "shared/Input/Input";
import ShippingAddress from "pages/checkout/ShippingAddress";
import Orders from "pages/users/Profile/orders";

// import ShippingAddress from "./ShippingAddress";
export { UserProfile };

const UserProfile = (props) => {
  const user = props?.user;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("user");

  // Form validation rules
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(user ? null : Yup.string().required("Password is required"))
      .min(6, "Password must be at least 6 characters"),
    address: Yup.object().shape({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string().required("ZIP code is required"),
    }),
    isActive: Yup.boolean(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // Set default form values if in edit mode
  if (user) {
    formOptions.defaultValues = props.user;
  }

  // Get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    alertService.clear();
    try {
      // Create or update user based on user prop
      let message;
      if (user) {
        await userService.update(user.id, data);
        message = "User updated";
      } else {
        await userService.register(data);
        message = "User added";
      }

      // Redirect to user list with success message
      router.push("/users");
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }



  const [userId, setUserId] = useState(userService.userValue?.id || "");
  const [address, setAddress] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  return (
    <div className=" mx-auto mt-5 mb-5 lg:p-1 bg-white rounded">
      <div className="flex flex-col md:flex-row">
      <div className="lg:w-1/5 border-r flex flex-col p-5 bg-gray-100">
      <div className="flex flex-col justify-center items-center border-b-2 pb-2">
      <img
        className="rounded-full mt-5"
        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
        alt="Profile"
        width={60}
        height={60}
      />
      <span className="font-bold mt-3 text-xl text-gray-800">{userService.userValue?.username}</span>
      <span className="text-gray-500">{userService.userValue?.email}</span>
</div>
      <div className="flex flex-col  mt-3 w-full">
        <button
          className={`py-2 font-semibold text-left w-full ${activeTab === 'user' ? 'border-b-2 border-primary text-gray-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('user')}
        >
          Account
        </button>
        <button
          className={`py-2 font-semibold text-left w-full ${activeTab === 'address' ? 'border-b-2 border-primary text-gray-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('address')}
        >
          Address
        </button>
        <button
          className={`py-2 font-semibold text-left w-full ${activeTab === 'order' ? 'border-b-2 border-primary text-gray-800' : 'text-gray-600'}`}
          onClick={() => setActiveTab('order')}
        >
          Order
        </button>
      </div>
    </div>
        <div className="lg:w-3/4 lg:px-12 py-5">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeTab === "user" && (
              <div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-1/2 px-3 mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First Name
                    </label>
                    <Input
                      autoComplete="off"
                      rounded="rounded-lg"
                      sizeClass="h-9 px-3 py-3"
                      name="first_name"
                      type="text"
                      {...register("first_name")}
                      className={`form-input mt-1 block w-full border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.first_name ? "border-red-500" : ""
                      }`}
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.first_name?.message}
                    </p>
                  </div>
                  <div className="w-1/2 px-3 mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last Name
                    </label>
                    <Input
                      autoComplete="off"
                      rounded="rounded-lg"
                      sizeClass="h-9 px-3 py-3"
                      name="last_name"
                      type="text"
                      {...register("last_name")}
                      className={`form-input mt-1 block w-full border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.last_name ? "border-red-500" : ""
                      }`}
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.last_name?.message}
                    </p>
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Username
                    </label>
                    <Input
                      autoComplete="off"
                      rounded="rounded-lg"
                      sizeClass="h-9 px-3 py-3"
                      name="username"
                      type="text"
                      {...register("username")}
                      className={`form-input mt-1 block w-full border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.username ? "border-red-500" : ""
                      }`}
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.username?.message}
                    </p>
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                      {user && (
                        <em className="ml-1 text-gray-500">
                          (Leave blank to keep the same password)
                        </em>
                      )}
                    </label>
                    <Input
                      autoComplete="off"
                      rounded="rounded-lg"
                      sizeClass="h-9 px-3 py-3"
                      name="password"
                      type="password"
                      {...register("password")}
                      className={`form-input mt-1 block w-full border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <p className="text-red-500 text-xs italic">
                      {errors.password?.message}
                    </p>
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Account Status
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...register("isActive")}
                        className="form-checkbox h-5 w-5 text-black"
                      />
                      <span className="ml-2 text-gray-700">Active</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="bg-black text-white py-2 px-4 rounded hover:bg-primary mr-2"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Save
              </button>
              <button
                type="button"
                onClick={() => reset(formOptions.defaultValues)}
                disabled={formState.isSubmitting}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
              >
                Reset
              </button>
              <Link href="/users" >
              <button
                type="button" className="bg-neutral-light py-2 px-4 rounded hover:bg-gray-600 mr-2">
                Cancel
                </button>
              </Link>
            </div>
              </div>
              
            )}
            {activeTab === "address" && (
            <ShippingAddress isActive={true} onCloseActive={() => setActiveTab(null)} onOpenActive={() => setActiveTab("address")} />
          )}
          {activeTab === "order" && (
          <Orders />
          )}
            
          </form>
        </div>
      </div>
    </div>
  );
};
