import { showNotificationError } from "@/common/showNotificationError";
import { deletePost } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { firestore, storage } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { NextRouter, useRouter } from "next/router";
import { andThen, ifElse, isNil, otherwise, pipe, tap } from "ramda";
import { useReducer } from "react";

const formatImagePath = (post: Post) => `posts/${post.id}/image`;
const postHasImage = (post: Post) => isNil(post.imageUrl);
const imageDocumentRef = (imagePath: string) => ref(storage, imagePath);
const postDocumentRef = (post: Post) => doc(firestore, "posts", post.id);
const errorDeletingPost = showNotificationError("Error deleting post.");

const deletePostImageFromStorage = async (post: Post) => {
  if (postHasImage(post)) return post;
  const imagePath = formatImagePath(post);
  const imageRef = imageDocumentRef(imagePath);
  await deleteObject(imageRef);
  return post;
};

const deletePostFromFirebase = async (post: Post) => {
  const postRef = postDocumentRef(post);
  await deleteDoc(postRef);
  return post;
};

const deletePostFromStore = (dispatch: AppDispatch) => (post: Post) => {
  dispatch(deletePost(post));
  return post;
};

const goCommunityPage = (router: NextRouter) => (post: Post) => {
  router.push(`/r/${post.communityId}`);
  return post;
};

const isPostPage = (router: NextRouter) => (_: unknown) =>
  Boolean(router.query.postId as string);

export const useDeletePost = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const deletePost = useEventCallback(async (post: Post) =>
    pipe(
      tap(toggleLoading),
      deletePostImageFromStorage,
      andThen(deletePostFromFirebase),
      andThen(
        ifElse(
          isPostPage(router),
          goCommunityPage(router),
          deletePostFromStore(dispatch),
        ),
      ),
      otherwise(errorDeletingPost),
      andThen(toggleLoading),
    )(post),
  );

  return { isLoading, deletePost };
};
