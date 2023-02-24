import { showNotificationError } from "@/common/showNotificationError";
import {
  decrementPostCommentCount,
  deletePostComment as deletePostCommentFromStore,
} from "@/features/posts/postsSlice";
import { PostComment } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { doc, increment, writeBatch } from "firebase/firestore";
import { pipe } from "ramda";
import { useState } from "react";

export const useDeletePostComment = () => {
  const dispatch = useAppDispatch();
  const [loadingCommentId, setLoadingId] = useState<string | null>(null);

  const deletePostComment = useEventCallback((comment: PostComment) => {
    setLoadingId(comment.id);
    const batch = writeBatch(firestore);

    const commentDocRef = doc(firestore, "comments", comment.id);
    batch.delete(commentDocRef);

    const postDocRef = doc(firestore, "posts", comment.postId);
    batch.update(postDocRef, { commentCount: increment(-1) });

    const decrementCommentCount = () =>
      pipe(decrementPostCommentCount, dispatch)(comment.postId);
    const deleteComment = () =>
      pipe(deletePostCommentFromStore, dispatch)(comment.id);

    const clearLoadingId = () => setLoadingId(null);

    return batch
      .commit()
      .then(pipe(decrementCommentCount, deleteComment))
      .catch(showNotificationError("Error deleting comment"))
      .finally(clearLoadingId);
  });

  return { loadingCommentId, deletePostComment };
};
