import { config } from "dotenv";
config();

export const port = parseInt(process.env.PORT) || 5000;
export const environment = process.env.NODE_ENV || "development";

// this is for log directory
export const logDirectory = process.env.LOG_DIR;

export const blockfrostApiKey = "preprodPZskIjFBbPqps1BlYMUYxCNs6BJMEx6d";
