import { FirebaseError } from "firebase/app";
import { AuthError } from "firebase/auth";

export type AppError = Error | AuthError | FirebaseError;

// 2759 - Required by keys
type Merge<T> = {
  [k in keyof T]: T[k];
};

export type RequiredByKeys<T, K extends keyof T | undefined = undefined> = [
  K,
] extends [undefined]
  ? Required<T>
  : Merge<
      {
        [k in keyof T as k extends K ? k : never]-?: T[k];
      } & {
        [k in keyof Omit<T, K & string>]: T[k];
      }
    >;
