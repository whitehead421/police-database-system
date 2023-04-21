import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
import officerRoutes from "./routes/officers.js";
import authRoutes from "./routes/auth.js";
import raporRoutes from "./routes/rapors.js";
import announcementRoutes from "./routes/announcements.js";
import licenseRoutes from "./routes/licenses.js";
import wantedRoutes from "./routes/wanteds.js";
import messageRoutes from "./routes/messages.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();
console.clear();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/officers", officerRoutes);
app.use("/api/reports", raporRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/licenses", licenseRoutes);
app.use("/api/wanteds", wantedRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static("dist"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      minPoolSize: 100,
      maxPoolSize: 1000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from mongoDB.");
});

mongoose.connection.on("reconnected", () => {
  console.log("Connected to mongoDB.");
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
  connectMongo();
});
