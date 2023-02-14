import { usePosts } from "@/features/posts/hooks/usePosts";
import { useEffect } from "react";

export const usePostsEffect = () => {
  const { isLoading, fetchPosts } = usePosts();
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return { isLoading, fetchPosts };
};
