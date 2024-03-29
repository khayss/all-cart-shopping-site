/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useCreateReceipt } from "../hooks/useCreateReceipt";

export const CheckoutContext = createContext(null);

const CheckoutProvider = ({ children }) => {
  const [checkoutDetails, setcheckoutDetails] = useState(null);
  const { createReceipt, response } = useCreateReceipt();
  return (
    <CheckoutContext.Provider
      value={{
        checkoutDetails,
        setcheckoutDetails,
        createReceipt,
        response,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
