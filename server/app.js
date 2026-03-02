import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import templeRoutes from "./routes/templeRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import { errorHandler } from "./middleware/error.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/donations", donationRoutes);

app.use(errorHandler);

export default app;
