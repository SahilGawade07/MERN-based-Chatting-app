import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Cookie received:", req.cookies);
    console.log("JWT token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized, please login",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({
        message: "Not authorized, please login",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
