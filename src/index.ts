import app from "@/app";

// import config
import { app as appConfig } from "@/configs/index.config";

// import core
import Logger from "@/core/Logger";

app
  .listen(appConfig.port, () => {
    Logger.info(`App is running on PORT ${appConfig.port}.`, {
      meta: "App Start",
    });
  })
  .on("error", (e) => {
    Logger.error(e);
  });
