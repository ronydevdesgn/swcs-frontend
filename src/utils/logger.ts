export const logger = {
  debug: (msg: string, data?: any) => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'dev'
    ) {
      console.log(`[DEBUG] ${msg}`, data);
    }
  },
  error: (msg: string, error?: any) => {
    console.error(`[ERROR] ${msg}`, error);
  },
  warn: (msg: string, data?: any) => {
    console.warn(`[WARN] ${msg}`, data);
  },
  info: (msg: string, data?: any) => {
    console.info(`[INFO] ${msg}`, data);
  },
};
