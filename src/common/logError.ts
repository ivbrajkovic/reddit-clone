export const logError = (error: Error) => (
  process.env.NODE_ENV === "development" && console.error(error.message), error
);
