import { Response, NextFunction } from "express";

// import helper
import catchAsync from "@/helpers/catchAsync";

// import core
import { IBodyRequest, IParamsRequest } from "@/core/Request";

// import queue
import { addTxHashJob, getTxHashJobStatus } from "@/queues";

// import types
import {
  GetMintPayload,
  GetMintResponse,
  MintPayload,
  MintResponse,
} from "@/interfaces/mint.interface";
import httpStatus from "http-status";

/**
 * Mint NFT
 * @description Mint Cip68 NFT
 * @url POST `/api/mints`
 */
export const mint = catchAsync(
  async (
    req: IBodyRequest<MintPayload>,
    res: Response<MintResponse>,
    _: NextFunction,
  ) => {
    const { txHash } = req.body;
    await addTxHashJob({
      txHash,
    });
    res.status(httpStatus.OK).json({
      success: true,
    });
  },
);

/**
 * Get Tx Activity Status
 * @description Get Tx Activity Status
 * @url GET `/api/mints/:txHash`
 */
export const get = catchAsync(
  async (
    req: IParamsRequest<GetMintPayload>,
    res: Response<GetMintResponse>,
    _: NextFunction,
  ) => {
    const { txHash } = req.params;
    const status = await getTxHashJobStatus({ txHash });
    res.status(httpStatus.OK).json({
      status,
    });
  },
);
