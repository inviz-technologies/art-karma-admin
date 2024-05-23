import { useMutation } from "@tanstack/react-query";
import { deleteOrder } from "./ordersApi";

export const useDeletOrderMutation = () => {
  return useMutation({
    mutationFn: (id) => {
      return () => deleteOrder(id);
    },
    onMutate: () => {
      console.log("Mutate");
    },

    onError: (error, variables, context) => {
      // An error happened!
      console.log("Error");
    },
    onSuccess: (data, variables, context) => {
      console.log("Success!");
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      console.log("Settled");
    },
  });
};
