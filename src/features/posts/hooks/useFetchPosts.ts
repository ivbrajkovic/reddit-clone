import { showNotificationError } from "@/common/showNotificationError";
import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import {
  selectPosts,
  setPosts,
  setPostVotes,
} from "@/features/posts/postsSlice";
import { Post, PostVote, PostVotes } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { delayFn, isString } from "@/utility";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { andThen, otherwise, pipe, tap, when } from "ramda";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const errorFetchingPosts = showNotificationError("Error fetching posts");
const errorFetchingPostVotes = showNotificationError(
  "Error fetching post votes",
);

// Posts

const fetchPostsFromFirestore = async (communityId: string) => {
  const queryPosts = query(
    collection(firestore, "posts"),
    where("communityId", "==", `${communityId}`),
    orderBy("createdAt", "desc"),
  );
  return getDocs(queryPosts);
};

const formatPosts = (postDocs: QuerySnapshot) =>
  postDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[];

// Post Votes

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

// Community id

const getCommunityId = (router: ReturnType<typeof useRouter>) =>
  router.query.communityId as string;

type UsePostsProps = {
  fetchOnMount?: boolean;
  loadingNotification?: boolean;
};

const delayFn500 = (fn: () => void) => delayFn(fn, 500);

export const useFetchPosts = ({ fetchOnMount = false }: UsePostsProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSignedInUser();
  const posts = useSelector(selectPosts);

  // Needs to be a state because it's start as true
  const [isLoading, setLoading] = useState(true);
  const setLoadingTrue = () => setLoading(true);
  const setLoadingFalse = () => setLoading(false);

  const fetchPostVotes = useEventCallback(() => {
    when(
      isString,
      pipe(
        pipe(getCommunityId, fetchPostVotesFromFirestore)(router),
        andThen(pipe(formatPostVotes, pipe(setPostVotes, dispatch))),
        otherwise(errorFetchingPostVotes),
      ),
    )(user?.uid);
  });

  const fetchPosts = useEventCallback(() => {
    pipe(
      getCommunityId,
      tap(setLoadingTrue),
      fetchPostsFromFirestore,
      andThen(pipe(formatPosts, setPosts, dispatch)),
      andThen(fetchPostVotes),
      otherwise(errorFetchingPosts),
      andThen(delayFn500(setLoadingFalse)),
    )(router);
  });

  useEffect(() => {
    fetchOnMount && fetchPosts();
  }, [fetchPosts, fetchOnMount]);

  return { isLoading, posts, fetchPosts, fetchPostVotes };
};
