export const initialCardState = {
  cardNumber: "",
  cardCVV: "",
  cardHolder: "",
  expiryMonth: "--select month--",
  expiryYear: "--select year--",
};

export const cardStateReducer = (state, action) => {
  switch (action.type) {
    case "CARDNUM": {
      const value = action.payload
        .trim()
        .split("")
        .filter((item) => item !== " ")
        .join("");
      return isNaN(value)
        ? state
        : {
            ...state,
            cardNumber: formatNumber(action.payload),
          };
    }
    case "EXPIRYMONTH":
      return { ...state, expiryMonth: action.payload };
    case "EXPIRYYEAR":
      return { ...state, expiryYear: action.payload };
    case "HOLDERNAME": {
      const value = action.payload.split("");
      const char = value[value.length - 1];
      return char === " " || isNaN(char)
        ? { ...state, cardHolder: action.payload }
        : state;
    }
    case "CVV": {
      const value = action.payload.trim().slice(0, 3);
      return isNaN(value) ? state : { ...state, cardCVV: value };
    }

    default:
      return state;
  }
};

const formatNumber = (number) => {
  const newNumber = number
    .split("")
    .filter((item) => item !== " ")
    .slice(0, 19);

  if (newNumber.length > 4 && newNumber[4] !== " ") newNumber.splice(4, 0, " ");
  if (newNumber.length > 9 && newNumber[9] !== "") newNumber.splice(9, 0, " ");
  if (newNumber.length > 14 && newNumber[14] !== "")
    newNumber.splice(14, 0, " ");
  if (newNumber.length > 19 && newNumber[19] !== "")
    newNumber.splice(19, 0, " ");

  return newNumber.join("");
};
