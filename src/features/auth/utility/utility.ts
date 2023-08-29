import { firestore } from "@/firebase/clientApp";
import { jsonParseStringify } from "@/utility";
import { User, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const throwError = (message: string) => {
  throw new Error(message);
};

export const isUser = (value: any): value is User =>
  value !== null && value !== undefined && "uid" in value;

export const throwIfNotSignedIn = (user?: User | null) =>
  isUser(user) ? user : throwError("User is not signed in.");

export const getUserIdOrThrow = (user?: User | null) =>
  throwIfNotSignedIn(user).uid;

export const createUserInFirestore = async (
  userCredential?: UserCredential,
) => {
  if (!userCredential) return;
  const userDocRef = doc(firestore, "users", userCredential.user.uid);
  const parsedUser = jsonParseStringify(userCredential.user);
  await setDoc(userDocRef, parsedUser);
};

export const formatDisplayName = (user: User) =>
  user.displayName ?? user.email?.split("@")[0] ?? "Anonymous";
