import { Router } from "express";
import { adminLogin, loginUser } from "../controller/authController.js";

const router = Router();

// Admin login route
router.post("/admin/login", adminLogin);
router.post("/login", loginUser);

export default router;
