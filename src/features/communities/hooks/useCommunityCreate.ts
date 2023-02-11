import { CreateCommunityFormValues } from "@/features/communities/types";
import {
  docFromFirestore,
  runTransactionAsync,
  throwIfDocExists,
} from "@/firebase/utility";
import { useSignedInUser } from "@/hooks/useSignedInUser";
import { DocumentReference, serverTimestamp } from "firebase/firestore";
import { useReducer } from "react";

export const useCommunityCreate = () => {
  const user = useSignedInUser();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const handleCreateCommunity = (values: CreateCommunityFormValues) => {
    const { communityName, privacyType: communityType, adultContent } = values;

    // const userId = getUserIdOrThrow(user); // This should never throw an error.
    toggleLoading();

    return runTransactionAsync(async (transaction) => {
      const createCommunityDocument = (documentRef: DocumentReference) => {
        const newDocument = {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
          adultContent,
        };
        return transaction.set(documentRef, newDocument);
      };

      const createCommunitySnippet = () => {
        const documentPath = `users/${user?.uid}/communitySnippets`;
        const newDocument = {
          communityId: communityName,
          isModerator: true,
        };
        const documentRef = docFromFirestore(documentPath, communityName);
        return transaction.set(documentRef, newDocument);
      };

      const communityRef = docFromFirestore("communities", communityName);
      const communityDoc = await transaction.get(communityRef);

      throwIfDocExists(communityDoc);
      createCommunityDocument(communityRef);
      createCommunitySnippet();
    }).finally(toggleLoading);
  };

  return { handleCreateCommunity, isLoading };
};
