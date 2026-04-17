import express from "express";
import {
  adminLogin,
  getAdminProfile,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/logout", logoutUser);
authRoutes.get("/profile", protect, getProfile);
authRoutes.get("/admin/me", adminOnly, getAdminProfile);

export default authRoutes;
