import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  }],
  wishLists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "WishList",
  }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hasShippingAddress: {
    type: Boolean,
    default: false,
  },
  shippingAddress: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the 'updatedAt' field whenever a document is updated 
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
})



// Create a User model using the schema
const User = mongoose.model("User", userSchema);

export default User;