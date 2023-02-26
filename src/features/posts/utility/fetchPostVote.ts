import { showNotificationError } from "@/common/showNotificationError";
import { PostVote, PostVotes } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

export const errorFetchingPostVotes = showNotificationError(
  "Error fetching post votes",
);

const fetchPostVotesByCommunityIdAndUserId =
  (communityId: string) => async (userId: string) => {
    const queryPostVotes = query(
      collection(firestore, "users", `${userId}/postVotes`),
      where("communityId", "==", `${communityId}`),
    );
    return getDocs(queryPostVotes);
  };

export const formatPostVotes = (postDocs: QuerySnapshot) =>
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

const fetchPostVote = {
  fetchPostVotesByCommunityIdAndUserId,
  formatPostVotes,
  errorFetchingPostVotes,
};

export default fetchPostVote;
