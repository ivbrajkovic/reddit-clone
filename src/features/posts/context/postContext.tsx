import { useDeletePost } from "@/features/posts/hooks/useDeletePost";
import { useDeletePostComment } from "@/features/posts/hooks/useDeletePostComment";
import { useFetchPostComments } from "@/features/posts/hooks/useFetchPostComments";
import { createContext, FC, useContext, useRef } from "react";

type PostContext = ReturnType<typeof useDeletePost> &
  ReturnType<typeof useDeletePostComment> &
  ReturnType<typeof useFetchPostComments>;

const PostContext = createContext({} as PostContext);

type PostProviderProps = { children: React.ReactNode };
export const PostProvider: FC<PostProviderProps> = ({ children }) => {
  const deletePost = useDeletePost();
  const fetchPostComments = useFetchPostComments();
  const deletePostComment = useDeletePostComment();

  const handlers = useRef<PostContext>({
    ...deletePost,
    ...deletePostComment,
    ...fetchPostComments,
  });

  return (
    <PostContext.Provider value={handlers.current}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("usePostContext must be used within a PostContextProvider");
  return context;
};
