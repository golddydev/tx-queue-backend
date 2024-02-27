export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // for app config
      PORT: string;
      NODE_ENV: string;
      LOG_DIR: string;

      // redis
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
    }
  }
}
