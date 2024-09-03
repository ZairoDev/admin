"use client";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/user/forgot", { email });
      toast.success(response.data.message);
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
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit} >
          <label className=" flex flex-col items-start justify-center">
            <span className="text-neutral-800 mb-1 text-md dark:text-neutral-200 font-medium ">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={isSubmitting}
              className=" border border-neutral-700 rounded-xl p-2 w-full"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" font-medium  bg-PrimaryColor text-white dark:text-white rounded-2xl p-2 hover:text-gray-800 hover:border-gray-800 hover:font-bold"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                Processing...
                <CgSpinner className="animate-spin ml-2" />
              </div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
