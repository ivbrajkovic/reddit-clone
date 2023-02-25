import { PostListProps } from "@/features/posts/components/PostList/PostList";
import { firestore } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { FC, useState } from "react";

const getMostPopularPosts = async () => {
  const postQuery = query(
    collection(firestore, "posts"),
    orderBy("voteStatus", "desc"),
    limit(10),
  );
  return await getDocs(postQuery);
};

export const withPosts = (Component: FC<PostListProps>) => {
  const WithPosts = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    return <Component isLoading={isLoading} />;
  };
  return WithPosts;
};
