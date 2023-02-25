import {
  selectCommunityData,
  selectCommunitySnippets,
} from "@/features/communities/communitySlice";
import {
  DirectoryItemProps,
  resetSelectedDirectoryItem,
  selectDirectory,
  setDirectoryOpen,
  setSelectedDirectoryItem,
} from "@/features/directory/directorySlice";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useRouteChanged } from "@/hooks/useRouteChange";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useDirectory = () => {
  const dispatch = useAppDispatch();

  const communitySnippets = useSelector(selectCommunitySnippets);
  const communityData = useSelector(selectCommunityData);
  const { isOpenDirectory, selectedDirectoryItem } =
    useSelector(selectDirectory);

  const setIsOpenDirectory = useEventCallback((isOpen: boolean) =>
    dispatch(setDirectoryOpen(isOpen)),
  );
  const selectDirectoryItem = useEventCallback((item: DirectoryItemProps) =>
    dispatch(setSelectedDirectoryItem(item)),
  );

  useRouteChanged((e) => e === "/" && dispatch(resetSelectedDirectoryItem()));

  useEffect(() => {
    const { communityId, imageUrl } = communityData;
    if (!communityId) {
      dispatch(resetSelectedDirectoryItem());
      return;
    }
    selectDirectoryItem({
      url: `/r/${communityId}`,
      imageUrl,
      icon: "FaReddit",
      iconColor: "lightblue",
    });
  }, [communityData, dispatch, selectDirectoryItem]);

  return {
    communitySnippets,
    isOpenDirectory,
    setIsOpenDirectory,
    selectedDirectoryItem,
    selectDirectoryItem,
  };
};
