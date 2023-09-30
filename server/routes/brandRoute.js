import express from "express";
import { createBrandController, deleteBrandController, getAllBrandController, getSingleBrandController, updateBrandController } from "../controllers/brandController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const brandRouter = express.Router();

brandRouter.post("/", isLoggedIn, createBrandController);

brandRouter.get("/", getAllBrandController);
brandRouter.get("/:id", getSingleBrandController);

brandRouter.put("/:id/update", updateBrandController);

brandRouter.delete("/:id/delete", deleteBrandController);

export default brandRouter;