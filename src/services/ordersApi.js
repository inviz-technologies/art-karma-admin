import { api } from "./axiosInstance";

export const getOrders = async () => {
  const { data } = await api.get("/api/v1/orders");
  return data?.data?.orders;
};

export const getOrder = async (id) => {
  const { data } = await api.get(`/api/v1/orders/${id}`);
  return data?.data?.order;
};


export const deleteOrder = async (id) => {
    const { data } = await api.delete(`/api/v1/orders/${id}`);
    return data;
  };
  