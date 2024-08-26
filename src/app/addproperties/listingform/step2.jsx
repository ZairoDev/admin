"use client";
import Input from "@/components/Input/Input";
import { useState } from "react";

const Step2 = ({ nextStep, prevStep }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleNext = () => {
    nextStep();
  };

  const countries = [
    "Greece",
    "Italy",
    "Cyprus",
    "US",
    "Netherlands",
    "UK",
    "Hungary",
    "Turkey",
    "Bulgaria",
    "Lithuania",
    "Malta",
    "Romania",
    "Spain",
    "Croatia",
    "Portugal",
    "Slovenia",
    "Slovakia",
    "Viet Nam",
    "Thailand",
    "France",
    "Singapore",
    "Japan",
    "Korea",
  ];

  return (
    <div>
      <h2>Step 2</h2>
      <div className="mt-6">
        <label htmlFor="country" className="ml-1">
          Choose a country
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="block w-full cursor-pointer outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <p className="text-xs ml-1">
          Select the country where your property is located.
        </p>
      </div>
      <div className="mt-4">
        <lable className="ml-1 ">Your place location</lable>
        <Input />
      </div>
      <div className="flex mt-4 items-center justify-between">
        <div>
          <lable className="ml-1 ">City</lable>
          <Input className={"w-72"} />
        </div>
        <div>
          <lable className="ml-1 ">State</lable>
          <Input className={"w-72"} />
        </div>
        <div>
          <lable className="ml-1 ">Postal Code</lable>
          <Input className={"w-72"} />
        </div>
      </div>
      <div className="mt-4">
        <p className="ml-1">Coordinates</p>
        <div className="flex ml-1  items-center gap-x-20">
          <p> Latitude{0}</p>
          <p> Longitude{0}</p>
        </div>
      </div>
      <div className="mt-4 ml-1">
        <p>Detailed Address</p>
      </div>
      <div className="flex items-center gap-x-4">
        <button
          className="max-w-[200px] w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="max-w-[200px] w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
