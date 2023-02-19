import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { delayFn } from "@/utility";
import { useEffect, useReducer } from "react";

const delay500 = (fn: () => void) => delayFn(fn, 500);

export const useFetchPostsOnMount = () => {
  const fetchPosts = useFetchPosts();
  const [isLoading, toggleLoading] = useReducer((s) => !s, true);

  useEffect(() => {
    fetchPosts().then(delay500(toggleLoading));
  }, [fetchPosts]);

  return { isLoading };
};
