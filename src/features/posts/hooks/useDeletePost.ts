import { showNotificationError } from "@/common/showNotificationError";
import { deletePost } from "@/features/posts/postsSlice";
import { Post } from "@/features/posts/types";
import { firestore, storage } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { always, andThen, isNil, otherwise, pipe, unless } from "ramda";
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

export const useDeletePost = () => {
  const dispatch = useDispatch();
  return useEventCallback(async (post: Post) => {
    return pipe(
      deletePostImageFromStorage,
      andThen(deletePostFromFirebase),
      andThen(pipe(deletePost, dispatch)),
      otherwise(errorDeletingPost),
    )(post);
  });
};
