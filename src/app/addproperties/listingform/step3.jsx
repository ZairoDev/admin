"use client";
import Input from "@/components/Input/Input";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useEffect, useState } from "react";
import {
  getFromLocalStorage,
  updateLocalStorage,
} from "../../../helper/localStorage";

const Step3 = ({ nextStep, prevStep }) => {
  const [portions, setPortions] = useState([]);
  useEffect(() => {
    const data = getFromLocalStorage("page3");
    if (data) {
      setPortions(data.portions || []);
    }
  }, []);

  const handleAddPortion = () => {
    setPortions((prevPortions) => {
      const newPortions = [
        ...prevPortions,
        {
          name: "",
          fields: {
            size: 0,
            guests: 0,
            bedroom: 0,
            beds: 0,
            bathroom: 0,
            kitchen: 0,
            childrenAge: 0,
          },
        },
      ];
      updateLocalStorage("page3", "portions", newPortions);
      return newPortions;
    });
  };

  const handleRemovePortion = (index) => {
    setPortions((prevPortions) => {
      const newPortions = prevPortions.filter((_, i) => i !== index);
      updateLocalStorage("page3", "portions", newPortions);
      return newPortions;
    });
  };

  const handlePortionChange = (index, field, value) => {
    setPortions((prevPortions) => {
      const newPortions = [...prevPortions];
      newPortions[index].fields[field] = value;
      updateLocalStorage("page3", "portions", newPortions);
      return newPortions;
    });
  };

  const handlePortionNameChange = (index, value) => {
    setPortions((prevPortions) => {
      const newPortions = [...prevPortions];
      newPortions[index].name = value;
      updateLocalStorage("page3", "portions", newPortions);
      return newPortions;
    });
  };

  const handleIncrease = (index, field) => {
    setPortions((prevPortions) => {
      const newPortions = [...prevPortions];
      newPortions[index] = {
        ...newPortions[index],
        fields: {
          ...newPortions[index].fields,
          [field]: newPortions[index].fields[field] + 1,
        },
      };
      updateLocalStorage("page3", "portions", newPortions);
      return newPortions;
    });
  };

  const handleDecrease = (index, field) => {
    setPortions((prevPortions) => {
      const newPortions = [...prevPortions];
      newPortions[index] = {
        ...newPortions[index],
        fields: {
          ...newPortions[index].fields,
          [field]: Math.max(0, newPortions[index].fields[field] - 1),
        },
      };
      updateLocalStorage("page3", "portions", newPortions);
      return newPortions;
    });
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <div>
      <h2 className="mb-4">Step 3</h2>
      {portions.map((portion, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Portion {index + 1}</h3>
            {/* Remove Portion Button */}
            <button
              className="bg-PrimaryColor px-4 py-2 text-white items-center text-sm rounded-full flex "
              onClick={() => handleRemovePortion(index)}
            >
              Remove Portion{" "}
              <span className="ml-1 text-xl">
                <CiCircleMinus />
              </span>
            </button>
          </div>
          <div>
            <label className="ml-1">Portion Name</label>
            <Input
              className={"w-1/2"}
              value={portion.name}
              placeholder={"Portion Name..."}
              onChange={(e) => handlePortionNameChange(index, e.target.value)}
            />
          </div>
          {[
            { label: "Size (m²)", field: "size" },
            { label: "Guests", field: "guests" },
            { label: "Bedroom", field: "bedroom" },
            { label: "Beds", field: "beds" },
            { label: "Bathroom", field: "bathroom" },
            { label: "Kitchen", field: "kitchen" },
            { label: "Children Age", field: "childrenAge" },
          ].map(({ label, field }) => (
            <div key={field} className="ml-2 mt-2">
              <div className="flex  items-center">
                <div className="">
                  <label className="ml-12">{label}</label>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-PrimaryColor text-3xl"
                      onClick={() => handleDecrease(index, field)}
                    >
                      <CiCircleMinus />
                    </button>
                    <Input
                      type="number"
                      placeholder={"Enter the value"}
                      value={portion.fields[field]}
                      onChange={(e) =>
                        handlePortionChange(
                          index,
                          field,
                          Math.max(0, parseInt(e.target.value, 10))
                        )
                      }
                    />
                    <button
                      className="text-PrimaryColor text-3xl"
                      onClick={() => handleIncrease(index, field)}
                    >
                      <CiCirclePlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <button
        className="max-w-[200px] w-full mt-6 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        onClick={handleAddPortion}
      >
        Add Portion
      </button>
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

export default Step3;
