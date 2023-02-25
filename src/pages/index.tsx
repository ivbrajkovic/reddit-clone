import { CreatePostBar } from "@/components/CreatePostBar";
import PageContent from "@/components/Layout/PageContent";
import { PostList } from "@/features/posts";
import { setPosts } from "@/features/posts/postsSlice";
import {
  errorFetchingPost,
  formatPosts,
} from "@/features/posts/utility/fetchPost";
import { auth, firestore } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { pipe } from "ramda";
import { useEffect, useReducer } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const getMostPopularPosts = async () => {
  const postQuery = query(
    collection(firestore, "posts"),
    orderBy("voteStatus", "desc"),
    limit(10),
  );
  return await getDocs(postQuery);
};

const Home = () => {
  const dispatch = useAppDispatch();
  const [user, isLoadingUser] = useAuthState(auth);
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);
  // const [posts, setPosts] = useState<Post[]>([]);

  const buildUserHomeFeed = () => {};

  const buildNoUserHomeFeed = () => {
    // const dispatchPosts = (posts: Post[]) => dispatch(setPosts(posts));
    toggleLoading();
    getMostPopularPosts()
      .then(pipe(formatPosts, setPosts, dispatch))
      .catch(errorFetchingPost)
      .finally(toggleLoading);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    console.log("useEffect -> user:", !!user, "loader:", isLoadingUser);

    // if (!user && !isLoadingUser)
    buildNoUserHomeFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostBar />
        <PostList isHomePage isLoading={isLoading} />
      </>
      <>{/* Recommendations */}</>
    </PageContent>
  );
};

export default Home;
