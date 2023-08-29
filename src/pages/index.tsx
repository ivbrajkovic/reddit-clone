import { CreatePostBar } from "@/components/CreatePostBar";
import PageContent from "@/components/Layout/PageContent";
import { selectUserStateIsUserFetched } from "@/features/auth/authSlice";
import { Recommendations } from "@/features/communities/components/Recommendations";
import PersonalHome from "@/features/communities/components/Recommendations/PersonalHome";
import Premium from "@/features/communities/components/Recommendations/Premium";
import { HomePageFeeds } from "@/features/feeds";
import { PostList } from "@/features/posts";
import { useSelector } from "react-redux";

const Home = () => {
  const isUserFetched = useSelector(selectUserStateIsUserFetched);
  return (
    <PageContent>
      <>
        <HomePageFeeds />
        <CreatePostBar />
        <PostList isHomePage isLoading={!isUserFetched} />
      </>
      <>
        <Recommendations />
        <Premium />
        <PersonalHome />
      </>
    </PageContent>
  );
};

export default Home;
