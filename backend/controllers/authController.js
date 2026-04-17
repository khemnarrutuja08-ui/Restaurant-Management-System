import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ================= TOKEN GENERATE =================
const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

// ================= REGISTER USER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= LOGIN USER =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Allow admin login from env credentials through common login endpoint.
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (email === adminEmail && password === adminPassword) {
      generateToken(res, { email, role: "admin" });

      return res.json({
        success: true,
        message: "Admin logged in successfully",
        user: {
          name: "Admin",
          email,
          role: "admin",
        },
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(res, {
      id: user._id,
      role: user.isAdmin ? "admin" : "user",
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.isAdmin ? "admin" : "user",
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= ADMIN LOGIN =================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail || password !== adminPassword) {
      return res.json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Admin logged in successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= LOGOUT =================
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin profile is not available on this route",
      });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= AUTH CHECK =================
export const isAuth = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= ADMIN PROFILE =================
export const getAdminProfile = async (req, res) => {
  try {
    return res.json({
      success: true,
      admin: {
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
};
