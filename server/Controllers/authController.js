import { userModel } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup
export const Signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, address } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already in use", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
      address: address || "", // ✅ optional
    });

    await newUser.save();

    const jwtToken = jwt.sign(
      {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(201).json({
      message: "Signup successful",
      success: true,
      token: jwtToken,
     
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};


// Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const jwtToken = jwt.sign(
      {
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      token: jwtToken,
      user: {
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        address: existingUser.address || "",
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
