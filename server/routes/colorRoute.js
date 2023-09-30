import express from "express";
import { createColorController, deleteColorController, getAllColorController, getSingleColorController, updateColorController } from "../controllers/colorController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, createColorController);

colorRouter.get("/", getAllColorController);
colorRouter.get("/:id", getSingleColorController);

colorRouter.put("/:id/update", updateColorController);

colorRouter.delete("/:id/delete", deleteColorController);

export default colorRouter;