import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a User"],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Review must belong to a Product"],
  },
  message: {
    type: String,
    required: [true, "Please add a message"],
  },
  rating: {
    type: Number,
    required: [true, "Please add rating between 1 to 5"],
    min: 1,
    max: 5,
  }
},
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;