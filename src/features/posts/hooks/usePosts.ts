import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { useFetchPosts } from "@/features/posts/hooks/useFetchPosts";
import { useFetchPostVotes } from "@/features/posts/hooks/useFetchPostVotes";
import { selectPosts, selectPostVotes } from "@/features/posts/postsSlice";
import { delayFn, isString } from "@/utility";
import { when } from "ramda";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const delay500 = (fn: () => void) => delayFn(fn, 500);

export const usePosts = () => {
  const user = useSignedInUser();
  const fetchPosts = useFetchPosts();
  const fetchPostVotes = useFetchPostVotes();

  const posts = useSelector(selectPosts);
  const postVotes = useSelector(selectPostVotes);

  const [isLoading, setIsLoading] = useState(true); // Can't be anonymous reducer

  useEffect(() => {
    setIsLoading(true);
    fetchPosts().then(delay500(() => setIsLoading(false)));
  }, [fetchPosts]);

  useEffect(() => {
    when(isString, fetchPostVotes)(user?.uid);
  }, [fetchPostVotes, user]);

  return { isLoading, posts, postVotes };
};
