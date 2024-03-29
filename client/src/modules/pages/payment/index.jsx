import { useContext, useEffect, useReducer, useState } from "react";
import CardInput from "../../components/CustomInput";
import { cardStateReducer, initialCardState } from "./utils/cardStateReducer";
import ExpirySelect from "./components/CustomSelect";
import { months, years } from "./utils/monthsAndYears";
import PaymentButton from "../../components/CustomButton";
import { CartContext, SetCartContext } from "../../contexts/cartContext";
import { CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ClearIcon from "@mui/icons-material/Clear";
import { CheckoutContext } from "../../contexts/checkoutContext";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/formatNumber";
import { initialState } from "../checkout/utils/stateReducer";

const Payment = () => {
  const [state, dispatch] = useReducer(cardStateReducer, initialCardState);
  const [isDisabled, setIsDisabled] = useState(true);
  const { totalAmount, cart } = useContext(CartContext);
  const { setCart } = useContext(SetCartContext);
  const { checkoutDetails, setcheckoutDetails, response, createReceipt } =
    useContext(CheckoutContext);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState({
    isSuccess: false,
    showSuccessMessage: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    if (response) localStorage.setItem("receipt", JSON.stringify(response));

    return () => {};
  }, [response]);
  useEffect(() => {
    if (
      checkoutDetails === null ||
      checkoutDetails.firstname === null ||
      checkoutDetails.lastname === null ||
      checkoutDetails.email === null ||
      checkoutDetails.address === null ||
      checkoutDetails.city === null ||
      checkoutDetails.tel === null
    ) {
      navigate("/checkout");
    }
  }, [checkoutDetails, navigate]);
  useEffect(() => {
    if (
      state.cardHolder.trim().length > 3 &&
      state.cardNumber.length > 18 &&
      state.cardCVV.length === 3 &&
      state.expiryMonth !== "--select month--" &&
      state.expiryYear !== "--select year--"
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    return () => {};
  }, [state]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setIsProcessing(true);
    const processPayment = new Promise(function (resolve) {
      setTimeout(() => resolve("Payment Successful!"), 3000);
    });
    processPayment
      .then(() => {
        setShowSuccess(() => {
          return { isSuccess: true, showSuccessMessage: true };
        });
        createReceipt({ cart: { cart, totalAmount }, checkoutDetails }).then(
          () => {
            setCart([]);
            setcheckoutDetails(initialState);
            setTimeout(() => navigate("/receipt"), 2000);
          }
        );
      })

      .catch(() => {
        setShowSuccess(() => {
          return { isSuccess: false, showSuccessMessage: true };
        });
        setIsProcessing(false);
      })
      .finally(() => {
        setIsDisabled(false);
        setIsProcessing(false);
      });
  };

  return (
    <div className="relative px-6">
      {isProcessing && (
        <div className="w-full h-dvh flex flex-col items-center justify-center absolute z-40 inset-0 bg-gray-200 bg-opacity-50">
          <CircularProgress />
          <p>Payment is Processing...</p>
        </div>
      )}
      {showSuccess.isSuccess && showSuccess.showSuccessMessage && (
        <div className="w-full h-dvh flex flex-col items-center justify-center absolute z-50 inset-0 bg-gray-200 bg-opacity-50">
          <div className="text-9xl">
            <CheckCircleIcon fontSize="inherit" color="success" />
          </div>
          <p>Payment Successful</p>
          <div className="absolute z-50 right-10 top-10 bg-gray-400 h-10 w-10 flex justify-center items-center rounded-md">
            <button
              className="text-2xl font-medium text-gray-600"
              onClick={() =>
                setShowSuccess((prev) => {
                  return { ...prev, showSuccessMessage: false };
                })
              }
            >
              <ClearIcon />
            </button>
          </div>
        </div>
      )}
      {!showSuccess.isSuccess && showSuccess.showSuccessMessage && (
        <div className="w-full h-dvh flex flex-col items-center justify-center absolute z-50 inset-0 bg-gray-200 bg-opacity-50">
          <div className="text-9xl">
            <ErrorIcon fontSize="inherit" color="error" />
          </div>
          <p>Payment Failed</p>
          <div className="absolute z-50 right-10 top-10 bg-gray-400 h-10 w-10 flex justify-center items-center rounded-md">
            <button
              className="text-2xl font-medium text-gray-600"
              onClick={() =>
                setShowSuccess((prev) => {
                  return { ...prev, showSuccessMessage: false };
                })
              }
            >
              <ClearIcon />
            </button>
          </div>
        </div>
      )}
      <h1 className="text-xl font-semibold text-center py-4 capitalize">
        Payment
      </h1>
      <form
        className="flex flex-col items-center justify-center px-8 py-6 bg-gray-200 rounded-md"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-lg font-medium text-center py-1">
          You will be paying{" "}
          <span className="font-semibold">
            ${numberWithCommas(totalAmount)}
          </span>{" "}
          for your order
        </h1>
        <p className="text-sm px-10 text-center py-1">
          Kindly enter your card details to proceed with payment
        </p>
        <CardInput
          id={"card-holder"}
          label={"Card Holder"}
          name={"cardHolder"}
          required={true}
          type={"text"}
          value={state.cardHolder}
          onChange={(e) =>
            dispatch({ type: "HOLDERNAME", payload: e.target.value })
          }
        />
        <CardInput
          id={"card-number"}
          label={"Credit Card Number"}
          name={"cardNumber"}
          required={true}
          type={"text"}
          value={state.cardNumber}
          onChange={(e) => {
            dispatch({ type: "CARDNUM", payload: e.target.value });
          }}
        />
        <CardInput
          id={"card-cvv"}
          label={"Card CVV"}
          name={"cardCVV"}
          required={true}
          type={"number"}
          value={state.cardCVV}
          onChange={(e) => dispatch({ type: "CVV", payload: e.target.value })}
        />
        <div className="flex flex-col justify-start w-full mb-2">
          <label className="text-sm">Expiry</label>
          <div className="flex gap-5">
            <ExpirySelect
              options={months}
              name={months}
              onChange={(e) =>
                dispatch({
                  payload: e.target.options[e.target.selectedIndex].value,
                  type: "EXPIRYMONTH",
                })
              }
            />
            <ExpirySelect
              options={years}
              name={years}
              onChange={(e) =>
                dispatch({
                  payload: e.target.options[e.target.selectedIndex].value,
                  type: "EXPIRYYEAR",
                })
              }
            />
          </div>
        </div>
        <PaymentButton text={"PAY"} type={"submit"} disabled={isDisabled} />
      </form>
    </div>
  );
};

export default Payment;
