import { showNotificationError } from "@/common/showNotificationError";
import { setPostVotes } from "@/features/posts/postsSlice";
import { PostVote, PostVotes } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { isString } from "@/utility";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { andThen, otherwise, pipe, when } from "ramda";
import { useDispatch } from "react-redux";

const fetchPostVotesFromFirestore =
  (communityId: string) => async (userId: string) => {
    const queryPostVotes = query(
      collection(firestore, "users", `${userId}/postVotes`),
      where("communityId", "==", `${communityId}`),
    );
    return getDocs(queryPostVotes);
  };

const formatPostVotes = (postDocs: QuerySnapshot) =>
  postDocs.docs.reduce(
    (acc, doc) => {
      const { votes, lookUpVoteIdByPostId } = acc;
      const vote = doc.data() as PostVote;
      const postId = vote.postId;
      const voteId = vote.id;
      lookUpVoteIdByPostId[postId] = voteId;
      votes[voteId] = vote;
      return acc;
    },
    { votes: {}, lookUpVoteIdByPostId: {} } as PostVotes,
  );

const errorFetchingPostVotes = showNotificationError(
  "Error fetching post votes",
);

export const useFetchPostVotes = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useEventCallback(async (userId: string) => {
    return when(
      isString,
      pipe(
        fetchPostVotesFromFirestore(router.query.communityId as string),
        andThen(pipe(formatPostVotes, pipe(setPostVotes, dispatch))),
        otherwise(errorFetchingPostVotes),
      ),
    )(userId);
  });
};
