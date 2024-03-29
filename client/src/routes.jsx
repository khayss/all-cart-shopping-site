import { Outlet, createBrowserRouter } from "react-router-dom";
import LandingPage from "./modules/pages/home";
import GeneralError from "./modules/error";
import Shop from "./modules/pages/shop";
import Cart from "./modules/pages/cart";
import Payment from "./modules/pages/payment";
import Checkout from "./modules/pages/checkout";
import Receipt from "./modules/pages/receipt";
import MainLayout from "./modules/layouts/MainLayout.jsx";
import Product from "./modules/pages/product/index.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "product/:id",
        element: <Product />,
        
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/pay",
        element: <Payment />,
      },
      {
        path: "/receipt",
        element: <Receipt />,
      },
      {
        path: "*",
        element: <GeneralError />,
      },
    ],
  },
]);
