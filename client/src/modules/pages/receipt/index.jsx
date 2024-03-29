import { useContext, useState } from "react";
import { CheckoutContext } from "../../contexts/checkoutContext";
import { getReceiptApi } from "../../api";
import ReceiptButton from "../../components/CustomButton";
import { Link } from "react-router-dom";

const Receipt = () => {
  const { response = {} } = useContext(CheckoutContext);
  const [showError, setShowError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDownloadReceipt = async () => {
    setIsDisabled(true);
    const abortController = new AbortController();
    try {
      setShowError(false);
      if (response?.success) {
        await getReceiptApi(response.filename);
        abortController.abort();
      } else {
        throw new Error("Error getting receipts");
      }
    } catch (error) {
      console.log(error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl py-2 font-medium">Receipt</h1>
      {showError && (
        <p className="text-red-600">Error occured while getting the receipt.</p>
      )}
      {response?.success ? (
        <>
          <p className="text-center">
            Thank you for for shopping with us! Here is your receipt:
          </p>
          <div className="w-56">
            <ReceiptButton
              onClick={handleDownloadReceipt}
              type={"button"}
              text={"Download Receipt"}
              disabled={isDisabled}
            />
            <Link to={"/shop"}>
              <ReceiptButton text={"Shop again"} type={"button"} />
            </Link>
          </div>
        </>
      ) : (
        <>
          <p>Sorry...receipt unavailable.</p>
          <Link to={"/shop"}>
            <ReceiptButton text={"Start Shopping"} type={"button"} />
          </Link>
        </>
      )}
    </div>
  );
};

export default Receipt;
