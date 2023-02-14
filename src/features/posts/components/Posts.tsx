import { useCommunityData } from "@/features/communities/hooks/useCommunityData";
import { usePostsEffect } from "@/features/posts/hooks/usePostsEffect";

const Posts = () => {
  const communityData = useCommunityData();

  usePostsEffect();

  return <div>Posts</div>;
};
export default Posts;
