export const logger = {
  debug: (msg: string, data?: any) => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
      console.log(`[DEBUG] ${msg}`, data);
    }
  },
  error: (msg: string, error?: any) => {
    console.error(`[ERROR] ${msg}`, error);
  },
};
