import { showNotificationError } from "@/common/showNotificationError";
import {
  deletePostComment,
  incrementPostCommentCount,
} from "@/features/posts/postsSlice";
import { PostComment } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { doc, increment, writeBatch } from "firebase/firestore";
import { pipe } from "ramda";
import { useReducer } from "react";

export const useDeletePostComment = () => {
  const dispatch = useAppDispatch();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const deleteComment = useEventCallback((comment: PostComment) => {
    toggleLoading();
    const batch = writeBatch(firestore);

    const commentDocRef = doc(firestore, "comments", comment.id);
    batch.delete(commentDocRef);

    const postDocRef = doc(firestore, "posts", comment.postId);
    batch.update(postDocRef, { commentCount: increment(-1) });

    const decrementCommentCount = () =>
      pipe(incrementPostCommentCount, dispatch)(comment.postId);
    const deleteComment = () => pipe(deletePostComment, dispatch)(comment.id);

    return batch
      .commit()
      .then(pipe(decrementCommentCount, deleteComment))
      .catch(showNotificationError("Error deleting comment"))
      .finally(toggleLoading);
  });

  return { isLoading, deleteComment };
};
