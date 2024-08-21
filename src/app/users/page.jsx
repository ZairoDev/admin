"use client";
import React, { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useUsers } from "@/Hooks/useUsers";
import { LuLoader2 } from "react-icons/lu";
import UserTable from "@/components/Table/Table";

const page = () => {
  const { data, error, isPending, isSuccess} = useUsers();

  return (
    <div className=" w-full h-screen">
      <h1 className=" font-medium text-3xl">Users</h1>

      {isPending && (
        <div className=" border-2 border-red-600 w-full h-full flex justify-center items-center">
          <LuLoader2 className=" text-7xl animate-spin" />
        </div>
      )}

      {isSuccess && <UserTable data={data.allUsers.filter((_, i) => i<20)} />}
    </div>
  );
};

export default page;
