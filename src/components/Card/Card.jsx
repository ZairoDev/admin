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
    <div className="m-2 w-full sm:w-72  rounded-lg h-auto hover:shadow-lg">
      <div className="relative w-full h-48">
        <img
          className="w-full h-full rounded-t-lg object-cover"
          src={coverImage || image}
          alt={placeName}
        />
      </div>
      <div className="p-4 flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg sm:text-xl">VSID: {VSID}</h1>
          <p className="text-sm sm:text-base">{beds} beds</p>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <p className="flex items-center">
            <IoLocationOutline className="text-DangerColor mr-1" />
            {postalCode}
          </p>
          <p className="line-clamp-1">{city}</p>
        </div>
        <div>
          <p className="font-bold border-t pt-2 text-lg sm:text-xl">
            € {price}/night
          </p>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="text-PrimaryColor">{country}</div>
          <Link href={`/property/${id}`}>
            <div className="cursor-pointer hover:text-PrimaryColor">
              <FiEdit />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProprtyCard;
