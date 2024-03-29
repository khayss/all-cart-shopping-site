/* eslint-disable react/prop-types */
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { CartContext } from "../contexts/cartContext";
import { useContext, useEffect, useRef, useState } from "react";
import ReactLogo from "../../assets/react.svg";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { itemsCount } = useContext(CartContext);
  const [showHamburger, SetshowHamburger] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideHamburgerClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        SetshowHamburger(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideHamburgerClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideHamburgerClick);
    };
  }, []);

  return (
    <div className="w-full grid grid-cols-[1fr_3fr] grid-rows-[auto_150px] pt-[60px] min-h-dvh md:grid-cols-[1fr_2fr] md:grid-rows-[auto_120px]">
      <header className="w-full fixed flex items-center bg-gray-200 h-[60px] shadow-md border-b-2 border-gray-300 z-50 top-0 lg:px-[10%] xl:px-[15%]">
        <nav className="w-full px-8 flex items-center h-full">
          <ul className="w-full grid grid-cols-4 grid-rows-1 justify-between h-full items-center">
            <li className="col-start-1 col-end-2 flex justify-start md:hidden md:invisible">
              <div>
                <button
                  className={`${
                    showHamburger ? "invisible hidden" : "visible block"
                  } md:invisible md:hidden`}
                  onClick={() => SetshowHamburger(true)}
                >
                  <MenuIcon />
                </button>
              </div>
            </li>
            <li className="col-start-2 col-end-4 flex justify-center md:col-start-1 md:justify-start">
              <div className="flex items-center justify-center">
                <Link to={"/"} className="flex gap-1 items-end text-xl">
                  <div>
                    <ShoppingBasketIcon />
                  </div>
                  <div>
                    <h1 className="leading-none font-bold italic">AllCart</h1>
                  </div>
                </Link>
              </div>
            </li>
            <li className="flex justify-end col-start-4 col-end-5">
              <div className="relative text-xl">
                <Link to={"/cart"}>
                  <ShoppingCartIcon />
                  <p className="absolute top-0 -right-4 shadow-md z-50 bg-red-600 text-white leading-none rounded-full text-sm py-1 px-1.5">
                    {itemsCount}
                  </p>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <div
        ref={ref}
        className={`fixed top-0 md:top-[60px] w-1/2 md:w-1/3 md:z-40 min-h-dvh z-50 ${
          showHamburger ? "visible" : "invisible"
        } md:visible md:fixed bg-gray-100 border-r-2 border-gray-300 lg:pl-[10%] xl:pl-[15%] md:bg-clip-content`}
      >
        <div
          className={`w-full bg-inherit flex justify-end items-center h-12 pr-2 ${
            showHamburger ? "visible" : "invisible"
          } md:invisible md:hidden`}
        >
          <button
            className="bg-gray-200 rounded-md px-2 h-10"
            onClick={() => SetshowHamburger(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="w-full overflow-hidden md:pl-1">
          <ul className="flex flex-col bg-inherit gap-y-1">
            <li className="w-full bg-white flex items-center h-12 px-4">
              <Link to={"/shop"} className="w-full">
                Products
              </Link>
            </li>
            <li className="w-full bg-white flex items-center h-12 px-4">
              <Link to={"/categories"} className="w-full">
                Categories
              </Link>
            </li>
            <li className="w-full bg-white flex items-center h-12 px-4">
              <Link to={"/track"} className="w-full">
                Track
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative w-full lg:pr-[15%] xl:pr-[22.5%] flex flex-col bg-gray-100 col-start-1 col-end-3 row-start-1 row-end-2 md:col-start-2 md:col-end-2 md:bg-clip-content">
        {children}
      </div>
      <footer className="w-full flex items-center md:z-50 justify-center bg-gray-300 py-4 relative col-span-2 row-start-2 row-end-3 lg:px-[20%] xl:px-[15%]">
        <div className="w-full flex">
          <ul className="w-full flex flex-col md:flex-row md:justify-around items-center gap-2">
            <li>
              <div className="flex gap-1 items-end text-xl">
                <div>
                  <ShoppingBasketIcon />
                </div>
                <div>
                  <h1 className="leading-none font-bold italic">AllCart</h1>
                </div>
              </div>
            </li>
            <li>
              <p className="font-medium text-center">
                &#169; AllCart Inc., {new Date().getUTCFullYear()}
              </p>
              <p className="text-center text-sm">All right reserved.</p>
            </li>
            <li>
              <p className="text-center text-sm flex gap-2 items-center italic">
                <span>Powered by React</span>
                <span>
                  <img src={ReactLogo} style={{ width: "1.5rem" }} />
                </span>
              </p>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
