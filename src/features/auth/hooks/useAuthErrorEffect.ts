import { isAuthError } from "@/common/isAuthError";
import { isError } from "@/common/isError";
import { logError } from "@/common/logError";
import { showNotificationError } from "@/common/showNotificationError";
import { AuthError } from "firebase/auth";
import { always, ifElse, pipe } from "ramda";
import { useEffect } from "react";

// Firebase error codes:
// https://firebase.google.com/docs/auth/admin/errors

// const formatAuthError = (error: AuthError | Error) => {
const formatAuthError = (error: AuthError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
    case "auth/email-already-exists":
      return "Email already in use";
    case "auth/invalid-email":
      return "Invalid email or password";
    case "auth/weak-password":
      return "Weak password";
    case "auth/wrong-password":
      return "Wrong password or password";
    case "auth/user-not-found":
      return "User not found";
    case "auth/popup-closed-by-user":
      return "Popup closed by user";
    default:
      return error.message;
  }
};

// return ifElse(isAuthError, formatError, always(error.message))(error);
// };

const formatError = ifElse(
  isAuthError,
  formatAuthError,
  (error: Error) => error.message,
);

const showAuthError = (errorMessage: string) =>
  showNotificationError("Authentication error", errorMessage);

export const useAuthErrorEffect = (error: AuthError | Error | undefined) => {
  useEffect(() => {
    // ifElse(isError, pipe(logError, showAuthError), always(undefined))(error);
    ifElse(
      isError,
      pipe(logError, formatError, showAuthError),
      always(undefined),
    )(error);
  }, [error]);
};
