import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ProductProvider from "./modules/contexts/productContext.jsx";
import CartProvider from "./modules/contexts/cartContext.jsx";
import CheckoutProvider from "./modules/contexts/checkoutContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
