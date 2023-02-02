import { FirebaseError } from "firebase/app";
import { AuthError } from "firebase/auth";

export type AppError = Error | AuthError | FirebaseError;
