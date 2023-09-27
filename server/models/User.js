import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  }
})

// Create a user model using the schema
const User = mongoose.model("User", userSchema);

export default User;