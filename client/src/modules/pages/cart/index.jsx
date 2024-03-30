import { useContext } from "react";
import { CartContext, CartDispatchContext } from "../../contexts/cartContext";
import CartItem from "./components/CartItem";
import CartButton from "../../components/CustomButton";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/formatNumber";

const Cart = () => {
  const {
    cartState: { id: itemsId, items },
    totalAmount,
  } = useContext(CartContext);
  const { cartDispatch } = useContext(CartDispatchContext);

  const handleQuantityChange = (e, id, type) => {
    cartDispatch({ type, payload: { e, id } });
  };

  const handleIncrementDecrement = (type, id) => {
    cartDispatch({ type, payload: id });
  };

  const handleDeleteFromCart = (id) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="md:border-b-2 md:border-gray-200 pt-4">
      <h1 className="text-xl font-semibold px-4 py-2">Items in your cart</h1>
      <div className="md:flex md:gap-x-2 px-4 md:border-t-2 pt-4">
        <div className="md:w-2/3">
          {!Array.isArray(itemsId) || itemsId.length < 1 ? (
            <div className="py-4 w-full text-center flex flex-col items-center justify-center gap-y-1">
              <h1>No Items in cart yet!</h1>
              <Link to={"/shop"}>
                <CartButton text={"Start shopping"} />
              </Link>
            </div>
          ) : (
            itemsId.map((itemId) => {
              return (
                <CartItem
                  key={items[itemId].id}
                  title={items[itemId].title}
                  price={numberWithCommas(items[itemId].price)}
                  quantity={items[itemId].quantity}
                  thumbnail={items[itemId].thumbnail}
                  description={items[itemId].description}
                  productId={items[itemId].id}
                  totalPrice={numberWithCommas(
                    items[itemId].price * items[itemId].quantity
                  )}
                  onQuantityChange={(e) =>
                    handleQuantityChange(e, items[itemId].id, "ON_CHANGE")
                  }
                  onAddBtnClick={() =>
                    handleIncrementDecrement("INCREASE", items[itemId].id)
                  }
                  onMinusBtnClick={() =>
                    handleIncrementDecrement("DECREASE", items[itemId].id)
                  }
                  onBlur={(e) =>
                    handleQuantityChange(e, items[itemId].id, "ON_BLUR")
                  }
                  onDeleteBtnClick={() => {
                    handleDeleteFromCart(items[itemId].id);
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
          <Link to={itemsId && itemsId.length > 0 ? "/checkout" : null}>
            <CartButton
              text={
                itemsId && itemsId.length > 0
                  ? "Checkout"
                  : "No Items to Checkout"
              }
              disabled={itemsId && itemsId.length > 0 ? false : true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
