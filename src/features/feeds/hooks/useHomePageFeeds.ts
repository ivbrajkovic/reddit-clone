import { selectUserState } from "@/features/auth/authSlice";
import { selectIsCommunitySnippetsFetched } from "@/features/communities/communitySlice";
import { CommunitySnippet } from "@/features/communities/types";
import {
  selectPosts,
  setPosts,
  setPostVotes,
} from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import {
  errorFetchingPost,
  formatPosts,
} from "@/features/posts/utility/fetchPost";
import {
  errorFetchingPostVotes,
  formatPostVotes,
} from "@/features/posts/utility/fetchPostVote";
import { firestore } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { AnyAction, Store } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { pipe } from "ramda";
import { useCallback, useEffect } from "react";
import { useSelector, useStore } from "react-redux";

const getCommunitySnippetsFromStore = (store: Store<RootState, AnyAction>) =>
  store.getState().communitySlice.communitySnippetsState.communitySnippets;

const getCommunityIdsFromSnippets = (snippets: CommunitySnippet[]) =>
  snippets.map((c) => c.communityId);

const mostPopularPostsQuery = () =>
  query(
    collection(firestore, "posts"),
    orderBy("voteStatus", "desc"),
    limit(10),
  );

const postsFromCommunitiesQuery = (communityIds: string[]) =>
  query(
    collection(firestore, "posts"),
    where("communityId", "in", communityIds),
    orderBy("voteStatus", "desc"),
    limit(10),
  );

const userPostVotesQuery = (userId: string, postIds: string[]) =>
  query(
    collection(firestore, `users/${userId}/postVotes`),
    where("postId", "in", postIds),
  );

const fetchMostPopularPosts = pipe(mostPopularPostsQuery, getDocs);
const fetchPostsFromCommunities = pipe(postsFromCommunitiesQuery, getDocs);
const fetchUserPostVotes = pipe(userPostVotesQuery, getDocs);

export const useHomePageFeeds = () => {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();

  const { isUserFetched, user } = useSelector(selectUserState);
  const posts = useSelector(selectPosts);
  const isCommunitySnippetsFetched = useSelector(
    selectIsCommunitySnippetsFetched,
  );

  const userId = user?.uid;

  // Logged OUT user

  const buildUserLoggedOutHomeFeeds = useCallback(
    () =>
      fetchMostPopularPosts()
        .then(pipe(formatPosts, setPosts, dispatch))
        .catch(errorFetchingPost),
    [dispatch],
  );

  useEffect(() => {
    if (!isUserFetched || userId) return;
    buildUserLoggedOutHomeFeeds();
  }, [buildUserLoggedOutHomeFeeds, isUserFetched, userId]);

  // Logged IN user

  const buildUserLoggedInHomeFeeds = useCallback(
    (communitySnippets: CommunitySnippet[]) => {
      const communityIds = getCommunityIdsFromSnippets(communitySnippets);
      fetchPostsFromCommunities(communityIds)
        .then(pipe(formatPosts, setPosts, dispatch))
        .catch(errorFetchingPost);
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isCommunitySnippetsFetched) return;
    const communitySnippets = getCommunitySnippetsFromStore(store);
    communitySnippets.length
      ? buildUserLoggedInHomeFeeds(communitySnippets)
      : buildUserLoggedOutHomeFeeds();
  }, [
    buildUserLoggedInHomeFeeds,
    buildUserLoggedOutHomeFeeds,
    isCommunitySnippetsFetched,
    store,
  ]);

  // Post votes

  const buildUserPostVotes = useCallback(
    (userId: string, posts: Post[]) => {
      const postIds = posts.map((p) => p.id);
      fetchUserPostVotes(userId, postIds)
        .then(pipe(formatPostVotes, setPostVotes, dispatch))
        .catch(errorFetchingPostVotes);
    },
    [dispatch],
  );

  useEffect(() => {
    if (!userId || !posts.length) return;
    buildUserPostVotes(userId, posts);
  }, [buildUserPostVotes, posts, userId]);
};
