"use client";
import React, { useEffect, useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaHouseUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import CheckAnimation from "@/components/ChelAnimation/CheckAnimation";

const Step10 = ({ nextStep, prevStep, id }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [propertyLive, setPropertyLive] = useState();

  const clearLocalStorage = () => {
    localStorage.removeItem("page1");
    localStorage.removeItem("page2");
    localStorage.removeItem("page3");
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

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const user = await axios.post("/api/user/profile", { userId: id[0] });
        if (user) {
          console.log("user data", user.data.data.email);
          setEmail(user.data.data.email);
        }
      } catch (error) {
        console.log(error);
        console.log('error in Fetching User');
      }
    };
    fetchuser();
  }, []);

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
        userId: id[0],
      };
      setCombinedData(combinedData);
      return combinedData;
    };

    fetchDataFromLocalStorage();
  }, []);

  const [propertyId, setPropertyId] = useState();
  const [propertyVSID, setPropertyVSID] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [plan, setPlan] = useState("12 months");
  const [hostedOn, setHostedOn] = useState(["VacationSaga"]);
  const [checked, setChecked] = useState(true);


  const handleSelectCheckbox = (e) => {
    const fieldName = e.target.name;

    if (hostedOn.includes(fieldName)) {
      const index = hostedOn.indexOf(fieldName);
      const newArray = [...hostedOn];

      newArray.splice(index, 1);

      setHostedOn(newArray);

      if (newArray.length >= 1) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } else {
      const newArray = [...hostedOn];
      newArray.push(fieldName);

      setHostedOn(newArray);

      if (newArray.length >= 1) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  };

  const handleGoLive = async () => {
    const data = {
      userId: id[0],
      email: email,
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

      plan: plan,
      hostedOn: hostedOn,

      isLive: true,
    };

    try {
      const response = await axios.post("/api/addproperty", data);

      if (response.data.VSID) {
        setIsModal(false);
        setPropertyLive(true);
      } else {
        alert("Property live failed");
      }
      clearLocalStorage();
      setPropertyId(response.data._id);
      setPropertyVSID(response.data.VSID);
    } catch (error) {
      alert.error("User must be logged in to go live");
      throw error;
    }
  };

  const pricingModal = () => {
    return (
      <>
        <div className=" fixed top-0 right-0 bottom-0 left-0 bg-black/80 bg-opacity-50 z-50">
          <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-800 rounded-xl dark:bg-slate-900">
            <div className="flex flex-wrap max-w-lg p-2">
              <h2 className=" w-full text-xl font-medium underline p-2">
                Select Plan
              </h2>
              {["12 months", "18 months", "24 months"].map((field) => (
                <div className=" flex gap-4 p-2 w-1/3" key={field}>
                  <label
                    htmlFor={field}
                    id={field}
                    className=" w-4/5"
                  >
                    {field}
                  </label>
                  <div className=" w-1/5">
                    {" "}
                    <input
                      type="radio"
                      id={field}
                      value={plan}
                      name="plan"
                      onChange={(e) => setPlan(e.target.id)}
                      defaultChecked={field === "12 months"}
                      className=" cursor-pointer w-4 h-4 border border-neutral-700"
                    />
                  </div>
                </div>
              ))}
              <h2 className=" w-full text-xl font-medium underline p-2">
                Select Websites to host on
              </h2>
              {["VacationSaga", "HolidaySera"].map((website, index) => (
                <div className=" flex gap-2 p-2 w-1/3" key={index}>
                  <label htmlFor={website} className=" w-4/5">
                    {website}
                  </label>
                  <div className=" w-1/5">
                    <input
                      type="checkbox"
                      name={website}
                      onChange={(e) => handleSelectCheckbox(e)}
                      defaultChecked={website === "VacationSaga"}
                      className=" cursor-pointer w-4 h-4 border border-neutral-700"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex justify-between items-center">
              <button onClick={handleGoLive} disabled={!checked} className=" disabled:opacity-50 disabled:cursor-not-allowed bg-PrimaryColor p-2 rounded-xl w-1/3 my-4 mx-auto text-white dark:text-white hover:font-medium hover:bg-TextColor">
                Submit
              </button>
              <button
                onClick={() => setIsModal(false)}
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
    <>
      <h1>Step 10</h1>
      <div className="flex flex-col gap-12">
        <div>
          <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Excellent, congratulations on completing the listing, it is waiting
            to be reviewed for publication
          </span>
        </div>
        <div className="border border-PrimaryColor p-2 rounded-2xl w-80">
          <div className="   rounded-xl pb-2">
            <div className="  flex justify-center items-center overflow-hidden">
              <img
                src={propertyCoverFileUrl || "/dummyimage.png"}
                alt="coverImage"
                className="card-img-top rounded-xl object-cover"
              />
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
            {/* <hr className="w-16 border-gray-600 border-2 my-2" /> */}
            <div className="mt-1 font-medium text-xl ml-2">
              {basePrice > 0 && <div>€ {basePrice} /night</div>}
            </div>
          </div>

          <div className="flex mt-4  justify-between items-center">
            <div>
              {propertyVSID && (
                <Link
                  target="_blank"
                  href={{
                    pathname:
                      "https://www.vacationsaga.com/listing-stay-detail",
                    query: {
                      id: propertyId,
                    },
                  }}
                >
                  <button className=" flex gap-x-2 items-center rounded-2xl bg-PrimaryColor text-white dark:text-white  px-4 py-2">
                    Preview
                    <CiLocationArrow1 className="text-2xl " />
                  </button>
                </Link>
              )}
            </div>

            {propertyLive ? (
              <>
                <CheckAnimation
                  message="Your property is now live!"
                  show={propertyLive}
                />
              </>
            ) : (
              <></>
            )}

            <div>
              <button
                className=" flex gap-x-2 items-center rounded-2xl bg-PrimaryColor text-white dark:text-white  px-4 py-2"
                onClick={() => setIsModal(true)}
                disabled={!email}
              >
                Go Live
                <CiLocationArrow1 className="text-2xl " />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-4 items-center gap-x-4">
        <button
          className="max-w-[200px] w-full mt-10 text-white dark:text-white bg-PrimaryColor hover:bg-PrimaryColor/90 focus:ring-4 focus:ring-PrimaryColor/50 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          onClick={prevStep}
        >
          Back
        </button>
      </div>
      {isModal && pricingModal()}
    </>
  );
};

export default Step10;
