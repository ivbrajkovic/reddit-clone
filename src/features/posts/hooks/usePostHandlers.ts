import { showNotificationError } from "@/common/showNotificationError";
import { deletePostById, setPosts } from "@/features/posts/postsSlice";
import { firestore, storage } from "@/firebase/clientApp";
import { docV, refV } from "@/firebase/utility";
import { deleteDoc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import { andThen, otherwise, pipe, when } from "ramda";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

const formatImagePath = (postId: string) => `posts/${postId}/image`;
const errorDeletingPost = showNotificationError("Error deleting post.");

const deletePostImage = async (postId: string, hasImage: boolean) => {
  const postHasImage = () => hasImage;
  const returnPostId = () => postId;
  return when(
    postHasImage,
    pipe(formatImagePath, refV(storage), deleteObject, andThen(returnPostId)),
  )(postId);
};

const deletePost = (postId: string) => {
  const returnPostId = () => postId;
  return pipe(
    docV(firestore as any, "posts"),
    deleteDoc,
    andThen(returnPostId),
  )(postId);
};

export const usePostsHandlers = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => ({
      onPosts: pipe(setPosts, dispatch),
      onVotePost: (vote: number) => {
        console.log("onVotePost");
      },
      onSelectPost: () => {
        console.log("onSelectedPost");
      },
      onDeletePost: pipe(
        deletePostImage,
        andThen(deletePost),
        andThen(pipe(deletePostById, dispatch)),
        otherwise(errorDeletingPost),
      ),
    }),
    [dispatch],
  );
};
