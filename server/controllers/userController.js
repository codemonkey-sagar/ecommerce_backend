import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// @desc      Register user
// @route     POST /api/v1/users/register
// @access    Private/Admin 

export const registerUserController = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already Exist")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create user 
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  })

  res.status(201).json({
    status: "Success",
    message: "User Registered Successfully",
    data: user,
  });
});


// @desc      Login user
// @route     POST /api/v1/usrs/login
// @access    Public

export const loginUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user in database by email only 
  const userFound = await User.findOne({
    email,
  });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "Success",
      message: "User logedIn Successfully",
      userFound,
      token: generateToken(userFound?._id),
    })
  } else {
    throw new Error("Invalid Login Credential");
  }
});


// @desc      Get user profile
// @route     GET /api/v1/users/profile
// @access    Private

export const getUserProfileController = expressAsyncHandler(async (req, res) => {
  // Get token from header 
  const token = getTokenFromHeader(req);

  // Verify token 
  const verifiedToken = verifyToken(token);

  res.json({
    message: "Welcome to Profile Page",
  })
});