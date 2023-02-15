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
import { useEffect, useReducer } from "react";
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

type UsePostsProps = {
  fetchOnMount?: boolean;
  loadingNotification?: boolean;
};

export const useFetchPosts = ({
  fetchOnMount = false,
  loadingNotification = true,
}: UsePostsProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const toggleLoadingNotification = () =>
    loadingNotification && toggleLoading();

  const fetchPosts = useEventCallback(
    pipe(
      toggleLoadingNotification,
      getCommunityId(router),
      fetchPostsFromFirestore,
      andThen(pipe(formatPosts, pipe(setPosts, dispatch))),
      otherwise(errorFetchingPosts),
      toggleLoadingNotification,
    ),
  );

  useEffect(() => {
    fetchOnMount && fetchPosts();
  }, [fetchPosts, fetchOnMount]);

  return { isLoading, fetchPosts };
};