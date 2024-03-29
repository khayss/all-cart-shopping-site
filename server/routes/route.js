import { Router } from "express";
import { createReceipt, getReceipt } from "../controllers/controller.js";

const appRouter = Router();

appRouter
  .post("/create-receipt", createReceipt)
  .get("/get-receipt/:filename", getReceipt);

export { appRouter };
