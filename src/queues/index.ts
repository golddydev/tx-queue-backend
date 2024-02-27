import { Job, JobState, Queue, Worker } from "bullmq";

// import config
import { queue as queueConfig } from "@/configs/index.config";

// import core
import Logger from "@/core/Logger";

// import utils
import { blockfrost as blockfrostUtil } from "@/utils/index.util";

// import constant
import { queue as queueConstant } from "@/constants/index.constant";

const queue = new Queue(queueConstant.txQueueName, {
  connection: {
    host: queueConfig.REDIS_HOST,
    port: queueConfig.REDIS_PORT,
    username: queueConfig.REDIS_USERNAME,
    password: queueConfig.REDIS_PASSWORD,
  },
});

const worker = new Worker(
  queueConstant.txQueueName,
  async (job: Job) => {
    const txHash: string = job.data?.txHash || job?.id;
    if (txHash != "") {
      const isOnChain = await blockfrostUtil.isTxHashOnChain(txHash);
      if (!isOnChain) {
        throw new Error("Tx is not on chain or failed.");
      }
    } else {
      throw new Error("Tx Hash is not valid");
    }
  },
  {
    connection: {
      host: queueConfig.REDIS_HOST,
      port: queueConfig.REDIS_PORT,
      username: queueConfig.REDIS_USERNAME,
      password: queueConfig.REDIS_PASSWORD,
    },
  },
);

// worker.on("completed", (job: Job) => {
//   console.log("completed", job.data);
// });
// worker.on("failed", (job: Job) => {
//   console.log("failed", job.data);
// });
// worker.on("stalled", (jobId: string) => {
//   console.log("stalled", jobId);
// });

const addTxHashJob: ({ txHash }: { txHash: string }) => Promise<void> = async ({
  txHash,
}) => {
  try {
    const foundJobState = await queue.getJobState(txHash);
    if (foundJobState == "active") {
      throw new Error("That tx hash is now being processed.");
    } else if (foundJobState == "waiting" || foundJobState == "delayed") {
      throw new Error("That tx hash is on queue.");
    } else if (foundJobState == "unknown" || foundJobState == "failed") {
      await queue.remove(txHash);
      await queue.add(
        txHash,
        { txHash },
        {
          jobId: txHash.toString(),
          attempts: 10,
          delay: 7000,
          backoff: 7000,
          removeOnComplete: {
            age: 300, // 5 min
            count: 500,
          },
          removeOnFail: {
            age: 600, // 10 min
            count: 2000,
          },
        },
      );
    } else {
      throw new Error("Couldn't handle that tx hash");
    }
  } catch (err) {
    Logger.error(err, { meta: "Error on Add Job" });
    throw err;
  }
};

const getTxHashJobStatus: ({
  txHash,
}: {
  txHash: string;
}) => Promise<JobState | "unknown"> = async ({ txHash }) => {
  try {
    const foundJobState = await queue.getJobState(txHash);
    return foundJobState;
  } catch (err) {
    Logger.error(err, { meta: "Error on Get Job" });
    throw err;
  }
};

export { queue, worker, addTxHashJob, getTxHashJobStatus };
