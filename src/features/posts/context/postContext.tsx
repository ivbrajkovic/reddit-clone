import { useDeletePost } from "@/features/posts/hooks/useDeletePost";
import { useSelectPost } from "@/features/posts/hooks/useSelectPost";
import { Post } from "@/features/posts/types";
import { createContext, FC, useContext, useRef } from "react";

type PostContext = {
  onSelectPost: (postId: string) => void;
  onDeletePost: (post: Post) => Promise<void>;
};

const PostContext = createContext({} as PostContext);

type PostProviderProps = { children: React.ReactNode };
export const PostProvider: FC<PostProviderProps> = ({ children }) => {
  const onSelectPost = useSelectPost();
  const onDeletePost = useDeletePost();

  const handlers = useRef({
    onSelectPost,
    onDeletePost,
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
