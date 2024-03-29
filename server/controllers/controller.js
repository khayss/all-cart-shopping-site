import path from "path";
import { catchError } from "../utils/catchError.js";
import { createPdf } from "../utils/createPDF.js";
import fs from "fs";
import { fileURLToPath } from "url";

export const createReceipt = catchError(async (req, res) => {
  console.log(req.body);
  const { cart, checkoutDetails } = req.body;
  if (!cart || !checkoutDetails) throw new Error("Missing data");
  const result = await createPdf(cart, checkoutDetails);
  if (result.success) {
    res.status(201).json({
      message: "File created successfully",
      success: true,
      filename: result.filename,
    });
  } else {
    res
      .status(500)
      .json({ success: false, message: "error generating receipts" });
  }
});

export const getReceipt = catchError(async (req, res) => {
  const { filename } = req.params;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(__dirname, "../documents/receipts/" + filename);
  if (fs.existsSync(filePath)) {
    res.status(200).download(filePath);
  } else {
    res.status(404).json({ message: "File not found", success: false });
  }
});
