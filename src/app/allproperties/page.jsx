"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "@/components/Pagination/pagination";
import Loader from "@/components/Loader/Loader";
import ProprtyCard from "@/components/Card/Card";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
const fetchProperties = async (
  currentPage,
  limit = 20,
  searchTerm = "",
  searchType = "VSID"
) => {
  const response = await axios.get(
    `/api/allproperties?page=${currentPage}&limit=${limit}&searchTerm=${searchTerm}&searchType=${searchType}`
  );
  return response.data;
};

const AllPropertiesPage = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", currentPage.toString());
  }, [currentPage]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("VSID");

  router.push(
    `/allproperties?page=${currentPage}&limit=20&searchTerm=${searchTerm}&searchType=${searchType}`
  );

  const { data, error, isLoading, isPending, isError, isSuccess } = useQuery({
    queryKey: ["allProperties", currentPage, searchTerm, searchType],
    queryFn: () => fetchProperties(currentPage, 20, searchTerm, searchType),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (window.localStorage != undefined) {
      window.localStorage.setItem("page", currentPage);
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage);
    router.push(
      `/allproperties?page=${currentPage}&limit=20&searchTerm=${
        searchTerm || ""
      }&searchType=${searchType}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleInputChange = debounce((e) => {
    setSearchTerm(e.target.value);
  }, 3000);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };
  const handlePageChange = (number) => {
    setCurrentPage(number);
    router.push(
      `/allproperties?page=${currentPage}&limit=20&searchTerm=${
        searchTerm || ""
      }&searchType=${searchType}`,
      undefined,
      {
        shallow: true,
      }
    );
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
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center gap-x-2"
          >
            <select
              value={searchType}
              onChange={handleSearchTypeChange}
              className="block w-full outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
            >
              <option value="VSID">VSID</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <div className="relative flex items-center justify-center">
              <input
                className="outline-none border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 border"
                placeholder={`Search by ${searchType}`}
                onChange={handleInputChange}
              />
              <IoSearchOutline className="absolute right-6" />
            </div>

            <button
              className="items-center sm:flex hidden text-white dark:text-white justify-center px-6 py-3 darkbg-white bg-PrimaryColor rounded-2xl"
              type="submit"
              variant="outlined"
            >
              Search
            </button>
            <button
              className="flex sm:hidden items-center text-white dark:text-white justify-center px-6 py-3 darkbg-white bg-PrimaryColor rounded-2xl"
              type="submit"
              variant="outlined"
            >
              <IoSearchOutline />
            </button>
          </form>
        </div>
      </div>
      {data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
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
              id={property._id}
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
            currentPage={data.page || 1}
            totalPages={data.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AllPropertiesPage;
