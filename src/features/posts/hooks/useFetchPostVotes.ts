import { setPostVotes } from "@/features/posts/postsSlice";
import fetchPostVote from "@/features/posts/utility/fetchPostVote";
import { useEventCallback } from "@/hooks/useEventCallback";
import { andThen, otherwise, pipe } from "ramda";
import { useDispatch } from "react-redux";

const {
  fetchPostVotesByCommunityIdAndUserId,
  formatPostVotes,
  errorFetchingPostVotes,
} = fetchPostVote;

export const useFetchPostVotes = () => {
  const dispatch = useDispatch();

  return useEventCallback(async (communityId: string, userId: string) => {
    return pipe(
      fetchPostVotesByCommunityIdAndUserId(communityId),
      andThen(pipe(formatPostVotes, setPostVotes, dispatch)),
      otherwise(errorFetchingPostVotes),
    )(userId);
  });
};
