import { selectPosts, setPosts } from "@/features/posts/postsSlice";
import { pipe } from "ramda";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const usePosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const handlers = useMemo(
    () => ({
      onPosts: pipe(setPosts, dispatch),
      onVotePost: () => {
        console.log("onVotePost");
      },
      onSelectedPost: () => {
        console.log("onSelectedPost");
      },
      onDeletePost: () => {
        console.log("onDeletePost");
      },
    }),
    [dispatch],
  );

  return { posts, ...handlers };
};
