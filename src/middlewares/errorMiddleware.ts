import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

// import core
import { ApiError } from "@/core/ApiError";

const errorMiddleware = (
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  if (error instanceof ApiError) {
    return ApiError.handle(error, res);
  } else {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export default errorMiddleware;
