"use client";
import { useEffect, useState } from "react";
import NcInputNumber from "../NcInputNumber";
import { getFromLocalStorage } from "@/helper/localStorage";

const Step3 = ({ nextStep, prevStep }) => {

  let portions = 0;
  const data = getFromLocalStorage("page1");
  if (data) {
    const value = data["numberOfPortions"];
    if (value) {
      portions = parseInt(value, 10);
    }
  }
  const emptyStringArrayGenerator = (size) => {
    const emptyStringArray = Array.from({ length: size }, () => "");
    return emptyStringArray;
  };
  const emptyNumberArrayGenerator = (size) => {
    const emptyNumberArray = Array.from({ length: size }, () => 0);
    return emptyNumberArray;
  };

  const [myArray, setMyArray] = useState([]);
  const [portionName, setPortionName] = useState(() => {
    const savedPage = getFromLocalStorage("page3");
    if (!savedPage) {
      return emptyStringArrayGenerator(portions);
    }
    const value = savedPage["portionName"];
    return value || emptyStringArrayGenerator(portions);
  });

  const [portionSize, setPortionSize] = useState(() => {
    const savedPage = getFromLocalStorage("page3");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = savedPage["portionSize"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [guests, setGuests] = useState(() => {
    const savedPage = getFromLocalStorage("page3");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = savedPage["guests"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [bedrooms, setBedrooms] = useState(() => {
    const savedPage = getFromLocalStorage("page3");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = savedPage["bedrooms"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [beds, setBeds] = useState(() => {
    const savedPage = getFromLocalStorage("page3");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = savedPage["beds"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [bathroom, setBathroom] = useState(() => {
    const savedPage = getFromLocalStorage("page3");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = savedPage["bathroom"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [kitchen, setKitchen] = useState(() => {
    const savedPage = getFromLocalStorage("page3");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = savedPage["kitchen"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [childrenAge, setChildrenAge] = useState(() => {
    const savedPage = getFromLocalStorage("page3");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = savedPage["childrenAge"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [page3, setPage3] = useState({
    portionName: portionName,
    portionSize: portionSize,
    guests: guests,
    bedrooms: bedrooms,
    beds: beds,
    bathroom: bathroom,
    kitchen: kitchen,
    childrenAge: childrenAge,
  });

  useEffect(() => {
    const newArray = Array(portions).fill(1);
    setMyArray(newArray);
  }, [portions]);

  useEffect(() => {
    const newPage3 = {
      portionName: portionName,
      portionSize: portionSize,
      guests: guests,
      bedrooms: bedrooms,
      beds: beds,
      bathroom: bathroom,
      kitchen: kitchen,
      childrenAge: childrenAge,
    };
    setPage3(newPage3);
    localStorage.setItem("page3", JSON.stringify(newPage3));
  }, [portionName, portionSize, guests, bedrooms, beds, bathroom, kitchen, childrenAge]);



  const handleNext = () => {
    nextStep();
  };

  return (
    <div className=" flex justify-center items-center gap-8 w-[1100px] flex-wrap mt-8 ">
      {myArray.map((item, index) => (
        <div
          key={index}
          className=" flex flex-col border dark:border-white border-slate-600 rounded-3xl shadow-lg pb-4 w-1/4"
        >
          <h2 className="text-md font-semibold mt-2 ml-2">
            Name of {myArray.length > 1 ? `Portion ${index + 1}` : `Property`}{" "}
          </h2>
          <input
            required
            type="text"
            className=" bg-transparent w-5/6 mx-auto my-2 rounded-2xl text-sm p-2 border-neutral-800 border"
            value={portionName[index]}
            onChange={(e) =>
              setPortionName((prev) => {
                const newArray = [...prev];
                newArray[index] = e.target.value.trim();
                return newArray;
              })
            }
          />
          <div className="flex items-center justify-around mb-4">
            <h2 className="text-md font-semibold ">
              Size(m<sup>2</sup>)
            </h2>
            <input
              required
              type="text"
              className="bg-transparent rounded-2xl w-2/5 text-center p-2 border-neutral-800 border"
              value={portionSize[index]}
              onChange={(e) =>
                setPortionSize((prev) => {
                  const newArray = [...prev];
                  newArray[index] = parseInt(e.target.value) || 0;
                  return newArray;
                })
              }
            />
          </div>
          {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
          {/* FORM */}
          <div className="space-y-8 mx-4">
            <NcInputNumber
              label="Guests"
              defaultValue={guests[index]}
              onChange={(value) =>
                setGuests((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <NcInputNumber
              label="Bedroom"
              defaultValue={bedrooms[index]}
              onChange={(value) =>
                setBedrooms((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <NcInputNumber
              label="Beds"
              defaultValue={beds[index]}
              onChange={(value) =>
                setBeds((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <NcInputNumber
              label="Bathroom"
              defaultValue={bathroom[index]}
              onChange={(value) =>
                setBathroom((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <NcInputNumber
              label="Kitchen"
              defaultValue={kitchen[index]}
              onChange={(value) =>
                setKitchen((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <div className="flex items-center justify-between ">
              <h2 className="text-md font-semibold ">Children Age</h2>
              <input
                required
                type="text"
                className="bg-transparent rounded-2xl w-2/5 text-center p-2 border border-neutral-800"
                value={childrenAge[index]}
                onChange={(e) =>
                  setChildrenAge((prev) => {
                    const newArray = [...prev];
                    newArray[index] = parseInt(e.target.value) || 0;
                    return newArray;
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex mb-4 items-center gap-x-4 w-screen">
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
