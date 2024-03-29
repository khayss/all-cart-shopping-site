export const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  tel: "",
  city: "",
};

export const stateReducer = (state, action) => {
  switch (action.type) {
    case "ADDRESS":
      return { ...state, address: action.payload };
    case "EMAIL":
      return { ...state, email: action.payload };
    case "FIRSTNAME":
      return { ...state, firstname: action.payload };
    case "LASTNAME":
      return { ...state, lastname: action.payload };
    case "TEL":
      return { ...state, tel: action.payload };
    case "CITY":
      return { ...state, city: action.payload };
    case "RESET":
      return initialState;
  }
};
