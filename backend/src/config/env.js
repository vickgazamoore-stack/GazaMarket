import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  CORS_ORIGINS: z.string().optional().default(""),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(200),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(8).max(14).default(12),
  COOKIE_NAME: z.string().min(1).default("token"),
  COOKIE_DOMAIN: z.string().optional().default(""),
  TRUST_PROXY: z.coerce.number().int().min(0).default(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
  throw new Error("Invalid environment variables:\n" + issues.join("\n"));
}

export const env = parsed.data;

export const allowedCorsOrigins = [
  ...new Set(
    [env.CLIENT_ORIGIN, ...(env.CORS_ORIGINS ? env.CORS_ORIGINS.split(",") : [])]
      .map((origin) => origin.trim())
      .filter(Boolean),
  ),
];

if (env.NODE_ENV === "production" && allowedCorsOrigins.length === 0) {
  throw new Error("CORS origins must be configured in production");
}
