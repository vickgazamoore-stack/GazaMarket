import mongoose from "mongoose";

export const getHealth = (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      service: "gaza-market-backend",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    },
  });
};
