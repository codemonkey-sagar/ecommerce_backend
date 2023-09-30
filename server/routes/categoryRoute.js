import express from "express";
import { createCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController, deleteCategoryController } from "../controllers/categoryController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const categoryRouter = express.Router();

categoryRouter.post("/", isLoggedIn, createCategoryController);

categoryRouter.get("/", getAllCategoryController);
categoryRouter.get("/:id", getSingleCategoryController);

categoryRouter.put("/:id/update", updateCategoryController);

categoryRouter.delete("/:id/delete", deleteCategoryController);

export default categoryRouter;