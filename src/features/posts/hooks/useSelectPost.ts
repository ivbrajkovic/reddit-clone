import { setSelectedPost } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";

export const useSelectPost = () => {
  const dispatch = useAppDispatch();
  return useEventCallback((postId: Post) => {
    dispatch(setSelectedPost(postId));
  });
};
