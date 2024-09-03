"use client";
import { useEffect, useState } from "react";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import Input from "@/components/Input/Input";
import FormItem from "../FormItem";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Step8 = ({ nextStep, prevStep }) => {
  const [basePriceError, setBasePriceError] = useState(false);
  let portions = 0;
  const data = localStorage.getItem("page3") || "";
  if (data) {
    const temp = JSON.parse(data);
    const value = temp["portions"].length;
    if (value) {
      portions = parseInt(value, 10);
    }
  }
  const [rentalType, setRentalType] = useState(() => {
    const savedRentalType = localStorage.getItem("page1");
    if (!savedRentalType) {
      return "Short Term";
    }
    const type = JSON.parse(savedRentalType)["category"];
    return type || "Short Term";
  });

  const emptyStringArrayGenerator = (size) => {
    const emptyStringArray = Array.from({ length: size }, () => "");
    return emptyStringArray;
  };

  const emptyNumberArrayGenerator = (size) => {
    const emptyNumberArray = Array.from({ length: size }, () => 0);
    return emptyNumberArray;
  };

  const [myArray, setMyArray] = useState(Array(portions).fill(1));
  const [isPortion, setIsPortion] = useState(() => {
    return portions > 1 ? true : false;
  });

  const [currency, setCurrency] = useState("EURO");

  const [longTermMonths, setLongTermMonths] = useState(() => {
    if (rentalType === "Short Term") {
      return [];
    } else if (rentalType === "Long Term") {
      return MONTHS;
    }

    const savedPage = localStorage.getItem("page8") || "";
    if (!savedPage) {
      return [];
    }
    const value = JSON.parse(savedPage)["longTermMonths"];
    return value || [];
  });

  const [basePrice, setBasePrice] = useState(() => {
    const savedPage = localStorage.getItem("page8") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["basePrice"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [basePriceLongTerm, setBasePriceLongTerm] = useState(() => {
    const savedPage = localStorage.getItem("page8") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["basePriceLongTerm"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [weekendPrice, setWeekendPrice] = useState(() => {
    const savedPage = localStorage.getItem("page8") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["weekendPrice"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [weeklyDiscount, setWeeklyDiscount] = useState(() => {
    const savedPage = localStorage.getItem("page8");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["weeklyDiscount"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [monthlyDiscount, setMonthlyDiscount] = useState(() => {
    const savedPage = localStorage.getItem("page8");
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["monthlyDiscount"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [page8, setPage8] = useState(() => {
    const savedPage = localStorage.getItem("page8");
    return savedPage
      ? JSON.parse(savedPage)
      : {
          currency: "EURO",
          isPortion: false,
          basePrice: emptyNumberArrayGenerator(portions),
          basePriceLongTerm: emptyNumberArrayGenerator(portions),
          weekendPrice: emptyNumberArrayGenerator(portions),
          weeklyDiscount: emptyNumberArrayGenerator(portions),
          monthlyDiscount: emptyNumberArrayGenerator(portions),
          longTermMonths: emptyStringArrayGenerator(portions),
          monthState: Array.from({ length: 12 }, () => false),
        };
  });

  const [monthState, setMonthState] = useState(() => {
    const savedPage = localStorage.getItem("page8") || "";
    if (!savedPage) {
      return Array.from({ length: 12 }, () => false);
    }
    const value = JSON.parse(savedPage)["monthState"];
    return value || Array.from({ length: 12 }, () => false);
  });

  useEffect(() => {
    const newPage = {
      currency: currency,
      isPortion: isPortion,
      basePrice: basePrice,
      basePriceLongTerm: basePriceLongTerm,
      weekendPrice: weekendPrice,
      weeklyDiscount: weeklyDiscount,
      monthlyDiscount: monthlyDiscount,
      longTermMonths: longTermMonths,
      monthState: monthState,
    };
    setPage8(newPage);
    localStorage.setItem("page8", JSON.stringify(newPage));
  }, [
    isPortion,
    basePrice,
    basePriceLongTerm,
    weekendPrice,
    weeklyDiscount,
    monthlyDiscount,
    currency,
    longTermMonths,
    monthState,
  ]);

  const handleSelectedMonths = (e, index) => {
    const newMonthState = [...monthState];
    newMonthState[index] = !newMonthState[index];
    setMonthState(newMonthState);

    if (longTermMonths.includes(e.target.innerText)) {
      const newLongTermMonths = longTermMonths.filter(
        (month) => month !== e.target.innerText
      );
      setLongTermMonths(newLongTermMonths);
    } else {
      setLongTermMonths([...longTermMonths, e.target.innerText]);
    }
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <>
      <h1>Step 8</h1>
      <div className="flex flex-col gap-12">
        {rentalType && rentalType === "Both" && (
          <div>
            <h1 className="text-3xl font-semibold">
              Select Months for Long Term Pricing
            </h1>
            <div className="flex flex-wrap gap-4 mt-4">
              {MONTHS.map((month, index) => (
                <div className="flex gap-2 items-center" key={index}>
                  <p
                    className={`flex items-center gap-1 py-1 px-2 border border-neutral-500 rounded-2xl cursor-pointer ${
                      monthState[index] &&
                      "bg-primary-6000 py-1 px-2 rounded-2xl cursor-pointer flex items-center gap-1 border-none"
                    }`}
                    onClick={(e) => handleSelectedMonths(e, index)}
                  >
                    {month}{" "}
                    {monthState[index] && <MdOutlineCancel className="" />}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {rentalType &&
          (rentalType === "Short Term" || rentalType === "Both") && (
            <div>
              <h1 className="text-3xl font-semibold">Short Term Pricing</h1>
              <h2 className="flex flex-wrap gap-2">
                (
                {MONTHS.filter((m) => !longTermMonths.includes(m)).map(
                  (month, index) => (
                    <h2 key={index}> {month}, </h2>
                  )
                )}
                )
              </h2>
              {myArray.map((item, index) => (
                <div key={index} className="mt-8">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Price for{" "}
                      {isPortion ? `Portion ${index + 1}` : "Property"}
                    </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                      {`The host's revenue is directly dependent on the setting of rates and
                    regulations on the number of guests, the number of nights, and the
                    cancellation policy.`}
                    </span>
                  </div>
                  <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                  <div className="space-y-8">
                    <FormItem label="Currency">
                      <select className="block w-60 outline-none  border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border">
                        <option value="EURRO">EURO</option>
                      </select>
                    </FormItem>
                    <FormItem label="Base price (Monday -Thursday)">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">€</span>
                        </div>
                        <Input
                          className="!pl-8 !pr-10"
                          placeholder="0.00"
                          value={basePrice[index]}
                          onChange={(e) =>
                            setBasePrice((prevBasePrice) => {
                              const newBasePrice = [...prevBasePrice];
                              newBasePrice[index] = parseFloat(e.target.value);
                              return newBasePrice;
                            })
                          }
                        />
                      </div>
                    </FormItem>
                    <FormItem label="Weekend price (Friday - Sunday)">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">€</span>
                        </div>
                        <Input
                          className="!pl-8 !pr-10"
                          placeholder="0.00"
                          value={weekendPrice[index]}
                          onChange={(e) =>
                            setWeekendPrice((prevWeekendPrice) => {
                              const newWeekendPrice = [...prevWeekendPrice];
                              newWeekendPrice[index] = parseFloat(
                                e.target.value
                              );
                              return newWeekendPrice;
                            })
                          }
                        />
                      </div>
                    </FormItem>
                    <FormItem label="Weekly discount">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">%</span>
                        </div>
                        <Input
                          className="!pl-8 !pr-10"
                          placeholder="0.00"
                          value={weeklyDiscount[index]}
                          onChange={(e) =>
                            setWeeklyDiscount((prevWeeklyDiscount) => {
                              const newWeeklyDiscount = [...prevWeeklyDiscount];
                              newWeeklyDiscount[index] = parseFloat(
                                e.target.value
                              );
                              return newWeeklyDiscount;
                            })
                          }
                        />
                      </div>
                    </FormItem>
                    <FormItem label="Monthly discount">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">%</span>
                        </div>
                        <Input
                          className="!pl-8 !pr-10"
                          placeholder="0.00"
                          value={monthlyDiscount[index]}
                          onChange={(e) =>
                            setMonthlyDiscount((prevMonthlyDiscount) => {
                              const newMonthlyDiscount = [
                                ...prevMonthlyDiscount,
                              ];
                              newMonthlyDiscount[index] = parseFloat(
                                e.target.value
                              );
                              return newMonthlyDiscount;
                            })
                          }
                        />
                      </div>
                    </FormItem>
                  </div>
                </div>
              ))}
            </div>
          )}

        {rentalType && rentalType === "Long Term" && (
          <div>
            <h1 className="text-3xl font-semibold">Long Term Pricing</h1>
            <h2 className="flex flex-wrap gap-2">
              (
              {MONTHS.filter((m) => longTermMonths.includes(m)).map(
                (month, index) => (
                  <h2 key={index}> {month}, </h2>
                )
              )}
              )
            </h2>
            {myArray.map((item, index) => (
              <div key={index} className="mt-8">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Price for {isPortion ? `Portion ${index + 1}` : "Property"}
                  </h2>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {`The host's revenue is directly dependent on the setting of rates and
                    regulations on the number of guests, the number of nights, and the
                    cancellation policy.`}
                  </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="space-y-8">
                  <FormItem label="Currency">
                    <select className="block w-60 outline-none  border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border">
                      <option value="EURRO">EURO</option>
                    </select>
                  </FormItem>
                  <FormItem label="Base price (Long term)">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">€</span>
                      </div>
                      <Input
                        className="!pl-8 !pr-10"
                        placeholder="0.00"
                        value={basePriceLongTerm[index]}
                        onChange={(e) =>
                          setBasePriceLongTerm((prevBasePriceLongTerm) => {
                            const newBasePriceLongTerm = [
                              ...prevBasePriceLongTerm,
                            ];
                            newBasePriceLongTerm[index] = parseFloat(
                              e.target.value
                            );
                            return newBasePriceLongTerm;
                          })
                        }
                      />
                    </div>
                  </FormItem>
                </div>
              </div>
            ))}
          </div>
        )}
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
    </>
  );
};

export default Step8;
