import { firestore } from "@/firebase/clientApp";
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

export const parseUserForFirestore = (user: User) =>
  JSON.parse(JSON.stringify(user));

export const createUserInFirestore = async (
  userCredential?: UserCredential,
) => {
  if (!userCredential) return;
  const userDocRef = doc(firestore, "users", userCredential.user.uid);
  const parsedUser = parseUserForFirestore(userCredential.user);
  await setDoc(userDocRef, parsedUser);
};
