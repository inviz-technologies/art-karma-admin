import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "./usersApi";

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["Users"],
    queryFn: getUsers,
    staleTime: 10 * 1000,
  });
};

export const useUserQuery = (id) => {
  return useQuery({
    queryKey: ["User", id],
    queryFn: () => getUser(id),
  });
};
