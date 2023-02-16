import { Post } from "@/features/posts/types";
import { createContext, useContext } from "react";

export type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue: number;
  onVotePost: (value: number) => void;
  onDeletePost: () => void;
  onSelectPost: () => void;
};

export const postItemContext = createContext({} as PostItemProps);

export const usePostItemContext = () => {
  const context = useContext(postItemContext);
  if (!context)
    throw new Error(
      "usePostItemContext must be used within a PostItemProvider",
    );
  return useContext(postItemContext);
};
