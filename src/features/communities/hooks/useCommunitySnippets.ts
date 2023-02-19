import { showNotificationError } from "@/common/showNotificationError";
import {
  clearCommunitySnippets,
  setCommunitySnippets,
  toggleIsLoadingSnippets,
} from "@/features/communities/communitySlice";
import { CommunitySnippet } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { User } from "firebase/auth";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { andThen, map, otherwise, pipe, prop, tap } from "ramda";

const formatSnippetPath = (user: User) => `users/${user.uid}/communitySnippets`;
const getSnippetCollection = (path: string) => collection(firestore, path);

const formatSnippets = (doc: QueryDocumentSnapshot) =>
  ({
    communityId: doc.id,
    ...doc.data(),
  } as CommunitySnippet);

export const useUserCommunitySnippets = () => {
  const dispatch = useAppDispatch();

  const toggleLoading = () => dispatch(toggleIsLoadingSnippets());

  const clearUserCommunitySnippets = useEventCallback(async () =>
    dispatch(clearCommunitySnippets()),
  );

  const getUserCommunitySnippets = useEventCallback((user: User) => {
    pipe(
      formatSnippetPath,
      getSnippetCollection,
      tap(toggleLoading),
      getDocs,
      andThen(
        pipe(
          prop("docs"),
          map(formatSnippets),
          pipe(setCommunitySnippets, dispatch),
          toggleLoading,
        ),
      ),
      otherwise(
        pipe(
          showNotificationError("Error getting community snippets"),
          toggleLoading,
        ),
      ),
    )(user);
  });

  return { clearUserCommunitySnippets, getUserCommunitySnippets };
};
