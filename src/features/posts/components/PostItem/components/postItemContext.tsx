import { PostItemProps } from "@/features/posts/components/PostItem/PostItem";
import { usePostsHandlers } from "@/features/posts/hooks/usePostHandlers";
import { createContext, useContext } from "react";

export const postItemContext = createContext(
  {} as PostItemProps & ReturnType<typeof usePostsHandlers>,
);

export const usePostItemContext = () => {
  const context = useContext(postItemContext);
  if (!context)
    throw new Error(
      "usePostItemContext must be used within a PostItemProvider",
    );
  return useContext(postItemContext);
};
