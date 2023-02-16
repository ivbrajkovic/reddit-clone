import { PostItemProps } from "@/features/posts/components/PostItem/PostItem";
import { FC } from "react";
import { postItemContext } from "../context/postItemContext";

type PostItemProviderProps = { children: React.ReactNode } & PostItemProps;

const PostItemProvider: FC<PostItemProviderProps> = ({
  children,
  ...props
}) => (
  <postItemContext.Provider value={props}>{children}</postItemContext.Provider>
);

export default PostItemProvider;
