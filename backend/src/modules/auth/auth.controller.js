import { User } from "../../models/user.model.js";
import { clearAuthCookie, setAuthCookie, signAccessToken } from "../../utils/token.js";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  updateUserActiveStatus,
} from "./auth.service.js";

export const register = async (req, res) => {
  const user = await registerUser(req.body);
  const token = signAccessToken(user.id);

  setAuthCookie(res, token);

  res.status(201).json({
    success: true,
    token,
    user,
  });
};

export const login = async (req, res) => {
  const user = await loginUser(req.body);
  const token = signAccessToken(user.id);

  setAuthCookie(res, token);

  res.status(200).json({
    success: true,
    token,
    user,
  });
};

export const me = async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = async (_req, res) => {
  clearAuthCookie(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const listUsers = async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  const data = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  }));

  res.status(200).json({ success: true, users: data });
};

export const patchUserStatus = async (req, res) => {
  const user = await updateUserActiveStatus(req.params.userId, req.body.isActive);
  res.status(200).json({ success: true, user });
};
