export const getLocalCart = () => {
  const localCart = localStorage.getItem("userCart");
  if (localCart === null) {
    return null;
  }

  const parsedLocalCart = JSON.parse(localCart);
  if (("id" && "items") in parsedLocalCart) {
    if (
      Array.isArray(parsedLocalCart.id) &&
      typeof parsedLocalCart.items === "object"
    ) {
      return parsedLocalCart;
    }
  }
  return null;
};
