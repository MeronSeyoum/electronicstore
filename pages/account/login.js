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
import { BsChevronLeft } from "react-icons/bs";

export default Login;

function Login() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    alertService.clear();
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query && router.query.params ? router.query.params.returnUrl || "/" : "/";

        // const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="" data-nc-id="PageLogin">
        <div className="container mb-24 lg:mb-32 ">
         <div className="mx-auto max-w-md">
           <div className="flex justify-between  ">
            <h2 className=" mb-6 px-1 flex items-center justify-start text-xl font-semibold leading-[115%] md:text-3xl md:leading-[115%]">
              Sign-in
            </h2>
            <span className="px-2 flex items-center">
            <BsChevronLeft className="text-[8px] mx-1"/>
             <Link href="/" className="text-sm">
                Back
              </Link></span>
          </div>
            <div className="space-y-6">
              <div className="">
                <ButtonSecondary
                  className="flex w-full items-center gap-3 border-2 border-primary py-1
                  text-primary rounded-md"
                  onClick={""}
                >
                  <FaGoogle className="text-xl" /> Continue with Google
                </ButtonSecondary>
              </div>
              <div className="relative text-center">
                <span className="relative z-10 inline-block rounded-full bg-neutral-light px-4 text-sm font-medium ">
                  OR
                </span>
                <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 border border-neutral-300" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <FormItem label="Email" >
                    <Input
                      type="text"
                      name="username"
                      {...register("username")}
                      className={`border-neutral-400 bg-transparent placeholder:text-neutral-500 focus:border-primary ${errors.username ? "is-invalid" : ""
                        }`}
                      rounded="rounded-md"
                      sizeClass="h-12 px-4 py-3"
                      placeholder="example@example.com"
                    />
                    <div className="text-red">
                      {errors.username?.message}
                    </div>
                  </FormItem>

                  <FormItem label="Password" >
                    <Input
                      type="password"
                      name="password"
                      {...register("password")}
                      className={`border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary ${errors.username ? "is-invalid" : ""
                        }`}
                      required
                      placeholder="Password"
                      rounded="rounded-md"
                      sizeClass="h-12 px-4 py-3"
                    />
                    <div className="text-red">
                      {errors.password?.message}
                    </div>
                  </FormItem>
                  <div className="flex flex-row items-center justify-end gap-2 -my-2">
                    <Link href="/forgot-pass/" className="text-sm text-primary ">
                      Forgot password?
                    </Link>
                    <span className="block text-center text-sm text-neutral-500 ">
                      {/* Don&apos;t have an account? {` `} */} |
                      <Link href="/account/register" className="text-primary pl-2">
                        Create New Account
                      </Link>
                    </span>
                  </div>
                  <ButtonPrimary disabled={formState.isSubmitting} className="">
                    {formState.isSubmitting && (
                      <span className="spinner-border spinner-border-sm z-50 me-1"></span>
                    )}
                    Sign In
                  </ButtonPrimary>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
