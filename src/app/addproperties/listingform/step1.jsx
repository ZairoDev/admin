"use client";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import {
  getFromLocalStorage,
  updateLocalStorage,
} from "../../../helper/localStorage";

const Step1 = ({ nextStep }) => {
  const [catogries, setCotegries] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [selectedRentalType, setSelectedRentalType] = useState("");
  const [portionCount, setPortionCount] = useState("");

  const rentalTypes = [
    "Private Area",
    "Private Area By Portion",
    "Shared Room",
    "Hotel Room",
  ];
  const propertyTypes = [
    "Hotel",
    "Cottage",
    "Villa",
    "Cabin",
    "Farm stay",
    "Houseboat",
    "Lighthouse",
    "Studio",
    "Apartment",
    "Penthouse",
    "Detached House",
    "Loft",
    "Maisonette",
    "Farmhouse",
    "Holiday Homes",
    "Farmstay",
    "Resort",
    "Lodge",
    "Apart Hotel",
  ];

  const HandlePropertyChange = (event) => {
    const value = event.target.value;
    setSelectedPropertyType(value);
    updateLocalStorage("page1", "propertyType", value);
  };

  const handleSelectCategory = (event) => {
    const value = event.target.value;
    setCotegries(value);
    updateLocalStorage("page1", "category", value);
    console.log(value);
  };
  const handlePlaceName = (event) => {
    const value = event.target.value;
    setPlaceName(value);
    updateLocalStorage("page1", "placeName", value);
    console.log(value);
  };
  const handleRentalType = (event) => {
    const value = event.target.value;
    setSelectedRentalType(value);
    updateLocalStorage("page1", "rentalType", value);
    console.log(value);
  };

  const handlePortionCount = (event) => {
    const value = event.target.value;
    setPortionCount(value);
    updateLocalStorage("page1", "portionCount", value);
  };
  // For getting the value from the localstorage so that next time user came so they got the exact input prefilled
  useEffect(() => {
    const storedData = getFromLocalStorage("page1");

    if (storedData) {
      if (storedData.category) {
        setCotegries(storedData.category);
      }
      if (storedData.propertyType) {
        setSelectedPropertyType(storedData.propertyType);
      }
      if (storedData.rentalType) {
        setSelectedRentalType(storedData.rentalType);
      }
      if (storedData.placeName) {
        setPlaceName(storedData.placeName);
      }
      if (storedData.portionCount) {
        setPortionCount(storedData.portionCount);
      }
    }
  }, []);

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className=" mt-6 ">
      <div className="flex flex-col  w-full">
        <div className="mb-8">
          <h1 className="text-2xl ml-1 font-medium  mb-2">
            Choosing listing categories
          </h1>
          <div className="flex items-center justify-between gap-x-3">
            <div className="flex items-center justify-between gap-x-10">
              {["short-term", "long-term", "both"].map((type) => (
                <label
                  key={type}
                  className={`block cursor-pointer text-sm border rounded-full px-5 py-2 ${
                    catogries === type
                      ? "bg-PrimaryColor  text-white dark:text-white "
                      : "border    text-PrimaryColor border-PrimaryColor"
                  }`}
                >
                  <input
                    type="radio"
                    name="catogries"
                    value={type}
                    checked={catogries === type}
                    onChange={handleSelectCategory}
                    className="mr-[2px] hidden invisible cursor-pointer"
                  />
                  {type === "short-term"
                    ? "Short Term"
                    : type === "long-term"
                    ? "Long Term"
                    : "Both"}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="propertyType" className="ml-1">
            Choose a property type
          </label>
          <select
            id="propertyType"
            value={selectedPropertyType}
            onChange={HandlePropertyChange}
            className="block w-full cursor-pointer outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
          >
            <option value="">Select a property type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <p className="text-xs ml-1">
            Hotel: Professional hospitality businesses that usually have a
            unique style or theme defining their brand and decor
          </p>
        </div>

        <div className="mt-6">
          <lable className="ml-1">Place name</lable>
          <Input
            onChange={handlePlaceName}
            value={placeName}
            placeholder={"Place name"}
          />
          <p className="text-xs ml-1">
            A catchy name usually includes: House name + Room name + Featured
            property + Tourist destination
          </p>
        </div>
        <div className="mt-6">
          <label htmlFor="propertyType" className="ml-1">
            Choose a rental type
          </label>
          <select
            id="propertyType"
            value={selectedRentalType}
            onChange={handleRentalType}
            className="block w-full outline-none cursor-pointer border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
          >
            <option value="">Select a property type</option>
            {rentalTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <p className="text-xs ml-1">
            Entire place: Guests have the whole place to themselves—there's a
            private entrance and no shared spaces.
            <br /> A bedroom, bathroom, and kitchen are usually included
          </p>
          <div className="mt-4">
            <Input
              placeholder={"Portion Count"}
              onChange={handlePortionCount}
              value={portionCount}
            />
          </div>
        </div>
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

export default Step1;
