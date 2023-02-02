import { FirebaseError } from "firebase/app";

export const isDevEnv = () => process.env.NODE_ENV === "development";

export const isError = (value: unknown): value is Error =>
  value instanceof Error;

export const isFirebaseError = (value: unknown): value is FirebaseError =>
  isError(value) && "code" in value;

export const isNotNil = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

export const isNotUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined;
