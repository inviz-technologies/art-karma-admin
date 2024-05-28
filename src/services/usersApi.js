import { api } from "./axiosInstance";

export const getUsers = async () => {
  const { data } = await api.get("/api/v1/users");
  return data?.data?.users;
};

export const getUser = async (id) => {
  const { data } = await api.get(`/api/v1/users/${id}`);
  return data?.data?.user;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/api/v1/users/${id}`);
  return data;
};

export const sendPaymentLink = async (id) => {
  const { data } = await api.post(`/api/v1/users/send-payment-link/${id}`);
  return data;
};

export const confirmAdvancePayment = async (id) => {
  const { data } = await api.patch(`/api/v1/payments/confirm-advance-payment/${{userId: id}}`);
  return data;
};

export const sendLoginCredentials= async (id) => {
  const { data } = await api.post(`/api/v1/users/send-credentials/${id}`);
  return data;
};
