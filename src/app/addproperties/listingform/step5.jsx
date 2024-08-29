"use client";
import Input from "@/components/Input/Input";
import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
const Step5 = ({ nextStep, prevStep }) => {
  const handleRadioChange = (name, value) => {
    setPage5((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRulesAdd = () => {
    if (rulesInput) {
      setAdditionalRules((prev) => [...prev, rulesInput]);
      setRulesInput("");
    }
    setPage5((prev) => {
      return {
        ...prev,
        additionalRules: [...prev.additionalRules, rulesInput],
      };
    });
  };

  const [additionalRules, setAdditionalRules] = useState(() => {
    const savedPage = localStorage.getItem("page5") || "";
    if (!savedPage) {
      return [
        "No smoking in common areas",
        "Do not wear shoes/shoes in the house",
        "No cooking in the bedroom",
      ];
    }
    const value = JSON.parse(savedPage)["additionalRules"];
    return (
      value || [
        "No smoking in common areas",
        "Do not wear shoes/shoes in the house",
        "No cooking in the bedroom",
      ]
    );
  });

  const [rulesInput, setRulesInput] = useState("");

  const [page5, setPage5] = useState(() => {
    const savedPage = localStorage.getItem("page5");
    return savedPage
      ? JSON.parse(savedPage)
      : {
          smoking: "Do not allow",
          pet: "Allow",
          party: "Allow",
          cooking: "Allow",
          additionalRules: additionalRules,
        };
  });

  useEffect(() => {
    const newPage5 = {
      smoking: page5.smoking,
      pet: page5.pet,
      party: page5.party,
      cooking: page5.cooking,
      additionalRules: additionalRules,
    };
    localStorage.setItem("page5", JSON.stringify(newPage5));
  }, [page5, additionalRules]);

  const renderRadio = (name, value, label) => {
    return (
      <div className="flex items-center">
        <input
          id={`${name}-${value}`}
          name={name}
          type="radio"
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
          checked={page5[name] === value}
          onChange={() => handleRadioChange(name, value)}
        />
        <label
          htmlFor={`${name}-${value}`}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  const handleRemoveRule = (index) => {
    setAdditionalRules((prev) => {
      const updatedRules = [...prev.slice(0, index), ...prev.slice(index + 1)];
      setPage5((prevPage) => ({
        ...prevPage,
        additionalRules: updatedRules,
      }));
      return updatedRules;
    });
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">
          Set house rules for your guests
        </h2>
        <span className="block text-sm text-neutral-500 dark:text-neutral-400">
          Guests must agree to your house rules before they book.
        </span>
      </div>

      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div className="mt-4">
          <label className="text-lg font-semibold" htmlFor="">
            Smoking
          </label>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("smoking", "Do not allow", "Do not allow", true)}
            {renderRadio("smoking", "Allow", "Allow")}
            {renderRadio("smoking", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Pet
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("pet", "Do not allow", "Do not allow")}
            {renderRadio("pet", "Allow", "Allow", true)}
            {renderRadio("pet", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Party organizing
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("party", "Do not allow", "Do not allow")}
            {renderRadio("party", "Allow", "Allow", true)}
            {renderRadio("party", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Cooking
          </label>
          <div className="mt-4 cursor-pointer text-[18px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("cooking", "Do not allow", "Do not allow")}
            {renderRadio("cooking", "Allow", "Allow", true)}
            {renderRadio("cooking", "Charge", "Charge")}
          </div>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <span className="block text-lg font-semibold">Additional rules</span>
        <div className="flow-root">
          <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
            {additionalRules.map((item, index) => (
              <div
                className="py-3 flex items-center justify-between"
                key={index}
              >
                <div className="flex items-center">
                  <span className="ml-3 text-neutral-700 dark:text-neutral-300">
                    {item}
                  </span>
                </div>
                <button
                  className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => handleRemoveRule(index)}
                >
                  <CiCircleMinus className="text-2xl"/>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
          <Input
            className="w-2/3"
            placeholder="Add your desired tag..."
            value={rulesInput}
            onChange={(e) => setRulesInput(e.target.value)}
          />
          <button
            className="bg-PrimaryColor flex gap-x-2 items-center justify-center text-white dark:text-white px-6 py-2 rounded-full"
            onClick={handleRulesAdd}
          >
            <CiCirclePlus />
            Add tag
          </button>
        </div>

        <div className="flex  items-center gap-x-4">
          <button
            className="max-w-[200px] w-full mb-4 mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={prevStep}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="max-w-[200px] mb-4 w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Step5;
