import User from "../models/User.js";

// @desc      Register user
// @route     POST /api/v1/users/register
// @access    Private/Admin 

export const registerUserController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.json({
      message: "User already exists",
    })
  }

  // Hash password

  // Create user 
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  })

  res.status(201).json({
    status: "Success",
    message: "User Registered Successfully",
    data: user,
  });
};

