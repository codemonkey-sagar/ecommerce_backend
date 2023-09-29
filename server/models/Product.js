import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    ref: "Category",
    required: true,
  },
  sizes: {
    type: [String],
    enum: ["S", "M", "L", "XL", "XXL", 40],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: [{
    type: String,
    default: "https://via.placeholder.com/150",
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  }],
  price: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  totalSold: {
    type: Number,
    default: 0,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Create a Product model using the Schema
const Product = mongoose.model("Product", ProductSchema);

export default Product;