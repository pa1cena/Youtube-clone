import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoutes from "./routes/auth.js";


const app = express();
app.use(cookieParser())
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log('Connection Failed')
    });
};
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(5000, () => {
  connect();
  console.log("Server listening on Port 5000");
});