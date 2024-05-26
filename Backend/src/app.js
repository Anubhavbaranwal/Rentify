import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import { router as UserRouter } from "./Routes/User.routes.js";
import { router as ProductRouter } from "./Routes/property.routes.js";

app.use("/api/user", UserRouter);
app.use("/api/property", ProductRouter);

export { app };