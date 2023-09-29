import express from "express";
import { createProductController, deleteProductController, getProductsController, getSingleProductController, updateProductController } from "../controllers/productController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const productsRouter = express.Router();

productsRouter.post("/", isLoggedIn, createProductController);

productsRouter.get("/", getProductsController);
productsRouter.get("/:id", getSingleProductController);

productsRouter.put("/:id/update", isLoggedIn, updateProductController);

productsRouter.delete("/:id/delete", isLoggedIn, deleteProductController);

export default productsRouter;