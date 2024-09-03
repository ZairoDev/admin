"use client";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";

const PageLogin = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  // const token = Cookies.get("token");

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (response?.data?.message === "Verification OTP sent") {
        toast.success("OTP sent successfully. Please check your email");
        setTimeout(() => {
          router.push(`/verify-otp/${email}`);
        }, 1000);
        return;
      }

      if (response.status === 200) {
        toast.success("Login successful");
        Cookies.set("token", response.data.token, { expires: 1 });
        router.push("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        console.log("error", err.response.data);
        toast.error(err.response.data.error);
      } else {
        console.error(err);
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className={`nc-PageLogin`}>
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Welcome Back
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            <form
              className="grid grid-cols-1 gap-6 relative"
              onSubmit={handleSubmit}
            >
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
                <input
                  type="email"
                  placeholder="dummyemail@gmail.com"
                  className="mt-2 block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="block relative">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                  <Link
                    href="/authentication/forgotpassword"
                    className="font-semibold underline "
                  >
                    Forgot Password
                  </Link>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className=" mt-2 block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border " // Add padding to the right to avoid overlap with the icon
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute inset-y-0 right-3 top-11 cursor-pointer text-xl text-neutral-800 dark:text-neutral-200 flex itecen">
                  {showPassword ? (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiFillEye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </span>
              </label>
              <button
                type="submit"
                disabled={isLoggingIn}
                className=" font-medium  bg-PrimaryColor text-white dark:text-white rounded-2xl p-2 hover:text-gray-800 hover:border-gray-800 hover:font-bold"
              >
                {isLoggingIn ? (
                  <div className="flex justify-center">
                    logging in.. <CgSpinner className="animate-spin text-2xl" />
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user?{" "}
              <Link
                href="/authentication/signup"
                className="font-semibold underline"
              >
                Create an account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLogin;
