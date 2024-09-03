"use client";
import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { LuLoader2 } from "react-icons/lu";
// import UserTable from "@/components/Table/Table";
import UserTable from "../../components/Table/Table";
import PaginationComponent from "@/components/Pagination/pagination";
import Loader from "@/components/Loader/Loader";
import axios from "axios";
import debounce from "lodash.debounce";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryType, setQueryType] = useState("email");
  const [userInput, setUserInput] = useState("");

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  const handleSelectOption = (e) => {
    setQueryType(e.target.value);
  };

  const fetchAllUsers = async () => {
    // const response = await axios.get(`/api/users?limit=${20}&skip=${(currentPage - 1) * 20}&currentPage=${currentPage}`);
    const response = await axios.get(
      `/api/users/getAllUsers?currentPage=${currentPage}&queryType=${queryType}&userInput=${userInput}`
    );
    const allUsers = response.data.allUsers;
    const totalUsers = response.data.totalUsers;
    return { allUsers, totalUsers };
  };

  // const { data, error, isPending, isSuccess } = useUsers({ currentPage });
  const { data, error, isPending, isSuccess } = useQuery({
    queryKey: ["users", currentPage, queryType, userInput],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData, previousQuery) => previousData,
  });

  const handleInputChange = debounce((e) => {
    setUserInput(e.target.value);
  }, 1500);

  return (
    <div className=" w-full h-screen">
      {/* <div className=" flex-col xl:flex xl:justify-between my-2 lg:justify-between sm:flex-row "> */}
      <div className="sm:flex-row flex-col flex item-center justify-between">
        <div className=" flex gap-4 items-center">
          <h1 className=" font-medium text-3xl text-DarkColor">Users</h1>
          <Link href="/authentication/signup">
            <div className=" bg-PrimaryColor p-2 flex text-white gap-2 rounded-xl items-center">
              <FaPlusCircle className=" text-white" />
              Add User
            </div>
          </Link>
        </div>
        <div className=" flex gap-4 items-center">
          <div>
            <select
              name="queryType"
              id=""
              className=" p-2 border border-slate-700 rounded-xl cursor-pointer"
              onChange={(e) => handleSelectOption(e)}
            >
              <option className=" cursor-pointer" value="email">
                Email
              </option>
              <option className=" cursor-pointer" value="name">
                Name
              </option>
              <option className=" cursor-pointer" value="phone">
                Phone
              </option>
            </select>
          </div>
          <div>
            <input
              type="text"
              className=" p-2 border border-slate-700 rounded-xl"
              placeholder={`Search by ${queryType}`}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button className="  px-4 py-2 rounded-xl bg-PrimaryColor dark:text-white text-white">
              Search
            </button>
          </div>
        </div>
      </div>

      {isPending && <Loader />}

      {isSuccess && (
        <UserTable data={data.allUsers} currentPage={currentPage} />
      )}

      <div className=" w-full flex justify-center py-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={isSuccess && Math.ceil(data.totalUsers / 20)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default page;
