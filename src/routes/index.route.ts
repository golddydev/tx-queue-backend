import express from "express";
const router = express.Router();

// import routes
import mintRoute from "./mint.route";

const mainRoutes = [
  {
    path: "/mints",
    route: mintRoute,
  },
];

mainRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
