import { Router } from "express";
import {
  createPoll,
  getPolls,
  votePoll,
  getPollResults,
} from "../controller/pollController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { protectUser } from "../middleware/userAuthMiddleware.js";

const router = Router();

// Admin routes
router.post("/create", protectRoute, createPoll); // Admin creates poll
router.get("/results/:pollId", protectRoute, getPollResults); // Admin views results

// User routes
router.get("/", getPolls); // Users get polls
router.post("/vote", protectUser, votePoll); // Users vote

export default router;
