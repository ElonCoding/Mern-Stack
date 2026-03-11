import { register, login } from "../services/authService.js";

export async function registerController(req, res, next) {
  try {
    const result = await register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function loginController(req, res, next) {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function meController(req, res) {
  res.json({ user: req.user });
}
