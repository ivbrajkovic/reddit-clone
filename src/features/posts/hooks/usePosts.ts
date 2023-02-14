import { showNotificationError } from "@/common/showNotificationError";
import { useEventCallback } from "@/hooks/useEventCallback";
import { andThen, otherwise, pipe } from "ramda";
import { useReducer } from "react";

const errorFetchingPosts = showNotificationError("Error fetching posts");

const fetchPostsFromDatabase = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Posts fetched not implemented yet **********************");
    }, 200);
  });
};

export const usePosts = () => {
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const fetchPosts = useEventCallback(
    pipe(
      toggleLoading,
      fetchPostsFromDatabase,
      andThen(console.log),
      otherwise(errorFetchingPosts),
      toggleLoading,
    ),
  );

  return { isLoading, fetchPosts };
};
