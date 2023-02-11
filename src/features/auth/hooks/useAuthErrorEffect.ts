import { showNotificationError } from "@/common/showNotificationError";
import { AppError } from "@/types";
import { isError, isFirebaseError } from "@/utility";
import { when } from "ramda";
import { useEffect } from "react";

// Firebase error codes:
// https://firebase.google.com/docs/auth/admin/errors

const formatAuthError = (error: AppError) => {
  if (!isFirebaseError(error)) return error.message;

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
      return "Unknown authentication error";
  }
};

export const useAuthErrorEffect = (error?: AppError) => {
  useEffect(() => {
    when(
      isError,
      showNotificationError("Authentication error", formatAuthError),
    )(error);
  }, [error]);
};
