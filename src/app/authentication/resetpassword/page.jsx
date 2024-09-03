"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
		console.log(urlToken);
    setToken(urlToken || "");
  }, []);

  const validateForm = () => {
    if (password.length < 3) {
      toast.error("Password must be at least 3 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/user/resetpassword", {
        token,
        newPassword: password,
      });
      toast.success(response.data.message);
      router.push("/authentication/login");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-xs m-auto h-[40vh] mt-20">
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <label className=" flex flex-col items-start justify-center">
            <span className="text-neutral-800 mb-1 text-md dark:text-neutral-200 font-medium ">
              New Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              disabled={isSubmitting}
              className=" border border-neutral-700 rounded-xl p-2 w-full"
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" font-medium  bg-PrimaryColor text-white dark:text-white rounded-2xl p-2 hover:text-gray-800 hover:border-gray-800 hover:font-bold"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                Processing...
                <CgSpinner className="animate-spin" />
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
