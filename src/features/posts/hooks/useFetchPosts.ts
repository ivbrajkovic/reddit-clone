import { showNotificationError } from "@/common/showNotificationError";
import { setPosts } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { andThen, otherwise, pipe } from "ramda";
import { useDispatch } from "react-redux";

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

const getCommunityId = (router: ReturnType<typeof useRouter>) =>
  router.query.communityId as string;

const errorFetchingPosts = showNotificationError("Error fetching posts");

export const useFetchPosts = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useEventCallback(async () => {
    return pipe(
      getCommunityId,
      fetchPostsFromFirestore,
      andThen(pipe(formatPosts, setPosts, dispatch)),
      otherwise(errorFetchingPosts),
    )(router);
  });
};
