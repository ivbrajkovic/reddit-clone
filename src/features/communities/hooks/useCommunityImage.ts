import { showNotificationError } from "@/common/showNotificationError";
import {
  updateCommunityData,
  updateCommunitySnippet,
} from "@/features/communities/communitySlice";
import { firestore, storage } from "@/firebase/clientApp";
import { useEventCallback } from "@/hooks/useEventCallback";
import { useAppDispatch } from "@/store/hooks";
import { readFiles } from "@/utility/readFiles";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadString,
} from "firebase/storage";
import { useReducer } from "react";

const getImageBase64 = (file: File) => async () =>
  (await readFiles([file], "readAsDataURL"))[0];

const uploadImage = (communityId: string) => async (imageBase64: string) => {
  const storageRef = ref(storage, `communities/${communityId}/image`);
  return (await uploadString(storageRef, imageBase64, "data_url")).ref;
};

const updateCommunityImage =
  (communityId: string) => async (imageStorageRef: StorageReference) => {
    const downloadedUrl = await getDownloadURL(imageStorageRef);
    const docRef = doc(firestore, "communities", communityId);
    await updateDoc(docRef, { imageUrl: downloadedUrl });
    return downloadedUrl;
  };

const errorUploadingImage = showNotificationError("Error uploading image");

export const useCommunityImageUpload = () => {
  const dispatch = useAppDispatch();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);

  const updateStore = (communityId: string) => (imageUrl: string) => {
    dispatch(updateCommunityData({ communityId, imageUrl }));
    dispatch(updateCommunitySnippet({ communityId, imageUrl }));
    return imageUrl;
  };

  const uploadCommunityImage = useEventCallback(
    (communityId: string, file: File) =>
      Promise.resolve()
        .then(toggleLoading)
        .then(getImageBase64(file))
        .then(uploadImage(communityId))
        .then(updateCommunityImage(communityId))
        .then(updateStore(communityId))
        .catch(errorUploadingImage)
        .finally(toggleLoading),
  );

  return { isLoading, uploadCommunityImage };
};
