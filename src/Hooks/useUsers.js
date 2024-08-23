import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

const fetchAllUsers = async (query) => {
  
  // const response = await axios.get(`/api/users?limit=${20}&skip=${(currentPage - 1) * 20}&currentPage=${currentPage}`);
  const response = await axios.get(`/api/users?currentPage=${currentPage}`);
  console.log(response.data)
  const allUsers = response.data.allUsers;
  const totalUsers = response.data.totalUsers;
  return {allUsers, totalUsers};
};

export function useUsers({currentPage}) {
  return useQuery({
    queryKey: ['users', {currentPage}],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60 * 5,
  })
}
