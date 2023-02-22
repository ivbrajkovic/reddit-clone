import { useDeletePost } from "@/features/posts/hooks/useDeletePost";
import { createContext, FC, useContext, useRef } from "react";

type PostContext = ReturnType<typeof useDeletePost>;

const PostContext = createContext({} as PostContext);

type PostProviderProps = { children: React.ReactNode };
export const PostProvider: FC<PostProviderProps> = ({ children }) => {
  const deletePost = useDeletePost();

  const handlers = useRef<PostContext>({
    ...deletePost,
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
