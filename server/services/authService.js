import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function register({ name, email, password, role = "USER" }) {
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already registered");
    err.status = 400;
    throw err;
  }
  const user = await User.create({ name, email, password, role });
  const secret = process.env.JWT_SECRET || "testsecret";
  const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "7d" });
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 400;
    throw err;
  }
  const match = await user.comparePassword(password);
  if (!match) {
    const err = new Error("Invalid credentials");
    err.status = 400;
    throw err;
  }
  const secret = process.env.JWT_SECRET || "testsecret";
  const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: "7d" });
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
}
