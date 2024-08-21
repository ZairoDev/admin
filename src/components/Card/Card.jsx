import React from "react";
import { FiEdit } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
const ProprtyCard = ({
  VSID,
  coverImage,
  beds,
  placeName,
  postalCode,
  city,
  country,
  price,
}) => {
  return (
    <div className="  max-w-80  rounded-lg h-[370px] ">
      <div className="">
        <img
          className="w-full h-48 rounded-lg object-cover"
          src={coverImage}
          alt="coverImage"
        />
      </div>
      <div className="p-2 flex flex-col gap-x-2">
        <div className=" flex items-center justify-between">
          <h1 className="font-bold text-xl">VSID: {VSID}</h1>
          <p>{beds} beds</p>
        </div>
        <div>
          {/* <p className="flex items-center ">
            <IoLocationOutline className="text-DangerColor" />
            {postalCode}
          </p> */}
          {/* <p>{city}</p> */}
        </div>
        <div>
          <p className="font-bold border-t  inline-block text-xl mt-4 ">
            €{price}/nights
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-PrimaryColor mt-2">{country}</div>
          <div className="cursor-pointer"><FiEdit/></div>
        </div>
      </div>
    </div>
  );
};

export default ProprtyCard;
