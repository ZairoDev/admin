"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Input from "@mui/material/Input";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "@/components/Pagination/pagination";
import Loader from "@/components/Loader/Loader";
import ProprtyCard from "@/components/Card/Card";

const fetchProperties = async (
  page = 1,
  limit = 20,
  searchTerm = "",
  searchType = "VSID"
) => {
  const response = await axios.get(
    `/api/allproperties?page=${page}&limit=${limit}&searchTerm=${searchTerm}&searchType=${searchType}`
  );
  return response.data;
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
const AllPropertiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("VSID");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data, error, isLoading , isPending , isError  } = useQuery({
    queryKey: ["allProperties", currentPage, debouncedSearchTerm,  searchType],
    queryFn: () =>
      fetchProperties(currentPage, 20, debouncedSearchTerm, searchType),
    staleTime: 1000 * 60 * 5,
  });
  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchTerm(value);
    }, 3000),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setDebouncedSearchTerm(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return `Error fetching properties: ${error.message}`;

  return (
    <div className="">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between">
        <h1 className="font-bold mb-4 sm:text-3xl text-sm">All Properties</h1>
        <div className="flex items-center justify-between sm:justify-normal">
          <form onSubmit={handleSearch} className="mb-4">
            <select
              value={searchType}
              onChange={handleSearchTypeChange}
              className="border border-gray-300 px-4 py-2 mr-2">
              <option value="VSID">VSID</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <Input
              type="text"
              placeholder={`Search by ${searchType}`}
              value={searchTerm}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2"
            />
            <button
              className="bg-PrimaryColor px-4 text-[#ffffff] py-2"
              type="submit"
              variant="outlined">
              Search
            </button>
          </form>
        </div>
      </div>
      {data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {data.data.map((property) => (
            <ProprtyCard
              key={property._id}
              beds={property.beds.length}
              postalCode={property.postalCode}
              country={property.country}
              price={property.basePrice[0]}
              city={property.city}
              VSID={property.VSID}
              coverImage={property.propertyCoverFileUrl}
              placeName={property.placeName}
            />
          ))}
        </div>
      ) : (
        <div className="">
          <p className="text-center mt-10">No property found 😢</p>
        </div>
      )}
      {data && data.data.length > 0 && (
        <div className="flex items-center mt-4 mb-4 justify-center">
          <PaginationComponent
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AllPropertiesPage;
