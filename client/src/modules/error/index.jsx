/* eslint-disable react/prop-types */
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BackHomeButton from "../components/CustomButton";
import { Link } from "react-router-dom";
const GeneralError = ({ action, buttonText, errorMessage }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-[10rem] leading-none">
        <ErrorOutlineIcon color="error" fontSize="inherit" className="p-0" />
      </div>
      <h1 className="text-xl font-medium">
        {errorMessage ? errorMessage : "Ooops...This page does not exist"}
      </h1>
      <div className="w-52 mt-4">
        <Link to={action ? action : "/"}>
          <BackHomeButton text={buttonText ? buttonText : "Go to HomePage"} />
        </Link>
      </div>
    </div>
  );
};

export default GeneralError;
