import { useContext, useEffect } from "react";
import { CartContext, SetCartContext } from "../../contexts/cartContext";
import CartItem from "./components/CartItem";
import CartButton from "../../components/CustomButton";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/formatNumber";

const Cart = () => {
  const { cart, totalAmount } = useContext(CartContext);
  const { setCart } = useContext(SetCartContext);
  useEffect(() => {
    return () => {};
  }, [cart]);

  const handleQuantityChange = (e, id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "onChange"
                  ? e.target.value === ""
                    ? ""
                    : Math.abs(e.target.value)
                  : e.target.value === ""
                  ? 1
                  : e.target.value == 0
                  ? 1
                  : e.target.value > item.stock
                  ? item.stock
                  : Math.abs(e.target.value),
            }
          : { ...item }
      )
    );
  };

  const handleIncrementDecrement = (action, id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "add"
                  ? item.quantity === item.stock
                    ? item.quantity
                    : +item.quantity + 1
                  : action === "minus"
                  ? +item.quantity > 1
                    ? +item.quantity - 1
                    : 1
                  : item.quantity,
            }
          : { ...item }
      )
    );
  };

  const handleDeleteFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="md:border-b-2 md:border-gray-200 pt-4">
      <h1 className="text-xl font-semibold px-4 py-2">Items in your cart</h1>
      <div className="md:flex md:gap-x-2 px-4 md:border-t-2 pt-4">
        <div className="md:w-2/3">
          {!Array.isArray(cart) || cart.length < 1 ? (
            <div className="py-4 w-full text-center flex flex-col items-center justify-center gap-y-1">
              <h1>No Items in cart yet!</h1>
              <Link to={"/shop"}>
                <CartButton text={"Start shopping"} />
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  title={item.title}
                  price={numberWithCommas(item.price)}
                  quantity={item.quantity}
                  thumbnail={item.thumbnail}
                  description={item.description}
                  productId={item.id}
                  totalPrice={numberWithCommas(item.price * item.quantity)}
                  onQuantityChange={(e) =>
                    handleQuantityChange(e, item.id, "onChange")
                  }
                  onAddBtnClick={() => handleIncrementDecrement("add", item.id)}
                  onMinusBtnClick={() =>
                    handleIncrementDecrement("minus", item.id)
                  }
                  onBlur={(e) => handleQuantityChange(e, item.id, "onBlur")}
                  onDeleteBtnClick={() => {
                    handleDeleteFromCart(item.id);
                  }}
                />
              );
            })
          )}
        </div>
        <div className="md:flex-col md:items-center md:justify-start md:w-1/3 md:border-l-2 justify-between px-4 py-2 md:py-0 font-medium">
          <p className="flex justify-between md:flex-col md:items-center text-xl font-semibold">
            <span className="font-medium">Total</span>
            <span>${numberWithCommas(totalAmount)}</span>
          </p>
          <Link to={cart && cart.length > 0 ? "/checkout" : null}>
            <CartButton
              text={
                cart && cart.length > 0 ? "Checkout" : "No Items to Checkout"
              }
              disabled={cart && cart.length > 0 ? false : true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
