import { showNotificationError } from "@/common/showNotificationError";
import { setPostComments } from "@/features/posts/postsSlice";
import { PostComment } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { pipe } from "ramda";
import { useReducer } from "react";

export const useFetchPostComments = () => {
  const dispatch = useAppDispatch();
  const [isLoading, toggleLoading] = useReducer((s) => !s, true);

  const fetchPostComments = useEventCallback((postId: string) => {
    const commentDocRef = query(
      collection(firestore, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "desc"),
    );

    const formatPostComments = (querySnapshot: QuerySnapshot) =>
      querySnapshot.docs.map((doc) => doc.data() as PostComment);

    getDocs(commentDocRef)
      .then(formatPostComments)
      .then(pipe(setPostComments, dispatch))
      .catch(showNotificationError("Error fetching comments"))
      .finally(toggleLoading);
  });

  return { isLoading, fetchPostComments };
};
