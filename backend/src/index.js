import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connect } from "mongoose";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import { frontendURL } from "../../url.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [frontendURL, "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, HOST, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});
