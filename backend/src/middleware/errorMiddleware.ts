import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
    console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
    success: false,
      message: error.message,
      path: req.originalUrl,
    });
  }

  return res.status(500).json({
    success: false,
    path: req.originalUrl,
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};
