import { useQuery } from "@tanstack/react-query";
import { getOrder, getOrders } from "./ordersApi";

export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ["Orders"],
    queryFn: getOrders,
    staleTime: 10 * 1000,
  });
};

export const useOrderQuery = (id) => {
  return useQuery({
    queryKey: ["Order", id],
    queryFn: () => getOrder(id),
  });
};
