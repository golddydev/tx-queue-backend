import express from "express";
const router = express.Router();

// import helpers
import validator, { ValidationSource } from "@/helpers/validator";

// import schema
import { mint as mintSchema } from "@/schemas/index.schema";

// import controller
import { mint as mintController } from "@/controllers/index.controller";

/**
 * Add Mint NFT Activity
 * @description Add Mint Cip68 NFT activity
 * @url POST `/api/mints`
 */
router.post("/", validator(mintSchema.mint), mintController.mint);

/**
 * Get Tx Activity Status
 * @description Get Tx Activity Status
 * @url GET `/api/mints/:txHash`
 */
router.get(
  "/:txHash",
  validator(mintSchema.get, ValidationSource.PARAM),
  mintController.get,
);

export default router;
