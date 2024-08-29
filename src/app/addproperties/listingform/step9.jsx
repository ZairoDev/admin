"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NcInputNumber from "../NcInputNumber";
import { MONTHS } from "./step8";
import Input from "@/components/Input/Input";

const CustomDayPicker = dynamic(() => import("../CustomdayPicker"), {
  ssr: false,
});

const Step9 = ({ nextStep, prevStep }) => {
  const [portions, setPortions] = useState(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return 0;
    }
    const savedPortions = JSON.parse(savedPage)["portions"].length;
    return savedPortions || 0;
  });

  const emptyStringArrayGenerator = (size) => {
    const emptyStringArray = Array.from({ length: size }, () => "");
    return emptyStringArray;
  };


  
  const [myArray, setMyArray] = useState(Array(portions).fill(1));

  const [datesPerPortion, setDatesPerPortion] = useState(() => {
    const savedPage = localStorage.getItem("page9") || "";
    if (!savedPage) {
      return Array.from({ length: portions }, () => []);
    }
    const value = JSON.parse(savedPage)["datesPerPortion"];
    if (value.length !== portions) {
      return Array.from({ length: portions }, () => []);
    }
    return value || Array.from({ length: portions }, () => []);
  });

  const [night, setNight] = useState(() => {
    const savedPage = localStorage.getItem("page9") || "";
    if (!savedPage) {
      return [3, 21];
    }
    const value = JSON.parse(savedPage)["night"];
    return value || [3, 21];
  });

  const [month, setMonth] = useState(() => {
    const savedPage = localStorage.getItem("page9") || "";
    if (!savedPage) {
      return [1, 12];
    }
    const value = JSON.parse(savedPage)["month"];
    return value || [1, 12];
  });

  const [time, setTime] = useState(() => {
    const savedPage = localStorage.getItem("page9") || "";
    if (!savedPage) {
      return [10, 12];
    }
    const value = JSON.parse(savedPage)["time"];
    return value || [10, 12];
  });

  const [page9, setPage9] = useState({
    night: night,
    month: month,
    time: time,
    datesPerPortion: datesPerPortion,
  });

  useEffect(() => {
    const newPage9 = {
      night: night,
      month: month,
      time: time,
      datesPerPortion: datesPerPortion,
    };
    setPage9(newPage9);
    localStorage.setItem("page9", JSON.stringify(newPage9));
  }, [night, month, time, datesPerPortion, portions]);

  const handleDateChange = (dates, portionIndex) => {
    setDatesPerPortion((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates[portionIndex] = dates;
      return updatedDates;
    });
  };

  const getAllSelectedDates = () => {
    return datesPerPortion.flat();
  };

  const [rentalType, setRentalType] = useState(() => {
    const savedPage = localStorage.getItem("page1") || "";
    if (!savedPage) {
      return "Short Term";
    }
    const type = JSON.parse(savedPage)["category"];
    return type || "Short Term";
  });

  const [longTermMonths, setLongTermMonths] = useState(() => {
    const savedLongTermMonths = localStorage.getItem("page8") || "";
    if (!savedLongTermMonths) {
      return emptyStringArrayGenerator(portions);
    }
    const value = JSON.parse(savedLongTermMonths)["longTermMonths"];
    return value || emptyStringArrayGenerator(portions);
  });

  const dt = new Date();
  const edt = new Date(dt);
  const minNights = 1;
  const [startDate, setStartDate] = useState(dt);
  const [endDate, setEndDate] = useState(edt);

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      const adjustedEndDate = new Date(start);
      adjustedEndDate.setDate(start.getDate() + minNights - 1);

      if (end < adjustedEndDate) {
        // Adjust end date if it is less than the minimum nights requirement
        alert(`Minimum stay is ${minNights} nights. Adjusting your end date.`);
        setEndDate(adjustedEndDate);
      } else {
        setStartDate(start);
        setEndDate(end);
      }
    } else {
      setStartDate(start);
      setEndDate(end);
    }
  };

  const handleNext = () => {
    nextStep();
  };

console.log(rentalType)

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {` Shorter trips can mean more reservations, but you'll turn over your
            space more often.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}

      {rentalType && (rentalType === "Short Term" || rentalType === "Both") && (
        <div className="space-y-7 ">
          {/* ITEM */}
          <div className="mt-2">
            <h1 className=" font-medium text-xl ">Short Term Rental</h1>
            <p className=" flex flex-wrap gap-2">
              (
              {MONTHS.filter((m) => !longTermMonths.includes(m)).map(
                (month, index) => (
                  <p key={index}> {month}, </p>
                )
              )}{" "}
              )
            </p>
          </div>
          <NcInputNumber
            label="Nights min"
            defaultValue={night[0]}
            onChange={(value) => setNight([value, night[1]])}
            min={1}
            max={30}
          />
          <NcInputNumber
            label="Nights max"
            defaultValue={night[1]}
            onChange={(value) => setNight([night[0], value])}
            min={1}
            max={30}
          />
        </div>
      )}

      {rentalType && (rentalType === "Long Term" || rentalType === "Both") && (
        <div className="space-y-7">
          {/* ITEM */}
          <div className="mt-2">
            <h1 className=" font-medium text-xl ">Long Term Rental</h1>
            <p className=" flex flex-wrap gap-2">
              (
              {MONTHS.filter((m) => longTermMonths.includes(m)).map(
                (month, index) => (
                  <p key={index}> {month}, </p>
                )
              )}{" "}
              )
            </p>
          </div>
          <NcInputNumber
            label="Months min"
            defaultValue={month[0]}
            onChange={(value) => setMonth([value, month[1]])}
            min={1}
            max={12}
          />
          <NcInputNumber
            label="Months max"
            defaultValue={month[1]}
            onChange={(value) => setMonth([month[0], value])}
            min={1}
            max={12}
          />
        </div>
      )}

      <div>
        <div className="flex justify-between mt-10 rounded-md items-center">
          <label htmlFor="">Check-in Time</label>
          <Input
            type="number"
            className=" bg-transparent rounded-2xl w-32 text-center"
            value={time[0]}
            onChange={(e) => setTime([parseInt(e.target.value), time[1]])}
          />
        </div>
        <div className="flex justify-between rounded-md items-center mt-2">
          <label htmlFor="">Check-out Time</label>
          <Input
            type="number"
            className=" bg-transparent rounded-2xl w-32 text-center"
            value={time[1]}
            onChange={(e) => setTime([time[0], parseInt(e.target.value)])}
          />
        </div>
      </div>

      {/*  */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold">Set your availability</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Editing your calendar is easy—just select a date to block or unblock
          it. You can always make changes after you publish.
        </span>
      </div>


      {myArray.map((dates, index) => (
        <div className="border  border-neutral-400  rounded-2xl mb-4 p-2" key={index}>
          <span className="text-xl  font-semibold">Portion {index + 1}</span>
          <div className="addListingDatePickerExclude text-DarkColor mt-2" key={index}>
            {rentalType &&
              (rentalType == "Short Term" || rentalType == "Both") && (
                <CustomDayPicker
                  key={index}
                  index={index}
                  datesPerPortion={datesPerPortion}
                  setDatesPerPortion={setDatesPerPortion}
                />
              )}
          </div>
        </div>
      ))}

      {rentalType && (rentalType === "Long Term" || rentalType === "Both") && (
        <div className=" flex gap-2 mt-4 flex-wrap">
          <h1 className=" text-2xl  font-semibold w-full">Long Term Months</h1>
          {longTermMonths.map((m, i) => (
            <p key={i}>{m}, </p>
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
    </>
  );
};

export default Step9;
