// "use client";
// import Input from "@/components/Input/Input";
// import { useEffect, useState } from "react";
// import {
//   getFromLocalStorage,
//   updateLocalStorage,
// } from "../../../helper/localStorage";

// const Step2 = ({ nextStep, prevStep }) => {
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [placeLocation, setplaceLocation] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const handleCountryChange = (event) => {
//     setSelectedCountry(event.target.value);
//     updateLocalStorage("page2", "country", event.target.value);
//   };

//   const handlePlaceLocation = (event) => {
//     setplaceLocation(event.target.value);
//     updateLocalStorage("page2", "placeLocation", event.target.value);
//   };

//   const handleCity = (event) => {
//     setCity(event.target.value);
//     updateLocalStorage("page2", "city", event.target.value);
//   };

//   const handleState = (event) => {
//     setState(event.target.value);
//     updateLocalStorage("page2", "state", event.target.value);
//   };

//   const handlePostalCode = (event) => {
//     setPostalCode(event.target.value);
//     updateLocalStorage("page2", "postalCode", event.target.value);
//   };
//   useEffect(() => {
//     const storedData = getFromLocalStorage("page2");

//     if (storedData) {
//       if (storedData.country) {
//         setSelectedCountry(storedData.country);
//       }
//       if (storedData.placeLocation) {
//         setplaceLocation(storedData.placeLocation);
//       }
//       if (storedData.city) {
//         setCity(storedData.city);
//       }
//       if (storedData.state) {
//         setState(storedData.state);
//       }
//       if (storedData.postalCode) {
//         setPostalCode(storedData.postalCode);
//       }
//     }
//   }, []);

//   const handleNext = () => {
//     nextStep();
//   };

//   const countries = [
//     "Greece",
//     "Italy",
//     "Cyprus",
//     "US",
//     "Netherlands",
//     "UK",
//     "Hungary",
//     "Turkey",
//     "Bulgaria",
//     "Lithuania",
//     "Malta",
//     "Romania",
//     "Spain",
//     "Croatia",
//     "Portugal",
//     "Slovenia",
//     "Slovakia",
//     "Viet Nam",
//     "Thailand",
//     "France",
//     "Singapore",
//     "Japan",
//     "Korea",
//   ];

//   return (
//     <div>
//       <h2>Step 2</h2>
//       <div className="mt-6">
//         <label htmlFor="country" className="ml-1">
//           Choose a country
//         </label>
//         <select
//           id="country"
//           value={selectedCountry}
//           onChange={handleCountryChange}
//           className="block w-full cursor-pointer outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
//         >
//           <option value="">Select a country</option>
//           {countries.map((country) => (
//             <option key={country} value={country}>
//               {country}
//             </option>
//           ))}
//         </select>
//         <p className="text-xs ml-1">
//           Select the country where your property is located.
//         </p>
//       </div>
//       <div className="mt-4">
//         <lable className="ml-1 ">Your place location</lable>
//         <Input value={placeLocation} onChange={handlePlaceLocation} />
//       </div>
//       <div className="flex mt-4 items-center justify-between">
//         <div>
//           <lable className="ml-1 ">City</lable>
//           <Input value={city} onChange={handleCity} className={"w-72"} />
//         </div>
//         <div>
//           <lable className="ml-1 ">State</lable>
//           <Input onChange={handleState} value={state} className={"w-72"} />
//         </div>
//         <div>
//           <lable className="ml-1 ">Postal Code</lable>
//           <Input
//             onChange={handlePostalCode}
//             value={postalCode}
//             className={"w-72"}
//           />
//         </div>
//       </div>
//       {/* For Future use that gives you a access that this property pinnde on the map */}
//       <div className="mt-4">
//         <p className="ml-1">Coordinates</p>
//         <div className="flex ml-1  items-center gap-x-20">
//           <p> Latitude{0}</p>
//           <p> Longitude{0}</p>
//         </div>
//       </div>
//       <div className="flex items-center gap-x-4">
//         <button
//           className="max-w-[200px] w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
//           onClick={prevStep}
//         >
//           Back
//         </button>
//         <button
//           onClick={handleNext}
//           className="max-w-[200px] w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step2;

"use client";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import {
  getFromLocalStorage,
  updateLocalStorage,
} from "../../../helper/localStorage";

const Step2 = ({ nextStep, prevStep }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [placeLocation, setPlaceLocation] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errors, setErrors] = useState({});

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    updateLocalStorage("page2", "country", event.target.value);
  };

  const handlePlaceLocation = (event) => {
    setPlaceLocation(event.target.value);
    updateLocalStorage("page2", "placeLocation", event.target.value);
  };

  const handleCity = (event) => {
    setCity(event.target.value);
    updateLocalStorage("page2", "city", event.target.value);
  };

  const handleState = (event) => {
    setState(event.target.value);
    updateLocalStorage("page2", "state", event.target.value);
  };

  const handlePostalCode = (event) => {
    setPostalCode(event.target.value);
    updateLocalStorage("page2", "postalCode", event.target.value);
  };

  useEffect(() => {
    const storedData = getFromLocalStorage("page2");

    if (storedData) {
      if (storedData.country) {
        setSelectedCountry(storedData.country);
      }
      if (storedData.placeLocation) {
        setPlaceLocation(storedData.placeLocation);
      }
      if (storedData.city) {
        setCity(storedData.city);
      }
      if (storedData.state) {
        setState(storedData.state);
      }
      if (storedData.postalCode) {
        setPostalCode(storedData.postalCode);
      }
    }
  }, []);

  const validateFields = () => {
    let newErrors = {};
    if (!selectedCountry) newErrors.country = "Country is required.";
    if (!placeLocation) newErrors.placeLocation = "Place location is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!postalCode) newErrors.postalCode = "Postal code is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      nextStep();
    }
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
        {errors.country && (
          <p className="text-red-500 text-xs ml-1 mt-1">{errors.country}</p>
        )}
        <p className="text-xs ml-1">
          Select the country where your property is located.
        </p>
      </div>
      <div className="mt-4">
        <label className="ml-1">Your place location</label>
        <Input value={placeLocation} onChange={handlePlaceLocation} />
        {errors.placeLocation && (
          <p className="text-red-500 text-xs ml-1 mt-1">
            {errors.placeLocation}
          </p>
        )}
      </div>
      <div className="flex mt-4 items-center justify-between">
        <div>
          <label className="ml-1">City</label>
          <Input value={city} onChange={handleCity} className={"w-72"} />
          {errors.city && (
            <p className="text-red-500 text-xs ml-1 mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <label className="ml-1">State</label>
          <Input onChange={handleState} value={state} className={"w-72"} />
          {errors.state && (
            <p className="text-red-500 text-xs ml-1 mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="ml-1">Postal Code</label>
          <Input
            onChange={handlePostalCode}
            value={postalCode}
            className={"w-72"}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-xs ml-1 mt-1">
              {errors.postalCode}
            </p>
          )}
        </div>
      </div>
      {/* For Future use that gives you a access that this property pinned on the map */}
      <div className="mt-4">
        <p className="ml-1">Coordinates</p>
        <div className="flex ml-1 items-center gap-x-20">
          <p> Latitude{0}</p>
          <p> Longitude{0}</p>
        </div>
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
