import { FC } from "react";
import { postItemContext, PostItemProps } from "./postItemContext";

type PostItemProviderProps = { children: React.ReactNode } & PostItemProps;

const PostItemProvider: FC<PostItemProviderProps> = ({ children, ...rest }) => {
  return (
    <postItemContext.Provider value={rest}>{children}</postItemContext.Provider>
  );
};

export default PostItemProvider;
