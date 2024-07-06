import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { FaGoogle } from "react-icons/fa6";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import FormItem from "shared/FormItem";
import Input from "shared/Input/Input";

import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Register;

function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    username: Yup.string().required("Username is required"),
    telephone: Yup.string().required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService
      .register(user)
      .then(() => {
        alertService.success("Registration successful", true);
        router.push("login");
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-8 flex items-center justify-center text-xl font-semibold leading-[115%] md:text-3xl md:leading-[115%]">
            Create New Account
          </h2>
          <div className="mx-auto max-w-md ">
            <div className="space-y-6">
              <div className="">
                <ButtonSecondary
                  className="flex w-full items-center gap-3   border border-primary text-primary rounded-md"
                  onClick={""}
                >
                  <FaGoogle className="text-lg " /> Continue with Google
                </ButtonSecondary>
              </div>
              <div className="relative text-center">
                <span className="relative z-10 inline-block rounded-full  px-4 text-sm font-medium  bg-neutral-light">
                  OR
                </span>
                <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 border border-neutral-300" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6">
                  <FormItem label="First Name">
                    <Input
                      name="first_name"
                      type="text"
                      {...register("first_name")}
                      className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.first_name ? "is-invalid" : ""
                      }`}
                      rounded="rounded-md"
                      sizeClass="h-10 px-4 py-3"
                      placeholder="Jhon"
                      autoComplete="off"
                      required
                    />
                    <div className="text-red">{errors.first_name?.message}</div>
                  </FormItem>
                  <FormItem label="Last Name">
                    <Input
                      name="last_name"
                      type="text"
                      {...register("last_name")}
                      className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.last_name ? "is-invalid" : ""
                      }`}
                      rounded="rounded-md"
                      sizeClass="h-10 px-4 py-3"
                      placeholder="Doe"
                      autoComplete="off"
                      required
                    />
                    <div className="text-red">{errors.last_name?.message}</div>
                  </FormItem>
                  <FormItem label="Email">
                    <Input
                      name="email"
                      type="email"
                      {...register("email")}
                      className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      required
                      rounded="rounded-md"
                      sizeClass="h-10 px-4 py-3"
                      placeholder="example@example.com"
                    />
                    <div className="text-red">{errors.email?.message}</div>
                  </FormItem>
                  <FormItem label="User Name">
                    <Input
                      name="username"
                      type="text"
                      {...register("username")}
                      className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      required
                      rounded="rounded-md"
                      sizeClass="h-10 px-4 py-3"
                      placeholder="username"
                    />
                    <div className="text-red">{errors.username?.message}</div>
                  </FormItem>
                  <FormItem label="Phone Number (optional)">
                    <Input
                      name="telephone"
                      type="tel"
                      {...register("telephone")}
                      className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      required
                      rounded="rounded-md"
                      sizeClass="h-10 px-4 py-3"
                      placeholder="123-4567-8910"
                    />
                    <div className="text-red">{errors.telephone?.message}</div>
                  </FormItem>

                  <FormItem label="Password">
                    <Input
                      name="password"
                      type="password"
                      {...register("password")}
                      className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      required
                      autoComplete="off"
                      placeholder="Password"
                      rounded="rounded-md"
                      sizeClass="h-10 px-4 py-3"
                    />
                    <div className="text-red">
                      {errors.password?.message}
                    </div>
                  </FormItem>

                  <ButtonPrimary
                    disabled={formState.isSubmitting}
                    className="shadow-none sm:!px-7"
                  >
                    {formState.isSubmitting && (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    )}
                    Create Account
                  </ButtonPrimary>
                </div>
              </form>
              <span className="block text-center text-sm text-neutral-500">
                Already have an account? {` `}
                <Link href="/account/login" className="text-primary">
                  Sign-in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
