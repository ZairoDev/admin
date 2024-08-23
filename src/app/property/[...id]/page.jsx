"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@mui/base";

const EditPropertyPage = ({ params }) => {
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [numberOfPortions, setNumberOfPortions] = useState(1);

  const fetchProperty = async () => {
    try {
      const response = await axios.post("/api/getproperty", {
        id: params.id,
      });
      console.log(response.data);
      setProperty(response.data);
      setNumberOfPortions(response.data.numberOfPortions);
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      console.log("Property fetched successfully");
    }
  };


  const [formData, setFormData] = useState({
    VSID: property?.VSID,
    rentalType: property?.rentalType,

    propertyType: property?.propertyType,
    placeName: property?.placeName,
    rentalForm: property?.rentalForm,
    numberOfPortions: property?.numberOfPortions,

    street: property?.street,
    postalCode: property?.postalCode,
    city: property?.city,
    state: property?.state,
    country: property?.country,

    portionName: property?.portionName,
    portionSize: property?.portionSize,
    guests: property?.guests,
    bedrooms: property?.bedrooms,
    beds: property?.beds,
    bathroom: property?.bathroom,
    kitchen: property?.kitchen,
    childrenAge: property?.childrenAge,

    basePrice: property?.basePrice,
    weekendPrice: property?.weekendPrice,
    monthlyDiscount: property?.monthlyDiscount,

    generalAmenities: property?.generalAmenities,
    otherAmenities: property?.otherAmenities,
    safeAmenities: property?.safeAmenities,

    smoking: property?.smoking,
    pet: property?.pet,
    party: property?.party,
    cooking: property?.cooking,
    additionalRules: property?.additionalRules,

    reviews: property?.reviews,

    propertyCoverFileUrl: property?.propertyCoverFileUrl,
    propertyPictureUrls: property?.propertyPictureUrls,
    portionCoverFileUrls: property?.portionCoverFileUrls,
    portionPictureUrls: property?.portionPictureUrls,

    night: property?.night,
    time: property?.time,
    datesPerPortion: property?.datesPerPortion,

    isLive: property?.isLive,
  });

  useEffect(() => {
    if (property) {
      setFormData({
        VSID: property.VSID,
        rentalType: property.rentalType,

        propertyType: property.propertyType,
        placeName: property.placeName,
        rentalForm: property.rentalForm,
        numberOfPortions: property.numberOfPortions,

        street: property.street,
        postalCode: property.postalCode,
        city: property.city,
        state: property.state,
        country: property.country,

        portionName: property.portionName,
        portionSize: property.portionSize,
        guests: property.guests,
        bedrooms: property.bedrooms,
        beds: property.beds,
        bathroom: property.bathroom,
        kitchen: property.kitchen,
        childrenAge: property.childrenAge,

        basePrice: property.basePrice,
        weekendPrice: property.weekendPrice,
        monthlyDiscount: property.monthlyDiscount,

        smoking: property.smoking,
        pet: property.pet,
        party: property.party,
        cooking: property.cooking,
        additionalRules: property.additionalRules,

        reviews: property.reviews,

        night: property.night,
        time: property.time,
        datesPerPortion: property.datesPerPortion,

        isLive: property.isLive,
      });
    }
  }, [property]);

  useEffect(() => {
    fetchProperty();
  }, []);

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const trimmedValue = value.trim();
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : trimmedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/editproperties", {
        propertyId: params.id,
        updatedData: formData,
      });

      toast.success("Property updated successfully");
      setTimeout(() => {
        router.push("/author");
      }, 2000);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const [isPortionOpen, setIsPortionOpen] = useState(() =>
    Array.from({ length: numberOfPortions }, () => false)
  );

  return (
    <div className="max-w-5xl mx-auto p-2 ">
        <h1 className="text-3xl ml-1 text-white">Edit Property</h1>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-x-2 gap-y-4 mt-4">
          <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4">
            <div className="w-full">
              <h1 className="text-base ml-1 ">VSID (Can not edit)</h1>
              <input
                className="block w-full cursor-not-allowed border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                type="text"
                name="VSID"
                value={formData?.VSID || ""}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className=" w-full">
              <h1 className="text-base ml-1">Property Type</h1>
              <select
                name="propertyType"
                id="propertyType"
                value={formData.propertyType}
                onChange={(e) => handleChange(e)}
                className=" block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Hotel"
                >
                  Hotel
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Cottage"
                >
                  Cottage
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Villa"
                >
                  Villa
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Cabin"
                >
                  Cabin
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Farm stay"
                >
                  Farm stay
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Houseboat"
                >
                  Houseboat
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Lighthouse"
                >
                  Lighthouse
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Studio"
                >
                  Studio
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Apartment"
                >
                  Apartment
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Penthouse"
                >
                  Penthouse
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Detached House"
                >
                  Detached House
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Loft"
                >
                  Loft
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Maisonette"
                >
                  Maisonette
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Farmhouse"
                >
                  Farmhouse
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Holiday Homes"
                >
                  Holiday Homes
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Farmstay"
                >
                  Farmstay
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Resort"
                >
                  Resort
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Lodge"
                >
                  Lodge
                </option>
                <option
                  className=" text-black dark:text-white dark:bg-neutral-800"
                  value="Apart Hotel"
                >
                  Apart Hotel
                </option>
              </select>
            </div>
          </div>

          <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4">
            <label className=" w-full text-base ">
              Place Name
              <input
                className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                type="text"
                name="placeName"
                value={formData?.placeName || ""}
                onChange={handleChange}
              />
            </label>
            <label className="w-full ">
              <h1 className="w-full text-base ml-1">Rental Form</h1>
              <input
                className="block cursor-not-allowed w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                type="text"
                name="rentalForm"
                value={formData?.rentalForm || "No data available"}
                onChange={handleChange}
                disabled
              />
            </label>
          </div>

          <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4">
            <div className="w-full">
              <h1 className="text-base ml-1">Property Type</h1>
              <select
                name="rentalType"
                id="rentalType"
                value={formData.rentalType}
                className=" block w-full border-neutral-200  focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
              >
                <option
                  value="Short Term"
                  className=" text-black dark:text-white dark:bg-neutral-800"
                >
                  Short Term
                </option>
                <option
                  value="Long Term"
                  className=" text-black dark:text-white dark:bg-neutral-800"
                >
                  Long Term
                </option>
              </select>
            </div>
            <label className="w-full">
              <h1 className="w-full text-base ml-1">Postal Code</h1>
              <input
                className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                type="text"
                name="postalCode"
                value={formData?.postalCode || ""}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4">
            <div className="w-full">
              <label>
                <h1 className="text-base ml-2">City</h1>
                <input
                  className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  type="text"
                  name="city"
                  value={formData?.city || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="w-full">
              <label>
                <h1 className="text-base ml-2">State</h1>
                <input
                  className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  type="text"
                  name="state"
                  value={formData?.state || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4">
            <div className="w-full">
              <label className="text-base ml-1">
                Country
                <input
                  className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  type="text"
                  name="country"
                  value={formData?.country || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="w-full">
              <label className="">
                <h1 className="text-base ml-1">Street</h1>
                <input
                  className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  type="text"
                  name="street"
                  value={formData?.street || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4">
            <div className="w-full">
              <label>
                <h1 className="text-base ml-1">Pet Friendly</h1>
                <input
                  className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  type="text"
                  name="pet"
                  value={formData?.pet || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="w-full">
              <label>
                <h1 className="text-base ml-1">Party Friendly</h1>
                <input
                  className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  type="text"
                  name="party"
                  value={formData?.party || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4">
            <div className="w-full">
              <label>
                <h1 className="text-base ml-1">Cooking</h1>
                <input
                  className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  type="text"
                  name="cooking"
                  value={formData?.cooking || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="w-full">
              <label>
                <h1 className="ml-1 text-base">Smoking</h1>
                <input
                  className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                  type="text"
                  name="smoking"
                  value={formData?.smoking || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="  gap-x-2 flex items-center">
              <h1 className="text-base ml-1">Is Live </h1>
              <input
                type="checkbox"
                name="isLive"
                checked={formData.isLive || false}
                onChange={handleChange}
                className="rounded-full cursor-pointer text-base"
              />
            </label>
          </div>
          <h1 className="text-base ml-1">Access Portions data below </h1>
          {Array.from({
            length: numberOfPortions,
          }).map((item, index) => {
            return (
              <div className=" " key={index}>
                <h1
                  className="w-full cursor-pointer flex items-center outline-none border-neutral-200  bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border-dashed hover:border-DangerColor/40"
                  onClick={() =>
                    setIsPortionOpen((prev) => {
                      const newIsPortionOpen = [...prev];
                      newIsPortionOpen[index] = !newIsPortionOpen[index];
                      return newIsPortionOpen;
                    })
                  }
                >
                  Portion {index + 1}
                  {isPortionOpen[index] ? (
                    <MdArrowDropDown className="text-xl" />
                  ) : (
                    <MdArrowRight className="text-xl" />
                  )}
                </h1>
                {isPortionOpen[index] && (
                  <div className=" ">
                    <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4mt-4">
                      <label
                        className="text-base ml-1 w-full"
                        htmlFor="portionName"
                      >
                        Portion&apos;s Name
                        <input
                          className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="text"
                          name="cooking"
                          value={formData?.portionName?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.portionName?.splice(
                              index,
                              1,
                              e.target.value
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>
                      <label
                        className="text-base ml-1 w-full "
                        htmlFor="guests"
                      >
                        Number Of Guests
                        <input
                          className=" block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="guests"
                          value={formData?.guests?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.guests?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>
                    </div>

                    <div className="flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0   gap-x-4 mt-4 ">
                      <label className="w-full ml-1" htmlFor="bedrooms">
                        Number Of Bedrooms
                        <input
                          className=" block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="bedrooms"
                          value={formData?.bedrooms?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.bedrooms?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>

                      <label className="text-base w-full ml-1" htmlFor="beds">
                        Number Of Beds
                        <input
                          className=" block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="beds"
                          value={formData?.beds?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.beds?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>

                      <label
                        className="text-base w-full ml-1"
                        htmlFor="bathroom"
                      >
                        Number Of Bathrooms
                        <input
                          className=" block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="bathroom"
                          value={formData?.bathroom?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.bathroom?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>
                    </div>

                    <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0   gap-x-4 mt-4">
                      <label
                        className="text-base ml-1 w-full"
                        htmlFor="kitchen"
                      >
                        Number Of Kitchen
                        <input
                          className=" block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="kitchen"
                          value={formData?.kitchen?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.kitchen?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>
                      <label
                        className="text-base ml-1 w-full"
                        htmlFor="childrenAge"
                      >
                        Children&apos;s Age
                        <input
                          className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="childrenAge"
                          value={formData?.childrenAge?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.childrenAge?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>
                      <label
                        className="text-base ml-1 w-full"
                        htmlFor="basePrice"
                      >
                        Base Price Of Portion {index + 1}
                        <input
                          className=" block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="basePrice"
                          value={formData?.basePrice?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.basePrice?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>
                    </div>
                    <div className="flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0   gap-x-4 mt-4">
                      <label
                        className="text-base ml-1 w-full"
                        htmlFor="weekendPrice"
                      >
                        Weekend Price Of Portion {index + 1}
                        <input
                          className=" block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="weekendPrice"
                          value={formData?.weekendPrice?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.weekendPrice?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>
                      <label
                        className="text-base ml-1 w-full"
                        htmlFor="monthlyDiscount"
                      >
                        Monthly Discount For Portion {index + 1}
                        <input
                          className=" block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                          type="number"
                          name="monthlyDiscount"
                          value={formData?.monthlyDiscount?.at(index) || ""}
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            newFormData?.monthlyDiscount?.splice(
                              index,
                              1,
                              parseInt(e.target.value)
                            );
                            setFormData(newFormData);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="ml-1 mt-4">
          <button
            type="submit"
            className=" text-base bg-DangerColor text-white px-6 py-2 rounded-2xl"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPropertyPage;
