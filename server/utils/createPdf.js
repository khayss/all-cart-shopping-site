import fs from "fs";
import puppeteer from "puppeteer";
import { genHtml } from "./htmlGenerator.js";
import path from "path";
import { fileURLToPath } from "url";

export const createPdf = async (cart, checkoutDetails) => {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filename = `${checkoutDetails.firstname}-${
      checkoutDetails.lastname
    }-${checkoutDetails.email}-${Date.now()}-Order-Receipt.pdf`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = genHtml(cart, checkoutDetails);
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.emulateMediaType("screen");

    await page.pdf({
      path: path.resolve(__dirname, "../documents/receipts/" + filename),
      margin: { top: "100px", bottom: "200px", right: "100px", left: "100px" },
      printBackground: true,
      format: "A4",
    });

    await browser.close();

    return { success: true, filename };
  } catch (err) {
    return { success: false };
  }
};
