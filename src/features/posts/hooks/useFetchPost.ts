import { addPost } from "@/features/posts/postsSlice";
import fetchPost from "@/features/posts/utility/fetchPost";
import { useEventCallback } from "@/hooks/useEventCallback";
import { andThen, otherwise, pipe } from "ramda";
import { useDispatch } from "react-redux";

export const useFetchPost = () => {
  const dispatch = useDispatch();
  return useEventCallback(async (postId: string) => {
    return pipe(
      fetchPost.fetchPostById,
      andThen(pipe(fetchPost.formatPost, addPost, dispatch)),
      otherwise(fetchPost.errorFetchingPost),
    )(postId);
  });
};
