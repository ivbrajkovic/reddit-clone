import { showNotificationError } from "@/common/showNotificationError";
import { AppError } from "@/types";
import { isError, isFirebaseError, isString } from "@/utility";
import { FirebaseError } from "firebase/app";
import { useEffect } from "react";

// Firebase error codes:
// https://firebase.google.com/docs/auth/admin/errors

const formatAuthError = (error: FirebaseError) => {
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
    if (!error) return;

    const errorMessage = isFirebaseError(error)
      ? formatAuthError(error)
      : isError(error)
      ? error.message
      : isString(error)
      ? error
      : "Unknown error";

    showNotificationError("Authentication error", errorMessage)(error);
  }, [error]);
};
