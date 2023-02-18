import { FirebaseError } from "firebase/app";
import { AuthError } from "firebase/auth";

export type AppError = Error | AuthError | FirebaseError;

export type MergeUnion<T> = T extends object
  ? {
      [K in keyof T]: T[K];
    }
  : never;

export type RequiredByKeys<T, K extends keyof T | undefined = undefined> = [
  K,
] extends [undefined]
  ? Required<T>
  : MergeUnion<
      {
        [k in keyof T as k extends K ? k : never]-?: T[k];
      } & {
        [k in keyof Omit<T, K & string>]: T[k];
      }
    >;

export type AnyIfNever<T> = [T] extends [never] ? any : T;
