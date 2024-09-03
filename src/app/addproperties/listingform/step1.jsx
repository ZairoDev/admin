// "use client";
// import Input from "@/components/Input/Input";
// import { useEffect, useState } from "react";
// import {
//   getFromLocalStorage,
//   updateLocalStorage,
// } from "../../../helper/localStorage";

// const Step1 = ({ nextStep }) => {
//   const [catogries, setCotegries] = useState("");
//   const [selectedPropertyType, setSelectedPropertyType] = useState("");
//   const [placeName, setPlaceName] = useState("");
//   const [selectedRentalType, setSelectedRentalType] = useState("");

//   const [errors, setErrors] = useState({});

//   const rentalTypes = [
//     "Private Area",
//     "Private Area By Portion",
//     "Shared Room",
//     "Hotel Room",
//   ];
//   const propertyTypes = [
//     "Hotel",
//     "Cottage",
//     "Villa",
//     "Cabin",
//     "Farm stay",
//     "Houseboat",
//     "Lighthouse",
//     "Studio",
//     "Apartment",
//     "Penthouse",
//     "Detached House",
//     "Loft",
//     "Maisonette",
//     "Farmhouse",
//     "Holiday Homes",
//     "Farmstay",
//     "Resort",
//     "Lodge",
//     "Apart Hotel",
//   ];

//   const HandlePropertyChange = (event) => {
//     const value = event.target.value;
//     setSelectedPropertyType(value);
//     updateLocalStorage("page1", "propertyType", value);
//     setErrors((prev) => ({ ...prev, propertyType: "" })); // Clear error on change
//   };

//   const handleSelectCategory = (event) => {
//     const value = event.target.value;
//     setCotegries(value);
//     updateLocalStorage("page1", "category", value);
//     setErrors((prev) => ({ ...prev, category: "" })); // Clear error on change
//   };
//   const handlePlaceName = (event) => {
//     const value = event.target.value;
//     setPlaceName(value);
//     updateLocalStorage("page1", "placeName", value);
//     setErrors((prev) => ({ ...prev, category: "" })); // Clear error on change
//   };
//   const handleRentalType = (event) => {
//     const value = event.target.value;
//     setSelectedRentalType(value);
//     updateLocalStorage("page1", "rentalType", value);
//     setErrors((prev) => ({ ...prev, category: "" })); // Clear error on change
//   };

//   useEffect(() => {
//     const storedData = getFromLocalStorage("page1");

//     if (storedData) {
//       if (storedData.category) {
//         setCotegries(storedData.category);
//       }
//       if (storedData.propertyType) {
//         setSelectedPropertyType(storedData.propertyType);
//       }
//       if (storedData.rentalType) {
//         setSelectedRentalType(storedData.rentalType);
//       }
//       if (storedData.placeName) {
//         setPlaceName(storedData.placeName);
//       }
//     }
//   }, []);

//   const validateFields = () => {
//     const newErrors = {};
//     if (!catogries) newErrors.category = "Please select a category.";
//     if (!selectedPropertyType)
//       newErrors.propertyType = "Please select a property type.";
//     if (!placeName) newErrors.placeName = "Please enter the place name.";
//     if (!selectedRentalType)
//       newErrors.rentalType = "Please select a rental type.";
//     return newErrors;
//   };

//   const handleNext = () => {
//     const fieldErrors = validateFields();
//     if (Object.keys(fieldErrors).length > 0) {
//       setErrors(fieldErrors);
//     } else {
//       nextStep();
//     }
//   };
//   return (
//     <>
//     <h1>Step 1</h1>
//     <div className="mt-6">
//       <div className="flex flex-col w-full">
//         <div className="mb-8">
//           <h1 className="text-2xl ml-1 font-medium mb-2">
//             Choosing listing categories
//           </h1>
//           <div className="flex items-center justify-between gap-x-3">
//             <div className="flex items-center justify-between gap-x-10">
//               {["Short Term", "Long Term", "Both"].map((type) => (
//                 <label
//                   key={type}
//                   className={`block cursor-pointer text-sm border rounded-full px-5 py-2 ${
//                     catogries === type
//                       ? "bg-PrimaryColor text-white dark:text-white"
//                       : "border text-PrimaryColor border-PrimaryColor"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="catogries"
//                     value={type}
//                     checked={catogries === type}
//                     onChange={handleSelectCategory}
//                     className="mr-[2px] hidden invisible cursor-pointer"
//                   />
//                   {type}
//                 </label>
//               ))}
//             </div>
//           </div>
//           {errors.category && (
//             <p className="text-red-500 text-xs  ml-1 mt-1">{errors.category}</p>
//           )}
//         </div>

//         <div>
//           <label htmlFor="propertyType" className="ml-1">
//             Choose a property type
//           </label>
//           <select
//             id="propertyType"
//             value={selectedPropertyType}
//             onChange={HandlePropertyChange}
//             className="block w-full cursor-pointer outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
//           >
//             <option value="">Select a property type</option>
//             {propertyTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//           {errors.propertyType && (
//             <p className="text-red-500 text-xs mt-1 ml-1">
//               {errors.propertyType}
//             </p>
//           )}
//           <p className="text-xs ml-1">
//             Hotel: Professional hospitality businesses that usually have a
//             unique style or theme defining their brand and decor
//           </p>
//         </div>

