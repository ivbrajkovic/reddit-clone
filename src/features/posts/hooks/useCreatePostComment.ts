import { formatDisplayName } from "@/features/auth/utility";
import {
  addPostComment,
  incrementPostCommentCount,
} from "@/features/posts/postsSlice";
import { Post, PostComment } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { pipe } from "ramda";
import { useReducer } from "react";

const updateCreatedAt = (postComment: PostComment): PostComment => ({
  ...postComment,
  createdAt: { seconds: Date.now() / 1000 } as Timestamp,
});

export const useCreatePostComment = () => {
  const dispatch = useAppDispatch();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const createPostComment = useEventCallback(
    (commentText: string, post: Post, user: User) => {
      toggleLoading();
      const batch = writeBatch(firestore);

      const commentDocRef = doc(collection(firestore, "comments"));
      const userDisplayName = formatDisplayName(user);
      const postComment = {
        id: commentDocRef.id,
        text: commentText,
        creatorId: user.uid,
        creatorDisplayName: userDisplayName,
        postId: post.id,
        postTitle: post.title,
        communityId: post.communityId,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, postComment);

      const postDocRef = doc(firestore, "posts", post.id);
      batch.update(postDocRef, { commentCount: increment(1) });

      const incrementCommentCount = () =>
        pipe(incrementPostCommentCount, dispatch)(post.id);
      const addComment = () =>
        pipe(updateCreatedAt, addPostComment, dispatch)(postComment);

      return batch
        .commit()
        .then(pipe(incrementCommentCount, addComment))
        .finally(toggleLoading);
    },
  );

  return { isLoading, createPostComment };
};
