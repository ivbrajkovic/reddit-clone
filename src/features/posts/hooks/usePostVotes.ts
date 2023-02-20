import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { useFetchPostVotes } from "@/features/posts/hooks/useFetchPostVotes";
import { selectPostVotes } from "@/features/posts/postsSlice";
import { isString } from "@/utility";
import { when } from "ramda";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const usePostsVotes = () => {
  const user = useSignedInUser();
  const fetchPostVotes = useFetchPostVotes();
  const postVotes = useSelector(selectPostVotes);

  useEffect(() => {
    when(isString, fetchPostVotes)(user?.uid);
  }, [fetchPostVotes, user]);

  return { postVotes };
};
