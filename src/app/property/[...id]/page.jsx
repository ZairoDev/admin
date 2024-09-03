"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import { getDataFromToken } from "@/helper/getDataFromToken";

const EditPropertyPage = ({ params }) => {
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [numberOfPortions, setNumberOfPortions] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [changeModalState, setChangeModalState] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [checked, setChecked] = useState(false);

  // ! Fetching Logged in user
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.post("/api/loggedInUser");
        console.log(response.data.data);
        setUser(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLoggedInUser();
  }, []);

  // ! Fetching details of property
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

  // ! Setting prefilled values in input fields
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

    lastUpdates: property?.updates,

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

        hostedFrom: property?.hostedFrom,
        lastUpdatedBy: property?.lastUpdatedBy,
        lastUpdates: property?.lastUpdates,

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
      setLoading(true);

      const newObj = { ...formData };
      if (updates.length >= 1) {
        newObj.lastUpdates = [...newObj.lastUpdates, updates];
      }

      console.log(updates);
      await axios.post("/api/editproperties", {
        propertyId: params.id,
        updatedData: newObj,
        userEmail: user?.email,
      });
      toast.success("Property updated successfully");
      setChangeModalState(false);
      setLoading(false);
      router.push('/allproperties');
    } catch (error) {
      console.error("Error updating property:", error);
      setLoading(false);
    }
  };

  const [isPortionOpen, setIsPortionOpen] = useState(() =>
    Array.from({ length: numberOfPortions }, () => false)
  );

  const editableFields = [
    "PropertyType",
    "PlaceName",
    "RentalType",
    "PostalCode",
    "City",
    "State",
    "Country",
    "Street",
    "Rules",
    "Live",
  ];

  const handleSelectCheckbox = (e) => {

    const fieldName = e.target.name;

    if (updates.includes(fieldName)) {
      const index = updates.indexOf(fieldName);
      const newArray = [...updates];

      newArray.splice(index, 1);

      setUpdates(newArray);

      if (newArray.length >= 1) {
        setChecked(true);
      } else {
        setChecked(false);
      }

    } else {

      const newArray = [...updates];
      newArray.push(fieldName);

      setUpdates(newArray);

      if (newArray.length >= 1) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  };

  const changesModal = () => {
    return (
      <>
        <div className=" fixed top-0 right-0 bottom-0 left-0 bg-black/80 bg-opacity-50 z-50">
          <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-800 rounded-xl dark:bg-slate-800">
            <div className="flex flex-wrap max-w-lg p-2">
              <h2 className=" w-full text-xl font-medium underline p-2">
                Changes in Property
              </h2>
              {editableFields.map((field) => (
                <div className=" flex gap-4 p-2 w-1/3" key={field}>
                  <label htmlFor={field} className=" w-4/5">
                    {field}
                  </label>
                  <div className=" w-1/5">
                    {" "}
                    <input
                      type="checkbox"
                      name={field}
                      onChange={(e) => handleSelectCheckbox(e)}
                      className=" cursor-pointer w-4 h-4 border border-neutral-700"
                    />
                  </div>
                </div>
              ))}
              <h2 className=" w-full text-xl font-medium underline p-2">
                Changes in portion
              </h2>
              {Array.from({ length: numberOfPortions }).map((_, index) => (
                <div className=" flex gap-2 p-2 w-1/3" key={index}>
                  <label htmlFor={index} className=" w-4/5">
                    Portion{index + 1}
                  </label>
                  <div className=" w-1/5">
                    <input
                      type="checkbox"
                      name={`Portion${index + 1}`}
                      onChange={(e) => handleSelectCheckbox(e)}
                      className=" cursor-pointer w-4 h-4 border border-neutral-700"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex justify-between items-center">
              <button
                disabled={!checked}
                onClick={handleSubmit}
                className=" disabled:opacity-50 disabled:cursor-not-allowed bg-PrimaryColor p-2 rounded-xl w-1/3 my-4 mx-auto text-white dark:text-white hover:font-medium hover:bg-TextColor"
              >
                Submit
              </button>
              <button
                onClick={() => setChangeModalState(false)}
                className=" bg-PrimaryColor p-2 rounded-xl w-1/3 my-4 mx-auto text-white dark:text-white hover:font-medium hover:bg-TextColor"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-2 ">
      <h1 className="text-3xl ml-1 ">Edit Property</h1>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-x-2 gap-y-4 mt-4">
          <div className=" flex items-center sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4">
            <div className="w-full">
              <h1 className="text-base ml-1 ">VSID (Can not edit)</h1>
              <input
                className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                className=" custom-input cursor-pointer dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
                type="text"
                name="placeName"
                value={formData?.placeName || ""}
                onChange={handleChange}
              />
            </label>
            <label className="w-full ">
              <h1 className="w-full text-base ml-1">Rental Form</h1>
              <input
                className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                className=" custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                  className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                  className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                  className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                  className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                  className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                  className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                  className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                  className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className=" custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className=" custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className=" custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className=" custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className="custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className=" custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className=" custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
                          className=" custom-input dark:bg-neutral-900  dark:border-neutral-700 dark:text-white"
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
        <div className=" m-4 flex items-center  justify-center">
          {/* <button
            type="submit"
            className={`dark:text-white flex items-center justify-center w-1/2 py-2 px-6 bg-PrimaryColor text-white rounded-2xl ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button> */}
          <div
            onClick={() => setChangeModalState(true)}
            className=" border-2 border-neutral-700 p-2 cursor-pointer"
          >
            click to save
          </div>
        </div>
      </form>
      {changeModalState && changesModal()}
    </div>
  );
};

export default EditPropertyPage;
