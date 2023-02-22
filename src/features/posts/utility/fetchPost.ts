import { showNotificationError } from "@/common/showNotificationError";
import { Post } from "@/features/posts/types";
import { firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

const errorFetchingPost = showNotificationError("Error fetching post");

const fetchPostById = async (postId: string) => {
  const postRef = doc(firestore, "posts", postId);
  return getDoc(postRef);
};

const fetchPostsByCommunityId = async (communityId: string) => {
  const queryPosts = query(
    collection(firestore, "posts"),
    where("communityId", "==", `${communityId}`),
    orderBy("createdAt", "desc"),
  );
  return getDocs(queryPosts);
};

const formatPost = (postDoc: DocumentSnapshot) =>
  ({
    ...postDoc.data(),
    id: postDoc.id,
  } as Post);

const formatPosts = (postDocs: QuerySnapshot) =>
  postDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[];

const fetchPost = {
  fetchPostById,
  fetchPostsByCommunityId,
  formatPost,
  formatPosts,
  errorFetchingPost,
};

export default fetchPost;
