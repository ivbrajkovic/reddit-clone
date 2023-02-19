import { useDeletePost } from "@/features/posts/hooks/useDeletePost";
import { useSelectPost } from "@/features/posts/hooks/useSelectPost";
import { Post } from "@/features/posts/types";
import { createContext, FC, useContext } from "react";

type PostContext = {
  onSelectPost: (postId: string) => void;
  onDeletePost: (post: Post) => void;
};

const PostContext = createContext({} as PostContext);

type PostProviderProps = { children: React.ReactNode };
export const PostProvider: FC<PostProviderProps> = ({ children }) => {
  const onSelectPost = useSelectPost();
  const onDeletePost = useDeletePost();

  return (
    <PostContext.Provider value={{ onSelectPost, onDeletePost }}>
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
