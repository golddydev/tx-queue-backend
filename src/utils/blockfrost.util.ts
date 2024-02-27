import { BlockFrostAPI } from "@blockfrost/blockfrost-js";

// import config
import { app as appConfig } from "@/configs/index.config";

export const isTxHashOnChain: (txHash: string) => Promise<boolean> = async (
  txHash,
) => {
  try {
    const API = new BlockFrostAPI({
      projectId: appConfig.blockfrostApiKey,
      network: "preprod",
    });
    const tx = await API.txs(txHash);
    return tx.hash != "";
  } catch (_) {
    return false;
  }
};
