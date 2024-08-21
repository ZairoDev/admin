"use client";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "@/components/Pagination/pagination";
import Loader from "@/components/Loader/Loader";
import ProprtyCard from "@/components/Card/Card";


const fetchProperties = async (page = 1, limit = 20) => {
  const response = await axios.get(
    `/api/allproperties?page=${page}&limit=${limit}`
  );
  console.log(response.data);
  

  return response.data;
};

const AllPropertiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["allProperties", currentPage],
    queryFn: () => fetchProperties(currentPage),
  });

  if (isSuccess) {
    console.log(data.length);
  }

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return `Error fetching properties: ${error.message}`;

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">All Properties</h1>
      {data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center  justify-center">
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
        <div>No properties found</div>
      )}
      {data && data.data.length > 0 && (
        <div className="flex items-center mt-4 mb-4  justify-center">
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
