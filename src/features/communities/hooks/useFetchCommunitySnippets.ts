import { showNotificationError } from "@/common/showNotificationError";
import {
  setCommunitySnippets,
  toggleCommunityLoader,
} from "@/features/communities/communitySlice";
import { CommunitySnippet } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { andThen, otherwise, pipe, tap } from "ramda";

const formatSnippetPath = (userId: string) =>
  `users/${userId}/communitySnippets`;

const getSnippetCollection = (path: string) => collection(firestore, path);

const formatCommunitySnippets = (postDocs: QuerySnapshot) =>
  postDocs.docs.map((doc) => ({
    ...doc.data(),
    communityId: doc.id,
  })) as CommunitySnippet[];

const fetchUserCommunitySnippets = pipe(
  formatSnippetPath,
  getSnippetCollection,
  getDocs,
);

const errorFetchingCommunitySnippets = showNotificationError(
  "Error getting community snippets",
);

export const useFetchCommunitySnippets = () => {
  const dispatch = useAppDispatch();
  return useEventCallback(async (userId: string) => {
    const toggleLoader = pipe<[], void, void>(toggleCommunityLoader, dispatch);
    return pipe(
      tap(toggleLoader),
      fetchUserCommunitySnippets,
      andThen(pipe(formatCommunitySnippets, setCommunitySnippets, dispatch)),
      otherwise(errorFetchingCommunitySnippets),
      andThen(toggleLoader),
    )(userId);
  });
};
