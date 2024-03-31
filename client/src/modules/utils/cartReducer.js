export const initialCartState = {
  id: [],
  items: {},
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return state.id.includes(action.payload.id)
        ? {
            id: state.id.filter((item) => item != action.payload.id),
            items: { ...state.items, [action.payload.id]: undefined },
          }
        : {
            id: [...state.id, action.payload.id],
            items: {
              ...state.items,
              [action.payload.id]: {
                ...action.payload,
                quantity: 1,
              },
            },
          };
    case "REMOVE_FROM_CART":
      return state.id.includes(action.payload)
        ? {
            id: state.id.filter((item) => item != action.payload),
            items: { ...state.items, [action.payload]: undefined },
          }
        : state;
    case "ON_CHANGE":
      return state.items[action.payload.id]
        ? {
            ...state,
            items: {
              ...state.items,
              [action.payload.id]: {
                ...state.items[action.payload.id],
                quantity:
                  action.payload.e.target.value === ""
                    ? ""
                    : Math.abs(action.payload.e.target.value),
              },
            },
          }
        : state;
    case "ON_BLUR":
      return state.items[action.payload.id]
        ? {
            ...state,
            items: {
              ...state.items,
              [action.payload.id]: {
                ...state.items[action.payload.id],
                quantity:
                  action.payload.e.target.value == "" ||
                  action.payload.e.target.value == "0"
                    ? 1
                    : action.payload.e.target.value >
                      state.items[action.payload.id].stock
                    ? state.items[action.payload.id].stock
                    : Math.abs(action.payload.e.target.value),
              },
            },
          }
        : state;
    case "INCREASE":
      return state.items[action.payload]
        ? {
            ...state,
            items: {
              ...state.items,
              [action.payload]: {
                ...state.items[action.payload],
                quantity:
                  state.items[action.payload].quantity + 1 >
                  state.items[action.payload].stock
                    ? state.items[action.payload].stock
                    : +state.items[action.payload].quantity + 1,
              },
            },
          }
        : state;
    case "DECREASE":
      return state.items[action.payload]
        ? {
            ...state,
            items: {
              ...state.items,
              [action.payload]: {
                ...state.items[action.payload],
                quantity:
                  state.items[action.payload].quantity - 1 < 1
                    ? 1
                    : +state.items[action.payload].quantity - 1,
              },
            },
          }
        : state;
    case "RESET_CART":
      return initialCartState;
    default:
      return state;
  }
};
