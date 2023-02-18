import { Post, PostVote } from "@/features/posts/types";
import { FirebaseError } from "firebase/app";
import { MouseEventHandler } from "react";

export const isDevEnv = () => process.env.NODE_ENV === "development";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isError = (value: unknown): value is Error =>
  value instanceof Error;

export const isFirebaseError = (value: unknown): value is FirebaseError =>
  isError(value) && "code" in value;

export const isNotNil = <T>(value: T): boolean =>
  value !== null && value !== undefined;

export const isNotUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined;

export const jsonParseStringify = <T>(props: T): T =>
  JSON.parse(JSON.stringify(props));

export const pipeLog = <T>(x: T, label: string = "x ->"): T => (
  console.log(label, x), x
);

export const isNullOrUndefined = <T>(value: T): boolean =>
  value === null || value === undefined;

export const stopPropagation: MouseEventHandler<any> = (e) =>
  e.stopPropagation();

export const isPostVote = (value: any): value is PostVote =>
  value !== null &&
  typeof value === "object" &&
  "id" in value &&
  "postId" in value &&
  "communityId" in value &&
  "voteValue" in value;

export const isPost = (value: any): value is Post =>
  value !== null &&
  typeof value === "object" &&
  "id" in value &&
  "communityId" in value &&
  "title" in value &&
  "body" in value &&
  "createdAt" in value &&
  "updatedAt" in value &&
  "userId" in value &&
  "username" in value &&
  "userAvatar" in value;
