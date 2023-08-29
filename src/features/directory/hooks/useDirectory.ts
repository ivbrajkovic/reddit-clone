import {
  selectCommunityData,
  selectCommunitySnippets,
} from "@/features/communities/communitySlice";
import {
  resetSelectedDirectoryItem,
  selectDirectory,
  setDirectoryOpen,
  setSelectedDirectoryItem,
} from "@/features/directory/directorySlice";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useDirectory = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const communitySnippets = useSelector(selectCommunitySnippets);
  const communityData = useSelector(selectCommunityData);
  const { isOpenDirectory, selectedDirectoryItem } =
    useSelector(selectDirectory);

  const setIsOpenDirectory = useEventCallback((isOpen: boolean) =>
    dispatch(setDirectoryOpen(isOpen)),
  );

  useEffect(() => {
    if (router.asPath === "/" || !communityData.communityId) {
      dispatch(resetSelectedDirectoryItem());
      return;
    }

    dispatch(
      setSelectedDirectoryItem({
        url: `/r/${communityData.communityId}`,
        imageUrl: communityData.imageUrl,
        icon: "FaReddit",
        iconColor: "lightblue",
      }),
    );
  }, [router.asPath, communityData, dispatch]);

  return {
    communitySnippets,
    isOpenDirectory,
    setIsOpenDirectory,
    selectedDirectoryItem,
  };
};
