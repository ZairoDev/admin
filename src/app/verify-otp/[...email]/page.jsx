"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { toast, Toaster } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";
import { CgSpinner } from "react-icons/cg";

const page = ({ params }) => {
  const router = useRouter();
  const [otpInput, setOtpInput] = useState("");
  const email = params.email;
  console.log(email);
  const [remainingTime, setRemainingTime] = useState(0);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [verifyClick, setVerifyClick] = useState(false);

  useEffect(() => {
    if (remainingTime > 0) {
      const timerId = setTimeout(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
    if (remainingTime == 0) {
      setDisabledButton(false);
    }
  }, [remainingTime]);

  const handleOTPverification = async () => {
    setRemainingTime(60);
    setVerifyLoading(true);
    if (otpInput.length !== 6) {
      setVerifyLoading(false);

      return toast.error("Please enter a valid OTP");
    }
    try {
      const response = await axios.post("/api/verify-otp", {
        otp: otpInput,
        email,
      });
      console.log(response);
      console.log(response.data);
      toast.success("Login successful");
      router.push("/");
    } catch (err) {
      console.log(err);
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
    setVerifyLoading(false);
  };

  const handleRetryOTP = async () => {
    setVerifyLoading(true);
    try {
      const response = await axios.post("/api/resend-otp", { email });
      toast.success("OTP sent");
      setRemainingTime(60);
    } catch (err) {
      toast.error(err.message);
    }
    setVerifyLoading(false);
  };

  return (
    <div className=" w-full h-screen flex flex-col gap-2 justify-center items-center">
      <Toaster />
      <h1>Enter OTP</h1>
      <input
        type="text"
        className=" p-2 rounded-3xl w-80  bg-transparent border border-gray-400"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value)}
      />
      {verifyClick && (
        <p>
          Didn't received OTP? You can{" "}
          <button
            className={` ${
              disabledButton
                ? "text-gray-400"
                : " hover:text-gray-800 cursor-pointer"
            } underline font-medium`}
            disabled={disabledButton}
            onClick={handleRetryOTP}
          >
            retry
          </button>{" "}
          after {remainingTime} sec
        </p>
      )}
      <button
        disabled={verifyLoading || disabledButton}
        onClick={handleOTPverification}
        className=" mt-4 px-4 py-2 rounded-3xl bg-PrimaryColor dark:text-white text-white"
      >
        {verifyLoading ? (
          <div className=" bg-PrimaryColor dark:text-white  text-white flex item-center justify-center">
            Verifying...
            <CgSpinner className='animate-spin ml-1 text-lg'/>
          </div>
        ) : (
          "Verify"
        )}
      </button>
    </div>
  );
};

export default page;
