import { Router } from "express";
import {
  registerUser,

  getUserProfile,
} from "../controller/userController.js";
import { protectUser } from "../middleware/userAuthMiddleware.js";

const router = Router();

router.post("/register", registerUser);

router.get("/profile", protectUser, getUserProfile);

export default router;
