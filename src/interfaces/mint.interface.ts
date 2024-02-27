// import types
import { JobState } from "bullmq";

//// ----------------------------------------------- API PAYLOAD & RESPONSE ----------------------------------- //////

// POST `/api/members`
export interface MintPayload {
  txHash: string;
}

export interface MintResponse {
  success: boolean;
}

// GET `/api/members`
export interface GetMintPayload {
  txHash: string;
}

export interface GetMintResponse {
  status: JobState | "unknown";
}

//// ----------------------------------------------- API PAYLOAD & RESPONSE ----------------------------------- //////
