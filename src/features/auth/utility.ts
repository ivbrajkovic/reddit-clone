import { User } from "firebase/auth";

const throwError = (message: string) => {
  throw new Error(message);
};

export const throwIfNotSignedIn = (user?: User | null) =>
  user ? user : throwError("User is not signed in.");

export const getUserIdOrThrow = (user?: User | null) =>
  throwIfNotSignedIn(user).uid;
