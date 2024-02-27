import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import httpStatus from "http-status";

// import core
import { ApiError } from "@/core/ApiError";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export default (
    schema: Joi.AnySchema,
    source: ValidationSource = ValidationSource.BODY,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req[source]) {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: "Reqeust body is required!",
        });
      }
      const { error } = schema.validate(req[source]);

      if (!error) {
        return next();
      }

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");

      next(new ApiError(httpStatus.BAD_REQUEST, message));
    } catch (error) {
      next(error);
    }
  };
