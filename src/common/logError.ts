export const logError = (error: Error, message?: string) =>
  process.env.NODE_ENV === "development" &&
  console.error(
    `[DEVELOPMENT${message ? " -> " + message : ""}] ->`,
    message ? error.message : error,
  );
