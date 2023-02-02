import { isError } from "@/common/isError";
import { AuthError } from "firebase/auth";

export const isAuthError = (value: unknown): value is AuthError =>
  isError(value) && "code" in value;
