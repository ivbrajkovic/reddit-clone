import { setPostVotes } from "@/features/posts/postsSlice";
import fetchPostVote from "@/features/posts/utility/fetchPostVote";
import { useEventCallback } from "@/hooks/useEventCallback";
import { isString } from "@/utility";
import { useRouter } from "next/router";
import { andThen, otherwise, pipe, when } from "ramda";
import { useDispatch } from "react-redux";

const {
  fetchPostVotesByCommunityIdAndUserId,
  formatPostVotes,
  errorFetchingPostVotes,
} = fetchPostVote;

export const useFetchPostVotes = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useEventCallback(async (userId: string) => {
    const communityId = router.query.communityId as string;
    return when(
      isString,
      pipe(
        fetchPostVotesByCommunityIdAndUserId(communityId),
        andThen(pipe(formatPostVotes, pipe(setPostVotes, dispatch))),
        otherwise(errorFetchingPostVotes),
      ),
    )(userId);
  });
};
