process.env.NODE_ENV = process.env.NODE_ENV || "test";
process.env.PORT = process.env.PORT || "5001";
process.env.MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gaza-market-test";
process.env.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
process.env.CORS_ORIGINS = process.env.CORS_ORIGINS || "http://localhost:5173";
process.env.JWT_SECRET =
  process.env.JWT_SECRET || "test-only-jwt-secret-key-with-32-chars+";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
process.env.BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || "10";
process.env.RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || "900000";
process.env.RATE_LIMIT_MAX_REQUESTS = process.env.RATE_LIMIT_MAX_REQUESTS || "1000";
process.env.COOKIE_NAME = process.env.COOKIE_NAME || "token";
process.env.COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || "";
process.env.TRUST_PROXY = process.env.TRUST_PROXY || "1";
