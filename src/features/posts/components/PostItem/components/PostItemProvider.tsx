import { PostItemProps } from "@/features/posts/components/PostItem/PostItem";
import { usePostsHandlers } from "@/features/posts/hooks/usePostHandlers";
import { FC } from "react";
import { postItemContext } from "./postItemContext";

type PostItemProviderProps = { children: React.ReactNode } & PostItemProps;

const PostItemProvider: FC<PostItemProviderProps> = ({ children, ...rest }) => {
  const postHandlers = usePostsHandlers();
  const value = { ...rest, ...postHandlers };

  return (
    <postItemContext.Provider value={value}>
      {children}
    </postItemContext.Provider>
  );
};

export default PostItemProvider;
