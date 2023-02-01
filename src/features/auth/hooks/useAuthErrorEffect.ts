import { showNotificationError } from "@/common/showNotificationError";
import { AuthError } from "firebase/auth";
import { useEffect } from "react";

// Firebase error codes:
// https://firebase.google.com/docs/auth/admin/errors

const formatError = (error: AuthError | Error) => {
  if (!("code" in error)) return error.message;

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

export const useAuthErrorEffect = (error: AuthError | Error | undefined) => {
  useEffect(() => {
    if (!error) return;
    showNotificationError("Authentication error", formatError)(error);
  }, [error]);
};
