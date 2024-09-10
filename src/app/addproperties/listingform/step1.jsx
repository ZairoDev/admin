"use client";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import FormItem from "../FormItem";
import { getFromLocalStorage, updateLocalStorage } from "@/helper/localStorage";

const PageAddListing1 = ({nextStep, prevStep}) => {
  const [propertyType, setPropertyType] = useState(() => {
    const savedPage = getFromLocalStorage("page1");
    if (!savedPage) {
      return "Hotel";
    }
    const value = savedPage["propertyType"];
    return value || "Hotel";
  });

  const [placeName, setPlaceName] = useState(() => {
    const savedPage = getFromLocalStorage("page1");
    if (!savedPage) {
      return "";
    }
    const value = savedPage["placeName"];
    return value || "";
  });

  const [rentalForm, setRentalForm] = useState(() => {
    const savedPage = getFromLocalStorage("page1");
    if (!savedPage) {
      return "Private Room";
    }
    const value = savedPage["rentalForm"];
    return value || "Private Room";
  });

  const [numberOfPortions, setNumberOfPortions] = useState(() => {
    const savedPage = getFromLocalStorage("page1");
    if (!savedPage) {
      return 1;
    }
    const value = savedPage["numberOfPortions"];
    return value ? parseInt(value, 10) : 1;
  });

  const [showPortionsInput, setShowPortionsInput] = useState(() => {
    const savedPage = getFromLocalStorage("page1");
    if (!savedPage) {
      return false;
    }
    const value = savedPage["showPortionsInput"];
    return value ? JSON.parse(value) : false;
  });

  const [rentalType, setRentalType] = useState(() => {
    const savedRentalType = getFromLocalStorage("page1");
    if (!savedRentalType) {
      return "Short Term";
    }
    const value = savedRentalType["rentalType"];
    return value || "Short Term";
  });

  const [page1, setPage1] = useState({
    propertyType: propertyType,
    placeName: placeName,
    rentalForm: rentalForm,
    numberOfPortions: numberOfPortions,
    showPortionsInput: showPortionsInput,
    rentalType: rentalType,
  });

  const handlePropertyTypeChange = (e) => {
    const selectedPropertyType = e.target.value;
    console.log("selected Property Type: ", selectedPropertyType);
    setPropertyType(selectedPropertyType);
  };

  const handlePlaceName = (e) => {
    const pName = e.target.value.trim();
    setPlaceName(pName);
  };

  const handleRentalFormChange = (e) => {
    const selectedValue = e.target.value;
    const value = 1;
    if (selectedValue === "Private room") {
      setNumberOfPortions(value);
    }
    // Example logic to handle when to show portions input
    if (selectedValue === "Private room by portion") {
      setNumberOfPortions(2);
      setShowPortionsInput(true);
    } else {
      setNumberOfPortions(1);
      setShowPortionsInput(false);
    }
    setRentalForm(e.target.value);
  };

  const handleRentalTypeChange = (e) => {
    console.log(e.target.id);
    setRentalType(e.target.id);
  };

  const handlePortionsInputChange = (e) => {
    const value = parseInt(e.target.value, 10); // Ensure input value is parsed to an integer
    setNumberOfPortions(value);
  };

  useEffect(() => {
    // localStorage.setItem("numberOfPartition", numberOfPortions.toString());
    setPage1((prev) => {
      const newObj = { ...prev };
      newObj.numberOfPortions = numberOfPortions;
      return newObj;
    });
  }, [numberOfPortions]);

  useEffect(() => {
    setPage1((prev) => {
      const newObj = { ...prev };
      newObj.propertyType = propertyType;
      return newObj;
    });
    // localStorage.setItem("propertyType", propertyType);
  }, [propertyType]);

  useEffect(() => {
    // localStorage.setItem("placeName", placeName);
    setPage1((prev) => {
      const newObj = { ...prev };
      newObj.placeName = placeName;
      return newObj;
    });
  }, [placeName]);

  useEffect(() => {
    // localStorage.setItem("rentalForm", rentalForm);
    setPage1((prev) => {
      const newObj = { ...prev };
      newObj.rentalForm = rentalForm;
      return newObj;
    });
  }, [rentalForm]);

  useEffect(() => {
    setPage1((prev) => {
      const newObj = { ...prev };
      newObj.rentalType = rentalType;
      return newObj;
    });
  }, [rentalType]);

  useEffect(() => {
    const newPage1 = {
      propertyType: propertyType,
      placeName: placeName,
      rentalForm: rentalForm,
      numberOfPortions: numberOfPortions,
      showPortionsInput: showPortionsInput,
      rentalType: rentalType,
    };
    setPage1(newPage1);
    localStorage.setItem("page1", JSON.stringify(newPage1));
  }, [
    propertyType,
    placeName,
    rentalForm,
    numberOfPortions,
    showPortionsInput,
    rentalType,
  ]);

  const handleNext = () => {
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div className=" mt-4 flex justify-between">
          <div>
            <label htmlFor="Short Term" id="Short Term">
              Short Term
            </label>
            <input
              type="radio"
              name="rentalType"
              className=" mx-2 p-2 cursor-pointer "
              id="Short Term"
              defaultChecked={rentalType === "Short Term"}
              onChange={handleRentalTypeChange}
            />
          </div>
          <div>
            <label htmlFor="Long Term" id="Long Term">
              Long Term
            </label>
            <input
              type="radio"
              name="rentalType"
              className=" mx-2 p-2 cursor-pointer"
              id="Long Term"
              defaultChecked={rentalType === "Long Term"}
              onChange={handleRentalTypeChange}
            />
          </div>
          <div>
            <label htmlFor="Both" id="Both">
              Both
            </label>
            <input
              type="radio"
              name="rentalType"
              className=" mx-2 p-2 cursor-pointer"
              id="Both"
              defaultChecked={rentalType === "Both"}
              onChange={handleRentalTypeChange}
            />
          </div>
        </div>
        <FormItem
          label="Choose a property type"
          desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
        >
          <select onChange={handlePropertyTypeChange} value={propertyType} className="p-2 rounded-xl cursor-pointer">
            <option value="Hotel">Hotel</option>
            <option value="Cottage">Cottage</option>
            <option value="Villa">Villa</option>
            <option value="Cabin">Cabin</option>
            <option value="Farm stay">Farm stay</option>
            <option value="Houseboat">Houseboat</option>
            <option value="Lighthouse">Lighthouse</option>
            <option value="Studio">Studio</option>
            <option value="Apartment">Apartment</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Detached House">Detached House</option>
            <option value="Loft">Loft</option>
            <option value="Maisonette">Maisonette</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Holiday Homes">Holiday Homes</option>
            <option value="Farmstay">Farmstay</option>
            <option value="Resort">Resort</option>
            <option value="Lodge">Lodge</option>
            <option value="Apart Hotel">Apart Hotel</option>
          </select>
        </FormItem>
        <FormItem
          label="Place name"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <input
            placeholder="Places name"
            onChange={handlePlaceName}
            value={placeName}
            className="p-2 rounded-xl cursor-pointer"
          />
        </FormItem>
        <FormItem
          label="Rental form"
          desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
        >
          <select onChange={handleRentalFormChange} value={rentalForm} className=" p-2 rounded-xl cursor-pointer">
            {/* <option value="Share room">Share room</option> */}
            <option value="Private room">Private Area</option>
            <option value="Private room by portion">
              Private Area by portion
            </option>
            <option value="Shared Room">Shared Room</option>
            <option value="Hotel Room">Hotel Room </option>
          </select>
        </FormItem>
        {showPortionsInput && (
            <input
              className=" mt-4 rounded-lg text-black cursor-pointer text-sm p-2"
              type="number"
              value={numberOfPortions}
              onChange={handlePortionsInputChange}
              placeholder="Number of portions"
              min={2}
              title="Number of portions can not be less than 2"
            />
          )}
      </div>
      <div className="flex mb-4 items-center gap-x-4">
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
export const useClient = true;

export default PageAddListing1;
