"use client";
import axios from "axios";
import React, { useState } from "react";

const page = ({ params }) => {

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleInputChange = (e, name) => {

    switch(name){
      case "name":
        setName(e.target.value.trim());
        break;
      case "nationality":
        setNationality(e.target.value.trim());
        break;
      case "gender":
        setGender(e.target.value.trim());
        break;
      case "phone":
        setPhone(e.target.value.trim());
        break;
      case "address":
        setAddress(e.target.value.trim());
        break;
    }

  }

  const editDetails = async () => {
    const response = await axios.post(`/api/users/editUser/${params.id}`, {
      name,
      nationality,
      gender,
      phone,
      address
    });
  }

  return (
    <div className=" h-full w-full">
      <h1>{params.id}</h1>

      <div>
        <div className=" flex gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className=" p-2 rounded-xl border border-gray-600 dark:border-white dark:bg-transparent"
            onChange={(e) => handleInputChange(e, name)}
          />
        </div>
        <div>
          <label htmlFor="Nationality">Nationality</label>
          <input
            type="text"
            name="Nationality"
            className=" p-2 rounded-xl border border-gray-600 dark:border-white dark:bg-transparent"
            onChange={(e) => handleInputChange(e, name)}
          />
        </div>
        <div>
          <label htmlFor="Gender">Gender</label>
          <input
            type="text"
            name="Gender"
            className=" p-2 rounded-xl border border-gray-600 dark:border-white dark:bg-transparent"
            onChange={(e) => handleInputChange(e, name)}
          />
        </div>
        <div>
          <label htmlFor="Phone">Phone</label>
          <input
            type="text"
            name="Phone"
            className=" p-2 rounded-xl border border-gray-600 dark:border-white dark:bg-transparent"
            onChange={(e) => handleInputChange(e, name)}
          />
        </div>
        <div>
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            name="Address"
            className=" p-2 rounded-xl border border-gray-600 dark:border-white dark:bg-transparent"
            onChange={(e) => handleInputChange(e, name)}
          />
        </div>
      </div>

    <button className=" px-4 py-2 bg-PrimaryColor dark:bg-green-500 dark:text-white rounded-xl">
      Apply Changes
    </button>

    </div>
  );
};

export default page;
