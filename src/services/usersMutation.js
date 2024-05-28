import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmAdvancePayment, deleteUser, sendLoginCredentials, sendPaymentLink } from "./usersApi";

// export const useSendPaymentMutation = () => {
//   return useMutation({
//     mutationFn: (id) => {
//       return () => sendPaymentLink(id);
//     },
//     onMutate: () => {
//       console.log("Mutate");
//     },

//     onError: (error, variables, context) => {
//       // An error happened!
//       console.log("Error");
//     },
//     onSuccess: (data, variables, context) => {
//       console.log("Success!");
//     },
//     onSettled: (data, error, variables, context) => {
//       // Error or success... doesn't matter!
//       console.log("Settled");
//     },
//   });
// };

export const useSendPaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => sendPaymentLink(id), // Correctly call the deleteOrder function
    onMutate: () => {
      console.log("Mutate");
    },
    onError: (error, variables, context) => {
      console.log("Error");
    },
    onSuccess: (data, variables, context) => {
      console.log("Success!");
      // Invalidate and refetch the orders query
      queryClient.invalidateQueries(["User"]);
    },
    onSettled: (data, error, variables, context) => {
      console.log("Settled");
    },
  });
};

export const useConfirmPaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => confirmAdvancePayment(id), // Correctly call the deleteOrder function
    onMutate: () => {
      console.log("Mutate");
    },
    onError: (error, variables, context) => {
      console.log("Error");
    },
    onSuccess: (data, variables, context) => {
      console.log("Success!");
      // Invalidate and refetch the orders query
      queryClient.invalidateQueries(["User"]);
    },
    onSettled: (data, error, variables, context) => {
      console.log("Settled");
    },
  });
};

export const useSendCredentialsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => sendLoginCredentials(id), // Correctly call the deleteOrder function
    onMutate: () => {
      console.log("Mutate");
    },
    onError: (error, variables, context) => {
      console.log("Error");
    },
    onSuccess: (data, variables, context) => {
      console.log("Success!");
      // Invalidate and refetch the orders query
      queryClient.invalidateQueries(["User"]);
    },
    onSettled: (data, error, variables, context) => {
      console.log("Settled");
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteUser(id), // Correctly call the deleteOrder function
    onMutate: () => {
      console.log("Mutate");
    },
    onError: (error, variables, context) => {
      console.log("Error");
    },
    onSuccess: (data, variables, context) => {
      console.log("Success!");
      // Invalidate and refetch the orders query
      queryClient.invalidateQueries(["Users"]);
    },
    onSettled: (data, error, variables, context) => {
      console.log("Settled");
    },
  });
};
