import { useSignedInUser } from "@/features/auth/hooks/useSignedInUser";
import { getUserIdOrThrow } from "@/features/auth/utility";
import {
  CommunitySnippet,
  CreateCommunityFormValues,
  NewCommunity,
} from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { runTransactionAsync, throwIfDocumentExists } from "@/firebase/utility";
import {
  doc,
  DocumentReference,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useReducer } from "react";

export const useCommunityCreate = () => {
  const user = useSignedInUser();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const handleCreateCommunity = (values: CreateCommunityFormValues) => {
    const { communityName, privacyType: communityType, adultContent } = values;

    toggleLoading();

    return runTransactionAsync(async (transaction) => {
      const userId = getUserIdOrThrow(user); // This should never throw an error.

      const setCommunityData = (documentRef: DocumentReference) => {
        const newCommunity: NewCommunity = {
          creatorId: userId,
          createdAt: serverTimestamp() as Timestamp,
          membersCount: 1,
          privacyType: communityType,
          adultContent,
          imageUrl: null,
        };
        transaction.set(documentRef, newCommunity);
      };

      const setCommunitySnippetData = () => {
        const communitySnippet: CommunitySnippet = {
          communityId: communityName,
          isModerator: true,
          imageUrl: null,
        };
        const documentPath = `users/${userId}/communitySnippets`;
        const documentRef = doc(firestore, documentPath, communityName);
        transaction.set(documentRef, communitySnippet);
      };

      const communityRef = doc(firestore, "communities", communityName);
      const communityDoc = await transaction.get(communityRef);

      throwIfDocumentExists(communityDoc);
      setCommunityData(communityRef);
      setCommunitySnippetData();
    }).finally(toggleLoading);
  };

  return { handleCreateCommunity, isLoading };
};
