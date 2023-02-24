import PageContent from "@/components/Layout/PageContent";
import { CommunityAboutWrapper } from "@/features/communities/components/CommunityAbout";
import { useFetchCommunityEffect } from "@/features/communities/hooks/useFetchCommunityEffect";
import { PostComments } from "@/features/posts/components/PostComments";
import PostItemWrapper from "@/features/posts/components/PostItem/components/PostItemWrapper";
import { usePostAndPostVote } from "@/features/posts/hooks/usePostAndPostVote";
import { useRenderCount } from "@/hooks/useRenderCount";
import { NextPage } from "next";

const PostPage: NextPage = () => {
  useRenderCount("PostPage");

  const { isLoading: isPostLoading, post, postVote } = usePostAndPostVote();
  const { isLoading: isCommunityLoading, communityData } =
    useFetchCommunityEffect();

  return (
    <PageContent>
      <>
        <PostItemWrapper
          isLoading={isPostLoading}
          post={post}
          postVote={postVote}
        />
        {post ? <PostComments post={post} /> : null}
      </>
      <CommunityAboutWrapper
        isLoading={isCommunityLoading}
        communityData={communityData}
      />
    </PageContent>
  );
};

export default PostPage;
