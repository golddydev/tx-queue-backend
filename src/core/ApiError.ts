import { Response } from "express";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string = "error",
  ) {
    super(message);
  }

  public static handle(apiError: ApiError, res: Response): Response {
    return res.status(apiError.statusCode).json({
      message: apiError.message,
    });
  }
}
