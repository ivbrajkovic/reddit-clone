import { setPosts } from "@/features/posts/postsSlice";
import fetchPost from "@/features/posts/utility/fetchPost";
import { useEventCallback } from "@/hooks/useEventCallback";
import { andThen, otherwise, pipe } from "ramda";
import { useDispatch } from "react-redux";

export const useFetchPosts = () => {
  const dispatch = useDispatch();

  return useEventCallback(async (communityId: string) => {
    return pipe(
      fetchPost.fetchPostsByCommunityId,
      andThen(pipe(fetchPost.formatPosts, setPosts, dispatch)),
      otherwise(fetchPost.errorFetchingPost),
    )(communityId);
  });
};
