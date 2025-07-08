import { Server } from "http";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { envVars } from "./config/env";

let server: Server;

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    // eslint-disable-next-line no-console
    console.log("Connected to DB");
    server = app.listen(envVars.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening to port ${envVars.PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

startServer();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to tour management app",
  });
});

// unhandled rejection error
process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.log("Unhandled rejection detected... Server shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Uncaught Rejection Error
process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("Uncaught Exception detected... Server shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// unhandled rejection error
process.on("SIGTERM", () => {
  // eslint-disable-next-line no-console
  console.log("Sigterm signal recieved... Server shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
