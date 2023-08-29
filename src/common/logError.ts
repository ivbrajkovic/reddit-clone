import { isDevEnv } from "@/utility";

export const logError = (error: unknown, message = "Unknown error") => {
  if (!isDevEnv()) return;
  console.error(`[DEVELOPMENT: ${message}] ->`, error);
};
