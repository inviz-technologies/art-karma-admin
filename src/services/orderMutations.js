import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "./ordersApi";

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteOrder(id), // Correctly call the deleteOrder function
    onMutate: () => {
      console.log("Mutate");
    },
    onError: (error, variables, context) => {
      console.log("Error");
    },
    onSuccess: (data, variables, context) => {
      console.log("Success!");
      // Invalidate and refetch the orders query
      queryClient.invalidateQueries(["Orders"]);
    },
    onSettled: (data, error, variables, context) => {
      console.log("Settled");
    },
  });
};