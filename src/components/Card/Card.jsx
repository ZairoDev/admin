import Link from "next/link";
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
  id,
}) => {
  const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMohBeQLYtH8Xg4c94JUBDySkkUnoPR1G5Vg&s";
  return (
    <div className="  max-w-80  rounded-lg h-[370px] ">
      <div className="">
        <img
          className="w-full h-48 rounded-lg object-cover"
          src={coverImage || image}
          alt={placeName}
        />
      </div>
      <div className="p-2 flex flex-col gap-x-2">
        <div className=" flex items-center justify-between">
          <h1 className="font-bold text-xl">VSID: {VSID}</h1>
          <p>{beds} beds</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="flex text-xs items-center ">
            <IoLocationOutline className="text-DangerColor" />
            {postalCode}
          </p>
          <p className="text-xs line-clamp-1">{city}</p>
        </div>
        <div>
          <p className="font-bold border-t  inline-block text-xl mt-4 ">
            € {price}/nights
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-PrimaryColor mt-2">{country}</div>
          <Link href={`/property/${id}`}>
            <div className="cursor-pointer">
              <FiEdit />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProprtyCard;
