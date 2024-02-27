import express, { Express, Response } from "express";

// import router
import appRoute from "@/routes/index.route";

// import middlewares
import cors from "cors";
import {
  unknown as unknownMiddleware,
  error as errorMiddleware,
} from "./middlewares/index.middleware";

// import utils
import httpStatus from "http-status";

const app: Express = express();

// install middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }),
);

// install routers
app.get("/", (_, res: Response) => {
  res.status(httpStatus.OK).json({
    message: "Tx queue backend is running",
  });
});

app.use("/api", appRoute);

// unknown middleware
app.use(unknownMiddleware);

// error middleware
app.use(errorMiddleware);

export default app;
