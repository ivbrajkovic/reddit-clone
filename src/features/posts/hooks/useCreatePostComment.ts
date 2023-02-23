import { Post, PostComment } from "@/features/posts/types";
import { andThen, pipe, tap } from "ramda";
import { useReducer } from "react";
import { useEventCallback } from "src/hooks/useEventCallback";

const createPostCommentDoc = async (commentText: string) => {};
const updatePostCommentsNumber = async () => {};

const createPostComment = async (commentText: string) => {
  // pipe(
  //   createPostCommentDoc,
  //   andThen(updatePostCommentsNumber),
  //   andThen(updateStore),
  // )(commentText);

  try {
    await createPostCommentDoc(commentText);
    await updatePostCommentsNumber();
    await updateStore();
  } catch (error) {}
};

const updateStore = async () => {};

// toggleLoading();
// createPostCommentDoc(commentText)
//   .then(() => updatePostCommentsNumber())
//   .then(() => updateStore())
//   .catch(() => {})
//   .finally(() => toggleLoading());

export const useCreatePostComment = () => {
  const [isLoading, toggleLoading] = useReducer((s) => !s, true);

  const createNewComment = (
    id: string,
    commentText: string,
    post: Post,
  ): PostComment => ({
    id,
    text: commentText,
    createdAt: { seconds: 0, nanoseconds: 0 },
    userId: "",
    postId: post.id,
    postTitle: post.title,
    communityId: post.communityId,
    creatorDisplayName: "",
  });

  const createPostComment = useEventCallback(
    async (commentText: string, post: Post) => {
      pipe(
        tap(toggleLoading),
        createPostCommentDoc,
        andThen(toggleLoading),
        //
      )(commentText);
    },
  );

  return { isLoading, createPostComment };
};
