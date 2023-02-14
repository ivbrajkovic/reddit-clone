import { useCommunityData } from "@/features/communities/hooks/useCommunityData";
import PostItem from "@/features/posts/components/PostItem/PostItem";
import { usePostsEffect } from "@/features/posts/hooks/usePostsEffect";

const Posts = () => {
  const communityData = useCommunityData();

  usePostsEffect();

  return (
    <>
      <PostItem />
    </>
  );
};
export default Posts;
