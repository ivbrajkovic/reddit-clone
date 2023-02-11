import { logError } from "@/common/logError";
import {
  setCommunitySnippets,
  toggleIsLoadingSnippets,
} from "@/features/communities/communitySlice";
import { firestore } from "@/firebase/clientApp";
import { useSignedInUser } from "@/hooks/useSignedInUser";
import { useAppDispatch } from "@/store/hooks";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { andThen, map, otherwise, pipe, prop, tap } from "ramda";
import { useEffect } from "react";

const formatSnippetPath = (userId: string) =>
  `users/${userId}/communitySnippets`;

const getSnippetCollection = (path: string) => collection(firestore, path);

const formatSnippets = (doc: QueryDocumentSnapshot) => ({
  communityId: doc.id,
  ...doc.data(),
});

const handleError = (error: Error) => {
  logError(error, "useCommunitySnippets -> getCommunitySnippets");
  return { props: {} };
};

export const useCommunitySnippets = () => {
  const dispatch = useAppDispatch();
  const signedInUser = useSignedInUser();
  useEffect(() => {
    if (!signedInUser) return;
    const toggleLoading = () => dispatch(toggleIsLoadingSnippets());
    pipe(
      tap(toggleLoading),
      formatSnippetPath,
      getSnippetCollection,
      getDocs,
      andThen(
        pipe(
          prop("docs"),
          map(formatSnippets),
          pipe(setCommunitySnippets, dispatch),
          toggleLoading,
        ),
      ),
      otherwise(pipe(handleError, toggleLoading)),
    )(signedInUser.uid);
  }, [dispatch, signedInUser]);
};
