import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllUsers = async () => {
  const response = await axios.get("/api/users");
  const allUsers = response.data.allUsers;
  const totalUsers = response.data.totalUsers;
  return {allUsers, totalUsers};
};

export function useUsers() {
  // return useQuery({ queryKey: ["users"], fetchAllUsers });
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  })
}
