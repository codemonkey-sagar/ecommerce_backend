import dotenv from "dotenv";
import express from "express";

import dbConnect from "../config/dbConnect.js";
import usersRoute from "../routes/usersRoute.js";
import productsRoute from "../routes/productsRoute.js"
import { globalErrorHandler, notFound } from "../middleware/globalErrorHandler.js";

dotenv.config({
  path: "./server/.env"
});

// Database Connectection
dbConnect();

const app = express();

// Pass incomming data
app.use(express.json());

// Routes
app.use("/api/v1/users/", usersRoute);
app.use("/api/v1/products/", productsRoute);

// Error middleware
app.use(notFound);
app.use(globalErrorHandler);

export default app;