import dotenv from "dotenv";
import express from "express";

import dbConnect from "../config/dbConnect.js";
import usersRoute from "../routes/usersRoute.js";

dotenv.config({
  path: "./server/.env"
});

// Database Connectection
dbConnect();

const app = express();

// Pass incomming data
app.use(express.json());

// Routes
app.use("/", usersRoute);

export default app;