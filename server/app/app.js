import express from "express";
import dbConnect from "../config/dbConnect.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./server/.env"
});

// Database Connectection
dbConnect();

const app = express();

export default app;