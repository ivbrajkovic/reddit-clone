import { showNotificationError } from "@/common/showNotificationError";
import {
  joinCommunity,
  leaveCommunity,
  selectIsLoadingSnippets,
  selectIsUserJoinedInCurrentCommunity,
} from "@/features/communities/communitySlice";
import { useCommunityCreateModal } from "@/features/communities/hooks/useCommunityCreateModal";
import { useCommunityData } from "@/features/communities/hooks/useCommunityData";
import { Community } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { useSignedInUser } from "@/hooks/useSignedInUser";
import { useAppDispatch } from "@/store/hooks";
import { doc, increment, WriteBatch, writeBatch } from "firebase/firestore";
import { andThen, ifElse, otherwise, pipe } from "ramda";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useJoinCommunity = () => {
  const dispatch = useAppDispatch();
  const user = useSignedInUser();

  const joinCommunityDB = (communityData: Community) => {
    if (!user) return;

    // createWritingBatch.set(
    //   doc(firestore, createSnippetPath, communityData.communityId),
    //   createSnippet,
    // );
    // createWritingBatch.update(
    //   doc(firestore, "communities", communityData.communityId),
    //   {
    //     membersCount: increment(1),
    //   },
    // );
    // createWritingBatch
    //   .commit()
    //   .then(() => {
    //     dispatch(
    //       joinCommunity({
    //         imageUrl: communityData.imageUrl,
    //         communityId: communityData.communityId,
    //         isModerator: false,
    //       }),
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const createSnippet = () => ({
      imageUrl: communityData.imageUrl,
      communityId: communityData.communityId,
      isModerator: false,
    });

    const createWritingBatch = () => writeBatch(firestore);

    const setCommunitySnippet = (batch: WriteBatch) => {
      const snippetsPath = `users/${user.uid}/communitySnippets`;
      return batch.set(
        doc(firestore, snippetsPath, communityData.communityId),
        createSnippet,
      );
    };

    const updateCommunityNumberOfMembers = (batch: WriteBatch) =>
      batch.update(doc(firestore, "communities", communityData.communityId), {
        membersCount: increment(1),
      });

    const commitBatchToFirestore = (batch: WriteBatch) => batch.commit();

    pipe(
      createWritingBatch,
      setCommunitySnippet,
      updateCommunityNumberOfMembers,
      commitBatchToFirestore,
      andThen(pipe(createSnippet, joinCommunity, dispatch)),
      otherwise(pipe(showNotificationError("Error joining community"))),
    )();
  };

  return { joinCommunity };
};

export const useCommunity = () => {
  const dispatch = useAppDispatch();

  const communityData = useCommunityData();
  const isLoadingSnippets = useSelector(selectIsLoadingSnippets);
  const isUserJoinedInCommunity = useSelector(
    selectIsUserJoinedInCurrentCommunity,
  );

  const { closeCommunityCreateModal, openCommunityCreateModal } =
    useCommunityCreateModal();

  const handlers = useMemo(() => {
    return {
      joinCommunity: pipe(joinCommunity, dispatch),
      leaveCommunity: pipe(leaveCommunity, dispatch),
      joinOrLeaveCommunity: ifElse(
        () => isUserJoinedInCommunity,
        () => dispatch(leaveCommunity(communityData.communityId)),
        () =>
          dispatch(
            joinCommunity({
              imageUrl: communityData.imageUrl,
              communityId: communityData.communityId,
              isModerator: false,
            }),
          ),
      ),
    };
  }, [communityData, dispatch, isUserJoinedInCommunity]);

  return { isUserJoinedInCommunity, isLoading: isLoadingSnippets, ...handlers };
};
