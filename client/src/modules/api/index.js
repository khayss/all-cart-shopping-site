import axios, { AxiosError } from "axios";
const axiosServer = axios.create({ baseURL: "http://localhost:3000/api/v1" });

export const getProductsApi = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    if (response) {
      return response;
    } else {
      return "error fetching products";
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    } else {
      return "error fetching products";
    }
  }
};

export const createReceiptApi = async (payload) => {
  try {
    const response = await axiosServer.post("/create-receipt", payload, {
      withCredentials: true,
    });
    if (response) {
      return response;
    } else {
      return "error getting receipt";
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    } else {
      return "error creating receipt";
    }
  }
};

export const getReceiptApi = async (urlParams) => {
  try {
    const response = await axiosServer.get(`/get-receipt/${urlParams}`, {
      responseType: "blob",
      headers: { "Content-Type": "application/json" },
    });
    if (response) {
      return response;
    } else {
      throw new Error("server did not respond");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    } else {
      return "error getting receipt";
    }
  }
};
