// "use client";
// import axios from 'axios';
// import Input from "@/components/Input/Input";
// import { useEffect, useState } from "react";
// import {
//   getFromLocalStorage,
//   updateLocalStorage,
// } from "../../../helper/localStorage";

// const Step2 = ({ nextStep, prevStep }) => {
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [placeLocation, setPlaceLocation] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [errors, setErrors] = useState({});
//   const [center, setCenter] = useState({ lat: "", lng: "" });

//   const handleCountryChange = (event) => {
//     setSelectedCountry(event.target.value);
//     updateLocalStorage("page2", "country", event.target.value);
//   };

//   const handlePlaceLocation = (event) => {
//     setPlaceLocation(event.target.value);
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

//   // const handlePostalCode = (event) => {
//   //   setPostalCode(event.target.value);
//   //   updateLocalStorage("page2", "postalCode", event.target.value);
//   // };

//   const handlePostalCode = async (event) => {
//   const postalCode = event.target.value;
//   setPostalCode(postalCode);
//   updateLocalStorage("page2", "postalCode", postalCode);

//   if (postalCode) {
//     const coordinates = await getCoordinatesFromPincode(postalCode);
//     if (coordinates) {
//       setCenter({ lat: coordinates.lat, lng: coordinates.lon });
//       updateLocalStorage("page2", "center", { lat: coordinates.lat, lng: coordinates.lon });
//     }
//   }
// };

//   const handleCenter = (event, name) => {
//     const centerObj = {...center};
//     if (name === "lat") {
//       centerObj.lat = event.target.value;
//       setCenter((prev) => ({ ...prev, lat: event.target.value }));
//     }
//     if (name === "lng") {
//       centerObj.lng = event.target.value;
//       setCenter((prev) => ({ ...prev, lng: event.target.value }));
//     }
//     updateLocalStorage("page2", "center", centerObj);
//   };

//   // useEffect(() => {
//   //   const storedData = getFromLocalStorage("page2");

//   //   if (storedData) {
//   //     if (storedData.country) {
//   //       setSelectedCountry(storedData.country);
//   //     }
//   //     if (storedData.placeLocation) {
//   //       setPlaceLocation(storedData.placeLocation);
//   //     }
//   //     if (storedData.city) {
//   //       setCity(storedData.city);
//   //     }
//   //     if (storedData.state) {
//   //       setState(storedData.state);
//   //     }
//   //     if (storedData.postalCode) {
//   //       setPostalCode(storedData.postalCode);
//   //     }
//   //     if (storedData.center) {
//   //       setCenter(storedData.center);
//   //     }
//   //   }
//   // }, []);

//   useEffect(() => {
//     const storedData = getFromLocalStorage("page2");

//     if (storedData) {
//       if (storedData.country) {
//         setSelectedCountry(storedData.country);
//       }
//       if (storedData.placeLocation) {
//         setPlaceLocation(storedData.placeLocation);
//       }
//       if (storedData.city) {
//         setCity(storedData.city);
//       }
//       if (storedData.state) {
//         setState(storedData.state);
//       }
//       if (storedData.postalCode) {
//         setPostalCode(storedData.postalCode);
//         // Fetch coordinates for the stored postal code
//         getCoordinatesFromPincode(storedData.postalCode).then((coordinates) => {
//           if (coordinates) {
//             setCenter({ lat: coordinates.lat, lng: coordinates.lon });
//             updateLocalStorage("page2", "center", { lat: coordinates.lat, lng: coordinates.lon });
//           }
//         });
//       }
//       if (storedData.center) {
//         setCenter(storedData.center);
//       }
//     }
//   }, []);

//   const validateFields = () => {
//     let newErrors = {};
//     if (!selectedCountry) newErrors.country = "Country is required.";
//     if (!placeLocation) newErrors.placeLocation = "Place location is required.";
//     if (!city) newErrors.city = "City is required.";
//     if (!state) newErrors.state = "State is required.";
//     if (!postalCode) newErrors.postalCode = "Postal code is required.";
//     if (!center.lat) newErrors.lat = "Latitude is required.";
//     if (!center.lng) newErrors.lng = "Longitude is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateFields()) {
//       nextStep();
//     }
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

