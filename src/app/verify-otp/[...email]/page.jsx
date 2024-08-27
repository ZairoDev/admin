"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { toast, Toaster } from "sonner";

const page = ({params}) => {
	const router = useRouter();
  const [otpInput, setOtpInput] = useState("");
  const email = params.email;
  console.log(email);
  // const {email} = router.query;
  // console.log(email);

  const handleOTPverification = async () => {
    try{
      const response = await axios.post("/api/verify-otp", { otp: otpInput, email });
      console.log(response);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      router.push('/');
    }catch(err){
      console.log(err);
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className=" w-full h-screen flex flex-col gap-2 justify-center items-center">
      <Toaster />
      <input
        type="text"
        className=" p-2 rounded-3xl w-80  bg-transparent border border-gray-400"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value)}
      />
      <button onClick={handleOTPverification} className="  px-4 py-2 rounded-3xl bg-PrimaryColor dark:text-white text-white">Verify</button>
    </div>
  );
};

export default page;
