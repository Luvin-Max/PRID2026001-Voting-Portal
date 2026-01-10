import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { AdminModel } from "../models/AdminModel.js";
import { AppError } from "../middleware/log-error-handler/logemodule.js";

// Admin login function
export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return next(new AppError("Admin not found", 404));
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, token });
  } catch (error) {
    return next(new AppError("Server error", 500));
  }
};

// User login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, fingerprintData } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Simple fingerprint check (in real app, use proper biometric verification)
    if (fingerprintData !== user.fingerprintData) {
      return next(new AppError("Fingerprint verification failed", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.status(200).json({ success: true, token, userId: user._id });
  } catch (error) {
    return next(new AppError("Server error", 500));
  }
};
