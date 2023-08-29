import { logError } from "@/common/logError";
import { isError, isString } from "@/utility";
import { showNotification } from "@mantine/notifications";

export const showNotificationError =
  (title: string, message?: string) => (error?: unknown) => {
    const errorMessage = isString(message)
      ? message
      : isError(error)
      ? error.message
      : isString(error)
      ? error
      : "Unknown error";

    showNotification({ color: "red", title, message: errorMessage });
    logError(error, title);
  };
