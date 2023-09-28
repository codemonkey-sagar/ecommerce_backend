import express from "express";
import { registerUserController } from "../controllers/userController.js";


const usersRoute = express.Router();

usersRoute.post("/api/v1/users/register", registerUserController);

export default usersRoute;