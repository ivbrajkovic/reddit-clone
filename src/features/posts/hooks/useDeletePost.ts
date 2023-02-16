import { showNotificationError } from "@/common/showNotificationError";
import { deletePost, toggleIsLoadingPost } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { firestore, storage } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { always, andThen, isNil, otherwise, pipe, tap, unless } from "ramda";
import { useDispatch } from "react-redux";

const formatImagePath = (post: Post) => `posts/${post.id}/image`;
const postHasImage = (post: Post) => isNil(post.imageUrl);
const imageDocumentRef = (imagePath: string) => ref(storage, imagePath);
const postDocumentRef = (post: Post) => doc(firestore, "posts", post.id);
const errorDeletingPost = showNotificationError("Error deleting post.");

const deletePostImageFromStorage = async (post: Post) =>
  unless(
    postHasImage,
    pipe(
      formatImagePath,
      imageDocumentRef,
      deleteObject,
      andThen(always(post)),
    ),
  )(post);

const deletePostFromFirebase = (post: Post) =>
  pipe(postDocumentRef, deleteDoc, andThen(always(post)))(post);

const t = () => {
  console.log("first");
  return () => {};
};

export const useDeletePost = () => {
  const dispatch = useDispatch();
  const toggleLoading = () => dispatch(toggleIsLoadingPost());
  return useEventCallback((post: Post) => {
    pipe(
      tap(toggleLoading),
      deletePostImageFromStorage,
      andThen(deletePostFromFirebase),
      andThen(pipe(deletePost, dispatch)),
      otherwise(errorDeletingPost),
      andThen(toggleLoading),
      t,
    )(post);
  });
};
