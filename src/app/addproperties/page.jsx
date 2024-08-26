"use client";
import { useEffect, useState } from "react";
import Step1 from "./listingform/step1";
import Step2 from "./listingform/step2";

const ListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            nextStep={nextStep}
            isNextDisabled={false}
            isPrevDisabled={true}
          />
        );
      case 2:
        return (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            isNextDisabled={false}
            isPrevDisabled={false}
          />
        );
      default:
        return (
          <Step1
            nextStep={nextStep}
            isNextDisabled={false}
            isPrevDisabled={true}
          />
        );
    }
  };

  return (
    <div className=" max-w-5xl m-auto">
      <h1 className=" text-3xl font-bold mb-4">Add Property</h1>
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index + 1} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 z-10 
                ${
                  currentStep === index + 1
                    ? "bg-PrimaryColor text-white dark:text-white"
                    : "bg-gray-300 text-gray-700"
                }`}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>
      {renderStep()}
    </div>
  );
};

export default ListingForm;
