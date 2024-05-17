import { useMutation } from "@tanstack/react-query";
import { sendPaymentLink } from "./usersApi";

export const useSendPaymentMutation = () => {
  return useMutation({
    mutationFn: (id) => {
      return () => sendPaymentLink(id);
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
