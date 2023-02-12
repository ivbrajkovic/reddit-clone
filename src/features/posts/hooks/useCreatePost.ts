import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { formatDisplayName } from "@/features/auth/utility";
import { NewPostFormValues } from "@/features/posts/formContext";
import { Post } from "@/features/posts/types";
import { firestore, storage } from "@/firebase/clientApp";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";

export const useCreatePost = () => {
  const router = useRouter();
  const user = useSignedInUser();

  const createPost = async ({ title, body, files }: NewPostFormValues) => {
    if (!user) return;

    const { communityId } = router.query;
    const creatorDisplayName = formatDisplayName(user);

    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      creatorDisplayName,
      title,
      body,
      commentsCount: 0,
      voteStatus: 0,
      communityImageUrl: null,
      imageUrl: null,
      createdAt: serverTimestamp() as Timestamp,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      if(files.length) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, files[0], "data_url");
      }

    } catch (error) {}
  };

  return { createPost };
};
