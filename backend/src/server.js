import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { app } from "./app.js";

let httpServer;

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (httpServer) {
    await new Promise((resolve, reject) => {
      httpServer.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  await mongoose.connection.close();
  process.exit(0);
};

const startServer = async () => {
  await connectDB();

  httpServer = app.listen(env.PORT, () => {
    console.log("Backend running on http://localhost:" + env.PORT);
  });

  process.on("SIGINT", () => {
    shutdown("SIGINT").catch((error) => {
      console.error("Graceful shutdown failed:", error.message);
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    shutdown("SIGTERM").catch((error) => {
      console.error("Graceful shutdown failed:", error.message);
      process.exit(1);
    });
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