//         <div className="mt-6">
//           <label htmlFor="placeName" className="ml-1">
//             Place name
//           </label>
//           <Input
//             onChange={handlePlaceName}
//             value={placeName}
//             placeholder={"Place name"}
//           />
//           {errors.placeName && (
//             <p className="text-red-500 text-xs ml-1 mt-1">{errors.placeName}</p>
//           )}
//           <p className="text-xs ml-1">
//             A catchy name usually includes: House name + Room name + Featured
//             property + Tourist destination
//           </p>
//         </div>

//         <div className="mt-6">
//           <label htmlFor="rentalType" className="ml-1">
//             Choose a rental type
//           </label>
//           <select
//             id="rentalType"
//             value={selectedRentalType}
//             onChange={handleRentalType}
//             className="block w-full outline-none cursor-pointer border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
//           >
//             <option value="">Select a rental type</option>
//             {rentalTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//           {errors.rentalType && (
//             <p className="text-red-500 text-xs ml-1 mt-1">
//               {errors.rentalType}
//             </p>
//           )}
//           <p className="text-xs ml-1">
//             Entire place: Guests have the whole place to themselves—there's a
//             private entrance and no shared spaces.
//             <br /> A bedroom, bathroom, and kitchen are usually included
//           </p>
//         </div>

//         <button
//           onClick={handleNext}
//           className="max-w-[200px] mb-4 w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Step1;

"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@/components/Input/Input";
import {
  getFromLocalStorage,
  updateLocalStorage,
} from "../../../helper/localStorage";

const Step1 = ({ nextStep }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      propertyType: "",
      placeName: "",
      rentalType: "",
    },
  });

  const rentalTypes = [
    "Private Area",
    "Private Area By Portion",
    "Shared Room",
    "Hotel Room",
  ];
  const propertyTypes = [
    "Hotel",
    "Cottage",
    "Villa",
    "Cabin",
    "Farm stay",
    "Houseboat",
    "Lighthouse",
    "Studio",
    "Apartment",
    "Penthouse",
    "Detached House",
    "Loft",
    "Maisonette",
    "Farmhouse",
    "Holiday Homes",
    "Farmstay",
    "Resort",
    "Lodge",
    "Apart Hotel",
  ];

  useEffect(() => {
    const storedData = getFromLocalStorage("page1");
    if (storedData) {
      Object.entries(storedData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [setValue]);

  const onSubmit = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      updateLocalStorage("page1", key, value);
    });
    nextStep();
  };

  return (
    <>
      <h1>Step 1</h1>
      <div className="mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <div className="mb-8">
            <h1 className="text-2xl ml-1 font-medium mb-2">
              Choosing listing categories
            </h1>
            <div className="flex items-center justify-between gap-x-3">
              <Controller
                name="category"
                control={control}
                rules={{ required: "Please select a category." }}
                render={({ field }) => (
                  <div className="flex items-center justify-between gap-x-10">
                    {["Short Term", "Long Term", "Both"].map((type) => (
                      <label
                        key={type}
                        className={`block cursor-pointer text-sm border rounded-full px-5 py-2 ${
                          field.value === type
                            ? "bg-PrimaryColor text-white dark:text-white"
                            : "border text-PrimaryColor border-PrimaryColor"
                        }`}
                      >
                        <input
                          type="radio"
                          {...field}
                          value={type}
                          checked={field.value === type}
                          className="mr-[2px] hidden invisible cursor-pointer"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                )}
              />
            </div>
            {errors.category && (
              <p className="text-red-500 text-xs ml-1 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="propertyType" className="ml-1">
              Choose a property type
            </label>
            <Controller
              name="propertyType"
              control={control}
              rules={{ required: "Please select a property type." }}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full cursor-pointer outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                >
                  <option value="">Select a property type</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.propertyType && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.propertyType.message}
              </p>
            )}
            <p className="text-xs ml-1">
              Hotel: Professional hospitality businesses that usually have a
              unique style or theme defining their brand and decor
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="placeName" className="ml-1">
              Place name
            </label>
            <Controller
              name="placeName"
              control={control}
              rules={{ required: "Please enter the place name." }}
              render={({ field }) => (
                <Input {...field} placeholder="Place name" />
              )}
            />
            {errors.placeName && (
              <p className="text-red-500 text-xs ml-1 mt-1">
                {errors.placeName.message}
              </p>
            )}
            <p className="text-xs ml-1">
              A catchy name usually includes: House name + Room name + Featured
              property + Tourist destination
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="rentalType" className="ml-1">
              Choose a rental type
            </label>
            <Controller
              name="rentalType"
              control={control}
              rules={{ required: "Please select a rental type." }}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full outline-none cursor-pointer border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                >
                  <option value="">Select a rental type</option>
                  {rentalTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.rentalType && (
              <p className="text-red-500 text-xs ml-1 mt-1">
                {errors.rentalType.message}
              </p>
            )}
            <p className="text-xs ml-1">
              Entire place: Guests have the whole place to themselves—there's a
              private entrance and no shared spaces.
              <br /> A bedroom, bathroom, and kitchen are usually included
            </p>
          </div>

          <button
            type="submit"
            className="max-w-[200px] mb-4 w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
};

export default Step1;
