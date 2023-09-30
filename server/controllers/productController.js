import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";


// @desc      Create new product
// @route     POST /api/v1/products
// @access    Private/admin

export const createProductController = expressAsyncHandler(async (req, res) => {
  const { name, description, brand, category, sizes, colors, price, totalQuantity } = req.body;

  // Product already Exists 
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product already Exists");
  }

  // Find the category 
  const categoryFound = await Category.findOne({ name: category });

  if (!categoryFound) {
    throw new Error("Category not found, Please create the category or Check the category name");
  }

  // Find the brand 
  const brandFound = await Brand.findOne({ name: brand.toLowerCase() });

  if (!brandFound) {
    throw new Error("Brand not found, Please create the brand or Check the brand name");
  }

  // Create the product 
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQuantity,
  });

  // Push the product into the Category 
  categoryFound.products.push(product._id);

  // Resave 
  await categoryFound.save();

  // Push the product into the Brand 
  brandFound.products.push(product._id);

  // Resave 
  await brandFound.save();

  res.json({
    status: "Success",
    message: "Product Created Successfully",
    product,
  });
});


// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public 

export const getProductsController = expressAsyncHandler(async (req, res) => {
  // query 
  let productQuery = Product.find();

  // Search products by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  };

  // Filter products by brand 
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" }
    })
  }

  // Filter products by category 
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" }
    })
  }

  // Filter products by colors 
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" }
    })
  }

  // Filter products by sizes 
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: "i" }
    })
  }

  // Filter products by price range 
  if (req.query.price) {
    const priceRange = req.query.price.split("-");

    // gte: greater than or equal
    // lte: less than or equal
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] }
    });
  };

  // Pagination Logic
  // i. Page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // ii. Limit 
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  // iii. StartIndex
  const startIndex = (page - 1) * limit;
  // iv. EndIndex
  const endIndex = page * limit;
  // v. Total 
  const total = await Product.countDocuments();

  productQuery = productQuery.skip(startIndex).limit(limit);

  // Paginatin Result 
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  };

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }


  // await the query 
  const products = await productQuery;

  res.json({
    status: "Success",
    total,
    results: products.length,
    pagination,
    message: "Products Fetched Successfully",
    products
  });
});


// @desc      Get single product
// @route     GET /api/v1/products/:id 
// @access    Public

export const getSingleProductController = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error("Product Not Found");
  }
  res.json({
    status: "Success",
    message: "Product Fetched Successfully",
    product
  })
});


// @desc      Update a product 
// @route     PUT /api/v1/products/:id/update
// @access    Private/admin

export const updateProductController = expressAsyncHandler(async (req, res) => {
  const { name, description, brand, category, sizes, colors, user, price, totalQuantity } = req.body;

  const product = await Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQuantity
  }, {
    new: true,
  });

  res.json({
    status: "Success",
    message: "Product Updated Successfully",
    product
  })
});



// @desc      Delete a product
// @route     DELETE /api/v1/products/:id/delete
// @access    Private/admin

export const deleteProductController = expressAsyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  res.json({
    status: "Success",
    message: "Product Deleted Successfully"
  })
});