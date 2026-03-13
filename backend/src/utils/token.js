import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const TOKEN_COOKIE_NAME = env.COOKIE_NAME;

export const signAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

const buildCookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  domain: env.COOKIE_DOMAIN || undefined,
  path: "/",
});

export const setAuthCookie = (res, token) => {
  res.cookie(TOKEN_COOKIE_NAME, token, {
    ...buildCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie(TOKEN_COOKIE_NAME, buildCookieOptions());
};

export const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  return bearerToken || req.cookies?.[TOKEN_COOKIE_NAME] || null;
};
