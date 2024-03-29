import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { appRouter } from "./routes/route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", appRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`server listening on port: ${port}`));
