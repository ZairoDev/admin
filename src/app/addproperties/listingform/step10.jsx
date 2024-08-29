"use client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaHouseUser } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

const Step10 = ({ nextStep, prevStep }) => {

  const clearLocalStorage = () => {
    localStorage.removeItem("page1");
    localStorage.removeItem("page2");
    localStorage.removeItem("page3");
    localStorage.removeItem("page4");
    localStorage.removeItem("page5");
    localStorage.removeItem("page6");
    localStorage.removeItem("page8");
    localStorage.removeItem("page9");
    localStorage.removeItem("propertyCoverFileUrl");
    localStorage.removeItem("propertyPictureUrls");
    localStorage.removeItem("portionCoverFileUrls");
    localStorage.removeItem("portionPictureUrls");
    localStorage.removeItem("isImages");
    localStorage.removeItem("isPortionPictures");
    localStorage.removeItem("isPropertyPictures");
  };

  const [propertyCoverFileUrl, setPropertyCoverFileUrl] = useState(() => {
    const savedPage = localStorage.getItem("propertyCoverFileUrl") || "";
    return savedPage || "";
  });

  const [page3, setPage3] = useState(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (savedPage) {
      return JSON.parse(savedPage);
    }
    return {};
  });

  const [page2, setPage2] = useState(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (savedPage) {
      return JSON.parse(savedPage);
    }
    return {};
  });

  const [basePrice, setBasePrice] = useState(() => {
    const saved = localStorage.getItem("page8");
    if (!saved) {
      return 0;
    }
    const value = JSON.parse(saved);
    return parseInt(value.basePrice[0]) || 0;
  });

  const [combinedData, setCombinedData] = useState({});

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const page1 = JSON.parse(localStorage.getItem("page1") || "{}");
      const page2 = JSON.parse(localStorage.getItem("page2") || "{}");
      const page3 = JSON.parse(localStorage.getItem("page3") || "{}");
      const page4 = JSON.parse(localStorage.getItem("page4") || "[{}, {}, {}]");
      const page5 = JSON.parse(localStorage.getItem("page5") || "{}");
      const page6 = JSON.parse(localStorage.getItem("page6") || "{}");
      const page8 = JSON.parse(localStorage.getItem("page8") || "{}");
      const page9 = JSON.parse(localStorage.getItem("page9") || "{}");

      const propertyPictureUrls = JSON.parse(
        localStorage.getItem("propertyPictureUrls") || "[]"
      );
      const portionCoverFileUrls = JSON.parse(
        localStorage.getItem("portionCoverFileUrls") || "[]"
      );
      const portionPictureUrls = JSON.parse(
        localStorage.getItem("portionPictureUrls") || "[[]]"
      );

      const combinedData = {
        ...page1,
        ...page2,
        ...page3,
        ...page4,
        ...page5,
        ...page6,
        ...page8,
        ...page9,
        propertyCoverFileUrl,
        propertyPictureUrls,
        portionCoverFileUrls,
        portionPictureUrls,
        userId: user?._id,
      };
      setCombinedData(combinedData);
      return combinedData;
    };

    fetchDataFromLocalStorage();
  }, [user, propertyCoverFileUrl]);

  const [propertyId, setPropertyId] = useState();
  const [propertyVSID, setPropertyVSID] = useState();

  const handleGoLive = async () => {
    const data = {
      userId: user?._id,
      email: user?.email,
      propertyType: combinedData.propertyType,
      placeName: combinedData.placeName,
      rentalForm: combinedData.rentalForm,
      numberOfPortions: combinedData.numberOfPortions,

      street: combinedData.street,
      postalCode: combinedData.postalCode,
      city: combinedData.city,
      state: combinedData.state,
      country: combinedData.country,
      center: combinedData.center,

      portionName: combinedData.portionName,
      portionSize: combinedData.portionSize,
      guests: combinedData.guests,
      bedrooms: combinedData.bedrooms,
      beds: combinedData.beds,
      bathroom: combinedData.bathroom,
      kitchen: combinedData.kitchen,
      childrenAge: combinedData.childrenAge,

      basePrice: combinedData.basePrice,
      weekendPrice: combinedData.weekendPrice,
      weeklyDiscount: combinedData.weeklyDiscount,
      currency: combinedData.currency,

      generalAmenities: combinedData.generalAmenities,
      otherAmenities: combinedData.otherAmenities,
      safeAmenities: combinedData.safeAmenities,

      smoking: combinedData.smoking,
      pet: combinedData.pet,
      party: combinedData.party,
      cooking: combinedData.cooking,
      additionalRules: combinedData.additionalRules,

      reviews: combinedData.reviews,

      propertyCoverFileUrl: combinedData.propertyCoverFileUrl,
      propertyPictureUrls: combinedData.propertyPictureUrls,
      portionCoverFileUrls: combinedData.portionCoverFileUrls,
      portionPictureUrls: combinedData.portionPictureUrls,

      night: combinedData.night,
      time: combinedData.time,
      datesPerPortion: combinedData.datesPerPortion,

      rentalType: combinedData.rentalType,
      basePriceLongTerm: combinedData.basePriceLongTerm,
      monthlyDiscount: combinedData.monthlyDiscount,
      longTermMonths: combinedData.longTermMonths,

      isLive: true,
    };

    try {
      const response = await axios.post("/api/addproperty", data);
      if (data.userId) {
        alert.success("Property is successfully live!");
        clearLocalStorage();
      } else {
        alert.error("User must be logged in to go live");
      }
      setPropertyId(response.data._id);
      setPropertyVSID(response.data.VSID);
    } catch (error) {
      alert.error("User must be logged in to go live");
      throw error;
    }

    const handleNext = () => {
      nextStep();
    };
  };

  return (
    <>
      <div className="flex flex-col gap-12">
        <div>
          <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Excellent, congratulations on completing the listing, it is waiting
            to be reviewed for publication
          </span>
        </div>
        <div>
          <div className="card w-72 border border-gray-600 rounded-xl pb-2">
            <div className="h-72 flex justify-center items-center overflow-hidden">
              {propertyCoverFileUrl ? (
                <img
                  src={propertyCoverFileUrl}
                  alt="coverImage"
                  className="card-img-top rounded-xl object-cover"
                />
              ) : (
                <FaHouseUser className="w-3/4 h-3/4" />
              )}
            </div>
            <div className="card-body mt-2 ml-2">
              <h1 className="mt-2">{page3?.portionName?.[0]}</h1>
            </div>
            <div className="flex gap-2 ml-2 mt-2 items-center">
              {page2?.country && (
                <h6>
                  {page2?.city}, {page2?.country}
                </h6>
              )}
            </div>
            <hr className="w-16 border-gray-600 border-2 my-2" />
            <div className="mt-1 font-medium text-xl ml-2">
              {basePrice > 0 && <div>€ {basePrice} /night</div>}
            </div>
          </div>

          <div className="flex mt-8 w-2/5 justify-around items-center">
            <button
              href={"/add-listing/1"}
              className="dark:bg-slate-700 bg-slate-700 text-white"
            >
              <CiEdit className="h-3 w-3" />
              <span className="ml-3 text-sm">Edit</span>
            </button>

            <div>
              {propertyVSID && (
                <Link
                  href={{
                    pathname: "/listing-stay-detail",
                    query: {
                      id: propertyId,
                    },
                  }}
                >
                  <button className="-p-4">
                    <span className="text-sm">Preview</span>
                  </button>
                </Link>
              )}
            </div>

            <div>
              <button
                className="dark:bg-primary-6000 dark:text-white text-slate-700 bg-orange-400"
                onClick={handleGoLive}
              >
                <span className="text-sm">Go Live</span>
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
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

export default Step10;
