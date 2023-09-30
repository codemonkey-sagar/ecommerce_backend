import expressAsyncHandler from "express-async-handler";
import Brand from "../models/Brand.js";


// @desc      Create new Brand
// @route     POST /api/v1/brand
// @access    Private/admin

export const createBrandController = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  // Brand Exists 
  const brandFound = await Brand.findOne({ name });

  if (brandFound) {
    throw new Error("Brand already Exists");
  }

  // Create Brand
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "Success",
    message: "Brand Created Successfully",
    brand,
  });

});


// @desc      Get all Brand
// @route     GET /api/v1/brand
// @access    Public

export const getAllBrandController = expressAsyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.json({
    status: "Success",
    message: "All brands are fetched",
    brands
  });
});


// @desc      Get single Brand
// @route     GET /api/v1/brand/:id
// @access    Public

export const getSingleBrandController = expressAsyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  res.json({
    status: "Success",
    message: "Single Brand are fetched",
    brand
  });
});


// @desc      Update Brand
// @route     PUT /api/v1/brand/:id
// @access    Private/admin

export const updateBrandController = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  // Update 
  const brand = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });

  res.json({
    status: "Success",
    message: "Brand Updated Successfully",
    brand
  })
});


// @desc      Delete Brand
// @route     Delete /api/v1/brand/:id
// @access    Private/admin

export const deleteBrandController = expressAsyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);

  res.json({
    status: "Success",
    message: "Brand Deleted Successfully",
  })
});