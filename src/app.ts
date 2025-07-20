import express, { Request, Response } from "express";
import expressSession from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./app/config/passport";

import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";

export const app = express();

app.use(
  expressSession({
    secret: "Your Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to tour management app",
  });
});

app.use(globalErrorHandler);

app.use(notFound);
