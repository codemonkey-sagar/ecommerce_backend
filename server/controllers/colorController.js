import expressAsyncHandler from "express-async-handler";
import Color from "../models/Color.js";


// @desc      Create new Color
// @route     POST /api/v1/Color
// @access    Private/admin

export const createColorController = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  // Color Exists 
  const colorFound = await Color.findOne({ name });

  if (colorFound) {
    throw new Error("Color already Exists");
  }

  // Create Color
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "Success",
    message: "Color Created Successfully",
    color,
  });

});


// @desc      Get all Color
// @route     GET /api/v1/color
// @access    Public

export const getAllColorController = expressAsyncHandler(async (req, res) => {
  const colors = await Color.find();

  res.json({
    status: "Success",
    message: "All Color are fetched",
    colors
  });
});


// @desc      Get single Color
// @route     GET /api/v1/color/:id
// @access    Public

export const getSingleColorController = expressAsyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  res.json({
    status: "Success",
    message: "Single Color are fetched",
    color
  });
});


// @desc      Update Color
// @route     PUT /api/v1/color/:id
// @access    Private/admin

export const updateColorController = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  // Update 
  const color = await Color.findByIdAndUpdate(req.params.id, { name }, { new: true });

  res.json({
    status: "Success",
    message: "Color Updated Successfully",
    color
  })
});


// @desc      Delete Color
// @route     Delete /api/v1/color/:id
// @access    Private/admin

export const deleteColorController = expressAsyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);

  res.json({
    status: "Success",
    message: "Color Deleted Successfully",
  })
});