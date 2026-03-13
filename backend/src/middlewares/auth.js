import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getTokenFromRequest } from "../utils/token.js";

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findById(decoded.sub);
  if (!user || !user.isActive) {
    throw new ApiError(401, "User not found or inactive");
  }

  req.user = user;
  next();
});

export const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      next(new ApiError(401, "Authentication required"));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new ApiError(403, "You do not have permission for this action"));
      return;
    }

    next();
  };
};
