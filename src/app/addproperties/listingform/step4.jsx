"use client";
import React, { useEffect, useMemo, useState } from "react";

const Step4 = ({ nextStep, prevStep }) => {
  const savedAmenities = JSON.parse(localStorage.getItem("page4") || "[]");

  const [amenitiesState, setAmenitiesState] = useState(() => {
    const savedPage = localStorage.getItem("page4") || "";
    if (!savedPage) {
      return { key1: {}, key2: {}, key3: {} };
    }
    const value = JSON.parse(savedPage);
    return value || { key1: {}, key2: {}, key3: {} };
  });

  useEffect(() => {
    // console.log(amenitiesState);
    console.log(amenitiesState);
  }, [amenitiesState]);

  const generalAmenities = useMemo(
    () => ({
        Wifi: amenitiesState?.generalAmenities?.Wifi || false,
      Internet: amenitiesState?.generalAmenities?.Internet || false,
      TV: amenitiesState?.generalAmenities?.TV || false,
      "Air conditioning":
        amenitiesState?.generalAmenities?.["Air conditioning"] || false,
      Fan: amenitiesState?.generalAmenities?.Fan || false,
      "Private entrance":
        amenitiesState?.generalAmenities?.["Private entrance"] || false,
      Dryer: amenitiesState?.generalAmenities?.Dryer || false,
      Heater: amenitiesState?.generalAmenities?.Heater || false,
      "Washing machine":
        amenitiesState?.generalAmenities?.["Washing machine"] || false,
      Detergent: amenitiesState?.generalAmenities?.Detergent || false,
      "Clothes dryer":
        amenitiesState?.generalAmenities?.["Clothes dryer"] || false,
      "Baby cot": amenitiesState?.generalAmenities?.["Baby cot"] || false,
      Desk: amenitiesState?.generalAmenities?.Desk || false,
      Fridge: amenitiesState?.generalAmenities?.Fridge || false,
      "Balcony View":
        amenitiesState?.generalAmenities?.["Balcony View"] || false,
      Bathtub: amenitiesState?.generalAmenities?.["Bathtub "] || false,
      Puzzles: amenitiesState?.generalAmenities?.["Puzzles"] || false,
      "Cleaning Products":
        amenitiesState?.generalAmenities?.["Cleaning Products"] || false,
      "Dressing Room":
        amenitiesState?.generalAmenities?.["Dressing Room"] || false,
      "Drying Racks":
        amenitiesState?.generalAmenities?.["Drying Racks"] || false,
      Soundproofing:
        amenitiesState?.generalAmenities?.["Soundproofing"] || false,
      "Smoking Area":
        amenitiesState?.generalAmenities?.["Smoking Area"] || false,
      "Smoking Alarm":
        amenitiesState?.generalAmenities?.["Smoking Alarm"] || false,
      "Living Area": amenitiesState?.generalAmenities?.["Living Area"] || false,
      "Clothes Stand":
        amenitiesState?.generalAmenities?.["Clothes Stand"] || false,
      Bathrobe: amenitiesState?.generalAmenities?.Bathrobe || false,
      Mirror: amenitiesState?.generalAmenities?.Mirror || false,
      "CCTV Common Area":
        amenitiesState?.generalAmenities?.["CCTV Common Area"] || false,
      "CCTV Outside Area":
        amenitiesState?.generalAmenities?.["CCTV Outside Area"] || false,
      Housekeeping: amenitiesState?.generalAmenities?.Housekeeping || false,
      "Electric Grill":
        amenitiesState?.generalAmenities?.["Electric grill"] || false,
      "Free Parking":
        amenitiesState?.generalAmenities?.["Free Parking"] || false,
      Microwave: amenitiesState?.generalAmenities?.Microwave || false,
      "Mosquito net":
        amenitiesState?.generalAmenities?.["Mosquito net"] || false,
      Oven: amenitiesState?.generalAmenities?.Oven || false,
      "Private Bathroom":
        amenitiesState?.generalAmenities?.["Private Bathroom"] || false,
      Slippers: amenitiesState?.generalAmenities?.Slippers || false,
      "Flat TV": amenitiesState?.generalAmenities?.["Flat TV"] || false,
      Shower: amenitiesState?.generalAmenities?.Shower || false,
      "Lunch Area": amenitiesState?.generalAmenities?.["Lunch Area"] || false,
      "channels for Children":
        amenitiesState?.generalAmenities?.["TV channel for Children"] || false,
      "Cooling Fan": amenitiesState?.generalAmenities?.["Cooling Fan"] || false,
      Verandah: amenitiesState?.generalAmenities?.Verandah || false,
      Balcony: amenitiesState?.generalAmenities?.Balcony || false,
      "Mountain View":
        amenitiesState?.generalAmenities?.["Mountain View"] || false,
      "Landmark View":
        amenitiesState?.generalAmenities?.["Landmark View"] || false,
      Iron: amenitiesState?.generalAmenities?.Iron || false,
      "Inner Courtyard View":
        amenitiesState?.generalAmenities?.["Inner Courtyard View"] || false,
      "Coffee Machine":
        amenitiesState?.generalAmenities?.["Coffee Machine"] || false,
      "Hand Sanitizer":
        amenitiesState?.generalAmenities?.["Hand Sanitizer"] || false,
      "Satellite Channels":
        amenitiesState?.generalAmenities?.["Satellite Channels"] || false,
      "Hot Tub/ Jacuzzi":
        amenitiesState?.generalAmenities?.["Hot Tub/ Jacuzzi"] || false,
      "Sun Umbrellas":
        amenitiesState?.generalAmenities?.["Sun Umbrellas"] || false,
      "Beach Front": amenitiesState?.generalAmenities?.["Beach Front"] || false,
      Hypoallergenic: amenitiesState?.generalAmenities?.Hypoallergenic || false,
      "Lake View": amenitiesState?.generalAmenities?.["Lake View"] || false,
    }),
    [savedAmenities]
  );

  const otherAmenities = useMemo(
    () => ({
      Wardrobe: amenitiesState?.otherAmenities?.Wardrobe || false,
      "Cloth hook": amenitiesState?.otherAmenities?.["Cloth hook"] || false,
      "Extra cushion":
        amenitiesState?.otherAmenities?.["Extra cushion"] || false,
      "Gas stove": amenitiesState?.otherAmenities?.["Gas stove"] || false,
      "Toilet paper": amenitiesState?.otherAmenities?.["Toilet paper"] || false,
      "Free toiletries":
        amenitiesState?.otherAmenities?.["Free toiletries"] || false,
      "Makeup table": amenitiesState?.otherAmenities?.["Makeup table"] || false,
      "Hot pot": amenitiesState?.otherAmenities?.["Hot pot"] || false,
      "Bathroom heaters":
        amenitiesState?.otherAmenities?.["Bathroom heaters"] || false,
      Kettle: amenitiesState?.otherAmenities?.Kettle || false,
      Dishwasher: amenitiesState?.otherAmenities?.Dishwasher || false,
      "BBQ grill": amenitiesState?.otherAmenities?.["BBQ grill"] || false,
      Toaster: amenitiesState?.otherAmenities?.Toaster || false,
      Towel: amenitiesState?.otherAmenities?.Towel || false,
      "Dining table": amenitiesState?.otherAmenities?.["Dining table"] || false,
      Airport: amenitiesState?.otherAmenities?.Airport || false,
      ATM: amenitiesState?.otherAmenities?.ATM || false,
      Beach: amenitiesState?.otherAmenities?.Beach || false,
      "City view": amenitiesState?.otherAmenities?.["City view"] || false,
      Terrace: amenitiesState?.otherAmenities?.Terrace || false,
      "Tennis Court": amenitiesState?.otherAmenities?.["Tennis Court"] || false,
      "Game Console": amenitiesState?.otherAmenities?.["Game Console"] || false,
      "Garden View": amenitiesState?.otherAmenities?.["Garden view"] || false,
      "Gas Station": amenitiesState?.otherAmenities?.["Gas Station"] || false,
      Gym: amenitiesState?.otherAmenities?.Gym || false,
      "Luggage Trolley":
        amenitiesState?.otherAmenities?.["Luggage Trolley"] || false,
      "Outdoor Furniture":
        amenitiesState?.otherAmenities?.["Outdoor Furniture"] || false,
      Park: amenitiesState?.otherAmenities?.Park || false,
      "Play Ground": amenitiesState?.otherAmenities?.["Play Ground"] || false,
      Pool: amenitiesState?.otherAmenities?.Pool || false,
      Sauna: amenitiesState?.otherAmenities?.Sauna || false,
      "Room Service": amenitiesState?.otherAmenities?.["Room Service"] || false,
      "Railway Station":
        amenitiesState?.otherAmenities?.["Railway Station"] || false,
      "Seating Area": amenitiesState?.otherAmenities?.["Seating Area"] || false,
      Bidet: amenitiesState?.otherAmenities?.Bidet || false,
      "Socket near the bed":
        amenitiesState?.otherAmenities?.["Socket near the bed"] || false,
      Books: amenitiesState?.otherAmenities?.Books || false,
      "DVD for children":
        amenitiesState?.otherAmenities?.["DVD for children"] || false,
      "Cable Channels":
        amenitiesState?.otherAmenities?.["Cable Channels"] || false,
      "Music for children":
        amenitiesState?.otherAmenities?.["Music for children"] || false,
      "Fire Place": amenitiesState?.otherAmenities?.["Fire Place"] || false,
      "Sofa Bed": amenitiesState?.otherAmenities?.["Sofa Bed"] || false,
      "Latex Mattresses":
        amenitiesState?.otherAmenities?.["Latex Mattresses"] || false,
      "Claw Foot Tub":
        amenitiesState?.otherAmenities?.["Claw Foot Tub"] || false,
      "Hand Held Shower":
        amenitiesState?.otherAmenities?.["Hand Held Shower"] || false,
      Chocolates: amenitiesState?.otherAmenities?.Chocolates || false,
      "Butler Pantry":
        amenitiesState?.otherAmenities?.["Butler Pantry"] || false,
      "Private Bathroom":
        amenitiesState?.otherAmenities?.["Private Bathroom"] || false,
      Slippers: amenitiesState?.otherAmenities?.Slippers || false,
      "Flat TV": amenitiesState?.otherAmenities?.["Flat TV"] || false,
      Shower: amenitiesState?.otherAmenities?.Shower || false,
      "Lunch Area": amenitiesState?.otherAmenities?.["Lunch Area"] || false,
      "channels for Children":
        amenitiesState?.otherAmenities?.["TV channel for Children"] || false,
      "Cooling Fan": amenitiesState?.otherAmenities?.["Cooling Fan"] || false,
      Verandah: amenitiesState?.otherAmenities?.Verandah || false,
      Balcony: amenitiesState?.otherAmenities?.Balcony || false,
      "Mountain View":
        amenitiesState?.otherAmenities?.["Mountain View"] || false,
      "Landmark View":
        amenitiesState?.otherAmenities?.["Landmark View"] || false,
      Iron: amenitiesState?.otherAmenities?.Iron || false,
      "Inner Courtyard View":
        amenitiesState?.otherAmenities?.["Inner Courtyard View"] || false,
      "Coffee Machine":
        amenitiesState?.otherAmenities?.["Coffee Machine"] || false,
      "Hand Sanitizer":
        amenitiesState?.otherAmenities?.["Hand Sanitizer"] || false,
      "Satellite Channels":
        amenitiesState?.otherAmenities?.["Satellite Channels"] || false,
      "Hot Tub/ Jacuzzi":
        amenitiesState?.otherAmenities?.["Hot Tub/ Jacuzzi"] || false,
      "Sun Umbrellas":
        amenitiesState?.otherAmenities?.["Sun Umbrellas"] || false,
      "Beach Front": amenitiesState?.otherAmenities?.["Beach Front"] || false,
      Hypoallergenic: amenitiesState?.otherAmenities?.Hypoallergenic || false,
      "Lake View": amenitiesState?.otherAmenities?.["Lake View"] || false,
    }),
    [savedAmenities]
  );

  const safeAmenities = useMemo(
    () => ({
      "Fire Siren": amenitiesState?.safeAmenities?.["Fire Siren"] || false,
      "Fire extinguisher":
        amenitiesState?.safeAmenities?.["Fire extinguisher"] || false,
      "Antitheft Key":
        amenitiesState?.safeAmenities?.["Antitheft Key"] || false,
      "Safe Vault": amenitiesState?.safeAmenities?.["Safe Vault"] || false,
    }),
    [savedAmenities]
  );

  const initialState = {
    generalAmenities,
    otherAmenities,
    safeAmenities,
  };
  const [amenities, setAmenities] = useState(initialState);

  useEffect(() => {
    const newObj = {
      generalAmenities,
      otherAmenities,
      safeAmenities,
    };
    localStorage.setItem(
      "page4",

      JSON.stringify(newObj)
    );
  }, [
    amenities.generalAmenities,
    amenities.otherAmenities,
    amenities.safeAmenities,
  ]);

  const handleCheckboxChange = (category, item) => {
    if (item) {
      console.log(category, item);
      setAmenities((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [item]: !prevState[category][item],
        },
      }));
    }
  };

  useEffect(() => {
    localStorage.setItem("page4", JSON.stringify(amenities));
  }, [amenities]);

  const handleNext = () => {
    nextStep();
  };

  return (
    <>
      <h1>Step 4</h1>
      <div className="mt-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">General Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(amenities.generalAmenities).map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={amenities.generalAmenities[item]}
                  onChange={() =>
                    handleCheckboxChange("generalAmenities", item)
                  }
                  className=" cursor-pointer h-4 text-PrimaryColor w-4 rounded-xl"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Other Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(amenities.otherAmenities).map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={amenities.otherAmenities[item]}
                  onChange={() => handleCheckboxChange("otherAmenities", item)}
                  className=" cursor-pointer h-4 text-PrimaryColor w-4 rounded-xl"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Safe Amenities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(amenities.safeAmenities).map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={amenities.safeAmenities[item]}
                onChange={() => handleCheckboxChange("safeAmenities", item)}
                className=" cursor-pointer h-4 text-PrimaryColor w-4 rounded-xl"
              />
              <span>{item}</span>
            </label>
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
      </div>
    </>
  );
};

export default Step4;
