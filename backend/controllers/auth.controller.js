import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

// Register User
export const registerUser = async (req, res) => {
try {
const { name, email, password } = req.body;


if (!name || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "Please provide name, email and password",
  });
}

const existingUser = await User.findOne({
  email: email.toLowerCase(),
});

if (existingUser) {
  return res.status(409).json({
    success: false,
    message: "User already exists",
  });
}

const hashedPassword = await bcrypt.hash(password, 12);

const newUser = await User.create({
  name,
  email: email.toLowerCase(),
  password: hashedPassword,
});

const token = jwt.sign(
  {
    id: newUser._id,
    email: newUser.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(201).json({
  success: true,
  message: "User registered successfully",
  token,
  user: {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  },
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Login User
export const loginUser = async (req, res) => {
try {
const { email, password } = req.body;


if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "Please provide email and password",
  });
}

const user = await User.findOne({
  email: email.toLowerCase(),
});

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

const isPasswordValid = await bcrypt.compare(
  password,
  user.password
);

if (!isPasswordValid) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
}

const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Get Current User
export const getUserProfile = async (req, res) => {
try {
const user = await User.findById(req.user.id).select("-password");


if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

res.status(200).json({
  success: true,
  user,
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Logout User
export const logoutUser = async (req, res) => {
res.status(200).json({
success: true,
message: "Logged out successfully",
});
};