// const getCoordinatesFromPincode = async (pincode) => {
//   const url = `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json&limit=1`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     if (data.length > 0) {
//       const { lat, lon } = data[0];
//       return { lat: parseFloat(lat), lon: parseFloat(lon) };
//     } else {
//       throw new Error('No results found');
//     }
//   } catch (error) {
//     console.error('Error fetching coordinates:', error);
//     return null;
//   }
// };

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
//         {errors.country && (
//           <p className="text-red-500 text-xs ml-1 mt-1">{errors.country}</p>
//         )}
//         <p className="text-xs ml-1">
//           Select the country where your property is located.
//         </p>
//       </div>
//       <div className="mt-4">
//         <label className="ml-1">Your place location</label>
//         <Input value={placeLocation} onChange={handlePlaceLocation} />
//         {errors.placeLocation && (
//           <p className="text-red-500 text-xs ml-1 mt-1">
//             {errors.placeLocation}
//           </p>
//         )}
//       </div>
//       <div className="flex mt-4 items-center justify-between">
//         <div>
//           <label className="ml-1">City</label>
//           <Input value={city} onChange={handleCity} className={"w-72"} />
//           {errors.city && (
//             <p className="text-red-500 text-xs ml-1 mt-1">{errors.city}</p>
//           )}
//         </div>
//         <div>
//           <label className="ml-1">State</label>
//           <Input onChange={handleState} value={state} className={"w-72"} />
//           {errors.state && (
//             <p className="text-red-500 text-xs ml-1 mt-1">{errors.state}</p>
//           )}
//         </div>
//         <div>
//           <label className="ml-1">Postal Code</label>
//           <Input
//             onChange={handlePostalCode}
//             value={postalCode}
//             className={"w-72"}
//           />
//           {errors.postalCode && (
//             <p className="text-red-500 text-xs ml-1 mt-1">
//               {errors.postalCode}
//             </p>
//           )}
//         </div>
//       </div>
//       {/* For Future use that gives you a access that this property pinned on the map */}
//       <div className="mt-4">
//         <p className="ml-1">Coordinates</p>
//         <div className="flex ml-1 items-center gap-x-20">
//           {/* <p> Latitude{0}</p>
//           <p> Longitude{0}</p> */}
//           <Input onChange={(e) => handleCenter(e, "lat")} value={center.lat} />
//           <Input onChange={(e) => handleCenter(e, "lng")} value={center.lng} />
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

// TODO Above code is working fine without decoded feature

"use client";
import axios from "axios";
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
  const [center, setCenter] = useState({ lat: "", lng: "" });

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

  const handlePostalCode = async (event) => {
    const postalCode = event.target.value;
    setPostalCode(postalCode);
    updateLocalStorage("page2", "postalCode", postalCode);

    if (postalCode) {
      const coordinates = await getCoordinatesFromPincode(postalCode);
      if (coordinates) {
        setCenter({ lat: coordinates.lat, lng: coordinates.lon });
        updateLocalStorage("page2", "center", {
          lat: coordinates.lat,
          lng: coordinates.lon,
        });
      }
    }
  };

  const handleCenter = (event, name) => {
    const centerObj = { ...center };
    if (name === "lat") {
      centerObj.lat = event.target.value;
      setCenter((prev) => ({ ...prev, lat: event.target.value }));
    }
    if (name === "lng") {
      centerObj.lng = event.target.value;
      setCenter((prev) => ({ ...prev, lng: event.target.value }));
    }
    updateLocalStorage("page2", "center", centerObj);
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
        getCoordinatesFromPincode(storedData.postalCode).then((coordinates) => {
          if (coordinates) {
            setCenter({ lat: coordinates.lat, lng: coordinates.lon });
            updateLocalStorage("page2", "center", {
              lat: coordinates.lat,
              lng: coordinates.lon,
            });
          }
        });
      }
      if (storedData.center) {
        setCenter(storedData.center);
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
    if (!center.lat) newErrors.lat = "Latitude is required.";
    if (!center.lng) newErrors.lng = "Longitude is required.";
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

  const getCoordinatesFromPincode = async (pincode) => {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json&limit=1`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

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
      <div className="mt-4">
        <label className="ml-1">City</label>
        <Input value={city} onChange={handleCity} />
        {errors.city && (
          <p className="text-red-500 text-xs ml-1 mt-1">{errors.city}</p>
        )}
      </div>
      <div className="mt-4">
        <label className="ml-1">State</label>
        <Input value={state} onChange={handleState} />
        {errors.state && (
          <p className="text-red-500 text-xs ml-1 mt-1">{errors.state}</p>
        )}
      </div>
      <div className="mt-4">
        <label className="ml-1">Postal Code</label>
        <Input value={postalCode} onChange={handlePostalCode} />
        {errors.postalCode && (
          <p className="text-red-500 text-xs ml-1 mt-1">{errors.postalCode}</p>
        )}
      </div>
      <div className="flex items-center gap-x-4 w-full">
        <div className="mt-4 w-full">
          <label className="ml-1">Latitude</label>
          <Input
            value={center.lat}
            onChange={(e) => handleCenter(e, "lat")}
            placeholder="Enter latitude"
          />
          {errors.lat && (
            <p className="text-red-500 text-xs ml-1 mt-1">{errors.lat}</p>
          )}
        </div>
        <div className="mt-4 w-full">
          <label className="ml-1">Longitude</label>
          <Input
            value={center.lng}
            onChange={(e) => handleCenter(e, "lng")}
            placeholder="Enter longitude"
          />
          {errors.lng && (
            <p className="text-red-500 text-xs ml-1 mt-1">{errors.lng}</p>
          )}
        </div>
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

export default Step2;
