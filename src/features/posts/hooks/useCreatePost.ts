import { showNotificationError } from "@/common/showNotificationError";
import { useAuthModalHandlers } from "@/features/auth/hooks/useAuthModalHandlers";
import { useUser } from "@/features/auth/hooks/useSignedInUser";
import { formatDisplayName, isUser } from "@/features/auth/utility/utility";
import { CreatePostFormValues } from "@/features/posts/components/CreatePost/createPostFormContext";
import { Post } from "@/features/posts/types";
import { firestore, storage } from "@/firebase/clientApp";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { RootState } from "@/store/store";
import { readFiles } from "@/utility/readFiles";
import { FileWithPath } from "@mantine/dropzone";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  DocumentReference,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  UploadResult,
  uploadString,
} from "firebase/storage";
import { useRouter } from "next/router";
import {
  andThen,
  head,
  ifElse,
  isEmpty,
  otherwise,
  pipe,
  tap,
  unless,
} from "ramda";
import { useReducer } from "react";
import { useStore } from "react-redux";

type NewPost = Omit<Post, "id">;

const errorReadingFiles = showNotificationError("Error reading files");
const errorCreatingPost = showNotificationError("Error creating post");

/**
 * Get post document reference
 * @param newPost new post to add
 * @returns Promise<DocumentReference> that adds new post to firestore
 */
const getPostDocumentRef = async (newPost: NewPost) =>
  await addDoc(collection(firestore, "posts"), newPost);

/**
 * Read files as data url
 * @param files files to read
 * @returns Promise<string[]> that reads files as data url
 */
const readFilesADataUrlAsync = async (files: FileWithPath[]) =>
  readFiles(files, "readAsDataURL");

/**
 * Upload file to storage
 * @param postId post id to upload file to
 * @returns function that takes file and uploads it to storage
 */
const uploadFile = (postId: string) => async (file: string) => {
  const fileRef = ref(storage, `posts/${postId}/image`);
  return await uploadString(fileRef, file, "data_url");
};

/**
 * Update post image url in firestore
 * @param docRef document reference to update
 * @returns Promise<void> that updates post image url
 */
const updatePostImageUrl =
  (docRef: DocumentReference) => async (uploadResult: UploadResult) => {
    const downloadedUrl = await getDownloadURL(uploadResult.ref);
    await updateDoc(docRef, { imageUrl: downloadedUrl });
  };

/**
 * Upload files and update post image url in firestore
 * @param files files to upload
 * @returns function that take document ref uploads files and updates post image url
 */
const uploadFiles =
  (files: FileWithPath[]) => async (docRef: DocumentReference) => {
    const uploadFilesByPostId = uploadFile(docRef.id);
    const updatePostImageUrlByPostId = updatePostImageUrl(docRef);
    return unless(
      isEmpty,
      pipe(
        readFilesADataUrlAsync,
        andThen(pipe(head, uploadFilesByPostId)),
        andThen(updatePostImageUrlByPostId),
        otherwise(errorReadingFiles),
      ),
    )(files);
  };

/**
 * Format new post
 * @param user user creating post
 * @param communityId community id to create post in
 * @param formValues form values
 * @returns new post
 */
const formatNewPost = (
  user: User,
  communityId: string,
  communityImageUrl: string | null,
  formValues: CreatePostFormValues,
) => {
  const creatorDisplayName = formatDisplayName(user);
  const newPost: NewPost = {
    creatorDisplayName,
    creatorId: user.uid,
    communityId,
    communityImageUrl,
    title: formValues.title,
    body: formValues.body,
    commentCount: 0,
    voteStatus: 0,
    imageUrl: null,
    createdAt: serverTimestamp() as Timestamp,
  };
  return newPost;
};

export const useCreatePost = () => {
  const router = useRouter();
  const user = useUser();
  const store = useStore();
  const { openLogin } = useAuthModalHandlers();
  const [isLoading, toggleIsLoading] = useReducer((s) => !s, false);

  const createPost = useDebounceCallback((formValues: CreatePostFormValues) => {
    ifElse(
      isUser,
      (user) => {
        const { communityId, imageUrl } = (store.getState() as RootState)
          .communitySlice.communityData;
        const newPost = formatNewPost(user, communityId, imageUrl, formValues);

        const uploadFilesByPostId = uploadFiles(formValues.files);

        pipe(
          tap(toggleIsLoading),
          getPostDocumentRef,
          andThen(uploadFilesByPostId),
          andThen(router.back),
          otherwise(pipe(errorCreatingPost, toggleIsLoading)),
        )(newPost);
      },
      openLogin,
    )(user);
  });

  return { isLoading, createPost };
};
