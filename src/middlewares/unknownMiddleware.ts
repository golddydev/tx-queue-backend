import { Request, Response } from "express";
import httpStatus from "http-status";

const unkonwnMiddleware = (_: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({ message: "Not Found" });
};

export default unkonwnMiddleware;
