import { useFetchPost } from "@/features/posts/hooks/useFetchPost";
import { selectPosts, selectPostVotes } from "@/features/posts/postsSlice";
import { delayFn } from "@/utility";
import { useRouter } from "next/router";
import { useEffect, useMemo, useReducer } from "react";
import { useSelector } from "react-redux";

const delay500 = (fn: () => void) => delayFn(fn, 500);

export const usePost = () => {
  const router = useRouter();
  const fetchPost = useFetchPost();

  const posts = useSelector(selectPosts);
  const postVotes = useSelector(selectPostVotes);

  const [isLoading, setIsLoading] = useReducer((s) => !s, !posts.length);

  const postId = router.query.postId as string;

  useEffect(() => {
    if (!postId || posts.length) return;
    fetchPost(postId).then(delay500(setIsLoading));
  }, [fetchPost, postId, posts]);

  const post = useMemo(
    () => posts.find((post) => post.id === postId),
    [postId, posts],
  );

  const postVote = useMemo(() => {
    if (!post) return undefined;
    const voteId = postVotes.lookUpVoteIdByPostId[post.id];
    return postVotes.votes[voteId] ?? undefined;
  }, [postVotes, post]);

  return { isLoading, post, postVote };
};
