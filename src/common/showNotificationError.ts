import { logError } from "@/common/logError";
import { showNotification } from "@mantine/notifications";
import { AuthError } from "firebase/auth";

type E = AuthError | Error;

export const showNotificationError =
  (title: string, message?: string | ((e: E) => string)) => (error: E) => {
    logError(error);

    const errorMessage =
      typeof message === "function"
        ? message(error)
        : typeof message === "string"
        ? message
        : typeof error?.message === "string"
        ? error.message
        : "Unknown error";

    showNotification({
      color: "red",
      title,
      message: errorMessage,
    });
  };
