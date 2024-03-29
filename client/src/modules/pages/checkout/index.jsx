import { useContext, useEffect, useReducer, useState } from "react";
import CheckoutInput from "../../components/CustomInput";
import { initialState, stateReducer } from "./utils/stateReducer";
import { CheckoutContext } from "../../contexts/checkoutContext";
import { CartContext } from "../../contexts/cartContext";
import CheckoutList from "./components/CheckoutList";
import CheckoutButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/formatNumber";

const Checkout = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [isDisabled, setIsDisabled] = useState(true);

  const { cart, totalAmount } = useContext(CartContext);
  const { setcheckoutDetails } = useContext(CheckoutContext);
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setcheckoutDetails(state);
    navigate("/pay");
  };
  useEffect(() => {
    if (
      state.firstname?.trim().length > 2 &&
      state.lastname?.trim().length > 2 &&
      state.city?.trim().length > 2 &&
      state.address?.length > 4 &&
      state.tel?.length >= 10
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    return () => {};
  }, [state]);
  return (
    <div className="w-full px-4">
      <h1 className="text-center text-xl font-semibold py-4">Checkout</h1>
      <div className="px-4">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-center px-8 py-6 bg-gray-200 rounded-md"
        >
          <h1 className="font-medium text-lg">Enter your info.</h1>
          {isDisabled &&
          (state.firstname?.trim().length > 0 ||
            state.lastname?.trim().length > 0 ||
            state.city?.trim().length > 0 ||
            state.address?.length > 0 ||
            state.tel?.length > 0) ? (
            <p className="text-red-500">Please fill in all fields correctly</p>
          ) : null}
          <div className="w-full py-0">
            <CheckoutInput
              required={true}
              label="Firstname"
              type="text"
              id="firstname"
              name="firstname"
              value={state.firstname}
              onChange={(e) =>
                dispatch({ payload: e.target.value, type: "FIRSTNAME" })
              }
            />
            <CheckoutInput
              required={true}
              label="Lastname"
              type="text"
              id="lastname"
              name="lastname"
              value={state.lastname}
              onChange={(e) =>
                dispatch({ payload: e.target.value, type: "LASTNAME" })
              }
            />
          </div>
          <div className="w-full py-0">
            <CheckoutInput
              required={true}
              label="Email"
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={(e) =>
                dispatch({ payload: e.target.value, type: "EMAIL" })
              }
            />
            <CheckoutInput
              required={true}
              label="Address"
              type="text"
              id="address"
              name="address"
              value={state.address}
              onChange={(e) =>
                dispatch({ payload: e.target.value, type: "ADDRESS" })
              }
            />
            <CheckoutInput
              required={true}
              label="Phone Number"
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={state.tel}
              onChange={(e) =>
                dispatch({ payload: e.target.value, type: "TEL" })
              }
            />
            <CheckoutInput
              required={true}
              label="City"
              type="text"
              id="City"
              name="city"
              value={state.city}
              onChange={(e) =>
                dispatch({ payload: e.target.value, type: "CITY" })
              }
            />
          </div>
          <CheckoutButton text={"PROCEED TO PAY"} disabled={isDisabled} />
        </form>
        <div className="flex flex-col my-6 items-center justify-center px-8 py-6 bg-gray-200 rounded-md">
          <h1 className="text-center text-lg font-medium">Items List</h1>
          <CheckoutList
            serialNum={"S/N"}
            price={"Price"}
            quantity={"Quantity"}
            title={"Title"}
            totalPetItem={"Item Total"}
          />
          {cart?.map((item, index) => (
            <CheckoutList
              key={item.id}
              serialNum={index + 1}
              price={`$${numberWithCommas(+item.price)}`}
              quantity={item.quantity}
              title={item.title}
              totalPetItem={`$${numberWithCommas(
                +item.quantity * +item.price
              )}`}
            />
          ))}
          <p className="text-center text-xl font-medium">
            Total: ${numberWithCommas(totalAmount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
