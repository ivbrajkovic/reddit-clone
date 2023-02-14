import { showNotificationError } from "@/common/showNotificationError";
import { setPosts } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import {
  collection,
  getDocs,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { andThen, otherwise, pipe } from "ramda";
import { useReducer } from "react";
import { useDispatch } from "react-redux";

const errorFetchingPosts = showNotificationError("Error fetching posts");

const queryPosts = (communityId: string) =>
  query(
    collection(firestore, "posts"),
    where("communityId", "==", `${communityId}`),
    orderBy("createdAt", "desc"),
  );

const getPosts = async (queryPosts: Query) => await getDocs(queryPosts);

const formatPosts = (postDocs: QuerySnapshot) =>
  postDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[];

const fetchPostsFromFirestore = pipe(queryPosts, getPosts);

const getCommunityId = (router: ReturnType<typeof useRouter>) => () =>
  router.query.communityId as string;

export const usePosts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const fetchPosts = useEventCallback(
    pipe(
      toggleLoading,
      getCommunityId(router),
      fetchPostsFromFirestore,
      andThen(
        pipe(
          // pipeLog,
          formatPosts,
          pipe(setPosts, dispatch),
        ),
      ),
      otherwise(errorFetchingPosts),
      toggleLoading,
    ),
  );

  return { isLoading, fetchPosts };
};
