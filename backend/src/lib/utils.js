import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax", // Try 'lax' instead of 'none' or 'strict'
    secure: process.env.NODE_ENV !== "development", // Only use secure in production
    path: "/",
  });
  return token;
};
