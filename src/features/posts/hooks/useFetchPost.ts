import { showNotificationError } from "@/common/showNotificationError";
import { addPost } from "@/features/posts/postsSlice";
import { formatPost } from "@/features/posts/utility";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { doc, getDoc } from "firebase/firestore";
import { andThen, otherwise, pipe } from "ramda";
import { useDispatch } from "react-redux";

const fetchPostFromFirestore = async (postId: string) => {
  const postRef = doc(firestore, "posts", postId);
  return getDoc(postRef);
};

const errorFetchingPost = showNotificationError("Error fetching post");

export const useFetchPost = () => {
  const dispatch = useDispatch();

  return useEventCallback(async (postId: string) => {
    return pipe(
      fetchPostFromFirestore,
      andThen(pipe(formatPost, addPost, dispatch)),
      otherwise(errorFetchingPost),
    )(postId);
  });
};
