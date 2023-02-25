import { CreatePostBar } from "@/components/CreatePostBar";
import PageContent from "@/components/Layout/PageContent";
import { selectAuthUser, selectIsUserFetched } from "@/features/auth/authSlice";
import { selectIsCommunitySnippetsFetched } from "@/features/communities/communitySlice";
import { CommunitySnippet } from "@/features/communities/types";
import { PostList } from "@/features/posts";
import { setPosts } from "@/features/posts/postsSlice";
import {
  errorFetchingPost,
  formatPosts,
} from "@/features/posts/utility/fetchPost";
import { firestore } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { pipe } from "ramda";
import { useCallback, useEffect, useReducer } from "react";
import { useSelector, useStore } from "react-redux";

const getMostPopularPosts = () => {
  const postQuery = query(
    collection(firestore, "posts"),
    orderBy("voteStatus", "desc"),
    limit(10),
  );
  return getDocs(postQuery);
};

const getPostsFromCommunities = (communityIds: string[]) => {
  const postQuery = query(
    collection(firestore, "posts"),
    where("communityId", "in", communityIds),
    orderBy("voteStatus", "desc"),
    limit(10),
  );
  return getDocs(postQuery);
};

const Home = () => {
  const dispatch = useAppDispatch();
  const store = useStore();

  const user = useSelector(selectAuthUser);
  const isUserFetched = useSelector(selectIsUserFetched);
  const isCommunitySnippetsFetched = useSelector(
    selectIsCommunitySnippetsFetched,
  );

  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  type F = <T>(fn: (...args: T[]) => Promise<QuerySnapshot>, args?: T) => void;
  const awaitAndDispatchPosts: F = useCallback(
    (fn: (args: any) => Promise<QuerySnapshot>, args) => {
      toggleLoading();
      fn(args)
        .then(pipe(formatPosts, setPosts, dispatch))
        .catch(errorFetchingPost)
        .finally(toggleLoading);
    },
    [dispatch],
  );

  // const buildNoUserHomeFeed = useCallback(() => {
  //   console.log("buildNoUserHomeFeed **************");

  //   toggleLoading();
  //   getMostPopularPosts()
  //     .then(pipe(formatPosts, setPosts, dispatch))
  //     .catch(errorFetchingPost)
  //     .finally(toggleLoading);
  // }, [dispatch]);

  const buildUserHomeFeed = useCallback(() => {
    console.log("buildUserHomeFeed **************");

    const getCommunitySnippetsFromStore = () =>
      (store.getState() as RootState).communitySlice.communitySnippets;

    const getCommunityIdsFromSnippets = (snippets: CommunitySnippet[]) =>
      communitySnippets.map((c) => c.communityId);

    const communitySnippets = getCommunitySnippetsFromStore();
    if (!communitySnippets.length)
      return awaitAndDispatchPosts(getMostPopularPosts);

    const communityIds = getCommunityIdsFromSnippets(communitySnippets);
    awaitAndDispatchPosts(getPostsFromCommunities, communityIds);
  }, [awaitAndDispatchPosts, store]);

  useEffect(() => {
    isCommunitySnippetsFetched && buildUserHomeFeed();
  }, [buildUserHomeFeed, isCommunitySnippetsFetched, store]);

  const getUserPostVotes = () => {};

  useEffect(() => {
    // !user && isUserFetched && buildNoUserHomeFeed();
    !user && isUserFetched && awaitAndDispatchPosts(getMostPopularPosts);
  }, [awaitAndDispatchPosts, isUserFetched, user]);

  return (
    <PageContent>
      <>
        <CreatePostBar />
        <PostList isHomePage isLoading={isLoading} />
      </>
      <>{/* Recommendations */}</>
    </PageContent>
  );
};

export default Home;
