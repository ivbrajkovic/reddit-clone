import { formatDisplayName } from "@/features/auth/utility";
import { Post } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { useReducer } from "react";

export const useCreatePostComment = () => {
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const createPostComment = useEventCallback(
    (commentText: string, post: Post, user: User) => {
      toggleLoading();
      const batch = writeBatch(firestore);

      const commentDocRef = doc(collection(firestore, "comments"));
      const userDisplayName = formatDisplayName(user);
      const newComment = {
        id: commentDocRef.id,
        text: commentText,
        creatorId: user.uid,
        creatorDisplayName: userDisplayName,
        postId: post.id,
        postTitle: post.title,
        communityId: post.communityId,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);

      const postDocRef = doc(firestore, "posts", post.id);
      batch.update(postDocRef, { commentsNumber: increment(1) });

      return batch.commit().finally(toggleLoading);
    },
  );

  return { isLoading, createPostComment };
};
