import { useState } from "react";
import { createReceiptApi } from "../api";

export const useCreateReceipt = () => {
  const [response, setResponse] = useState(null);
  const createReceipt = async (payload) => {
    try {
      const response = await createReceiptApi(payload);
      if (response) {
        if (response.status === 201 && response.data) {
          setResponse(response.data);
        } else {
          throw new Error("server returned  an error");
        }
      } else {
        throw new Error("error getting product");
      }
    } catch (error) {
      setResponse({
        success: false,
        message: error.message ? error.message : "something went wrong",
      });
    }
  };
  return { response, createReceipt };
};
