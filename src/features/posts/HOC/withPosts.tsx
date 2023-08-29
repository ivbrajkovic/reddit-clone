import { PostListProps } from "@/features/posts/components/PostList/PostList";
import { usePosts } from "@/features/posts/hooks/usePosts";
import { FC } from "react";

export const withPosts = (Component: FC<PostListProps>) => {
  const WithPosts = () => {
    const { isLoading } = usePosts();
    return <Component isLoading={isLoading} />;
  };
  return WithPosts;
};
