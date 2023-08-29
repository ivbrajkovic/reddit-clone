import { PostItem } from "@/features/posts/components/PostItem";
import { PostLoader } from "@/features/posts/components/PostLoader";
import { PostNotFound } from "@/features/posts/components/PostNotFound";
import { Post, PostVote } from "@/features/posts/types";
import { FC } from "react";

type PostItemWrapper = {
  isLoading: boolean;
  post?: Post;
  postVote?: PostVote;
};
const PostItemWrapper: FC<PostItemWrapper> = (props) => {
  if (props.isLoading) return <PostLoader postCount={1} />;
  if (!props.post) return <PostNotFound />;
  return <PostItem post={props.post} postVote={props.postVote} />;
};

export default PostItemWrapper;
