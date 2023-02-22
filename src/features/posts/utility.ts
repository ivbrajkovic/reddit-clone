import { Post } from "@/features/posts/types";
import { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { NextRouter } from "next/router";

export const formatPost = (postDoc: DocumentSnapshot) =>
  ({
    ...postDoc.data(),
    id: postDoc.id,
  } as Post);

export const formatPosts = (postDocs: QuerySnapshot) =>
  postDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[];

export const getCommunityId = (router: NextRouter) =>
  router.query.communityId as string;
