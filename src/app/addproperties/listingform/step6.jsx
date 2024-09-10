"use client";
import React, { useEffect, useState } from "react";

const Step6 = ({ nextStep, prevStep }) => {
  let portions = 0;
  const data = localStorage.getItem("page1") || "";
  if (!data) {
    portions = 1;
  }
  if (data) {
    const temp = JSON.parse(data);
    // const value = temp["portions"].length;
    const value = temp["numberOfPortions"];

    if (value) {
      portions = parseInt(value, 10);
    }
  }

  const [myArray, setMyArray] = useState(Array(portions).fill(1));

  const [portionNames, setPortionNames] = useState(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return [];
    }
    const value = JSON.parse(savedPage)["portionName"];
    return value || [];
  });

  const [reviews, setReviews] = useState(() => {
    const savedPage = localStorage.getItem("page6") || "";
    if (!savedPage) {
      return [];
    }
    const value = JSON.parse(savedPage)["reviews"];
    return value || [];
  });

  const [page6, setPage6] = useState({
    reviews: reviews,
  });

  useEffect(() => {
    const newReviews = {
      reviews: reviews,
    };
    setPage6(newReviews);
    localStorage.setItem("page6", JSON.stringify(newReviews));
  }, [reviews]);

  const handleNext = () => {
    nextStep();
  };

  return (
    <>
      <h1>Step 6</h1>
      <h2 className="text-2xl my-2 mx-2 font-semibold">
        Write the description that suits the seo
      </h2>
      <div className="flex flex-col gap-8">
        {myArray.map((item, index) => (
          <div key={index}>
            <div>
              <h2 className="text-2xl font-semibold">{portionNames[index]}</h2>
              <span className="block mt-2 ml-1 text-sm text-neutral-500 dark:text-neutral-400">
                Mention the best features of your accommodation, any special
                amenities like fast Wi-Fi or parking, as well as things you like
                about the neighborhood.
              </span>
            </div>

            <textarea
              placeholder="Enter your reviews"
              rows={14}
              className="block w-full  outline-none  border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-96 px-4 py-3 border"
              value={reviews[index] || ""}
              onChange={(e) =>
                setReviews((prev) => {
                  const newReviews = [...prev];
                  newReviews[index] = e.target.value;
                  return newReviews;
                })
              }
            />
          </div>
        ))}
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
    </>
  );
};

export default Step6;
