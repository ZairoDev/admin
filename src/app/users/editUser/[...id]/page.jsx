"use client";
import React, { FC, useState, FormEvent, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import countryCodesList from "country-codes-list";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";

const Page = ({params}) => {

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("Male");
  const [spokenLanguage, setSpokenLanguage] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [address, setAddress] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");


  const fetchUser = async () => {
    try {
      const response = await axios.post("/api/user/profile", {
        userId: params.id[0],
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error in fetching user");
    }
  };

  const { data, isSuccess, isError, isPending, error } = useQuery({
    queryKey: ["user", params.id[0]],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setUserId(data?.data._id)
    setName(data?.data.name);
    setEmail(data?.data.email);
    setCountryCode(data?.data.countryCode);
    setNationality(data?.data.nationality);
    setGender(data?.data.gender);
    setSpokenLanguage(data?.data.spokenLanguage);
    setBankDetails(data?.data.bankDetails);
    setAddress(data?.data.address);
    setProfilePic(data?.data.profilePic);

    if (data){
      if (data.data.phone){
        const phoneNo = data.data.phone.split(' ')[1];
        const code = data.data.phone.split(' ')[0];
        setPhoneNumber(phoneNo);
        setCountryCode(code);
      }
    }
  }, [data])

  const countryCodes = countryCodesList.customList(
    "countryCallingCode",
    "{countryNameEn} (+{countryCallingCode})"
  );

  const generatePassword = (length) => {
    const characters = "0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  };

  const validateForm = () => {
    if (!name) {
      toast.error("Please enter your name");
      return false;
    }
    // if (!gmailRegex.test(email)) {
    //   toast.error("Please enter a valid Gmail address");
    //   return false;
    // }
    return true;
  };

  const editDetails = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    console.log(name, phoneNumber);
    try {
      setLoading(true);
      const fullPhoneNumber = `${countryCode} ${phoneNumber}`;
      console.log(
        userId,
        name,
        fullPhoneNumber,
        gender,
        nationality,
        spokenLanguage,
        bankDetails,
        address,
        profilePic
      );
      const response = await axios.post("/api/user/editprofile", {
        _id: userId,
        name,
        phone: fullPhoneNumber,
        gender,
        nationality,
        spokenLanguage,
        bankDetails,
        address,
        profilePic,
      });
      console.log("Profile Updates:", response.data);
      toast.success(
        "Profile Updated"
      );
      setName("");
      setCountryCode("");
      setPhoneNumber("");
      setAddress("");
      setBankDetails("");
      setSpokenLanguage("");
      setGender("");
      setProfilePic("")
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePhoto = async (e) => {
    
    setProfilePicLoading(true);
    setPreviewImage(e?.target?.files[0]?.name);
    const file = e?.target?.files[0];

    if (
      !file ||
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      )
    ) {
      alert("Error: Only PNG and JPEG files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target.result);
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const randomNumberToAddInImageName = generatePassword(7);
      const response = await axios.put(
        `${storageUrl}/${storageZoneName}/ProfilePictures/${randomNumberToAddInImageName}${file.name}`,
        file,
        {
          headers: {
            AccessKey: accessKey,
            "Content-Type": file.type,
          },
        }
      );

      console.log("response: ", response);
      const imageUrl = `https://vacationsaga.b-cdn.net/ProfilePictures/${randomNumberToAddInImageName}${file.name}`;

      setProfilePic(imageUrl);
      setProfilePicLoading(false);

    } catch (error) {
      alert("Error uploading image. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="nc-PageSignUp">
        <div className="container mb-24 lg:mb-32">
          <h2 className=" mb-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Edit Profile
          </h2>
          <div className="max-w-md mx-auto space-y-6 ">
            <form className="grid grid-cols-1 gap-6 " onSubmit={editDetails}>
              <label htmlFor="file-upload">
                <div className="lg:w-36 lg:h-36 md:w-28 md:h-28 w-20 h-20 rounded-full border border-gray-500 flex justify-center items-center mx-auto cursor-pointer hover:opacity-60 ">
                  {((!previewImage || !profilePic) && !profilePicLoading && !profilePic) && (
                    <span>
                      {" "}
                      <LuImagePlus className=" opacity-70 text-3xl cursor-pointer" />
                    </span>
                  )}
                  <input
                    type="file"
                    className=" sr-only"
                    accept="image/*"
                    id="file-upload"
                    name="file-upload"
                    onChange={(e) => handleProfilePhoto(e)}
                  />
                  {profilePic && !profilePicLoading && (
                    <div className=" w-full h-full rounded-full overflow-hidden transition-all">
                      <img
                        src={profilePic}
                        className=" object-contain h-full w-full transition-all"
                      />
                    </div>
                  )}
                  {profilePicLoading && (
                    <div className=" w-full h-full rounded-full overflow-hidden transition-all">
                      <img
                        src={previewImage}
                        className=" opacity-70 object-contain h-full w-full transition-all"
                      />
                    </div>
                  )}
                </div>
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border "
                  value={email}
                  required
                  disabled
                />
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Phone Number
                </span>
                <div className="flex items-center">
                  <select
                    className="mr-2 w-1/2 rounded-xl focus:border-blue-500/10 p-2 border border-gray-600 bg-transparent"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {Object.entries(countryCodes).map(([code, name]) => (
                      <option key={code} value={`+${code}`}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border "
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Nationality
                </span>
                <input
                  type="text"
                  placeholder="Your Nationality"
                  className="block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border "
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  required
                />
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Gender
                </span>
                <select
                  name="gender"
                  value={gender}
                  id="gender"
                  className="block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  onChange={(e) => setGender(e.target.name)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Language
                </span>
                <input
                  type="text"
                  placeholder="Language"
                  className="block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border "
                  value={spokenLanguage}
                  onChange={(e) => setSpokenLanguage(e.target.value)}
                  required
                />
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Address
                </span>
                <input
                  type="text"
                  placeholder="Address"
                  className="block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border "
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Bank Details
                </span>
                <input
                  type="text"
                  placeholder="Bank Details"
                  className="block w-full border-gray-600 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border "
                  value={bankDetails}
                  onChange={(e) => setBankDetails(e.target.value)}
                  required
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className=" font-medium border-2 rounded-xl border-gray-600 p-2 hover:text-gray-800 hover:border-gray-800 hover:font-bold"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    Updating Profile...
                    <CgSpinner className="animate-spin" />
                  </div>
                ) : (
                  "Save Details"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
