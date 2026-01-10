import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import Database from "./config/db.js";
import { corsOptions } from "./config/corsOrgine.js";
import "./config/env.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import votingRoutes from "./routes/votingRoute.js";
import { errorHandler } from "./middleware/log-error-handler/logemodule.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", (req, res) => {
  res.send({ success: true, message: "Voting Portal API is running" });
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/voting", votingRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to database
Database();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
