"use client";
import React, { FC, useState, FormEvent } from "react";
import { CgSpinner } from "react-icons/cg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import countryCodesList from "country-codes-list";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";

const PageSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Owner"); // Default role
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sendDetails, setSendDetails] = useState(false);
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

  const countryCodes = countryCodesList.customList(
    "countryCallingCode",
    "{countryNameEn} (+{countryCallingCode})"
  );
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    if (!gmailRegex.test(email)) {
      toast.error("Please enter a valid Gmail address");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const onSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    console.log(name, email, password, role, sendDetails, phoneNumber);
    try {
      setLoading(true);
      const fullPhoneNumber = `${countryCode} ${phoneNumber}`;
      console.log(
        name,
        email,
        password,
        role,
        sendDetails,
        fullPhoneNumber,
        gender,
        nationality,
        spokenLanguage,
        bankDetails,
        address,
        profilePic
      );
      const response = await axios.post("/api/user/signup", {
        name,
        email,
        password: generatePassword(7),
        role,
        sendDetails,
        phone: fullPhoneNumber,
        gender,
        nationality,
        spokenLanguage,
        bankDetails,
        address,
        profilePic,
      });
      console.log("Signup successful:", response.data);
      toast.success(
        "Signup successful! Please verify your email address via link that has been sent to your email address."
      );
      setEmailSent(true);
      setName("");
      setEmail("");
      setPassword("");
      setRole("Owner");
      setSendDetails(false);
      setCountryCode("+1");
      setPhoneNumber("");
      setAddress("");
      setBankDetails("");
      setSpokenLanguage("");
      setGender("");
      setProfilePic('')
      // router.push("/login")
    } catch (error) {
      console.error("Signup failed:", error);
      // toast.error("Signup failed. Please try again.");
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
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
            Signup
          </h2>
          <div className="max-w-md mx-auto space-y-6 ">
            <form className="grid grid-cols-1 gap-6 " onSubmit={onSignup}>
              <label htmlFor="file-upload">
                <div className="lg:w-36 lg:h-36 md:w-28 md:h-28 w-20 h-20 rounded-full border border-gray-500 flex justify-center items-center mx-auto cursor-pointer hover:opacity-60 ">
                  {((!previewImage || !profilePic) && !profilePicLoading) && (
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
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

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Role
                </span>
                <div className="mt-1 flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Owner"
                      checked={role === "Owner"}
                      onChange={(e) => setRole(e.target.value)}
                    />{" "}
                    Owner
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Traveller"
                      checked={role === "Traveller"}
                      onChange={(e) => setRole(e.target.value)}
                    />{" "}
                    Traveller
                  </label>
                </div>
              </label>
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={sendDetails}
                  onChange={(e) => setSendDetails(e.target.checked)}
                />
                <h3>Send my registration details to my email</h3>
                {emailSent && (
                  <p className=" text-green-500 text-sm justify-start">
                    Please check your spam folder also
                  </p>
                )}
              </label>
              <button
                type="submit"
                disabled={loading}
                className=" font-medium border-2 rounded-xl border-gray-600 p-2 hover:text-gray-800 hover:border-gray-800 hover:font-bold"
              >
                {loading ? (
                  <div className="flex items-center">
                    Signing up...
                    <CgSpinner className="animate-spin" />
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Already have an account?
              <Link
                href="/authentication/login"
                className="font-semibold underline"
              >
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSignUp;
