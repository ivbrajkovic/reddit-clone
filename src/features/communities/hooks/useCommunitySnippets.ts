import { showNotificationError } from "@/common/showNotificationError";
import {
  clearCommunitySnippets,
  setCommunitySnippets,
  toggleIsLoadingSnippets,
} from "@/features/communities/communitySlice";
import { CommunitySnippet } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { User } from "firebase/auth";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { andThen, map, otherwise, pipe, prop, tap } from "ramda";
import { useMemo } from "react";

const formatSnippetPath = (user: User) => `users/${user.uid}/communitySnippets`;
const getSnippetCollection = (path: string) => collection(firestore, path);

const formatSnippets = (doc: QueryDocumentSnapshot) =>
  ({
    communityId: doc.id,
    ...doc.data(),
  } as CommunitySnippet);

export const useUserCommunitySnippets = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const toggleLoading = () => dispatch(toggleIsLoadingSnippets());

    return {
      clearUserCommunitySnippets: async () =>
        dispatch(clearCommunitySnippets()),

      getUserCommunitySnippets: pipe(
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
      ),
    };
  }, [dispatch]);
};
