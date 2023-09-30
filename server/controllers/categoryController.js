import expressAsyncHandler from "express-async-handler";
import Category from "../models/Category.js";


// @desc      Create new Category
// @route     POST /api/v1/category
// @access    Private/admin

export const createCategoryController = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  // Category Exists 
  const categoryFound = await Category.findOne({ name });

  if (categoryFound) {
    throw new Error("Category already Exists");
  }

  // Create Category
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "Success",
    message: "Category Created Successfully",
    category,
  });

});


// @desc      Get all Category
// @route     GET /api/v1/category
// @access    Public

export const getAllCategoryController = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json({
    status: "Success",
    message: "All categories are fetched",
    categories
  });
});


// @desc      Get single Category
// @route     GET /api/v1/category/:id
// @access    Public

export const getSingleCategoryController = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.json({
    status: "Success",
    message: "Single Category are fetched",
    category
  });
});


// @desc      Update Category
// @route     PUT /api/v1/category/:id
// @access    Private/admin

export const updateCategoryController = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  // Update 
  const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });

  res.json({
    status: "Success",
    message: "Category Updated Successfully",
    category
  })
});


// @desc      Delete Category
// @route     Delete /api/v1/category/:id
// @access    Private/admin

export const deleteCategoryController = expressAsyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.json({
    status: "Success",
    message: "Category Deleted Successfully",
  })
});